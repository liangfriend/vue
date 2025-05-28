/*渲染 */
import {
    ClefEnum,
    KeySignatureEnum, MuseScoreRegionEnum, MusicalAlphabetEnum,
    TimeSignatureEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import type {
    Measure,
    MultipleStaves, Note,
    SingleStaff, MusicScore
} from "@/applications/ChuangKeApplication/components/musicScore/types";

// 计算出音符所在间线
export function calculateNotePosition(clef: ClefEnum, keySignature: KeySignatureEnum, musicalAlphabet: MusicalAlphabetEnum): {
    position: MuseScoreRegionEnum;
    accidental: string   //这个后续可能要去掉，不需要数组，确定唯一position
}[] {
    const map: Record<string, MuseScoreRegionEnum> = {
        'g-c-C4': MuseScoreRegionEnum.space_3,
        'g-c-D4': MuseScoreRegionEnum.line_4,
        'g-c-E4': MuseScoreRegionEnum.space_4,
        'g-c-F4': MuseScoreRegionEnum.line_5,
        'g-c-G4': MuseScoreRegionEnum.upper_space_1,
        'g-c-A4': MuseScoreRegionEnum.upper_line_1,
        'g-c-B4': MuseScoreRegionEnum.upper_space_2,
        'g-c-C5': MuseScoreRegionEnum.upper_line_2,
        'g-c-D5': MuseScoreRegionEnum.upper_space_3,
        'g-c-E5': MuseScoreRegionEnum.upper_line_3,
        'g-c-F5': MuseScoreRegionEnum.upper_space_4,
        'g-c-G5': MuseScoreRegionEnum.upper_line_4,
        'g-c-A5': MuseScoreRegionEnum.upper_space_5,
        'g-c-B5': MuseScoreRegionEnum.upper_line_5,
    };
    const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];

    if (position) {
        return [{position, accidental: ''}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
    }
    console.error('找不到对位置', `${clef}-${keySignature}-${musicalAlphabet}`);
    return [{position: MuseScoreRegionEnum.space_3, accidental: ''}];

}

// 传入musicScoredata, 给note的position赋值
export const positionCalculation = (data: MusicScore) => {
    let clef: ClefEnum = ClefEnum.g;
    let timeSignature: TimeSignatureEnum = TimeSignatureEnum['4/4'];
    let keySignature: KeySignatureEnum = KeySignatureEnum.c;
    data.multipleStavesArray.map((multipleStaves: MultipleStaves) => {
        multipleStaves.singleStaffArray.map((singleStaff: SingleStaff) => {
            singleStaff.measureArray.map((measure: Measure) => {
                measure.timeSignature && (timeSignature = measure.timeSignature);
                measure.keySignature && (keySignature = measure.keySignature);
                measure.noteArray.map((note: Note) => {
                    note.clef && (clef = note.clef);
                    const res = calculateNotePosition(clef, keySignature, note.musicalAlphabet);
                    note.position = res[0].position;
                });
            });
        });
    });
};

// 获取平铺的音符数组
export const flatNotes = (musicScoreData: MusicScore) => {
    const res: Note[] = [];
    musicScoreData.multipleStavesArray.forEach((multipleStaves: MultipleStaves) => {
        multipleStaves.singleStaffArray.forEach((singleStaff: SingleStaff) => {
            singleStaff.measureArray.forEach((measure: Measure) => {
                measure.noteArray.forEach((note: Note) => {
                    res.push(note);
                });
            });
        });
    });
    return res;
};