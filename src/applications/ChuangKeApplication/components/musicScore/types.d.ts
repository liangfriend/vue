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
    SpanSymbolFollowingCategoryEnum, SpanSymbolTypeEnum, MsTypeNameEnum, OrderTypeEnum, MsMode, ReserveMsSymbolType
} from "./musicScoreEnum.ts";
import {Ref} from "vue";


export declare interface MusicScoreOptions {
    hightlight: Boolean;
    hightlightColor: string;
    color: string;
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

export declare type MusicScoreIndex = {
    multipleStavesIndex?: number,
    singleStaffIndex?: number,
    measureIndex?: number,
    msSymbolContainerIndex?: number,
    msSymbolIndex?: number,
}
export declare type BaseMsSymbol = {
    msSymbolArray: Array<MsSymbol>
    options: MusicScoreOptions
    id: number,
    msTypeName: MsTypeNameEnum.MsSymbol,
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    index: MusicScoreIndex
}
export declare type NoteHead = ({
    type: MsSymbolTypeEnum.noteHead,
    region: MusicScoreRegionEnum   // 五线谱区域
    chronaxie: ChronaxieEnum; // 时值
    computed: { // TODO 这里可能要废弃，只是播放用的话，不需要放在这
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
    type: MsSymbolTypeEnum.noteTail,
    chronaxie: ChronaxieEnum,
} & BaseMsSymbol) | ({
    type: MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f,
    barlineType: BarlineTypeEnum,
} & BaseMsSymbol) | Barline | ({
    type: Exclude<MsSymbolTypeEnum, MsSymbolTypeEnum.noteHead | MsSymbolTypeEnum.clef |
        MsSymbolTypeEnum.timeSignature | MsSymbolTypeEnum.noteTail | MsSymbolTypeEnum.keySignature | MsSymbolTypeEnum.accidental | MsSymbolTypeEnum.barline | MsSymbolTypeEnum.barline_f>,
} & BaseMsSymbol)

export declare type BaseSpanSymbol = {
    id: number,
    msTypeName: MsTypeNameEnum.SpanSymbol,
    rect: Rect
}
// 跨小节符号.  目前只有小节跟随型和符号（音符头）跟随型
export declare type SpanSymbol = (BaseSpanSymbol & {
    type: SpanSymbolTypeEnum
    spanSymbolFollowingCategoryEnum: SpanSymbolFollowingCategoryEnum.measure,
    startTargetId: number,
    endTargetId: number,
    options: MusicScoreOptions,
    vueKey: number,
})
export declare type MsSymbolContainer = {
    id: number,
    msSymbolArray: Array<MsSymbol>
    type: MsSymbolContainerTypeEnum,
    index: Omit<MusicScoreIndex, 'msSymbolIndex'>
    options: MusicScoreOptions
    msTypeName: MsTypeNameEnum.MsSymbolContainer,
}

export declare interface Measure {
    id: number,
    msSymbolContainerArray: Array<MsSymbolContainer>
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    msTypeName: MsTypeNameEnum.Measure,
    index: Omit<MusicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex'>,
    options: MusicScoreOptions,
}

export declare interface SingleStaff {
    id: number,
    measureArray: Array<Measure>;
    singleStaffPaddingTop: number,
    singleStaffPaddingBottom: number,
    singleStaffMarginBottom: number,
    bindingStartId: Array<number>,
    bindingEndId: Array<number>,
    msTypeName: MsTypeNameEnum.SingleStaff,
    index: Omit<MusicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex' | 'measureIndex'>,
    options: MusicScoreOptions

}

export declare interface MultipleStaves { //复谱表
    id: number,
    singleStaffArray: Array<SingleStaff>;
    multipleStavesPaddingTop: number,
    multipleStavesPaddingBottom: number,
    multipleStavesMarginBottom: number,
    msTypeName: MsTypeNameEnum.MultipStaves,
    index: Omit<MusicScoreIndex, 'msSymbolIndex' | 'msSymbolContainerIndex' | 'measureIndex' | 'singleStaffIndex'>,
    options: MusicScoreOptions

}

export type MsType = MultipleStaves | SingleStaff | Measure | MsSymbolContainer | SpanSymbol | MsSymbol

//调号，拍号只能小节有，谱号是音符有（但是谱号给第一个音符加谱号，会加到前一个小节上，也可以给小节加谱号，相当于给小节的第一个音符加谱号）小节也有
export declare interface MusicScore {
    title?: string;
    multipleStavesArray: Array<MultipleStaves>;
    measureHeight: number,
    showMode: MusicScoreShowModeEnum
    spanSymbolArray: Array<SpanSymbol>,
    widthDynamicRatio: number, //动态宽度部分占比
}


// 宽度系数
export declare type WidthConstant = number

// 通过索引获取的数据类型

export declare type IndexData = {
    multipleStaves: MultipleStaves | null,
    singleStaff: SingleStaff | null,
    measure: Measure | null,
    msSymbolContainer: MsSymbolContainer | null,
    msSymbol: MsSymbol | null,
}


declare interface MouseDownData {
    msData: MsType,
    orderType: OrderTypeEnum
}

declare type ReserveMsSymbolMapType = Map<ReserveMsSymbolType, MsType>
declare interface MusicScoreRef {
    changeMode: (mode: MsMode) => void,
    root: Ref<HTMLElement>,
    mode: Ref<MsMode>,
    currentSelected: Ref<MsType | null>,
    setReserveMsSymbol: (key: ReserveMsSymbolType, msData: MsType) => void,
    getReserveMsSymbol: (key: ReserveMsSymbolType) => MsType | null,
    cancelSelect: () => void,
    reserveMsSymbolMap: Ref<ReserveMsSymbolMapType>,
}

// 点击事件处理
declare interface MouseDownInject {
    msSymbolMouseDown: (e: MouseEvent, data: MouseDownData) => void
    measureMouseDown: (e: MouseEvent, data: MouseDownData) => void
    singleStaffMouseDown: (e: MouseEvent, data: MouseDownData) => void
    multipleStavesMouseDown: (e: MouseEvent, data: MouseDownData) => void

}

// 五线谱状态
declare interface MsState {
    mode: Ref<MsMode>,
    currentSelected: Ref<MsType | null>,
    msDataMap: Ref<Map<number, MsType>>,
    reserveMsSymbolMap: Ref<ReserveMsSymbolMapType>,
}

// 虚拟符号容器类型
declare type VirtualSymbolContainerType = 'front' | 'middle' | 'end' | 'self'

