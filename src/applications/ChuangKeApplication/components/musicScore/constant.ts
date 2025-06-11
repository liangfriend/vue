// 宽度占比常数。与MsSymbolTypeEnum组合使用
import {
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
    aspectRatio: number
    category: MsSymbolCategoryEnum.singleMeasure
} | { // 特殊的定宽容器，宽高比有多个，取决于具体情况
    containerType: MsSymbolContainerTypeEnum.rearFixed | MsSymbolContainerTypeEnum.frontFixed
    aspectRatio: Record<string, number>
    category: MsSymbolCategoryEnum.singleMeasure
}


type VariableWidthSymbolInfo = {
    containerType: MsSymbolContainerTypeEnum.variable
    aspectRatio: number
    widthRatioConstant: number // 可为任意正数
    category: MsSymbolCategoryEnum.singleMeasure
}
type pureFollowSymbolInfo = { // 纯粹的符号跟随类型  没有容器类型属性
    aspectRatio: number
    category: MsSymbolCategoryEnum
    widthRatioConstant: number
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
    },
    [MsSymbolTypeEnum.noteBar]: {  // 有些纯粹的符号跟随类型是没有符号容器类型的
        aspectRatio: 0.08,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0
    },
    [MsSymbolTypeEnum.noteTail]: {
        aspectRatio: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0
    },
    [MsSymbolTypeEnum.rest]: {// 休止符：不如音符重要，但需占位
        containerType: MsSymbolContainerTypeEnum.variable,
        aspectRatio: 1,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
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
        widthRatioConstant: 0.5
    },
    [MsSymbolTypeEnum.accidental]: {
        aspectRatio: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
        widthRatioConstant: 0.5

    },
    [MsSymbolTypeEnum.tuplet]: { // 连音记号
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.volta]: {  // 反复记号小房子
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.clef]: { // 谱号
        containerType: MsSymbolContainerTypeEnum.rearFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.clef_f]: { // 前置谱号
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.timeSignature]: {
        containerType: MsSymbolContainerTypeEnum.frontFixed,
        aspectRatio: 0.6,
        category: MsSymbolCategoryEnum.singleMeasure,
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
    },
}