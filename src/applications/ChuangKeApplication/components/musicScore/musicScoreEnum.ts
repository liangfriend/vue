export declare enum ClefEnum {
    g = 'g',
    alto = 'alto',
    bass = 'bass',
    none = ''
}

export declare enum KeySignatureEnum {
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    a = 'a',
    b = 'b',
    none = ''
}

export declare enum TimeSignatureEnum {
    '4/4' = '4/4',
    '3/4' = '3/4',
    none = ''
}

//音符类别
export declare enum NoteTypeEnum {
    normal = 1,
    rest = 2
}

export declare enum MusicalAlphabetEnum {
    C1 = 'C1',
    D1 = 'D1',
    E1 = 'E1',
    F1 = 'F1',
    G1 = 'G1',
    A1 = 'A1',
    B1 = 'B1',
    C2 = 'C2',
    D2 = 'D2',
    E2 = 'E2',
    F2 = 'F2',
    G2 = 'G2',
    A2 = 'A2',
    B2 = 'B2',
    C3 = 'C3',
    D3 = 'D3',
    E3 = 'E3',
    F3 = 'F3',
    G3 = 'G3',
    A3 = 'A3',
    B3 = 'B3',
    C4 = 'C4',
    D4 = 'D4',
    E4 = 'E4',
    F4 = 'F4',
    G4 = 'G4',
    A4 = 'A4',
    B4 = 'B4',
    C5 = 'C5',
    D5 = 'D5',
    E5 = 'E5',
    F5 = 'F5',
    G5 = 'G5',
    A5 = 'A5',
    B5 = 'B5',
    C6 = 'C6',
    D6 = 'D6',
    E6 = 'E6',
    F6 = 'F6',
    G6 = 'G6',
    A6 = 'A6',
    B6 = 'B6',
    none = ''
}

export declare enum MuseScoreRegionEnum {
    line_1 = 'line_1',
    space_1 = 'space_1',
    line_2 = 'line_2',
    space_2 = 'space_2',
    line_3 = 'line_3',
    space_3 = 'space_3',
    line_4 = 'line_4',
    space_4 = 'space_4',
    line_5 = 'line_5',
    upper_space_1 = 'upper_space_1',
    upper_line_1 = 'upper_line_1',
    upper_space_2 = 'upper_space_2',
    upper_line_2 = 'upper_line_2',
    upper_space_3 = 'upper_space_3',
    upper_line_3 = 'upper_line_3',
    upper_space_4 = 'upper_space_4',
    upper_line_4 = 'upper_line_4',
    upper_space_5 = 'upper_space_5',
    upper_line_5 = 'upper_line_5',
    upper_space_6 = 'upper_space_6',
    upper_line_6 = 'upper_line_6',
    none = ''
    // 其他音符位置
}

//变音符
export declare enum AccidentalEnum {
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
export declare enum ChronaxieEnum {
    whole = 1,
    half = 2,
    quarter = 4,
    eighth = 8,
    sixteenth = 16,
}