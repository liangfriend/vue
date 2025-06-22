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
    measureHeight: 50,
    spanSymbolArray: [{
        type: SpanSymbolTypeEnum.volta,
        spanSymbolFollowingCategoryEnum: SpanSymbolFollowingCategoryEnum.measure,
        startTargetId: 2,
        endTargetId: 2,
        id: 4,
        width: 0,
        bottom: 0,
        rect: {},
    }],
    multipleStavesArray: [{
        id: 1,
        index: {},
        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        singleStaffArray: [{
            id: 1,
            index: {},
            bindingStartId: [4],
            bindingEndId: [4],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 2,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        index: {}
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        index: {}
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.timeSignature,
                        timeSignature: {
                            beat: 3,
                            chronaxie: 4
                        },
                        index: {},
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        index: {},
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                            index: {},
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
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
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
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
                index: {},
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        index: {},
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        index: {},
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    index: {},
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.line_5,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
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
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.space_4,
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            }, {
                id: 1,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.line_4,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        region: MusicScoreRegionEnum.upper_space_1,
                        chronaxie: ChronaxieEnum.quarter,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        index: {},
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            }, {
                id: 1,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.line_5,
                        index: {},
                        chronaxie: ChronaxieEnum.half,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        index: {},
                        chronaxie: ChronaxieEnum.eighth,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        index: {},
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.barline,
                        index: {},
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }],
            },]
        }, {
            id: 1,
            index: {},
            bindingStartId: [],
            bindingEndId: [],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 1,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.clef_f,
                        clef: ClefEnum.treble,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.keySignature,
                        keySignature: KeySignatureEnum.F,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_2,
                        index: {},
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        barlineType: BarlineTypeEnum.single,
                        bindingStartId: [],
                        bindingEndId: [],

                    }]
                }]
            }, {
                id: 1,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.space_4,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_4,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.eighth,
                        region: MusicScoreRegionEnum.upper_space_2,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        index: {},
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
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_line_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            index: {},
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        index: {},
                        chronaxie: ChronaxieEnum.quarter,
                        region: MusicScoreRegionEnum.upper_space_1,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            index: {},
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
                        type: MsSymbolTypeEnum.barline,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        barlineType: BarlineTypeEnum.single

                    }]
                }]
            }, {
                id: 1,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    index: {},
                    type: MsSymbolContainerTypeEnum.variable,
                    msSymbolArray: [{
                        index: {},
                        id: 1,
                        type: MsSymbolTypeEnum.noteHead,
                        chronaxie: ChronaxieEnum.half,
                        region: MusicScoreRegionEnum.line_5,
                        options: {},
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: [{
                            index: {},
                            id: 1,
                            type: MsSymbolTypeEnum.noteBar,
                            options: {},
                            bindingStartId: [],
                            bindingEndId: [],
                        }]
                    }]
                }, {
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 1,
                        index: {},
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