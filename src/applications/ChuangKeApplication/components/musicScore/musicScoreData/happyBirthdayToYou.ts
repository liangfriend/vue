import {MusicScore, TimeSignature} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum, BarlineTypeEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum, MusicScoreRegionEnum,

    MusicScoreShowModeEnum, SpanSymbolFollowingCategoryEnum, SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const data: MusicScore = {
    showMode: MusicScoreShowModeEnum.standardStaff,
    measureHeight: 60,
    spanSymbolArray: [{
        type: SpanSymbolTypeEnum.volta,
        spanSymbolFollowingCategoryEnum: SpanSymbolFollowingCategoryEnum.measure,
        startTargetId: 2,
        endTargetId: 2,
        id: 4,
        width: 0,
        bottom: 0,
    }],
    multipleStavesArray: [{
        id: 1,

        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        singleStaffArray: [{
            id: 1,
            bindingStartId: [4],
            bindingEndId: [4],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 2,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.timeSignature,
                        timeSignature: {
                            beat: 3,
                            chronaxie: 4
                        },
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.endRepeatSign,
                        loopCount: 2,
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }],
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_4,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.upper_space_1,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_5,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            },]
        }, {
            id: 1,
            bindingStartId: [],
            bindingEndId: [],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.clef_f,
                        clef: ClefEnum.treble,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_2,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }]
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.space_4,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_4,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        id: 1,
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }]
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_space_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        barlineType: BarlineTypeEnum.single

                    }]
                }]
            }, {
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.half,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.final,
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }]
            }]
        }]
    }]
}

export default data;