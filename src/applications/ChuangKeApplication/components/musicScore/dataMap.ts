//音名的分组方法没有统一，这里为了方便，与tone.js命名一致（C4为中央c)
//音名 不用于赋值，只用于计算  这是钢琴键是固定的一一对应的音名，不是五线谱上的音符
//这里的东西都应该迁移到musicScoreEnum中去
const musicalAlphabetMap = {
    'C1': 103,
    'C#1': 104,
    'Db1': 104,  // C#3 和 Db3 是同一个音
    'D1': 105,
    'D#1': 106,
    'Eb1': 106,  // D#3 和 Eb3 是同一个音
    'E1': 107,
    'F1': 108,
    'F#1': 109,
    'Gb1': 109,  // F#3 和 Gb3 是同一个音
    'G1': 110,
    'G#1': 111,
    'Ab1': 111,  // G#3 和 Ab3 是同一个音
    'A1': 112,
    'A#1': 113,
    'Bb1': 113,  // A#3 和 Bb3 是同一个音
    'B1': 114,

    'C2': 115,
    'C#2': 116,
    'Db2': 116,  // C#4 和 Db4 是同一个音
    'D2': 117,
    'D#2': 118,
    'Eb2': 118,  // D#4 和 Eb4 是同一个音
    'E2': 119,
    'F2': 120,
    'F#2': 121,
    'Gb2': 121,  // F#4 和 Gb4 是同一个音
    'G2': 122,
    'G#2': 123,
    'Ab2': 123,  // G#4 和 Ab4 是同一个音
    'A2': 124,
    'A#2': 125,
    'Bb2': 125,  // A#4 和 Bb4 是同一个音
    'B2': 126,

    'C3': 127,
    'C#3': 128,
    'Db3': 128,  // C#5 和 Db5 是同一个音
    'D3': 129,
    'D#3': 130,
    'Eb3': 130,  // D#5 和 Eb5 是同一个音
    'E3': 131,
    'F3': 132,
    'F#3': 133,
    'Gb3': 133,  // F#5 和 Gb5 是同一个音
    'G3': 134,
    'G#3': 135,
    'Ab3': 135,  // G#5 和 Ab5 是同一个音
    'A3': 136,
    'A#3': 137,
    'Bb3': 137,  // A#5 和 Bb5 是同一个音
    'B3': 138,

    'C4': 139,
    'C#4': 140,
    'Db4': 140,  // C#6 和 Db6 是同一个音
    'D4': 141,
    'D#4': 142,
    'Eb4': 142,  // D#6 和 Eb6 是同一个音
    'E4': 143,
    'F4': 144,
    'F#4': 145,
    'Gb4': 145,  // F#6 和 Gb6 是同一个音
    'G4': 146,
    'G#4': 147,
    'Ab4': 147,  // G#6 和 Ab6 是同一个音
    'A4': 148,
    'A#4': 149,
    'Bb4': 149,  // A#6 和 Bb6 是同一个音
    'B4': 150,

    'C5': 151,
    'C#5': 152,
    'Db5': 152,  // C#7 和 Db7 是同一个音
    'D5': 153,
    'D#5': 154,
    'Eb5': 154,  // D#7 和 Eb7 是同一个音
    'E5': 155,
    'F5': 156,
    'F#5': 157,
    'Gb5': 157,  // F#7 和 Gb7 是同一个音
    'G5': 158,
    'G#5': 159,
    'Ab5': 159,  // G#7 和 Ab7 是同一个音
    'A5': 160,
    'A#5': 161,
    'Bb5': 161,  // A#7 和 Bb7 是同一个音
    'B5': 162,
};
//谱号   用于计算，不用于赋值
const clefMap = {
    'g': 10,
    'alto': 11,
    'bass': 12,
};
//调号  用于计算，不用于赋值
const keySignatureMap = {
    'c': 10,
    'd': 11,
    'e': 12,
    'f': 13,
    'g': 14,
    'a': 15,
    'b': 16
};
//时值  用于计算，不用于赋值
const chronaxieMap = {
    'whole': 2048,
    'half': 1024,
    'quarter': 512,
    'eighth': 256,
    'sixth': 128
};
//时值
const Chronaxie = {
    WHOLE: 'whole',
    HALF: 'half',
    QUARTER: 'quarter',
    EIGHTH: 'eighth',
    SIXTH: 'sixth'
};
//五线谱区域    用于计算，不用于赋值
const musicScoreRegion = {
    'lower_clef_line_1': 0,
    'lower_clef_space_1': 1,
    'line_1': 2,
    'space_1': 3,
    'line_2': 4,
    'space_2': 5,
    'line_3': 6,
    'space_3': 7,
    'line_4': 8,
    'space_4': 9,
    'line_5': 10,
    'upper_space_1': 11,
    'upper_line_1': 12,
    'upper_space_2': 13,
    'upper_line_2': 14,
    'upper_space_3': 15,
    'upper_line_3': 16,
    'upper_space_4': 17,
};
export {musicalAlphabetMap, clefMap, keySignatureMap, chronaxieMap, Chronaxie, musicScoreRegion};