/*
* musicScore的播放扩展
* tone.js
* TODO 二期把音频播放改成webAudio实现，或者放弃url这一类型，音频播放使用整体audioUtils
* */
import * as Tone from "tone";
import {MusicScore} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    ChronaxieEnum,
    MusicalAlphabetEnum, NoteTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

enum CacheType {
    toneSequence,
    url
}

type ToneSequence = {
    type: string | number,
    note: string,
    duration: string,
    time: string | number // Tone中的相对时间单位,节拍数。 1 = 4n 这个不会改变，永远是1 = 4n
}
type MusicDataType = string | ToneSequence[] | MusicScore
type CacheDataType = {
    type: CacheType.url,
    data: Exclude<MusicDataType, ToneSequence[] | MusicScore>,
    player: Tone.Player
} | {
    type: CacheType.toneSequence,
    data: Exclude<MusicDataType, string>,
    synth: Tone.Synth,
    part: Tone.Part
}

// 支持三种类型缓存，mp3、wav等音频文件，data-url或者tone生成的播放序列。
const cacheMap = new Map<string, CacheDataType>();

// 播放
async function play(key: string) {
    const data = cacheMap.get(key);
    if (!data) {
        console.warn(`No music data found for key: ${key}`);
        return;
    }

    await Tone.start();

    if (data.type === CacheType.toneSequence) {
        Tone.getTransport().stop();
        data.part.stop();
        data.part.start(0);
        Tone.getTransport().start();
    } else if (data.type === CacheType.url) {
        data.player.start();
    }
}

// 暂停
function pause(key: string) {
    const data = cacheMap.get(key);
    if (!data) return;

    if (data.type === CacheType.toneSequence) {
        Tone.getTransport().pause();
    } else if (data.type === CacheType.url) {
        console.error('音频目前不支持播放')
    }
}

// 恢复播放
function resume(key: string) {
    const data = cacheMap.get(key);
    if (!data) return;

    if (data.type === CacheType.toneSequence) {
        Tone.getTransport().start();
    } else if (data.type === CacheType.url) {
        data.player.start();
    }
}

// 停止
function stop(key: string) {
    const data = cacheMap.get(key);
    if (!data) return;

    if (data.type === CacheType.toneSequence) {
        data.part.stop();
        Tone.getTransport().stop();
    } else if (data.type === CacheType.url) {
        data.player.stop();
    }
}

// 添加音乐数据到缓存
// TODO synth 二期做音色可能要改成Tone.Sampler
async function addMusicToMap(key: string, data: MusicDataType, callback?: () => void) {

    let cacheData: CacheDataType = null!
    if (Array.isArray(data)) { // 如果是ToneSequence序列，
        const synth = new Tone.Synth().toDestination();
        const tonePart = new Tone.Part((time, note: ToneSequence) => {
            synth.triggerAttackRelease(note.note, note.duration, time);
        }, data)
        cacheData = {
            type: CacheType.toneSequence,
            data: data,
            part: tonePart,
            synth: synth
        }
    } else {

        if (typeof data === 'object') { // 如果是musicScoreData, 转换出ToneSequence序列
            const synth = new Tone.Synth().toDestination();
            const toneSequence: ToneSequence[] = musicScoreToToneSequence(data)
            console.log('chicken', toneSequence)
            const tonePart: Tone.Part = new Tone.Part((time, note: ToneSequence) => {
                console.log('chicken', '播放')
                synth.triggerAttackRelease(note.note, note.duration, time);
            }, toneSequence)
            tonePart.loop = false; // ✅ 确保它会只执行一次而不是静默
            cacheData = {
                type: CacheType.toneSequence,
                data: data,
                part: tonePart,
                synth: synth
            }
        } else { // 如果是url, 加载音频
            const player = new Tone.Player().toDestination();
            await player.load(data); // 等待加载完成
            cacheData = {
                type: CacheType.url,
                data: data,
                player: player
            };

        }
    }

    cacheMap.set(key, cacheData);
    callback?.()
}

// 删除音乐数据
function removeMusicFromMap(key: string) {
    const data = cacheMap.get(key);
    if (!data) return;

    if (data.type === CacheType.toneSequence) {
        data.part.dispose();
        data.synth.dispose();
    } else if (data.type === CacheType.url) {
        data.player.dispose();
    }

    cacheMap.delete(key);
}

const chronaxieToBeatsMap = {
    [ChronaxieEnum.whole]: 4,
    [ChronaxieEnum.half]: 2,
    [ChronaxieEnum.quarter]: 1,
    [ChronaxieEnum.eighth]: 0.5,
    [ChronaxieEnum.sixteenth]: 0.25,
};
// Tone 识别的时值字符串
const chronaxieToDurationMap: Record<ChronaxieEnum, string> = {
    [ChronaxieEnum.whole]: '1n',
    [ChronaxieEnum.half]: '2n',
    [ChronaxieEnum.quarter]: '4n',
    [ChronaxieEnum.eighth]: '8n',
    [ChronaxieEnum.sixteenth]: '16n',
};
// Tone 识别的音符类型
const noteTypeMap = {
    [NoteTypeEnum.normal]: 'note',
    [NoteTypeEnum.rest]: 'rest',
}

function durationToBeats(duration: string): number {
    // 拍子表，对应每种基础音符的拍数（以4n为1拍）
    const baseMap: Record<string, number> = {
        '1n': 4,
        '2n': 2,
        '4n': 1,
        '8n': 0.5,
        '16n': 0.25,
        '32n': 0.125,
        '64n': 0.0625,
    };

    // 提取基础时值和附点
    const match = duration.match(/^(\d+n)(\.*)$/);
    if (!match) {
        throw new Error(`Unsupported duration format: ${duration}`);
    }

    const [, base, dots] = match;
    let beats = baseMap[base];
    if (beats === undefined) {
        throw new Error(`Unknown base duration: ${base}`);
    }

    // TODO 附点处理：1个附点 = 1.5倍，2个 = 1.75倍，3个 = 1.875倍...  二期
    let dotBonus = 0;
    for (let i = 0; i < dots.length; i++) {
        dotBonus += beats / Math.pow(2, i + 1);
    }

    return beats + dotBonus;
}

function musicScoreToToneSequence(musicData: MusicScore): ToneSequence[] {
    const sequence: ToneSequence[] = [];
    let accumulatorTime = 0
    for (const multiStaff of musicData.multipleStavesArray) {
        for (const singleStaff of multiStaff.singleStaffArray) {
            for (const measure of singleStaff.measureArray) {
                for (const note of measure.noteArray) {
                    // 跳过休止符
                    if (note.type === NoteTypeEnum.rest) continue;

                    // 构造音名（暂不考虑变音符）
                    let noteName: string = note.musicalAlphabet;
                    if (note.accidental && note.accidental !== 'none') {
                        switch (note.accidental) {
                            case 'sharp':
                                noteName += '#';
                                break;
                            case 'flat':
                                noteName += 'b';
                                break;
                            case 'doubleSharp':
                                noteName += '##';
                                break;
                            case 'doubleFlat':
                                noteName += 'bb';
                                break;
                            // 其他变音暂不处理
                        }
                    }

                    // 时值转换
                    let duration = chronaxieToDurationMap[note.chronaxie as ChronaxieEnum] || '4n';

                    // 附点处理（1 个附点 = 原始时值 * 1.5，两个附点 *1.75）
                    if (note.augmentationDot === 1) {
                        duration += '.';
                    } else if (note.augmentationDot >= 2) {
                        // Tone 不支持两个附点直接标记，先转换为更小时值 + 多个事件处理更合适
                        duration += '..'; // 虽不完全支持，但可保留标记
                    }
                    const noteType = noteTypeMap[note.type]

                    sequence.push({
                        type: noteType,
                        note: noteName,
                        duration,
                        time: accumulatorTime,
                    });
                    accumulatorTime += durationToBeats(duration)
                }
            }
        }
    }

    return sequence;
}

export const msPlayUtils = {
    play,
    pause,
    stop,
    resume,
    addMusicToMap,
    removeMusicFromMap,
};
