import {MusicScore, TimeSignature} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum, BarlineTypeEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum, MsTypeNameEnum, MusicScoreRegionEnum,

    MusicScoreShowModeEnum, SpanSymbolFollowingCategoryEnum, SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const data: MusicScore = {
    showMode: MusicScoreShowModeEnum.standardStaff,
    measureHeight: 50,
    spanSymbolArray: [{
        type: SpanSymbolTypeEnum.volta,
        msTypeName: MsTypeNameEnum.SpanSymbol,
        spanSymbolFollowingCategoryEnum: SpanSymbolFollowingCategoryEnum.measure,
        startTargetId: 3,
        endTargetId: 8,
        id: 15,
        rect: {},
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'black',
        }
    }],
    multipleStavesArray: [{
        id: 1,
        msTypeName: MsTypeNameEnum.MultipStaves,
        index: {},
        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'black',
        },
        singleStaffArray: [{
            id: 2,
            msTypeName: MsTypeNameEnum.SingleStaff,
            index: {},
            bindingStartId: [4],
            bindingEndId: [4],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            options: {
                hightlight: false,
                hightlightColor: 'red',
                color: 'black',
            },
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 19,
                msTypeName: MsTypeNameEnum.Measure,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                options: {
                    hightlight: false,
                    hightlightColor: 'red',
                    color: 'black',
                },
                msSymbolContainerArray: [{
                    id: 20,
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msSymbolArray: [{
                        id: 21,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }, {
                    id: 22,
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {}, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msSymbolArray: [{
                        id: 23,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }, {
                    id: 24, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 25,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.barline,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        bindingStartId: [],
                        barlineType: BarlineTypeEnum.single,
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }],
            }, {
                id: 3,
                msTypeName: MsTypeNameEnum.Measure,
                index: {},
                bindingStartId: [],
                options: {
                    hightlight: false,
                    hightlightColor: 'red',
                    color: 'black',
                },
                bindingEndId: [],
                msSymbolContainerArray: [{
                    id: 4, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 5,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }, {
                    id: 6, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 7,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }, {
                    id: 13, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.rearFixed,
                    index: {},
                    msSymbolArray: [{
                        id: 14,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.barline,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        bindingStartId: [],
                        barlineType: BarlineTypeEnum.single,
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }],
            }, {
                id: 8,
                msTypeName: MsTypeNameEnum.Measure,
                index: {},
                options: {
                    hightlight: false,
                    hightlightColor: 'red',
                    color: 'black',
                },
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    id: 9, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 10,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }, {
                    id: 11, options: {
                        hightlight: false,
                        hightlightColor: 'red',
                        color: 'black',
                    },
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
                    msSymbolArray: [{
                        id: 12,
                        msTypeName: MsTypeNameEnum.MsSymbol,
                        index: {},
                        type: MsSymbolTypeEnum.noteHead,
                        region: MusicScoreRegionEnum.space_3,
                        chronaxie: ChronaxieEnum.eighth,
                        options: {
                            hightlight: false,
                            hightlightColor: 'red',
                            color: 'black',
                        },
                        computed: {},
                        bindingStartId: [],
                        bindingEndId: [],
                        msSymbolArray: []
                    }]
                }],
            }]
        }]
    }]
}

export default data;