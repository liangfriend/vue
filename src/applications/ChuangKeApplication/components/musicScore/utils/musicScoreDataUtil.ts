/*渲染 */
import {
    AccidentalEnum,
    ChronaxieEnum,
    ClefEnum,
    MsSymbolCategoryEnum, MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum, MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbol,
    SingleStaff,
    WidthConstant
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    MsSymbolInformationMap,
} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";


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

export function calculationOfStaffRegion(
    clef: ClefEnum,
    musicalAlphabet: MusicalAlphabetEnum
): CalculationOfStaffRegion {
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

    const base = basePositions[clef];
    if (!base) {
        console.error("未知谱号", clef);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    const match = musicalAlphabet.match(/^([A-G])([#-]?)(\d)$/);
    if (!match) {
        console.error("音名格式错误", clef, musicalAlphabet);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    const [_, note, accidental, octaveStr] = match;
    const key = accidental ? `${note}${accidental}` : note;
    const semitone = noteToSemitone[key];
    if (semitone === undefined) {
        console.error("未支持音名", key);
        return [{region: MusicScoreRegionEnum.line_1}];
    }

    const octave = parseInt(octaveStr);
    const targetMidi = (octave + 1) * 12 + semitone;
    const enharmonics = getEnharmonicVariants(targetMidi);

    const getRegion = (midi: number, shift: number = 0) => {
        const semitoneDiff = midi - base.midi;
        const degreeDiff = Math.floor(semitoneDiff / 2) + shift;
        const regionIndex = base.regionIndex + degreeDiff;
        return regionList[regionIndex] ?? MusicScoreRegionEnum.line_1;
    };

    if (enharmonics.length === 2) {
        return enharmonics.map(({key, accidental, regionShift}) => {
            const midi = targetMidi; // MIDI 不变
            const region = getRegion(midi, regionShift);
            return {region, accidental};
        }) as CalculationOfStaffRegion;
    }

    // 正常音名，无等音处理
    const region = getRegion(targetMidi);
    return [{region}];
}

// --------------------------------------------------------------------------------------------------------------宽度系数
// 获取当前符号的宽度占比常数之和之和
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

// 获取小节的宽度占比常数之和, 第二个参数判断是否只计算当前符号之前的
export function getWidthConstantInMeasure(measure: Measure, msSymbol?: MsSymbol | null): WidthConstant {

    let widthConstant: WidthConstant = 0
    for (let j = 0; j < measure.msSymbolArray.length; j++) {
        const curMsSymbol = measure.msSymbolArray[j]
        if (msSymbol && curMsSymbol === msSymbol) {
            return widthConstant
        }
        widthConstant += getWidthConstantInMsSymbol(curMsSymbol)
    }
    return widthConstant
}


// 获取单谱表的宽度占比常数之和, 第二个参数判断是否只计算当前符号之前的
export function getWidthConstantInSingleStaff(singleStaff: SingleStaff, msSymbol?: MsSymbol | null): WidthConstant {
    let preWidthConstant = 0
    for (let i = 0; i < singleStaff.measureArray.length; i++) {
        const measure = singleStaff.measureArray[i]
        preWidthConstant += getWidthConstantInMeasure(measure, msSymbol)
    }
    return preWidthConstant
}

// -----------------------------------------------------------------------------------------------------------------宽度
// 获取当前小节内定宽符号容器宽度之和,单位px, 第二个参数判断是否只计算当前符号之前的
export function getWidthFixedContainerWidthSumInMeasure(measure: Measure, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbol?: MsSymbol | null): number {
    let widthSum = 0
    for (let i = 0; i < measure.msSymbolArray.length; i++) {
        const curMsSymbol: MsSymbol = measure.msSymbolArray[i]

        if (msSymbol === curMsSymbol) {
            return widthSum
        }
        const information = MsSymbolInformationMap[curMsSymbol.type]
        if ('containerType' in information) {
            if (filter === 'all' && [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(information.containerType)) {
                widthSum += information.aspectRatio * measureHeight
            } else if (filter === 'front' && [MsSymbolContainerTypeEnum.frontFixed].includes(information.containerType)) {
                widthSum += information.aspectRatio * measureHeight
            } else if (filter === 'rear' && [MsSymbolContainerTypeEnum.rearFixed].includes(information.containerType)) {
                widthSum += information.aspectRatio * measureHeight
            }

        }
    }
    return widthSum
}

// 获取单谱表内定宽容器符号宽度之和，单位px
export function getWidthFixedContainerWidthSumInSingleStaff(singleStaff: SingleStaff, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbol?: MsSymbol | null): number {
    let widthSum = 0
    singleStaff.measureArray.forEach((measure: Measure) => {
        widthSum += getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, filter, msSymbol)
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

export function getClef(measure: Measure, singleStaff: SingleStaff, noteHead: Extract<MsSymbol, {
    type: MsSymbolTypeEnum.noteHead
}>): ClefEnum {


    let clef: ClefEnum | null = null
    // 如果音符上没有clef，就从最近的小节上找
    const measuerIndex = singleStaff.measureArray.indexOf(measure)
    let msSymbolIndex = measure.msSymbolArray.indexOf(noteHead)
    for (let i = measuerIndex; i >= 0; i--) {
        for (let j = msSymbolIndex; j >= 0; j--) {
            const curMsSymbol = singleStaff.measureArray[i].msSymbolArray[j]
            const childMsSymbolArray = singleStaff.measureArray[i].msSymbolArray[j].msSymbolArray
            if (childMsSymbolArray) {
                // 寻找最近的音符上的谱号信息
                for (let k = 0; j < childMsSymbolArray.length; j++) {
                    if (childMsSymbolArray[k].type === MsSymbolTypeEnum.clef) { // 前置谱号不会出现在跟随符号中
                        const clefSymbol = childMsSymbolArray[k] as Extract<MsSymbol, {
                            type: MsSymbolTypeEnum.clef | MsSymbolTypeEnum.clef_f
                        }>
                        clef = clefSymbol.clef
                        return clef
                    }
                }
            }
            // 寻找小节上的谱号信息
            if (curMsSymbol.type === MsSymbolTypeEnum.clef || curMsSymbol.type === MsSymbolTypeEnum.clef_f && 'clef' in curMsSymbol) {
                clef = curMsSymbol.clef
                return clef
            }
        }
        if (i > 1) {
            msSymbolIndex = singleStaff.measureArray[i - 1].msSymbolArray.length - 1
        }
    }
    console.error("缺少谱号信息，默认高音谱号")
    return ClefEnum.treble
}

// 通过js动态的获取svg的aspectRatio
// export async function getAspectRatioOfSvg(svgUrl: string): Promise<number | null> {
//     const res = await fetch(svgUrl)
//     const text = await res.text()
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(text, "image/svg+xml")
//     const svg = doc.querySelector("svg")
//     if (!svg) return null
//
//     const width = parseFloat(svg.getAttribute("width") || "")
//     const height = parseFloat(svg.getAttribute("height") || "")
//     if (!isNaN(width) && !isNaN(height) && height !== 0) {
//         return width / height
//     }
//
//     return null
// }