import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MsSymbolTypeEnum,
    MusicScoreShowModeEnum, MsSymbolContainerTypeEnum, AccidentalEnum, MusicScoreRegionEnum, BarlineTypeEnum
} from "./musicScoreEnum.ts";


export declare interface MusicScoreOptions {
    hightlight?: Boolean;
}

export declare interface MusicScoreComputed {  // 运行时通过计算得来的属性
    clef?: ClefEnum;
    musicalAlphabet?: MusicalAlphabetEnum;
}


export declare interface TimeSignature {
    beat: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    chronaxie: 1 | 2 | 4 | 8 | 16,
}

export declare type BaseMsSymbol = {
    msSymbolArray?: Array<MsSymbol>
    options: MusicScoreOptions
}
export declare type NoteHead = ({
    type: MsSymbolTypeEnum.noteHead,
    region: MusicScoreRegionEnum   // 五线谱区域
    chronaxie: ChronaxieEnum; // 时值
    computed: {
        clef?: ClefEnum;  // 谱号
        keySignature?: KeySignatureEnum; // 调号
        musicalAlphabet?: MusicalAlphabetEnum; // 音名
    }
} & BaseMsSymbol)
export declare type MsSymbol = NoteHead | ({
    type: MsSymbolTypeEnum.clef | MsSymbolTypeEnum.clef_f,
    clef: ClefEnum
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.timeSignature,
    timeSignature: TimeSignature
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.keySignature,
    keySignature: KeySignatureEnum,
    computed: {
        clef?: ClefEnum;  // 谱号
    }
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.accidental,
    accidental: AccidentalEnum,
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f,
    barlineType: BarlineTypeEnum,
} & BaseMsSymbol) | ({
    type: Exclude<MsSymbolTypeEnum, MsSymbolTypeEnum.noteHead | MsSymbolTypeEnum.clef |
        MsSymbolTypeEnum.timeSignature | MsSymbolTypeEnum.keySignature | MsSymbolTypeEnum.accidental | MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f>,
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
    title?: string;
    multipleStavesArray: Array<MultipleStaves>;
    showMode: MusicScoreShowModeEnum
}


// 宽度系数
export declare type WidthConstant = number