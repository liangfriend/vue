// 宽度占比常数。与MsSymbolTypeEnum组合使用
import {
    KeySignatureEnum, MsSymbolCategoryEnum,
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


type FixedWidthSymbolInfo = {
    containerIsFixed: true
    aspectRatio: number
    widthRatioConstant: 0 // 必须为 0
    category: MsSymbolCategoryEnum.singleMeasure
}

type VariableWidthSymbolInfo = {
    containerIsFixed: false
    aspectRatio: number
    widthRatioConstant: number // 可为任意正数
    category: MsSymbolCategoryEnum.singleMeasure
}

type MultipleMeasureSymbolInfo = {
    category: MsSymbolCategoryEnum.multipleMeasure
}

type MsSymbolInformationMap =
    | FixedWidthSymbolInfo
    | VariableWidthSymbolInfo
    | MultipleMeasureSymbolInfo
export const MsSymbolInformationMap: Record<MsSymbolTypeEnum, MsSymbolInformationMap> = {
    [MsSymbolTypeEnum.noteHead]: {
        containerIsFixed: false,
        aspectRatio: 0.2,
        widthRatioConstant: 1,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.noteBar]: {
        containerIsFixed: false,
        aspectRatio: 0.1,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.noteTail]: {
        containerIsFixed: true,
        aspectRatio: 1,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.rest]: {// 休止符：不如音符重要，但需占位
        containerIsFixed: true,
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
        containerIsFixed: true,
        aspectRatio: 1,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.accidental_double_flat]: {
        containerIsFixed: false,
        aspectRatio: 1,
        widthRatioConstant: 0.4,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.accidental_flat]: {
        containerIsFixed: false,
        aspectRatio: 1,
        widthRatioConstant: 0.4,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.accidental_natural]: {
        containerIsFixed: false,
        aspectRatio: 1,
        widthRatioConstant: 0.4,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.accidental_sharp]: {
        containerIsFixed: false,
        aspectRatio: 1,
        widthRatioConstant: 0.4,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.accidental_double_sharp]: {
        containerIsFixed: false,
        aspectRatio: 1,
        widthRatioConstant: 0.4,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.tuplet]: { // 连音记号
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.volta]: {  // 反复记号小房子
        category: MsSymbolCategoryEnum.multipleMeasure,
    },
    [MsSymbolTypeEnum.clef]: {
        containerIsFixed: true,
        aspectRatio: 0.6,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.timeSignature]: {
        containerIsFixed: true,
        aspectRatio: 0.6,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
    [MsSymbolTypeEnum.keySignature]: {
        containerIsFixed: true,
        aspectRatio: 0.6,
        widthRatioConstant: 0,
        category: MsSymbolCategoryEnum.singleMeasure,
    },
}