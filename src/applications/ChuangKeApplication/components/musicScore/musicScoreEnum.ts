export enum ClefEnum {
    g = 'g',
    alto = 'alto',
    bass = 'bass',
}

export enum KeySignatureEnum {
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    a = 'a',
    b = 'b',
}

export enum TimeSignatureEnum {
    '4/4' = '4/4',
    '3/4' = '3/4',
}

//音符类别
export enum NoteTypeEnum {
    normal = 1,
    rest = 2
}

export enum MusicalAlphabetEnum {
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

export enum MuseScoreRegionEnum {
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
    whole = 1,
    half = 2,
    quarter = 4,
    eighth = 8,
    sixteenth = 16,
}

// 符号类型
export enum MsSymbolTypeEnum {
    NoteHead, // 线谱指音符头， 简谱指音符
    NoteBar,
    NoteTail,
    Rest,
    Slur, // 圆滑线  不同音高
    Tie,  // 延音线  延音线只能连接两个音
    DurationDot, // 附点
    Accidental_double_flat,
    Accidental_flat,
    Accidental_natural,
    Accidental_sharp,
    Accidental_double_sharp,
    Tuplet, // 连音符
    Volta, // 反复小房子记号
    Clef,
    KeySignature,  //
    TimeSignature,
}

// 曲谱展示模式
export enum MusicScoreShowModeEnum {
    StandardStaff,        // 五线谱
    NumberNotation,      // 简谱（数字谱）
    DualNotation,          // 简线双谱（五线+简谱）
    RhythmNotation,      // 节奏谱（主要显示节奏）
    Tablature,                 // 简谱形式的吉他/尤克里里谱（可选）
    Percussion,               // 打击乐谱（可选）
}