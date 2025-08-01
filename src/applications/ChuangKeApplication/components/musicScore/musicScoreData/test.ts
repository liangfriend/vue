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
    "map": {
        "1751898743265": {
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
                        },
                        {
                            "id": 1754018740619,
                            "msSymbolArray": [
                                {
                                    "id": 1754018740618,
                                    "msTypeName": 6,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1,
                                        "msSymbolIndex": 0
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "bindingStartId": [
                                        1754019493329
                                    ],
                                    "bindingEndId": [],
                                    "msSymbolArray": [
                                        {
                                            "id": 1754018740618,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
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
                                            "vueKey": 1754018740617,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1754018740617,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 37,
                                    "chronaxie": 4
                                }
                            ],
                            "type": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
                                "msSymbolContainerIndex": 1
                            },
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754018740617,
                            "msTypeName": 5
                        },
                        {
                            "id": 1754018742077,
                            "msSymbolArray": [
                                {
                                    "id": 1754018742076,
                                    "msTypeName": 6,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 2,
                                        "msSymbolIndex": 0
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [
                                        1754019493329
                                    ],
                                    "msSymbolArray": [
                                        {
                                            "id": 1754018742076,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
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
                                            "vueKey": 1754018742075,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1754018742075,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 37,
                                    "chronaxie": 4
                                }
                            ],
                            "type": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
                                "msSymbolContainerIndex": 2
                            },
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754018742075,
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
                        "highlight": false,
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
                                            "vueKey": 1754018747862,
                                            "direction": "down",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1753686266892,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 50,
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
                                            "vueKey": 1754018733222,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1753686269659,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 29,
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
        },
        "1753686263981": {
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
        },
        "1753686263979": {
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
        },
        "1753686264300": {
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
                "highlight": false,
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
                                    "vueKey": 1754018747862,
                                    "direction": "down",
                                    "type": "noteBar"
                                }
                            ],
                            "vueKey": 1753686266892,
                            "beamId": -1,
                            "type": "noteHead",
                            "region": 50,
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
                                    "vueKey": 1754018733222,
                                    "direction": "up",
                                    "type": "noteBar"
                                }
                            ],
                            "vueKey": 1753686269659,
                            "beamId": -1,
                            "type": "noteHead",
                            "region": 29,
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
        "1753686264299": {
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
        "1753686264298": {
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
        },
        "1753686266894": {
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
                            "vueKey": 1754018747862,
                            "direction": "down",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1753686266892,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 50,
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
        "1753686266893": {
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
                    "vueKey": 1754018747862,
                    "direction": "down",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1753686266892,
            "beamId": -1,
            "type": "noteHead",
            "region": 50,
            "chronaxie": 4
        },
        "1753686269662": {
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
                            "vueKey": 1754018733222,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1753686269659,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 29,
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
        },
        "1753686269660": {
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
                    "vueKey": 1754018733222,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1753686269659,
            "beamId": -1,
            "type": "noteHead",
            "region": 29,
            "chronaxie": 4
        },
        "1753588102305": {
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
        },
        "1754018740619": {
            "id": 1754018740619,
            "msSymbolArray": [
                {
                    "id": 1754018740618,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
                        "msSymbolContainerIndex": 1,
                        "msSymbolIndex": 0
                    },
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "bindingStartId": [
                        1754019493329
                    ],
                    "bindingEndId": [],
                    "msSymbolArray": [
                        {
                            "id": 1754018740618,
                            "msTypeName": 6,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
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
                            "vueKey": 1754018740617,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1754018740617,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 37,
                    "chronaxie": 4
                }
            ],
            "type": 3,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 1
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754018740617,
            "msTypeName": 5
        },
        "1754018742077": {
            "id": 1754018742077,
            "msSymbolArray": [
                {
                    "id": 1754018742076,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
                        "msSymbolContainerIndex": 2,
                        "msSymbolIndex": 0
                    },
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "bindingStartId": [],
                    "bindingEndId": [
                        1754019493329
                    ],
                    "msSymbolArray": [
                        {
                            "id": 1754018742076,
                            "msTypeName": 6,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
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
                            "vueKey": 1754018742075,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1754018742075,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 37,
                    "chronaxie": 4
                }
            ],
            "type": 3,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 2
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754018742075,
            "msTypeName": 5
        },
        "1754018740618": {
            "id": 1754018740618,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 1,
                "msSymbolIndex": 0
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "bindingStartId": [
                1754019493329
            ],
            "bindingEndId": [],
            "msSymbolArray": [
                {
                    "id": 1754018740618,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
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
                    "vueKey": 1754018740617,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1754018740617,
            "beamId": -1,
            "type": "noteHead",
            "region": 37,
            "chronaxie": 4
        },
        "1754018742076": {
            "id": 1754018742076,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 2,
                "msSymbolIndex": 0
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "bindingStartId": [],
            "bindingEndId": [
                1754019493329
            ],
            "msSymbolArray": [
                {
                    "id": 1754018742076,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
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
                    "vueKey": 1754018742075,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1754018742075,
            "beamId": -1,
            "type": "noteHead",
            "region": 37,
            "chronaxie": 4
        },
        "1754019493329": {
            "type": 2,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 1,
            "startTargetId": 1754018740618,
            "endTargetId": 1754018742076,
            "id": 1754019493329,
            "rect": {
                "width": 179.45999999999995,
                "left": 89.72999999999999,
                "top": 40,
                "height": 50
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754019493329
        }
    },
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
                "width": 359.91999999999996,
                "left": 359.91999999999996,
                "top": 2.5,
                "height": 50
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754018748562
        },
        {
            "type": 2,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 1,
            "startTargetId": 1754018740618,
            "endTargetId": 1754018742076,
            "id": 1754019493329,
            "rect": {
                "width": 179.45999999999995,
                "left": 89.72999999999999,
                "top": 40,
                "height": 50
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754019493329
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
                                },
                                {
                                    "id": 1754018740619,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754018740618,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 1,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [
                                                1754019493329
                                            ],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754018740618,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
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
                                                    "vueKey": 1754018740617,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754018740617,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 37,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754018740617,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754018742077,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754018742076,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 0,
                                                "msSymbolContainerIndex": 2,
                                                "msSymbolIndex": 0
                                            },
                                            "options": {
                                                "highlight": false,
                                                "highlightColor": "red",
                                                "color": "black"
                                            },
                                            "bindingStartId": [],
                                            "bindingEndId": [
                                                1754019493329
                                            ],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754018742076,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 0,
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
                                                    "vueKey": 1754018742075,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754018742075,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 37,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 2
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754018742075,
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
                                "highlight": false,
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
                                                    "vueKey": 1754018747862,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1753686266892,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 50,
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
                                                    "vueKey": 1754018733222,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1753686269659,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 29,
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