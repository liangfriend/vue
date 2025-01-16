declare enum ClefEnum {
    g = 'g',
    alto = 'alto',
    bass = 'bass'
}
declare enum KeySignatureEnum {
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    a = 'a',
    b ='b'
}
declare enum MusicalAlphabetEnum {
    C4 = 'C4'
}
declare enum MuseScoreRegionEnum {
    space_3 = 'space_3',
    line_4 = 'line_4',
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