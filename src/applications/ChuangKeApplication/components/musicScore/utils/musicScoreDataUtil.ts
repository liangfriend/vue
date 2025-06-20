import {
    AccidentalEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbol,
    MsSymbolContainer, MultipleStaves,
    MusicScore,
    NoteHead,
    SingleStaff,
    WidthConstant
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap,} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";


const semitoneMap: { [key: string]: number } = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3,
    E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8,
    A: 9, 'A#': 10, Bb: 10, B: 11,
};

const reverseMap: { [key: number]: string[] } = {
    0: ['C'], 1: ['C#', 'Db'], 2: ['D'], 3: ['D#', 'Eb'], 4: ['E'],
    5: ['F'], 6: ['F#', 'Gb'], 7: ['G'], 8: ['G#', 'Ab'], 9: ['A'],
    10: ['A#', 'Bb'], 11: ['B'],
};

function getSemitoneNumber(note: string, octave: number): number {
    const semitone = semitoneMap[note];
    return (octave + 1) * 12 + semitone;
}

function findValidEnumName(semitoneNumber: number): MusicalAlphabetEnum {
    const pitchClass = semitoneNumber % 12;
    const octave = Math.floor(semitoneNumber / 12) - 1;
    const possibleNames = reverseMap[pitchClass];

    for (const name of possibleNames) {
        const fullName = `${name}${octave}`;
        if (fullName in MusicalAlphabetEnum) {
            return MusicalAlphabetEnum[fullName as keyof typeof MusicalAlphabetEnum];
        }
    }

    return MusicalAlphabetEnum.C4; // fallback
}

// 计算当前音符音名
export function getNoteMusicalAlphabet(
    msSymbol: NoteHead,
): MusicalAlphabetEnum {
    const region = msSymbol.region
    let clef: ClefEnum = ClefEnum.treble;
    if (msSymbol.computed.clef) {
        clef = msSymbol.computed.clef
    } else {
        console.warn("音符缺少计算属性clef")
    }
    let keySignature: KeySignatureEnum = KeySignatureEnum.C
    if (msSymbol.computed.keySignature) {
        keySignature = msSymbol.computed.keySignature
    } else {
        console.warn("音符缺少计算属性keySignature")
    }

    const accidental = getAccidental(msSymbol)
    const regionIndexMap: Record<MusicScoreRegionEnum, number> = {
        lower_line_6: -11, lower_space_6: -10, lower_line_5: -9, lower_space_5: -8,
        lower_line_4: -7, lower_space_4: -6, lower_line_3: -5, lower_space_3: -4,
        lower_line_2: -3, lower_space_2: -2, lower_line_1: -1, lower_space_1: 0,
        line_1: 1, space_1: 2, line_2: 3, space_2: 4, line_3: 5, space_3: 6,
        line_4: 7, space_4: 8, line_5: 9,
        upper_space_1: 10, upper_line_1: 11, upper_space_2: 12, upper_line_2: 13,
        upper_space_3: 14, upper_line_3: 15, upper_space_4: 16, upper_line_4: 17,
        upper_space_5: 18, upper_line_5: 19, upper_space_6: 20, upper_line_6: 21,
        upper_space_7: 22, upper_line_7: 23, upper_space_8: 24, upper_line_8: 25,
    };

    const naturalPitchOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    // 定义每种 clef 的参考点（该谱号的某个区域，对应的音名与八度）
    const clefBaseMap: Record<ClefEnum, { region: MusicScoreRegionEnum, note: string, octave: number }> = {
        [ClefEnum.treble]: {region: MusicScoreRegionEnum.line_2, note: 'G', octave: 4}, // G4 on line 2
        [ClefEnum.mezzoSoprano]: {region: MusicScoreRegionEnum.line_2, note: 'C', octave: 4}, // C4 on line 2
        [ClefEnum.alto]: {region: MusicScoreRegionEnum.line_3, note: 'C', octave: 4}, // C4 on line 3
        [ClefEnum.tenor]: {region: MusicScoreRegionEnum.line_4, note: 'C', octave: 4}, // C4 on line 4
        [ClefEnum.baritoneC]: {region: MusicScoreRegionEnum.line_5, note: 'C', octave: 4}, // C4 on line 5
        [ClefEnum.baritoneF]: {region: MusicScoreRegionEnum.line_3, note: 'F', octave: 3}, // F3 on line 3
        [ClefEnum.bass]: {region: MusicScoreRegionEnum.line_4, note: 'F', octave: 3}, // F3 on line 4
        [ClefEnum.subbass]: {region: MusicScoreRegionEnum.line_5, note: 'F', octave: 3}, // F3 on line 5
    };

    const base = clefBaseMap[clef ? clef : ClefEnum.treble];
    const baseRegionIndex = regionIndexMap[base.region];
    const targetRegionIndex = regionIndexMap[region];
    const relativeSteps = targetRegionIndex - baseRegionIndex;

    // 从基础音名出发，按7度自然音程移动，获得目标音名和八度
    let stepIndex = naturalPitchOrder.indexOf(base.note);
    let octave = base.octave;

    stepIndex = (stepIndex + relativeSteps) % 7;
    if (stepIndex < 0) stepIndex += 7;

    const name = naturalPitchOrder[stepIndex];
    const octaveShift = Math.floor((naturalPitchOrder.indexOf(base.note) + relativeSteps) / 7);
    octave += octaveShift;

    // 计算调号或变音对音高的影响（±semitone）
    let semitoneOffset = 0;

    if (accidental !== undefined) {
        switch (accidental) {
            case AccidentalEnum.flat:
            case AccidentalEnum.natureFlat:
                semitoneOffset = -1;
                break;
            case AccidentalEnum.sharp:
            case AccidentalEnum.natureSharp:
                semitoneOffset = 1;
                break;
            case AccidentalEnum.doubleFlat:
                semitoneOffset = -2;
                break;
            case AccidentalEnum.doubleSharp:
                semitoneOffset = 2;
                break;
            case AccidentalEnum.nature:
            default:
                semitoneOffset = 0;
                break;
        }
    } else {
        const keySignatureMap: Record<KeySignatureEnum, string[]> = {
            Cb: ['B', 'E', 'A', 'D', 'G', 'C', 'F'],
            Gb: ['B', 'E', 'A', 'D', 'G', 'C'],
            Db: ['B', 'E', 'A', 'D', 'G'],
            Ab: ['B', 'E', 'A', 'D'],
            Eb: ['B', 'E', 'A'],
            Bb: ['B', 'E'],
            F: ['B'],
            C: [],
            G: ['F'],
            D: ['F', 'C'],
            A: ['F', 'C', 'G'],
            E: ['F', 'C', 'G', 'D'],
            B: ['F', 'C', 'G', 'D', 'A'],
            'F#': ['F', 'C', 'G', 'D', 'A', 'E'],
            'C#': ['F', 'C', 'G', 'D', 'A', 'E', 'B'],
        };
        const altered = keySignatureMap[keySignature];
        if (altered.includes(name)) {
            semitoneOffset = keySignature >= KeySignatureEnum.C ? 1 : -1;
        }
    }

    const baseSemitone = getSemitoneNumber(name, octave);
    const finalSemitone = baseSemitone + semitoneOffset;

    return findValidEnumName(finalSemitone);
}

// 获取音符的变音符号
export function getAccidental(noteHead: NoteHead): AccidentalEnum | undefined {
    let accidental: AccidentalEnum | null = null
    if (!noteHead.msSymbolArray) {
        return
    }
    for (let item of noteHead.msSymbolArray) {
        if (item.type === MsSymbolTypeEnum.accidental) {
            accidental = item.accidental
            return accidental
        }
    }

    return
}

export type TraverseLevel = 'multipleStaves' | 'singleStaff' | 'measure' | 'container' | 'symbol'
export type TraverseOrder = 'asc' | 'desc'

export interface TraverseContext {
    multipleStavesIndex: number
    singleStaffIndex: number
    measureIndex: number
    msSymbolContainerIndex?: number
    msSymbolIndex?: number
    multipleStaves?: MultipleStaves
    singleStaff?: SingleStaff
    measure?: Measure
    msSymbolContainer?: MsSymbolContainer
    msSymbol?: MsSymbol
}

export type TraverseCallback = (context: TraverseContext) => boolean | void

// 循环方法
export function traverseMusicScore(
    musicScore: MusicScore,
    {
        level = 'symbol',
        order = 'asc',
        callback
    }: {
        level: TraverseLevel
        order?: TraverseOrder
        callback: TraverseCallback
    }
): void {
    const range = (length: number) => order === 'asc'
        ? [...Array(length).keys()]
        : [...Array(length).keys()].reverse()

    const multipleStavesArray = musicScore.multipleStavesArray
    for (const i of range(multipleStavesArray.length)) {
        const multipleStaves = multipleStavesArray[i]
        if (level === 'multipleStaves') {
            const stop = callback({
                multipleStavesIndex: i,
                singleStaffIndex: -1,
                measureIndex: -1,
                multipleStaves,
            })
            if (stop) return
            continue
        }

        for (const j of range(multipleStaves.singleStaffArray.length)) {
            const singleStaff = multipleStaves.singleStaffArray[j]
            if (level === 'singleStaff') {
                const stop = callback({
                    multipleStavesIndex: i,
                    singleStaffIndex: j,
                    measureIndex: -1,
                    multipleStaves,
                    singleStaff,
                })
                if (stop) return
                continue
            }

            for (const k of range(singleStaff.measureArray.length)) {
                const measure = singleStaff.measureArray[k]
                if (level === 'measure') {
                    const stop = callback({
                        multipleStavesIndex: i,
                        singleStaffIndex: j,
                        measureIndex: k,
                        multipleStaves,
                        singleStaff,
                        measure,
                    })
                    if (stop) return
                    continue
                }

                for (const l of range(measure.msSymbolContainerArray.length)) {
                    const container = measure.msSymbolContainerArray[l]
                    if (level === 'container') {
                        const stop = callback({
                            multipleStavesIndex: i,
                            singleStaffIndex: j,
                            measureIndex: k,
                            msSymbolContainerIndex: l,
                            multipleStaves,
                            singleStaff,
                            measure,
                            msSymbolContainer: container
                        })
                        if (stop) return
                        continue
                    }

                    for (const t of range(container.msSymbolArray.length)) {
                        const symbol = container.msSymbolArray[t]
                        const stop = callback({
                            multipleStavesIndex: i,
                            singleStaffIndex: j,
                            measureIndex: k,
                            msSymbolContainerIndex: l,
                            msSymbolIndex: t,
                            multipleStaves,
                            singleStaff,
                            measure,
                            msSymbolContainer: container,
                            msSymbol: symbol,
                        })
                        if (stop) return
                    }
                }
            }
        }
    }
}

// index赋值
export function getIndex(musicScore: MusicScore) {
    for (let i = 0; i < musicScore.multipleStavesArray.length; i++) {
        const muptipleStaves = musicScore.multipleStavesArray[i]
        muptipleStaves.index = {
            multipleStavesIndex: i
        }
        for (let j = 0; j < muptipleStaves.singleStaffArray.length; j++) {
            const singleStaff = muptipleStaves.singleStaffArray[j]
            singleStaff.index = {
                multipleStavesIndex: i,
                singleStaffIndex: j
            }
            for (let k = 0; k < singleStaff.measureArray.length; k++) {
                const measure = singleStaff.measureArray[k]
                measure.index = {
                    multipleStavesIndex: i,
                    singleStaffIndex: j,
                    measureIndex: k,
                }
                for (let l = 0; l < measure.msSymbolContainerArray.length; l++) {
                    const msSymbolContainer = measure.msSymbolContainerArray[l]
                    msSymbolContainer.index = {
                        multipleStavesIndex: i,
                        singleStaffIndex: j,
                        measureIndex: k,
                        msSymbolContainerIndex: l
                    }
                    for (let t = 0; t < msSymbolContainer.msSymbolArray.length; t++) {
                        msSymbolContainer
                            .index = {
                            multipleStavesIndex: i,
                            singleStaffIndex: j,
                            measureIndex: k,
                            msSymbolContainerIndex: l
                        }
                    }
                }
            }
        }
    }
}

// 计算属性赋值
export function msSymbolComputedData(musicScore: MusicScore) {
    let clef: ClefEnum = ClefEnum.treble
    let keySignature: KeySignatureEnum = KeySignatureEnum.C
    traverseMusicScore(musicScore, {
        level: 'symbol', order: 'asc', callback: ({msSymbol}) => {
            if (!msSymbol) return
            // 整体赋值clef 初始化、数据更改时调用
            if (msSymbol.type === MsSymbolTypeEnum.clef) {
                clef = msSymbol.clef
            }
            if ([MsSymbolTypeEnum.noteHead, MsSymbolTypeEnum.keySignature].includes(msSymbol.type) && 'computed' in msSymbol) {
                msSymbol.computed.clef = clef
            }
            // 整体赋值keySignature keySignature是小节上的符号
            if (msSymbol.type === MsSymbolTypeEnum.keySignature) {
                keySignature = msSymbol.keySignature
            }
            if (msSymbol.type === MsSymbolTypeEnum.noteHead && 'computed' in msSymbol) {
                msSymbol.computed.keySignature = keySignature
            }
            // 整体赋值音名 需要先计算clef
            if (msSymbol.type === MsSymbolTypeEnum.noteHead && 'computed' in msSymbol) {
                msSymbol.computed.musicalAlphabet = getNoteMusicalAlphabet(msSymbol)
            }
        }
    })
}

// 复合性aspectRatiao获取
export function getMultipleAspectRatio(msSymbol: MsSymbol): number {
    const information = MsSymbolInformationMap[msSymbol.type]
    if ('aspectRatio' in information && typeof information.aspectRatio === 'object') {
        if (msSymbol.type === MsSymbolTypeEnum.keySignature) {
            return information.aspectRatio[msSymbol.keySignature]
        } else if (msSymbol.type === MsSymbolTypeEnum.barline || msSymbol.type === MsSymbolTypeEnum.barline_f) {
            return information.aspectRatio[msSymbol.barlineType]
        }
    }
    console.error('符号有误或符号不是复合aspectRatio类型')
    return 0

}

// 通过index获取数据
export function getDataWithIndex() {

}

