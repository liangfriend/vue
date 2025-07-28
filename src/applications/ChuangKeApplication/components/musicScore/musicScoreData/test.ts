import {MusicScore, TimeSignature} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum, BarLineTypeEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum, MsTypeNameEnum, MusicScoreRegionEnum,

    MusicScoreShowModeEnum, SpanSymbolFollowingCategoryEnum, SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const data: MusicScore = {
    "showMode": 1,
    "map": {},
    "measureHeight": 50,
    "widthDynamicRatio": 0.4,
    "spanSymbolArray": [
        {
            "type": 1,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 2,
            "startTargetId": 1753686264300,
            "endTargetId": 1753686264300,
            "id": 1753686271858,
            "rect": {
                "width": 399.79999999999995,
                "left": 300.09999999999997,
                "bottom": 710
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1753686271858
        }
    ],
    "multipleStavesArray": [
        {
            "id": 1751898743265,
            "msTypeName": 1,
            "index": {
                "multipleStavesIndex": 0
            },
            "multipleStavesPaddingTop": 60,
            "multipleStavesPaddingBottom": 60,
            "multipleStavesMarginBottom": 60,
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "transparent"
            },
            "singleStaffArray": [
                {
                    "id": 1751898743265,
                    "msTypeName": 2,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "singleStaffPaddingTop": 30,
                    "singleStaffPaddingBottom": 30,
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1753686263981,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753686263978,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753686263981,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753686263979,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [],
                                            "vueKey": 1753686263978,
                                            "type": "barLine",
                                            "barLineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753686263979,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753686264300,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [
                                1753686271858,
                                1753686271858
                            ],
                            "bindingEndId": [
                                1753686271858
                            ],
                            "options": {
                                "highlight": true,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753686264297,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753686264299,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753686264298,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [],
                                            "vueKey": 1753686264297,
                                            "type": "barLine",
                                            "barLineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753686264297,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753686266894,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753686266893,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1753686266893,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 1,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "highlight": false,
                                                        "highlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "vueKey": 1753686266892,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1753686266892,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 38,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753686266892,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753686269662,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753686269660,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 2,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1753686269661,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 2,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "highlight": false,
                                                        "highlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "vueKey": 1753686269660,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1753686269659,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 43,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 2
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753686269660,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753588102305,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 2
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753588102305,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588102305,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588102305,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 2,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [],
                                            "vueKey": 1753588102305,
                                            "type": "barLine",
                                            "barLineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 2,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753588102305,
                                    "msTypeName": 5
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default data;