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
            "endTargetId": 3,
            "id": 1752548125368,
            "rect": {
                "width": 400,
                "left": 300,
                "bottom": 685
            },
            "options": {
                "hightlight": false,
                "hightlightColor": "red",
                "color": "black"
            },
            "vueKey": 1752548125368
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
                                    "id": 1752547441001,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547441001,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
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
                                                    "id": 1752547441001,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 39,
                                            "chronaxie": 4,
                                            "computed": {}
                                        }
                                    ],
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
                                    "msTypeName": 5
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
                                1752548125368
                            ],
                            "bindingEndId": [
                                1752548125368
                            ],
                            "options": {
                                "hightlight": true,
                                "hightlightColor": "red",
                                "color": "black"
                            },
                            "msSymbolContainerArray": [
                                {
                                    "id": 1752547455408,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547455407,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
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
                                                    "id": 1752547455408,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 40,
                                            "chronaxie": 4,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
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
                                    "id": 1752547444618,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547444618,
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
                                            "msSymbolArray": [
                                                {
                                                    "id": 1752547444618,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 40,
                                            "chronaxie": 4,
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
                            "msSymbolContainerArray": []
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
                                    "id": 1752547449816,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547449816,
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
                                                    "id": 1752547449816,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 40,
                                            "chronaxie": 4,
                                            "computed": {}
                                        }
                                    ],
                                    "type": 3,
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
                                    "id": 1752547451912,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547451911,
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
                                                    "id": 1752547451912,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 42,
                                            "chronaxie": 4,
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
                                    "id": 1752547450984,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547450983,
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
                                                    "id": 1752547450984,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 40,
                                            "chronaxie": 4,
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
                                    "id": 1752547448382,
                                    "msSymbolArray": [
                                        {
                                            "id": 1752547448382,
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
                                                    "id": 1752547448382,
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
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "type": "noteHead",
                                            "region": 40,
                                            "chronaxie": 4,
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