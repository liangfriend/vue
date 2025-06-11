import {MusicScore, TimeSignature} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreShowModeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

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
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.timeSignature,
                        timeSignature: {
                            beat: 3,
                            chronaxie: 4
                        },
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.D5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.F5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.E5,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.D5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.G5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.F5,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        musicalAlphabet: MusicalAlphabetEnum.C5,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }],
            },]
        }, {
            measureArray: [{
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.clef_f,
                        clef: ClefEnum.treble,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.C6,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.A5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.F5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.E5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.D5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        musicalAlphabet: MusicalAlphabetEnum["B-5"],
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        musicalAlphabet: MusicalAlphabetEnum["B-5"],
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.A5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.F5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        musicalAlphabet: MusicalAlphabetEnum.G5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.half,
                        musicalAlphabet: MusicalAlphabetEnum.G5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            computed: {},
                        }]
                    }]
                }]
            }]
        }]
    }]
}

export default data;