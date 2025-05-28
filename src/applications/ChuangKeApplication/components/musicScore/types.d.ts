import {
    ChronaxieEnum,
    ClefEnum, KeySignatureEnum,
    MusicalAlphabetEnum, NoteTypeEnum, TimeSignatureEnum
} from "./musicScoreEnum.ts";

export declare interface Window {
    musicScore: {
        selected: EventTarget | null
    }
}


export declare interface Note {
    clef: ClefEnum; // 谱号
    chronaxie: ChronaxieEnum; // 时值
    musicalAlphabet: MusicalAlphabetEnum; // 音名
    sort: number; // 音符顺序
    position: string    //处于五线谱的位置
    type: NoteTypeEnum
    accidental: string  //变音符号
    augmentationDot: number //附点数量
}

export declare interface Measure {
    timeSignature: TimeSignatureEnum;  //拍号
    keySignature: KeySignatureEnum //调号
    noteArray: Array<Note>
}

export declare interface SingleStaff {
    measureArray: Array<Measure>;
}

export declare interface MultipleStaves { //复谱表
    singleStaffArray: Array<SingleStaff>;
}

//调号，拍号只能小节有，谱号是音符有（但是谱号给第一个音符加谱号，会加到前一个小节上，也可以给小节加谱号，相当于给小节的第一个音符加谱号）
export declare interface MusicScore {
    multipleStavesArray: Array<MultipleStaves>;
}

