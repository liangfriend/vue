/*渲染 */
import {
    ClefEnum,
    KeySignatureEnum, MsSymbolTypeEnum,
    MuseScoreRegionEnum,
    MusicalAlphabetEnum,
    TimeSignatureEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import type {
    Measure,
    MsSymbol,
    MultipleStaves,
    MusicScore,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";

// 计算出音符所在间线
// export function calculateNotePosition(clef: ClefEnum, keySignature: KeySignatureEnum, musicalAlphabet: MusicalAlphabetEnum): {
//     position: MuseScoreRegionEnum;
//     accidental: string   //这个后续可能要去掉，不需要数组，确定唯一position
// }[] {
//     const map: Record<string, MuseScoreRegionEnum> = {
//         'g-c-C4': MuseScoreRegionEnum.space_3,
//         'g-c-D4': MuseScoreRegionEnum.line_4,
//         'g-c-E4': MuseScoreRegionEnum.space_4,
//         'g-c-F4': MuseScoreRegionEnum.line_5,
//         'g-c-G4': MuseScoreRegionEnum.upper_space_1,
//         'g-c-A4': MuseScoreRegionEnum.upper_line_1,
//         'g-c-B4': MuseScoreRegionEnum.upper_space_2,
//         'g-c-C5': MuseScoreRegionEnum.upper_line_2,
//         'g-c-D5': MuseScoreRegionEnum.upper_space_3,
//         'g-c-E5': MuseScoreRegionEnum.upper_line_3,
//         'g-c-F5': MuseScoreRegionEnum.upper_space_4,
//         'g-c-G5': MuseScoreRegionEnum.upper_line_4,
//         'g-c-A5': MuseScoreRegionEnum.upper_space_5,
//         'g-c-B5': MuseScoreRegionEnum.upper_line_5,
//     };
//     const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];
//
//     if (position) {
//         return [{position, accidental: ''}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
//     }
//     console.error('找不到对位置', `${clef}-${keySignature}-${musicalAlphabet}`);
//     return [{position: MuseScoreRegionEnum.space_3, accidental: ''}];
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
): MuseScoreRegionEnum {
    const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const basePositions: Record<ClefEnum, BasePosition> = {
        [ClefEnum.g]: {note: 'G', octave: 4, lineIndex: 2},     // G4 on line_2
        [ClefEnum.alto]: {note: 'C', octave: 4, lineIndex: 3},  // C4 on line_3
        [ClefEnum.bass]: {note: 'F', octave: 3, lineIndex: 4},  // F3 on line_4
    };

    const regionList: MuseScoreRegionEnum[] = [
        MuseScoreRegionEnum.line_1,
        MuseScoreRegionEnum.space_1,
        MuseScoreRegionEnum.line_2,
        MuseScoreRegionEnum.space_2,
        MuseScoreRegionEnum.line_3,
        MuseScoreRegionEnum.space_3,
        MuseScoreRegionEnum.line_4,
        MuseScoreRegionEnum.space_4,
        MuseScoreRegionEnum.line_5,
        MuseScoreRegionEnum.upper_space_1,
        MuseScoreRegionEnum.upper_line_1,
        MuseScoreRegionEnum.upper_space_2,
        MuseScoreRegionEnum.upper_line_2,
        MuseScoreRegionEnum.upper_space_3,
        MuseScoreRegionEnum.upper_line_3,
        MuseScoreRegionEnum.upper_space_4,
        MuseScoreRegionEnum.upper_line_4,
        MuseScoreRegionEnum.upper_space_5,
        MuseScoreRegionEnum.upper_line_5,
        MuseScoreRegionEnum.upper_space_6,
        MuseScoreRegionEnum.upper_line_6,
    ];

    const base = basePositions[clef];
    if (!base) return MuseScoreRegionEnum.none;

    const match = musicalAlphabet.match(/^([A-G])(\d)$/);
    if (!match) return MuseScoreRegionEnum.none;

    const [_, noteLetter, octaveStr] = match;
    const octave = parseInt(octaveStr);
    const baseIndex = noteOrder.indexOf(base.note) + base.octave * 7;
    const targetIndex = noteOrder.indexOf(noteLetter) + octave * 7;

    const steps = targetIndex - baseIndex;
    const regionIndex = base.lineIndex * 2 + steps;

    return regionList[regionIndex] ?? MuseScoreRegionEnum.none;
}


// 计算音符y方向的渲染位置。传入musicScoredata, 给note的position赋值
// export const positionCalculation = (data: MusicScore) => {
//     let clef: ClefEnum = ClefEnum.g;
//     let timeSignature: TimeSignatureEnum = TimeSignatureEnum['4/4'];
//     let keySignature: KeySignatureEnum = KeySignatureEnum.c;
//     data.multipleStavesArray.map((multipleStaves: MultipleStaves) => {
//         multipleStaves.singleStaffArray.map((singleStaff: SingleStaff) => {
//             singleStaff.measureArray.map((measure: Measure) => {
//                 measure.msSymbolArray.map((msSymbol: MsSymbol) => {
//                     if (msSymbol.type === MsSymbolTypeEnum.NoteHead) {
//                         const res = calculateNotePosition(clef, msSymbol.musicalAlphabet);
//                         msSymbol.position = res[0].position;
//                     }
//
//                 });
//             });
//         });
//     });
// };


// 计算音符x方向的渲染位置