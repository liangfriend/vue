export enum ClefEnum {
    g = 'g',
    alto = 'alto',
    bass = 'bass',
    none = ''
}
export enum KeySignatureEnum {
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    a = 'a',
    b ='b',
    none = ''
}
export enum TimeSignatureEnum {
    '4/4' = '4/4',
    none = ''
}
export enum MusicalAlphabetEnum {
    C1 = 'C1',
    C2 = 'C2',
    C3 = 'C3',
    C4 = 'C4',
    none = ''
}
export enum MuseScoreRegionEnum {
    space_3 = 'space_3',
    line_4 = 'line_4',
    none = ''
    // 其他音符位置
}
//变音符
export enum AccidentalEnum {
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
export enum ChronaxieEnum {
    whole = 'whole',  //降
    half = 'half',   //还原
    quarter = 'quarter',    //升
    eighth = 'eighth',  //重升
    sixteenth = 'sixteenth',   //重降
}