import {
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreShowModeEnum,
    TimeSignatureEnum
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
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                },]

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                },]

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }]
        }]
    }, {
        singleStaffArray: [{
            measureArray: [{
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        keySignature: KeySignatureEnum.F,
                        type: MsSymbolTypeEnum.keySignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        timeSignature: TimeSignatureEnum['3/4'],
                        type: MsSymbolTypeEnum.timeSignature,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                    }]
                }],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                },],

            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        musicalAlphabet: MusicalAlphabetEnum.C4,
                        chronaxie: ChronaxieEnum.eighth,
                        type: MsSymbolTypeEnum.noteHead,
                        options: {},
                        measureRelativeRect: {}, computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            measureRelativeRect: {}, computed: {},

                        },]
                    }]
                },],

            }]
        }]
    }]
};
export default data;