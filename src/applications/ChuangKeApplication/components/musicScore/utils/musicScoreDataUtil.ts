/*渲染 */
import {
    AccidentalEnum,
    ClefEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbol,
    MsSymbolContainer,
    MusicScore,
    SingleStaff,
    WidthConstant
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap,} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";


// 计算音符所在五线谱区域 半音偏移参考表：C = 0, C# = 1, D = 2, D# = 3, ..., B = 11
const noteToSemitone: Record<string, number> = {
    'C': 0, 'C#': 1, 'D-': 1,
    'D': 2, 'D#': 3, 'E-': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'G-': 6,
    'G': 7, 'G#': 8, 'A-': 8,
    'A': 9, 'A#': 10, 'B-': 10,
    'B': 11, 'B#': 12 // 视作 C+1
};

// 每个谱号的基准音对应的 MIDI 值和谱线位置索引
const basePositions: Record<ClefEnum, { midi: number, regionIndex: number }> = {
    [ClefEnum.treble]: {midi: 67, regionIndex: 14}, // G4 在 line_2
    [ClefEnum.alto]: {midi: 60, regionIndex: 16},   // C4 在 line_3
    [ClefEnum.bass]: {midi: 53, regionIndex: 18},   // F3 在 line_4
};
type CalculationOfStaffRegion = [{
    region: MusicScoreRegionEnum,
}] | [{
    region: MusicScoreRegionEnum,
    accidental: AccidentalEnum
}, {
    region: MusicScoreRegionEnum,
    accidental: AccidentalEnum
}]

function getEnharmonicVariants(midi: number): { key: string, accidental: AccidentalEnum, regionShift: number }[] {
    const semitone = midi % 12;
    const octave = Math.floor(midi / 12) - 1;

    const enharmonicMap: Record<number, { key: string, accidental: AccidentalEnum, regionShift: number }[]> = {
        1: [
            {key: `C#${octave}`, accidental: AccidentalEnum.sharp, regionShift: 0},
            {key: `D-${octave}`, accidental: AccidentalEnum.flat, regionShift: 1}
        ],
        3: [
            {key: `D#${octave}`, accidental: AccidentalEnum.sharp, regionShift: 0},
            {key: `E-${octave}`, accidental: AccidentalEnum.flat, regionShift: 1}
        ],
        6: [
            {key: `F#${octave}`, accidental: AccidentalEnum.sharp, regionShift: 0},
            {key: `G-${octave}`, accidental: AccidentalEnum.flat, regionShift: 1}
        ],
        8: [
            {key: `G#${octave}`, accidental: AccidentalEnum.sharp, regionShift: 0},
            {key: `A-${octave}`, accidental: AccidentalEnum.flat, regionShift: 1}
        ],
        10: [
            {key: `A#${octave}`, accidental: AccidentalEnum.sharp, regionShift: 0},
            {key: `B-${octave}`, accidental: AccidentalEnum.flat, regionShift: 1}
        ],
    };

    return enharmonicMap[semitone] ?? [];
}

function getNoteNameFromMidi(midi: number): string {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return names[midi % 12].replace('#', ''); // 去掉升降是为了 degree 计算
}

function getOctaveFromMidi(midi: number): number {
    return Math.floor(midi / 12) - 1;
}

export function calculationOfStaffRegion(
    clef: ClefEnum,
    musicalAlphabet: MusicalAlphabetEnum
): CalculationOfStaffRegion {
    // 定义五线谱的所有区域索引列表，按从下至上排列
    const regionList: MusicScoreRegionEnum[] = [
        MusicScoreRegionEnum.lower_line_6,
        MusicScoreRegionEnum.lower_space_6,
        MusicScoreRegionEnum.lower_line_5,
        MusicScoreRegionEnum.lower_space_5,
        MusicScoreRegionEnum.lower_line_4,
        MusicScoreRegionEnum.lower_space_4,
        MusicScoreRegionEnum.lower_line_3,
        MusicScoreRegionEnum.lower_space_3,
        MusicScoreRegionEnum.lower_line_2,
        MusicScoreRegionEnum.lower_space_2,
        MusicScoreRegionEnum.lower_line_1,
        MusicScoreRegionEnum.lower_space_1,
        MusicScoreRegionEnum.line_1,
        MusicScoreRegionEnum.space_1,
        MusicScoreRegionEnum.line_2,
        MusicScoreRegionEnum.space_2,
        MusicScoreRegionEnum.line_3,
        MusicScoreRegionEnum.space_3,
        MusicScoreRegionEnum.line_4,
        MusicScoreRegionEnum.space_4,
        MusicScoreRegionEnum.line_5,
        MusicScoreRegionEnum.upper_space_1,
        MusicScoreRegionEnum.upper_line_1,
        MusicScoreRegionEnum.upper_space_2,
        MusicScoreRegionEnum.upper_line_2,
        MusicScoreRegionEnum.upper_space_3,
        MusicScoreRegionEnum.upper_line_3,
        MusicScoreRegionEnum.upper_space_4,
        MusicScoreRegionEnum.upper_line_4,
        MusicScoreRegionEnum.upper_space_5,
        MusicScoreRegionEnum.upper_line_5,
        MusicScoreRegionEnum.upper_space_6,
        MusicScoreRegionEnum.upper_line_6,
        MusicScoreRegionEnum.upper_space_7,
        MusicScoreRegionEnum.upper_line_7,
        MusicScoreRegionEnum.upper_space_8,
        MusicScoreRegionEnum.upper_line_8,
    ];

    // 获取该谱号下的参考音高（MIDI）与它对应在 regionList 中的索引
    const base = basePositions[clef];
    if (!base) {
        console.error("未知谱号", clef);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    // 解析音名（形如 C#4、Eb5、A3）
    const match = musicalAlphabet.match(/^([A-G])([#-♯-]?)(\d)$/);
    if (!match) {
        console.error("音名格式错误", clef, musicalAlphabet);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    const [_, note, accidental, octaveStr] = match;

    // 组成升降音的 key，例如 "C#"、"Eb"
    const key = accidental ? `${note}${accidental}` : note;

    // 查表获取半音值（MIDI 中用于换算）
    const semitone = noteToSemitone[key];
    if (semitone === undefined) {
        console.error("未支持音名", key);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    // 获取该音符的 MIDI 值
    const octave = parseInt(octaveStr);
    const targetMidi = (octave + 1) * 12 + semitone;

    // 获取等音（例如 F# 和 Gb）
    const enharmonics = getEnharmonicVariants(targetMidi);

    // 音名映射到 diatonic degree（C=0, D=1, ..., B=6），用于五线谱位置推导
    const noteNameToDegree: Record<string, number> = {
        'C': 0,
        'D': 1,
        'E': 2,
        'F': 3,
        'G': 4,
        'A': 5,
        'B': 6,
    };

    // 获取该音符的 degree 值：每升一个八度增加 7 个 degree
    const getDegree = (noteName: string, octave: number): number => {
        return noteNameToDegree[noteName] + octave * 7;
    };

    /**
     * 将目标 MIDI 值换算为 regionList 中的索引（即 staff 位置）
     * shift 是 enharmonic shift（等音修正）
     */
    const getRegion = (midi: number, shift: number = 0) => {
        const targetMatch = musicalAlphabet.match(/^([A-G])([#b♯♭]?)(\d)$/);
        if (!targetMatch) return MusicScoreRegionEnum.line_1;

        const [, targetNote, , targetOctaveStr] = targetMatch;
        const targetOctave = parseInt(targetOctaveStr);
        const targetDegree = getDegree(targetNote, targetOctave);

        // 基准音 degree
        const baseNote = getNoteNameFromMidi(base.midi);
        const baseOctave = getOctaveFromMidi(base.midi);
        const baseDegree = getDegree(baseNote, baseOctave);

        // 目标与基准的 diatonic 音级差，用于映射到 regionList 的位置
        const degreeDiff = targetDegree - baseDegree + shift;

        // 映射到 regionList 中的索引
        const regionIndex = base.regionIndex + degreeDiff;

        return regionList[regionIndex] ?? MusicScoreRegionEnum.line_1;
    };
    if (musicalAlphabet === MusicalAlphabetEnum['B-5']) {
        console.log('chicken', targetMidi, enharmonics)
    }
    // 如果该音符有两个等音（如 F# / Gb），则分别计算其 region 和变音
    if (enharmonics.length === 2) {
        return enharmonics.map(({key, accidental, regionShift}) => {
            const region = getRegion(targetMidi, regionShift);
            return {region, accidental};
        }) as CalculationOfStaffRegion;
    }

    // 默认路径：返回主音名所处的 region
    const region = getRegion(targetMidi);
    return [{region}];
}


// --------------------------------------------------------------------------------------------------------------宽度系数
// 获取当前符号的宽度系数之和
export function getWidthConstantInMsSymbol(msSymbol: MsSymbol): WidthConstant {
    let widthConstant: WidthConstant = 0
    const information = MsSymbolInformationMap[msSymbol.type]
    if ('widthRatioConstant' in information) {
        widthConstant += information.widthRatioConstant
    }
    if (msSymbol.msSymbolArray) {
        for (let k = 0; k < msSymbol.msSymbolArray.length; k++) {
            const childMsSymbol = msSymbol.msSymbolArray[k]
            const childInformation = MsSymbolInformationMap[childMsSymbol.type]
            if ('widthRatioConstant' in childInformation) {
                widthConstant += childInformation.widthRatioConstant
            }
        }
    }
    return widthConstant
}

// 获取当前符号容器的宽度系数之和 取宽度系数最大的符号的宽度系数
export function getWidthConstantInMsSymbolContainer(msSymbolContainer: MsSymbolContainer): WidthConstant {
    let widthConstant: WidthConstant = 0

    if (msSymbolContainer.msSymbolArray) {
        for (let k = 0; k < msSymbolContainer.msSymbolArray.length; k++) {
            const curMsSymbol = msSymbolContainer.msSymbolArray[k]
            const curWidthConstant = getWidthConstantInMsSymbol(curMsSymbol)
            // 取最大值
            if (widthConstant < curWidthConstant) {
                widthConstant = curWidthConstant
            }
        }
    }
    return widthConstant
}

// 获取小节的宽度占比常数之和, 第二个参数判断是否只计算当前符号容器之前的
export function getWidthConstantInMeasure(measure: Measure, msSymbolContainer?: MsSymbolContainer | null): WidthConstant {

    let widthConstant: WidthConstant = 0
    for (let j = 0; j < measure.msSymbolContainerArray.length; j++) {
        const curMsSymbolContainer = measure.msSymbolContainerArray[j]
        if (msSymbolContainer && curMsSymbolContainer === msSymbolContainer) {
            return widthConstant
        }

        widthConstant += getWidthConstantInMsSymbolContainer(curMsSymbolContainer)
    }
    return widthConstant
}


// 获取单谱表的宽度占比常数之和, 第二个参数判断是否只计算当前符号之前的
export function getWidthConstantInSingleStaff(singleStaff: SingleStaff, msSymbolContainer?: MsSymbolContainer | null): WidthConstant {
    let preWidthConstant = 0
    for (let i = 0; i < singleStaff.measureArray.length; i++) {
        const measure = singleStaff.measureArray[i]
        preWidthConstant += getWidthConstantInMeasure(measure, msSymbolContainer)
    }
    return preWidthConstant
}

// -----------------------------------------------------------------------------------------------------------------宽度
// 获取定宽容器的宽度
export function getWidthFixedContainerWidth(msSymbolContainer: MsSymbolContainer, measureHeight: number): number {
    let width = 0
    for (let i = 0; i < msSymbolContainer.msSymbolArray.length; i++) {
        const curMsSymbol: MsSymbol = msSymbolContainer.msSymbolArray[i]
        const information = MsSymbolInformationMap[curMsSymbol.type]
        let curW = 0
        if ('aspectRatio' in information && (typeof information.aspectRatio === 'number')) {
            curW += information.aspectRatio * measureHeight
        } else if ('aspectRatio' in information && (typeof information.aspectRatio === 'object')) { // 特殊情况处理
            if (curMsSymbol.type === MsSymbolTypeEnum.keySignature) {
                curW += information.aspectRatio[curMsSymbol.keySignature] * measureHeight
            }
        } else {
            console.error('符号的svg宽高比不存在')
        }
        if (width < curW) {
            width = curW
        }

    }
    return width
}

// 获取当前小节内定宽符号容器宽度之和, 第二个参数判断是否只计算当前符号之前的
export function getWidthFixedContainerWidthSumInMeasure(measure: Measure, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbolContainer?: MsSymbolContainer): number {
    let widthSum = 0
    for (let i = 0; i < measure.msSymbolContainerArray.length; i++) {
        const curMsSymbolContainer: MsSymbolContainer = measure.msSymbolContainerArray[i]

        if (msSymbolContainer && msSymbolContainer === curMsSymbolContainer) {
            return widthSum
        }
        const containerType = curMsSymbolContainer.type
        if (filter === 'all' && [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        } else if (filter === 'front' && [MsSymbolContainerTypeEnum.frontFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        } else if (filter === 'rear' && [MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        }

    }
    return widthSum
}


// 获取单谱表内定宽容器符号宽度之和，单位px
export function getWidthFixedContainerWidthSumInSingleStaff(singleStaff: SingleStaff, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbolContainer?: MsSymbolContainer): number {
    let widthSum = 0
    singleStaff.measureArray.forEach((measure: Measure) => {
        widthSum += getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, filter, msSymbolContainer)
    })
    return widthSum
}

// 获取小节内前置定宽容器符号宽度之和
// -----------------------------------------------------------------------------------------------------------------其它
// 是否是定宽容器
export function isFixedWidthSymbolContainerMap(msSymbolType: MsSymbolTypeEnum): boolean {
    const information = MsSymbolInformationMap[msSymbolType]
    if ('containerType' in information) {
        return [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(information.containerType)
    }
    return false
}

// 整体赋值clef 初始化、数据更改时调用 会更改数据的computed属性
export function computedClef(musicScore: MusicScore): void {
    let clef: ClefEnum = ClefEnum.treble
    for (let i = 0; i < musicScore.multipleStavesArray.length; i++) {
        const muptipleStaves = musicScore.multipleStavesArray[i]
        for (let j = 0; j < muptipleStaves.singleStaffArray.length; j++) {
            const singleStaff = muptipleStaves.singleStaffArray[j]
            for (let k = 0; k < singleStaff.measureArray.length; k++) {
                const measure = singleStaff.measureArray[k]
                for (let l = 0; l < measure.msSymbolContainerArray.length; l++) {
                    const msSymbolContainer = measure.msSymbolContainerArray[l]
                    for (let t = 0; t < msSymbolContainer.msSymbolArray.length; t++) {
                        const msSymbol = msSymbolContainer.msSymbolArray[t]
                        if (msSymbol.type === MsSymbolTypeEnum.clef) {
                            clef = msSymbol.clef
                        }
                        msSymbol.computed.clef = clef
                    }
                }
            }
        }
    }
}

