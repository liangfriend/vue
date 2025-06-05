import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MsSymbolTypeEnum,
    TimeSignatureEnum,
    MusicScoreShowModeEnum
} from "./musicScoreEnum.ts";


export declare interface musicScoreOptions {
    hightlight?: Boolean;
}

// 几何信息。位置信息都是相对小节的
export declare interface MeasureRelativeRect {

}


export declare type BaseMsSymbol = {
    msSymbolArray?: Array<MsSymbol>
    options: musicScoreOptions
    measureRelativeRect: MeasureRelativeRect;
}
export declare type MsSymbol = ({
    type: MsSymbolTypeEnum.noteHead,
    chronaxie: ChronaxieEnum; // 时值
    musicalAlphabet: MusicalAlphabetEnum; // 音名
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.clef,
    clef: ClefEnum
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.timeSignature,
    timeSignature: TimeSignatureEnum
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.keySignature,
    keySignature: KeySignatureEnum
} & BaseMsSymbol) | ({
    type: Exclude<MsSymbolTypeEnum, MsSymbolTypeEnum.noteHead | MsSymbolTypeEnum.clef |
        MsSymbolTypeEnum.timeSignature | MsSymbolTypeEnum.keySignature>,
} & BaseMsSymbol)

export declare interface Measure {
    msSymbolArray: Array<MsSymbol>
    options: musicScoreOptions
}

export declare interface SingleStaff {
    measureArray: Array<Measure>;
}

export declare interface MultipleStaves { //复谱表
    singleStaffArray: Array<SingleStaff>;
}

//调号，拍号只能小节有，谱号是音符有（但是谱号给第一个音符加谱号，会加到前一个小节上，也可以给小节加谱号，相当于给小节的第一个音符加谱号）小节也有
export declare interface MusicScore {
    multipleStavesArray: Array<MultipleStaves>;
    showMode: MusicScoreShowModeEnum
}

export declare type Px = `${number}px`
// 宽度系数
export declare type WidthConstant = number