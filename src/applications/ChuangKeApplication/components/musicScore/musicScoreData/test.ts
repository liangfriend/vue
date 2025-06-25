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
    }],
    multipleStavesArray: [{
        id: 1,
        msTypeName: MsTypeNameEnum.MultipStaves,
        index: {},
        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        singleStaffArray: [{
            id: 2,
            msTypeName: MsTypeNameEnum.SingleStaff,
            index: {},
            bindingStartId: [4],
            bindingEndId: [4],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 19,
                msTypeName: MsTypeNameEnum.Measure,
                index: {},
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    id: 20,
                    msTypeName: MsTypeNameEnum.MsSymbolContainer,
                    type: MsSymbolContainerTypeEnum.variable,
                    index: {},
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
                    index: {},
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
                    id: 24,
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
                bindingEndId: [],
                msSymbolContainerArray: [{
                    id: 4,
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
                    id: 6,
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
                    id: 13,
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
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    id: 9,
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
                    id: 11,
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