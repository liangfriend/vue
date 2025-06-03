/*渲染 */
import {
    ClefEnum,
    KeySignatureEnum, MsSymbolTypeEnum,
    MusicalAlphabetEnum, MusicScoreRegionEnum,
    TimeSignatureEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";


// 计算出音符所在间线
// export function calculateNotePosition(clef: ClefEnum, keySignature: KeySignatureEnum, musicalAlphabet: MusicalAlphabetEnum): {
//     position: MusicScoreRegionEnum;
//     accidental: string   //这个后续可能要去掉，不需要数组，确定唯一position
// }[] {
//     const map: Record<string, MusicScoreRegionEnum> = {
//         'g-c-C4': MusicScoreRegionEnum.space_3,
//         'g-c-D4': MusicScoreRegionEnum.line_4,
//         'g-c-E4': MusicScoreRegionEnum.space_4,
//         'g-c-F4': MusicScoreRegionEnum.line_5,
//         'g-c-G4': MusicScoreRegionEnum.upper_space_1,
//         'g-c-A4': MusicScoreRegionEnum.upper_line_1,
//         'g-c-B4': MusicScoreRegionEnum.upper_space_2,
//         'g-c-C5': MusicScoreRegionEnum.upper_line_2,
//         'g-c-D5': MusicScoreRegionEnum.upper_space_3,
//         'g-c-E5': MusicScoreRegionEnum.upper_line_3,
//         'g-c-F5': MusicScoreRegionEnum.upper_space_4,
//         'g-c-G5': MusicScoreRegionEnum.upper_line_4,
//         'g-c-A5': MusicScoreRegionEnum.upper_space_5,
//         'g-c-B5': MusicScoreRegionEnum.upper_line_5,
//     };
//     const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];
//
//     if (position) {
//         return [{position, accidental: ''}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
//     }
//     console.error('找不到对位置', `${clef}-${keySignature}-${musicalAlphabet}`);
//     return [{position: MusicScoreRegionEnum.space_3, accidental: ''}];
// }
// 计算出音符所在间线 ai生成算法
type BasePosition = {
    note: string;      // 其实可以限定成 'A' | 'B' | ... 但 string 更灵活
    octave: number;
    lineIndex: number; // 基于五线谱下标，如 line_1 => 0, line_2 => 1 ...
};

// 计算音符所在五线谱区域
export function calculationOfStaffRegion(
    clef: ClefEnum,
    musicalAlphabet: MusicalAlphabetEnum
): MusicScoreRegionEnum {
    const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const basePositions: Record<ClefEnum, BasePosition> = {
        [ClefEnum.treble]: {note: 'G', octave: 4, lineIndex: 2},     // G4 on line_2
        [ClefEnum.alto]: {note: 'C', octave: 4, lineIndex: 3},  // C4 on line_3
        [ClefEnum.bass]: {note: 'F', octave: 3, lineIndex: 4},  // F3 on line_4
    };

    const regionList: MusicScoreRegionEnum[] = [
        MusicScoreRegionEnum.line_1,
        MusicScoreRegionEnum.space_1,
        MusicScoreRegionEnum.line_2,
        MusicScoreRegionEnum.space_2,
        MusicScoreRegionEnum.line_3,
        MusicScoreRegionEnum.space_3,
        MusicScoreRegionEnum.line_4,
        MusicScoreRegionEnum.space_4,
        MusicScoreRegionEnum.line_5,
        MusicScoreRegionEnum.upper_space_1,
        MusicScoreRegionEnum.upper_line_1,
        MusicScoreRegionEnum.upper_space_2,
        MusicScoreRegionEnum.upper_line_2,
        MusicScoreRegionEnum.upper_space_3,
        MusicScoreRegionEnum.upper_line_3,
        MusicScoreRegionEnum.upper_space_4,
        MusicScoreRegionEnum.upper_line_4,
        MusicScoreRegionEnum.upper_space_5,
        MusicScoreRegionEnum.upper_line_5,
        MusicScoreRegionEnum.upper_space_6,
        MusicScoreRegionEnum.upper_line_6,
    ];

    const base = basePositions[clef];
    if (!base) {
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1
    }
    ;
    console.log('chicken', musicalAlphabet)
    const match = musicalAlphabet.match(/^([A-G])(\d)$/);
    if (!match) {
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1
    }

    const [_, noteLetter, octaveStr] = match;
    const octave = parseInt(octaveStr);
    const baseIndex = noteOrder.indexOf(base.note) + base.octave * 7;
    const targetIndex = noteOrder.indexOf(noteLetter) + octave * 7;

    const steps = targetIndex - baseIndex;
    const regionIndex = base.lineIndex * 2 + steps;
    if (regionList[regionIndex]) {
        return regionList[regionIndex]
    } else {
        console.error("线谱区域识别错误", clef, musicalAlphabet)
        return MusicScoreRegionEnum.line_1;
    }


}





