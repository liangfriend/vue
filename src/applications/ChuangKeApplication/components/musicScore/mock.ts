import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MsSymbolTypeEnum,
    TimeSignatureEnum, MusicScoreShowModeEnum
} from './musicScoreEnum.ts';
import type {MusicScore} from "./types.d.ts";

const data: MusicScore = {
    showMode: MusicScoreShowModeEnum.standardStaff,
    multipleStavesArray: [{
        singleStaffArray: [{
            measureArray: [{
                options: {},
                msSymbolArray: [{
                    clef: ClefEnum.treble,
                    type: MsSymbolTypeEnum.clef_f,
                    options: {},
                    measureRelativeRect: {},
                }, {
                    keySignature: KeySignatureEnum.F,
                    type: MsSymbolTypeEnum.keySignature,
                    options: {},
                    measureRelativeRect: {}
                }, {
                    timeSignature: TimeSignatureEnum['3/4'],
                    type: MsSymbolTypeEnum.timeSignature,
                    options: {},
                    measureRelativeRect: {}
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {},

                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {},

                    },]
                }, {
                    clef: ClefEnum.treble,
                    type: MsSymbolTypeEnum.clef,
                    options: {},
                    measureRelativeRect: {},
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.D4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {},

                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.F4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.E4,
                    chronaxie: ChronaxieEnum.half,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.D4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.D4,
                    chronaxie: ChronaxieEnum.half,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C4,
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }]
        }]
    }, {
        singleStaffArray: [{
            measureArray: [{
                options: {},
                msSymbolArray: [{
                    clef: ClefEnum.treble,
                    type: MsSymbolTypeEnum.clef,
                    options: {},
                    measureRelativeRect: {},

                }, {
                    keySignature: KeySignatureEnum.F,
                    type: MsSymbolTypeEnum.keySignature,
                    options: {},
                    measureRelativeRect: {},

                }, {
                    musicalAlphabet: MusicalAlphabetEnum.C5,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.A4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.F4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.E4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum['B-4'],
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum['B-4'],
                    chronaxie: ChronaxieEnum.eighth,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.A4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.F4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }, {
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                },]
            }, {
                options: {},
                msSymbolArray: [{
                    musicalAlphabet: MusicalAlphabetEnum.G4,
                    chronaxie: ChronaxieEnum.quarter,
                    type: MsSymbolTypeEnum.noteHead,
                    options: {},
                    measureRelativeRect: {},
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteBar,
                        options: {},
                        measureRelativeRect: {}
                    },]
                }]
            }]
        }]
    }]
};
export default data;