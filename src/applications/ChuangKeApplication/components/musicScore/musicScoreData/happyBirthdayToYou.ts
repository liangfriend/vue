import {MusicScore, TimeSignature} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum, BarlineTypeEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum, MusicScoreRegionEnum,

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
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.endRepeatSign,
                        loopCount: 2
                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_4,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.upper_space_1,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }],
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_5,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

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
                        region: MusicScoreRegionEnum.upper_line_2,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.space_4,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_4,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_space_1,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single

                    }]
                }]
            }, {
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.half,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        msSymbolArray: [{
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.final

                    }]
                }]
            }]
        }]
    }]
}

export default data;