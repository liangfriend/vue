declare enum ClefEnum {
    g = 'g',
    alto = 'alto',
    bass = 'bass',
    none = ''
}
declare enum KeySignatureEnum {
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    a = 'a',
    b ='b',
    none = ''
}
declare enum TimeSignatureEnum {
    '4/4' = '4/4',
    none = ''
}
declare enum MusicalAlphabetEnum {
    C1 = 'C1',
    C2 = 'C2',
    C3 = 'C3',
    C4 = 'C4',
    none = ''
}
declare enum MuseScoreRegionEnum {
    space_3 = 'space_3',
    line_4 = 'line_4',
    none = ''
    // 其他音符位置
}
//变音符
declare enum AccidentalEnum {
    flat = 'flat',  //降
    nature = 'nature',   //还原
    sharp = 'sharp',    //升
    doubleSharp = 'doubleSharp',  //重升
    doubleFlat = 'doubleFlat',   //重降
    natureSharp = 'natureSharp',   //还原升
    natureFlat = 'natureFlat',   //还原降
    none = 'none' //无
}
//时值
declare enum ChronaxieEnum {
    whole = 'whole',  //降
    half = 'half',   //还原
    quarter = 'quarter',    //升
    eighth = 'eighth',  //重升
    sixteenth = 'sixteenth',   //重降
}
type Note = {
    clef:ClefEnum, //谱号
    chronaxie:ChronaxieEnum //时值
    musicalAlphabet:MusicalAlphabetEnum //音名
    sort: number;  //这个不太对,重新思考  音符顺序。 这个应该通过算法生成。并且如果有和弦或音程，会出现多个音符sort相同的情况
    //倚音，附点，震音，强弱，临时变化音
}
//调号，拍号只能小节有，谱号是音符有（但是谱号给第一个音符加谱号，会加到前一个小节上，也可以给小节加谱号，相当于给小节的第一个音符加谱号）
type MusicScore = {

    multipleStavesArray: Array<{ //复谱表
        singleStaffArray: Array<{ //单谱表
            measureArray: Array<{ //小节表
                timeSignature: TimeSignatureEnum;  //拍号
                keySignature:KeySignatureEnum //调号
                noteArray: Array<Note>
            }>;
        }>;
    }>;
};

interface Window {
    musicScore: any;
}
