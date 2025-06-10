import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MsSymbolTypeEnum,
    MusicScoreShowModeEnum, MsSymbolContainerTypeEnum
} from "./musicScoreEnum.ts";


export declare interface MusicScoreOptions {
    hightlight?: Boolean;
}

export declare interface MusicScoreComputed {
    clef?: ClefEnum;
}

// 几何信息。位置信息都是相对小节的
export declare interface MeasureRelativeRect {

}

export declare interface TimeSignature {
    beat: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    chronaxie: 1 | 2 | 4 | 8 | 16,
}

export declare type BaseMsSymbol = {
    msSymbolArray?: Array<MsSymbol>
    options: MusicScoreOptions
    computed: MusicScoreComputed // 运行时通过计算得来的属性
    measureRelativeRect: MeasureRelativeRect;
}
export declare type MsSymbol = ({
    type: MsSymbolTypeEnum.noteHead,
    chronaxie: ChronaxieEnum; // 时值
    musicalAlphabet: MusicalAlphabetEnum; // 音名
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.clef | MsSymbolTypeEnum.clef_f,
    clef: ClefEnum
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.timeSignature,
    timeSignature: TimeSignature
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.keySignature,
    keySignature: KeySignatureEnum
} & BaseMsSymbol) | ({
    type: Exclude<MsSymbolTypeEnum, MsSymbolTypeEnum.noteHead | MsSymbolTypeEnum.clef |
        MsSymbolTypeEnum.timeSignature | MsSymbolTypeEnum.keySignature>,
} & BaseMsSymbol)
export declare type MsSymbolContainer = {
    msSymbolArray: Array<MsSymbol>
    type: MsSymbolContainerTypeEnum
}

export declare interface Measure {
    msSymbolContainerArray: Array<MsSymbolContainer>
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


// 宽度系数
export declare type WidthConstant = number