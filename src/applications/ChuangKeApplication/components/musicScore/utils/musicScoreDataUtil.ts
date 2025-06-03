/*渲染 */
import {
    ClefEnum,
    KeySignatureEnum, MsSymbolTypeEnum,
    MusicalAlphabetEnum, MusicScoreRegionEnum,
    TimeSignatureEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import type {Measure, MsSymbol, SingleStaff} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    fixedWidthSymbolContainerMap,
    widthRatioConstantMap
} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";


// 计算出音符所在间线
// export function calculateNotePosition(clef: ClefEnum, keySignature: KeySignatureEnum, musicalAlphabet: MusicalAlphabetEnum): {
//     position: MusicScoreRegionEnum;
//     accidental: string   //这个后续可能要去掉，不需要数组，确定唯一position
// }[] {
//     const map: Record<string, MusicScoreRegionEnum> = {
//         'g-c-C4': MusicScoreRegionEnum.space_3,
//         'g-c-D4': MusicScoreRegionEnum.line_4,
//         'g-c-E4': MusicScoreRegionEnum.space_4,
//         'g-c-F4': MusicScoreRegionEnum.line_5,
//         'g-c-G4': MusicScoreRegionEnum.upper_space_1,
//         'g-c-A4': MusicScoreRegionEnum.upper_line_1,
//         'g-c-B4': MusicScoreRegionEnum.upper_space_2,
//         'g-c-C5': MusicScoreRegionEnum.upper_line_2,
//         'g-c-D5': MusicScoreRegionEnum.upper_space_3,
//         'g-c-E5': MusicScoreRegionEnum.upper_line_3,
//         'g-c-F5': MusicScoreRegionEnum.upper_space_4,
//         'g-c-G5': MusicScoreRegionEnum.upper_line_4,
//         'g-c-A5': MusicScoreRegionEnum.upper_space_5,
//         'g-c-B5': MusicScoreRegionEnum.upper_line_5,
//     };
//     const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];
//
//     if (position) {
//         return [{position, accidental: ''}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
//     }
//     console.error('找不到对位置', `${clef}-${keySignature}-${musicalAlphabet}`);
//     return [{position: MusicScoreRegionEnum.space_3, accidental: ''}];
// }
// 计算出音符所在间线 ai生成算法
type BasePosition = {
    note: string;      // 其实可以限定成 'A' | 'B' | ... 但 string 更灵活
    octave: number;
    lineIndex: number; // 基于五线谱下标，如 line_1 => 0, line_2 => 1 ...
};

// 计算音符所在五线谱区域
export function calculationOfStaffRegion(
    clef: ClefEnum,
    musicalAlphabet: MusicalAlphabetEnum
): MusicScoreRegionEnum {
    const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const basePositions: Record<ClefEnum, BasePosition> = {
        [ClefEnum.treble]: {note: 'G', octave: 4, lineIndex: 2},     // G4 on line_2
        [ClefEnum.alto]: {note: 'C', octave: 4, lineIndex: 3},  // C4 on line_3
        [ClefEnum.bass]: {note: 'F', octave: 3, lineIndex: 4},  // F3 on line_4
    };

    const regionList: MusicScoreRegionEnum[] = [
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
    ];

    const base = basePositions[clef];
    if (!base) {
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1
    }
    ;
    const match = musicalAlphabet.match(/^([A-G])(\d)$/);
    if (!match) {
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1
    }

    const [_, noteLetter, octaveStr] = match;

    const octave = parseInt(octaveStr);
    const baseIndex = noteOrder.indexOf(base.note) + base.octave * 7;
    const targetIndex = noteOrder.indexOf(noteLetter) + octave * 7;

    const steps = targetIndex - baseIndex;
    const regionIndex = base.lineIndex * 2 + steps;
    if (regionList[regionIndex]) {
        return regionList[regionIndex]
    } else {
        console.log('chicken', baseIndex, targetIndex)
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1;
    }


}

// 获取当前符号在其所在小节之前的宽度系数之和, 第三个参数判断计算是否排除定宽容器
export function getPreWidthConstantForMsSymbolOnMeasure(msSymbol: MsSymbol, measure: Measure, excludeFixedWidthContainer: boolean = false) {

    let preWidthConstant = 0
    for (let j = 0; j < measure.msSymbolArray.length; j++) {
        const curMsSymbol = measure.msSymbolArray[j]
        if (excludeFixedWidthContainer && fixedWidthSymbolContainerMap[curMsSymbol.type]) continue
        if (curMsSymbol === msSymbol) {
            return preWidthConstant
        }
        if (widthRatioConstantMap[curMsSymbol.type]) {
            preWidthConstant += widthRatioConstantMap[curMsSymbol.type]
        }
        if (curMsSymbol.msSymbolArray) {
            for (let k = 0; k < curMsSymbol.msSymbolArray.length; k++) {
                const childMsSymbol = curMsSymbol.msSymbolArray[k]
                if (widthRatioConstantMap[childMsSymbol.type]) {
                    preWidthConstant += widthRatioConstantMap[childMsSymbol.type]
                }
            }
        }
    }
    return preWidthConstant
}

// 获取当前符号所在小节的宽度系数之和, 第三个参数判断计算是否排除定宽容器
export function getTotalWidthConstantOnMeasure(measure: Measure, excludeFixedWidthContainer: boolean = false) {
    let totalWidthConstant = 0
    for (let j = 0; j < measure.msSymbolArray.length; j++) {
        const msSymbol = measure.msSymbolArray[j]
        if (widthRatioConstantMap[msSymbol.type]) {
            totalWidthConstant += widthRatioConstantMap[msSymbol.type]
        }
        if (msSymbol.msSymbolArray) {
            for (let k = 0; k < msSymbol.msSymbolArray.length; k++) {
                const childMsSymbol = msSymbol.msSymbolArray[k]
                if (widthRatioConstantMap[childMsSymbol.type]) {
                    totalWidthConstant += widthRatioConstantMap[childMsSymbol.type]
                }
            }
        }
    }
    return totalWidthConstant
}

// 获取当前符号在其所在单谱表之前的宽度系数之和, 第三个参数判断计算是否排除定宽容器
export function getPreWidthConstantForMsSymbolOnSingleStaff(msSymbol: MsSymbol, singleStaff: SingleStaff, excludeFixedWidthContainer: boolean = false) {
    let preWidthConstant = 0
    for (let i = 0; i < singleStaff.measureArray.length; i++) {
        const measure = singleStaff.measureArray[i]
        preWidthConstant += getPreWidthConstantForMsSymbolOnMeasure(msSymbol, measure)
    }
    return preWidthConstant
}

export function isFixedWidthSymbolContainerMap(msSymbolType: MsSymbolTypeEnum): boolean {
    return fixedWidthSymbolContainerMap[msSymbolType] as boolean
}
