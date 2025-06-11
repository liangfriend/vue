import {
    AccidentalEnum,
    ChronaxieEnum, ClefEnum, KeySignatureEnum,
    MsSymbolContainerTypeEnum, MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreShowModeEnum
} from './musicScoreEnum.ts';
import type {MusicScore} from "./types.d.ts";

const data: MusicScore = {
    showMode: MusicScoreShowModeEnum.standardStaff,
    multipleStavesArray: [{
        singleStaffArray: [{
            measureArray: [{
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.Db,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: {
                            beat: 2,
                            chronaxie: 4
                        },
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},

                        }, {
                            type: MsSymbolTypeEnum.accidental,
                            options: {},
                            computed: {},
                            accidental: AccidentalEnum.flat,

                        },]
                    }]
                }]
            }]
        }]
    }]
}
// const data: MusicScore = {
//     showMode: MusicScoreShowModeEnum.standardStaff,
//     multipleStavesArray: [{
//         singleStaffArray: [{
//             measureArray: [{
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef_f,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.rearFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 },]
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 },]
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef_f,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.rearFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.rearFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }]
//         }]
//     }, {
//         singleStaffArray: [{
//             measureArray: [{
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef_f,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.rearFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef_f,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.rearFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef_f,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         keySignature: KeySignatureEnum.F,
//                         type: MsSymbolTypeEnum.keySignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         timeSignature: TimeSignatureEnum['3/4'],
//                         type: MsSymbolTypeEnum.timeSignature,
//                         options: {},
//                          computed: {},
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.frontFixed,
//                     msSymbolArray: [{
//                         clef: ClefEnum.treble,
//                         type: MsSymbolTypeEnum.clef,
//                         options: {},
//                          computed: {},
//                     }]
//                 }],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 },],
//
//             }, {
//                 msSymbolContainerArray: [{
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 }, {
//                     type: MsSymbolContainerTypeEnum.variable,
//                     msSymbolArray: [{
//                         musicalAlphabet: MusicalAlphabetEnum.C4,
//                         chronaxie: ChronaxieEnum.eighth,
//                         type: MsSymbolTypeEnum.noteHead,
//                         options: {},
//                          computed: {},
//                         msSymbolArray: [{
//                             type: MsSymbolTypeEnum.noteBar,
//                             options: {},
//                              computed: {},
//
//                         },]
//                     }]
//                 },],
//
//             }]
//         }]
//     }]
// };
export default data;