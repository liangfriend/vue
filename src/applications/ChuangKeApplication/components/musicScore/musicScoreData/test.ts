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
    "showMode": 1,
    "map": {},
    "measureHeight": 50,
    "widthDynamicRatio": 0.4,
    "spanSymbolArray": [
        {
            "type": 1,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 2,
            "startTargetId": 3,
            "endTargetId": 8,
            "id": 15,
            "rect": {},
            "options": {
                "hightlight": false,
                "hightlightColor": "red",
                "color": "black"
            },
            "vueKey": 1751899024999
        }
    ],
    "multipleStavesArray": [
        {
            "id": 1,
            "msTypeName": 1,
            "index": {
                "multipleStavesIndex": 0
            },
            "multipleStavesPaddingTop": 60,
            "multipleStavesPaddingBottom": 60,
            "multipleStavesMarginBottom": 60,
            "options": {
                "hightlight": false,
                "hightlightColor": "red",
                "color": "transparent"
            },
            "singleStaffArray": [
                {
                    "id": 2,
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
                        "hightlight": false,
                        "hightlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 19,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "hightlight": false,
                                "hightlightColor": "red",
                                "color": "black"
                            },
                            "msSymbolContainerArray": [
                                {
                                    "id": 20,
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 21,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                },
                                {
                                    "id": 22,
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 23,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                },
                                {
                                    "id": 24,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 2
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 25,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 2,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 14,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "barlineType": 1,
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [
                                15
                            ],
                            "bindingEndId": [],
                            "options": {
                                "hightlight": false,
                                "hightlightColor": "red",
                                "color": "black"
                            },
                            "msSymbolContainerArray": [
                                {
                                    "id": 4,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 5,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [
                                                15
                                            ],
                                            "msSymbolArray": []
                                        }
                                    ]
                                },
                                {
                                    "id": 1751899024998,
                                    "msSymbolArray": [
                                        {
                                            "id": 1751899024998,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [],
                                            "type": 1,
                                            "region": 38,
                                            "chronaxie": 8,
                                            "computed": {}
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
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1751899022086,
                                    "msSymbolArray": [
                                        {
                                            "id": 1751899022086,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 2,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [],
                                            "type": 1,
                                            "region": 43,
                                            "chronaxie": 8,
                                            "computed": {}
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
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 6,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 7,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 3,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                },
                                {
                                    "id": 13,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 4
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 14,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 4,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 14,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "barlineType": 1,
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 8,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 2
                            },
                            "options": {
                                "hightlight": false,
                                "hightlightColor": "red",
                                "color": "black"
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "msSymbolContainerArray": [
                                {
                                    "id": 9,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 2,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 10,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 2,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                },
                                {
                                    "id": 11,
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5,
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 2,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "msSymbolArray": [
                                        {
                                            "id": 12,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 2,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "computed": {},
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": 1751898743265,
            "msTypeName": 1,
            "index": {
                "multipleStavesIndex": 1
            },
            "multipleStavesPaddingTop": 60,
            "multipleStavesPaddingBottom": 60,
            "multipleStavesMarginBottom": 60,
            "options": {
                "hightlight": false,
                "hightlightColor": "red",
                "color": "transparent"
            },
            "singleStaffArray": [
                {
                    "id": 1751898743265,
                    "msTypeName": 2,
                    "index": {
                        "multipleStavesIndex": 1,
                        "singleStaffIndex": 0
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "singleStaffPaddingTop": 30,
                    "singleStaffPaddingBottom": 30,
                    "options": {
                        "hightlight": false,
                        "hightlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1751898743265,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 1,
                                "singleStaffIndex": 0,
                                "measureIndex": 0
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "hightlight": false,
                                "hightlightColor": "red",
                                "color": "black"
                            },
                            "msSymbolContainerArray": [
                                {
                                    "id": 1751898743265,
                                    "msSymbolArray": [
                                        {
                                            "id": 1751898743265,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 0,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1751898743251,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 0,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 14,
                                                    "barlineType": 1
                                                }
                                            ],
                                            "type": 14,
                                            "barlineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 1,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1751899017286,
                                    "msSymbolArray": [
                                        {
                                            "id": 1751899017286,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1751899017212,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 1,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 2
                                                }
                                            ],
                                            "type": 1,
                                            "region": 53,
                                            "chronaxie": 8,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 1,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1752316332347,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752316332347,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 2,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1752316332347,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 2,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 2
                                                },
                                                {
                                                    "id": 1752316332347,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 2,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 3,
                                                    "chronaxie": 8
                                                }
                                            ],
                                            "type": 1,
                                            "region": 33,
                                            "chronaxie": 8,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 1,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 2
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1752316327587,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752316327586,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 3,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1752316327587,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 3,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 2
                                                },
                                                {
                                                    "id": 1752316327587,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 3,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 3,
                                                    "chronaxie": 8
                                                }
                                            ],
                                            "type": 1,
                                            "region": 44,
                                            "chronaxie": 8,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 1,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1752316233913,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752316233913,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 4,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "hightlight": false,
                                                "hightlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1752316233913,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 4,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 2
                                                },
                                                {
                                                    "id": 1752316233913,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 1,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
                                                        "msSymbolContainerIndex": 4,
                                                        "msSymbolIndex": 0
                                                    },
                                                    "options": {
                                                        "hightlight": false,
                                                        "hightlightColor": "red",
                                                        "color": "black"
                                                    },
                                                    "bindingStartId": [],
                                                    "bindingEndId": [],
                                                    "msSymbolArray": [],
                                                    "type": 3,
                                                    "chronaxie": 8
                                                }
                                            ],
                                            "type": 1,
                                            "region": 42,
                                            "chronaxie": 8,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 1,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 4
                                    },
                                    "options": {
                                        "hightlight": false,
                                        "hightlightColor": "red",
                                        "color": "black"
                                    },
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