/*渲染 */
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
    MsSymbolContainer,
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
                        if ([MsSymbolTypeEnum.noteHead, MsSymbolTypeEnum.keySignature].includes(msSymbol.type) && 'computed' in msSymbol) {
                            msSymbol.computed.clef = clef
                        }

                    }
                }
            }
        }
    }
}

// 整体赋值keySignature keySignature是小节上的符号
export function computedKeySignature(musicScore: MusicScore): void {
    let keySignature: KeySignatureEnum = KeySignatureEnum.C
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
                        if (msSymbol.type === MsSymbolTypeEnum.keySignature) {
                            keySignature = msSymbol.keySignature
                        }
                        if (msSymbol.type === MsSymbolTypeEnum.noteHead) {
                            msSymbol.computed.keySignature = keySignature
                        }
                    }
                }
            }
        }
    }
}


// 整体赋值音名 需要先计算clef
export function computedMusicalAlphabet(musicScore: MusicScore) {
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

                        if (msSymbol && msSymbol.type === MsSymbolTypeEnum.noteHead && 'computed' in msSymbol) {
                            msSymbol.computed.musicalAlphabet = getNoteMusicalAlphabet(msSymbol)
                        }

                    }
                }
            }
        }
    }

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

//---------------------------------------------------------------------------------------------宽度系数
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
            } else if (curMsSymbol.type === MsSymbolTypeEnum.barline || curMsSymbol.type === MsSymbolTypeEnum.barline_f) {
                curW += information.aspectRatio[curMsSymbol.barlineType] * measureHeight
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

// -----------------------------------------------------------------------------------------------------------------底部距离计算
// 获取小节内最高的单小节符号bottom + 符号高度
export function getMaxBottomPlusMsSymbolHeightInMeasure(measure: Measure) {
    let maxBottom = 0

}

// 获取小节表内最低的单小节符号bottom
export function getMinBottomInSingleStaff() {

}

// 获取单谱表内最高的单小节符号bottom + 符号高度
export function getMaxBottomPlusMsSymbolHeightInMeasure(measure: Measure) {
    let maxBottom = 0

}

// 获取单谱表内最低的单小节符号bottom
export function getMinBottomInSingleStaff() {

}

