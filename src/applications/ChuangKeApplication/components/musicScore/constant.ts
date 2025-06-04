// 宽度占比常数。与MsSymbolTypeEnum组合使用
import {
    KeySignatureEnum,
    MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

// 符号宽度系数映射
export const widthRatioConstantMap = {
    [MsSymbolTypeEnum.noteHead]: 1,             // 音符头：主要决定小节宽度
    [MsSymbolTypeEnum.noteBar]: 0,              // 符杠（Bar）：附属于音符，宽度不单独计算
    [MsSymbolTypeEnum.noteTail]: 0,             // 符尾（旗子）：视觉装饰，不影响布局
    [MsSymbolTypeEnum.rest]: 0.6,               // 休止符：不如音符重要，但需占位
    [MsSymbolTypeEnum.slur]: 0,                 // 圆滑线：跨音符装饰线，不占宽度
    [MsSymbolTypeEnum.tie]: 0,                  // 延音线：连接两个音符，不影响宽度
    [MsSymbolTypeEnum.durationDot]: 0.2,        // 附点：相对于音符有一点影响
    [MsSymbolTypeEnum.accidental_double_flat]: 0.4,  // 重降
    [MsSymbolTypeEnum.accidental_flat]: 0.3,
    [MsSymbolTypeEnum.accidental_natural]: 0.3,
    [MsSymbolTypeEnum.accidental_sharp]: 0.3,
    [MsSymbolTypeEnum.accidental_double_sharp]: 0.4,
    [MsSymbolTypeEnum.tuplet]: 0.2,             // 连音记号：占一点额外空间
    [MsSymbolTypeEnum.volta]: 0.5,              // 反复记号小房子：需额外空间标注
    [MsSymbolTypeEnum.clef]: 0.8,               // 谱号：段首常见，占相对宽度
    [MsSymbolTypeEnum.keySignature]: 0.6,       // 调号：位置集中但需占空间
    [MsSymbolTypeEnum.timeSignature]: 0.5,      // 拍号：中等占位量
}

// 定宽符号容器映射
export const fixedWidthSymbolContainerMap: Record<MsSymbolTypeEnum, boolean> = {
    [MsSymbolTypeEnum.clef]: true,
    [MsSymbolTypeEnum.keySignature]: true,
    [MsSymbolTypeEnum.timeSignature]: true,
    [MsSymbolTypeEnum.noteHead]: true,
    [MsSymbolTypeEnum.noteBar]: true,
    [MsSymbolTypeEnum.noteTail]: true,
    [MsSymbolTypeEnum.rest]: true,
    [MsSymbolTypeEnum.slur]: true,
    [MsSymbolTypeEnum.tie]: true,
    [MsSymbolTypeEnum.durationDot]: true,
    [MsSymbolTypeEnum.accidental_double_flat]: true,
    [MsSymbolTypeEnum.accidental_flat]: true,
    [MsSymbolTypeEnum.accidental_natural]: true,
    [MsSymbolTypeEnum.accidental_sharp]: true,
    [MsSymbolTypeEnum.accidental_double_sharp]: true,
    [MsSymbolTypeEnum.tuplet]: true,
    [MsSymbolTypeEnum.volta]: true,


    // ,
    // ,  // 延音线  延音线只能连接两个音
    // , // 附点
    // ,
    // ,
    // ,
    // ,
    // ,
    // , // 连音符
    // , // 反复小房子记号
    // ,
    // ,  //
    // ,
}

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