// 宽度占比常数。与MsSymbolTypeEnum组合使用
import {MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

export const widthRatioConstant = {
    [MsSymbolTypeEnum.NoteHead]: 1,             // 音符头：主要决定小节宽度
    [MsSymbolTypeEnum.NoteBar]: 0,              // 符杠（Bar）：附属于音符，宽度不单独计算
    [MsSymbolTypeEnum.NoteTail]: 0,             // 符尾（旗子）：视觉装饰，不影响布局
    [MsSymbolTypeEnum.Rest]: 0.6,               // 休止符：不如音符重要，但需占位
    [MsSymbolTypeEnum.Slur]: 0,                 // 圆滑线：跨音符装饰线，不占宽度
    [MsSymbolTypeEnum.Tie]: 0,                  // 延音线：连接两个音符，不影响宽度
    [MsSymbolTypeEnum.DurationDot]: 0.2,        // 附点：相对于音符有一点影响
    [MsSymbolTypeEnum.Accidental_double_flat]: 0.4,  // 重降
    [MsSymbolTypeEnum.Accidental_flat]: 0.3,
    [MsSymbolTypeEnum.Accidental_natural]: 0.3,
    [MsSymbolTypeEnum.Accidental_sharp]: 0.3,
    [MsSymbolTypeEnum.Accidental_double_sharp]: 0.4,
    [MsSymbolTypeEnum.Tuplet]: 0.2,             // 连音记号：占一点额外空间
    [MsSymbolTypeEnum.Volta]: 0.5,              // 反复记号小房子：需额外空间标注
    [MsSymbolTypeEnum.Clef]: 0.8,               // 谱号：段首常见，占相对宽度
    [MsSymbolTypeEnum.KeySignature]: 0.6,       // 调号：位置集中但需占空间
    [MsSymbolTypeEnum.TimeSignature]: 0.5,      // 拍号：中等占位量
};

