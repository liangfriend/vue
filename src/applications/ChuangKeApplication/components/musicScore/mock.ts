import {
    ChronaxieEnum,
    ClefEnum, KeySignatureEnum,
    MusicalAlphabetEnum, NoteTypeEnum, TimeSignatureEnum
} from './musicScoreEnum.ts';
import type {MusicScore} from "./types.d.ts";

const data: MusicScore = {
    multipleStavesArray: [{
        singleStaffArray: [{
            measureArray: [{
                timeSignature: TimeSignatureEnum['4/4'],  //拍号
                keySignature: KeySignatureEnum.c, //调号
                noteArray: [{
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.rest,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.rest,
                    sort: 2,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 3,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 4,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }, {
                timeSignature: TimeSignatureEnum['none'],  //拍号
                keySignature: KeySignatureEnum.none, //调号
                noteArray: [{
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.A4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 2,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.C5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 3,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }, {
                timeSignature: TimeSignatureEnum['none'],  //拍号
                keySignature: KeySignatureEnum.none, //调号
                noteArray: [{
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.B4,
                    chronaxie: ChronaxieEnum.half,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 2,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 3,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }, {
                timeSignature: TimeSignatureEnum['none'],  //拍号
                keySignature: KeySignatureEnum.none, //调号
                noteArray: [{
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.A4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 2,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.D5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 3,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }]
        }]
    }, {
        singleStaffArray: [{
            measureArray: [{
                timeSignature: TimeSignatureEnum['4/4'],  //拍号
                keySignature: KeySignatureEnum.c, //调号
                noteArray: [{
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.C5,
                    chronaxie: ChronaxieEnum.half,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 1,
                }, {
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 2,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.g,
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: NoteTypeEnum.normal,
                    sort: 3,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }, {
                timeSignature: TimeSignatureEnum['none'],  //拍号
                keySignature: KeySignatureEnum.none, //调号
                noteArray: [{
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.G5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.E5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }, {
                    clef: ClefEnum.none,
                    musicalAlphabet: MusicalAlphabetEnum.C5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: NoteTypeEnum.normal,
                    sort: 1,
                    position: '',
                    accidental: '',
                    augmentationDot: 0,
                }]
            }]
        }]
    }]
};
export default data;