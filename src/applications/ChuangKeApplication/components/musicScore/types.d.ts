import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MsSymbolTypeEnum,
    MusicScoreShowModeEnum,
    MsSymbolContainerTypeEnum,
    AccidentalEnum,
    MusicScoreRegionEnum,
    BarlineTypeEnum,
    SpanSymbolFollowingCategoryEnum, SpanSymbolTypeEnum
} from "./musicScoreEnum.ts";


export declare interface MusicScoreOptions {
    hightlight?: Boolean;
}


export declare interface TimeSignature {
    beat: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    chronaxie: 1 | 2 | 4 | 8 | 16,
}

export declare interface Rect {
    width?: number;
    height?: number;
    left?: number;
    bottom?: number;
}

export declare type musicScoreIndex = {
    multipleStavesIndex?: number,
    singleStaffIndex?: number,
    measureIndex?: number,
    msSymbolContainerIndex?: number,
    msSymbolIndex?: number,
}
export declare type BaseMsSymbol = {
    msSymbolArray?: Array<MsSymbol>
    options: MusicScoreOptions
    id: number,
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    index: musicScoreIndex
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
export declare type Barline = ({
    type: MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f,
    barlineType: Exclude<BarlineTypeEnum, BarlineTypeEnum.endRepeatSign | BarlineTypeEnum.startRepeatSign>,
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f,
    barlineType: BarlineTypeEnum.endRepeatSign | BarlineTypeEnum.startRepeatSign,
    loopCount: number
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
} & BaseMsSymbol) | Barline | ({
    type: Exclude<MsSymbolTypeEnum, MsSymbolTypeEnum.noteHead | MsSymbolTypeEnum.clef |
        MsSymbolTypeEnum.timeSignature | MsSymbolTypeEnum.keySignature | MsSymbolTypeEnum.accidental | MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f>,
} & BaseMsSymbol)

export declare type BaseSpanSymbol = {
    id: number,
    width: number,
    bottom: number,
    rect: {}
}
// 跨小节符号.  目前只有小节跟随型和符号（音符头）跟随型
export declare type SpanSymbol = (BaseSpanSymbol & {
    type: SpanSymbolTypeEnum
    spanSymbolFollowingCategoryEnum: SpanSymbolFollowingCategoryEnum.measure,
    startTargetId: number
    endTargetId: number,
    rect: Rect,
})
export declare type MsSymbolContainer = {
    msSymbolArray: Array<MsSymbol>
    type: MsSymbolContainerTypeEnum,
    index: Omit<musicScoreIndex, 'msSymbolIndex'>
}

export declare interface Measure {
    id: number,
    msSymbolContainerArray: Array<MsSymbolContainer>
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    index: Omit<musicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex'>
}

export declare interface SingleStaff {
    id: number,
    measureArray: Array<Measure>;
    singleStaffPaddingTop: number,
    singleStaffPaddingBottom: number,
    singleStaffMarginBottom: number,
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    index: Omit<musicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex' | 'measureIndex'>

}

export declare interface MultipleStaves { //复谱表
    id: number,
    singleStaffArray: Array<SingleStaff>;
    multipleStavesPaddingTop: number,
    multipleStavesPaddingBottom: number,
    multipleStavesMarginBottom: number,
    index: Omit<musicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex' | 'measureIndex' | 'singleStaffIndex'>

}

//调号，拍号只能小节有，谱号是音符有（但是谱号给第一个音符加谱号，会加到前一个小节上，也可以给小节加谱号，相当于给小节的第一个音符加谱号）小节也有
export declare interface MusicScore {
    title?: string;
    multipleStavesArray: Array<MultipleStaves>;
    measureHeight: number,
    showMode: MusicScoreShowModeEnum
    spanSymbolArray: Array<SpanSymbol>,
}


// 宽度系数
export declare type WidthConstant = number