// 宽度占比常数。与MsSymbolTypeEnum组合使用
import {
    BarLineTypeEnum, ChronaxieEnum,
    KeySignatureEnum, MsSymbolCategoryEnum, MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";


export const KeySignatureTonicSemitones: Record<KeySignatureEnum, number> = {
    [KeySignatureEnum.Cb]: 11,  // B
    [KeySignatureEnum.Gb]: 6,   // Gb
    [KeySignatureEnum.Db]: 1,   // Db
    [KeySignatureEnum.Ab]: 8,   // Ab
    [KeySignatureEnum.Eb]: 3,   // Eb
    [KeySignatureEnum.Bb]: 10,  // Bb
    [KeySignatureEnum.F]: 5,    // F
    [KeySignatureEnum.C]: 0,    // C
    [KeySignatureEnum.G]: 7,    // G
    [KeySignatureEnum.D]: 2,    // D
    [KeySignatureEnum.A]: 9,    // A
    [KeySignatureEnum.E]: 4,    // E
    [KeySignatureEnum.B]: 11,   // B
    [KeySignatureEnum['F#']]: 6,   // F#
    [KeySignatureEnum['C#']]: 1    // C#
};


type FixedWidthSymbolInfo = { // 定宽符号没有宽度占比系数
    containerType: MsSymbolContainerTypeEnum.rearFixed | MsSymbolContainerTypeEnum.frontFixed
    aspectRatio: number | Record<string, number>// 特殊的定宽容器，宽高比有多个，取决于具体情况
    category: MsSymbolCategoryEnum.singleMeasure
    heightMultiplier: number    // 相对小节的高度倍数，用于计算高度
}


type VariableWidthSymbolInfo = {
    containerType: MsSymbolContainerTypeEnum.variable
    aspectRatio: number | Record<string, number>
    widthRatioConstant: number // 可为任意正数
    category: MsSymbolCategoryEnum.singleMeasure
    heightMultiplier: number
}
type pureFollowSymbolInfo = { // 纯粹的符号跟随类型  没有容器类型属性
    aspectRatio: number | Record<string, number>
    category: MsSymbolCategoryEnum
    widthRatioConstant: number
    heightMultiplier: number // 相对小节的高度倍数，用于计算高度
}

type MultipleMeasureSymbolInfo = {
    category: MsSymbolCategoryEnum.multipleMeasure
}

type MsSymbolInformation =
    | FixedWidthSymbolInfo
    | VariableWidthSymbolInfo
    | MultipleMeasureSymbolInfo
    | pureFollowSymbolInfo
export const MsSymbolInformationMap: Record<MsSymbolTypeEnum, MsSymbolInformation> = {
    [MsSymbolTypeEnum.noteHead]: {
        containerType: MsSymbolContainerTypeEnum.variable,
        aspectRatio: 1,
        widthRatioConstant: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 0.25,
    },
    [MsSymbolTypeEnum.noteBar]: {  // 有些纯粹的符号跟随类型是没有符号容器类型的
        aspectRatio: 0.04,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0,
        heightMultiplier: 0.75,
    },
    [MsSymbolTypeEnum.noteTail]: {
        aspectRatio: {
            [ChronaxieEnum.eighth]: 0.5,   // 7 flats
            [ChronaxieEnum.sixteenth]: 0.5,   // 6 flats

        },
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0,
        heightMultiplier: 0.5,
    },
    [MsSymbolTypeEnum.rest]: {// 休止符：不如音符重要，但需占位
        containerType: MsSymbolContainerTypeEnum.variable,
        aspectRatio: 1,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 0.25,
    },
    [MsSymbolTypeEnum.slur]: {// 圆滑线：跨音符装饰线，不占宽度
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.tie]: {// 延音线：连接两个音符，不影响宽度
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.durationDot]: {// 附点：相对于音符有一点影响
        aspectRatio: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0.5,
        heightMultiplier: 0.1,
    },
    [MsSymbolTypeEnum.accidental]: {
        aspectRatio: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0.5,
        heightMultiplier: 0.4,

    },
    [MsSymbolTypeEnum.tuplet]: { // 连音记号
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.clef]: { // 谱号
        containerType: MsSymbolContainerTypeEnum.rearFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
    [MsSymbolTypeEnum.clef_f]: { // 前置谱号
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
    [MsSymbolTypeEnum.timeSignature]: {
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
    [MsSymbolTypeEnum.keySignature]: {
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: {
            [KeySignatureEnum.Cb]: 0.4 * 7,   // 7 flats
            [KeySignatureEnum.Gb]: 0.4 * 6,   // 6 flats
            [KeySignatureEnum.Db]: 0.4 * 5,   // 5 flats
            [KeySignatureEnum.Ab]: 0.4 * 4,   // 4 flats
            [KeySignatureEnum.Eb]: 0.4 * 3,   // 3 flats
            [KeySignatureEnum.Bb]: 0.4 * 2,   // 2 flats
            [KeySignatureEnum.F]: 0.4,    // 1 flat
            [KeySignatureEnum.C]: 0.0,    // 0
            [KeySignatureEnum.G]: 0.4,    // 1 sharp
            [KeySignatureEnum.D]: 0.4 * 2,    // 2 sharps
            [KeySignatureEnum.A]: 0.4 * 3,    // 3 sharps
            [KeySignatureEnum.E]: 0.4 * 4,    // 4 sharps
            [KeySignatureEnum.B]: 0.4 * 5,    // 5 sharps
            [KeySignatureEnum['F#']]: 0.4 * 6,// 6 sharps
            [KeySignatureEnum['C#']]: 0.4 * 7 // 7 sharps
        },
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
    [MsSymbolTypeEnum.barLine]: {
        containerType: MsSymbolContainerTypeEnum.rearFixed,
        aspectRatio: {
            [BarLineTypeEnum.single]: 1 / 50,   // 7 flats
            [BarLineTypeEnum.final]: 2 / 5,   // 7 flats
            [BarLineTypeEnum.reverseFinal]: 2 / 5,   // 7 flats
            [BarLineTypeEnum.startRepeatSign]: 3 / 5,   // 7 flats
            [BarLineTypeEnum.endRepeatSign]: 3 / 5,   // 7 flats
        },
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
    [MsSymbolTypeEnum.barLine_f]: {
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: {
            [BarLineTypeEnum.single]: 1 / 400,   // 7 flats
            [BarLineTypeEnum.final]: 2 / 5,   // 7 flats
            [BarLineTypeEnum.reverseFinal]: 2 / 5,   // 7 flats
            [BarLineTypeEnum.startRepeatSign]: 3 / 5,   // 7 flats
            [BarLineTypeEnum.endRepeatSign]: 3 / 5,   // 7 flats
        },
        category: MsSymbolCategoryEnum.singleMeasure,
        heightMultiplier: 1,
    },
}