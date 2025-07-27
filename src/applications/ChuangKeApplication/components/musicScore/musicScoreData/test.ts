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
        "1": {
            "id": 1,
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
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1753588106297,
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
                            "vueKey": 1753588106297,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588106297,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588106297,
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
                                            "vueKey": 1753588106297,
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
                                    "vueKey": 1753588106297,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753588094889,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [
                                1753619397420,
                                1753619397420
                            ],
                            "bindingEndId": [
                                1753619397420
                            ],
                            "options": {
                                "highlight": true,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753588094889,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588094889,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588094889,
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
                                            "vueKey": 1753588094889,
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
                                    "vueKey": 1753588094889,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588108258,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588108258,
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
                                                    "id": 1753588108258,
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
                                                    "vueKey": 1753595331693,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588232388,
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
                                                    "vueKey": 1753595331693,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588108258,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 35,
                                            "chronaxie": 16
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
                                    "vueKey": 1753588108258,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588118106,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588118106,
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
                                                    "id": 1753588118106,
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
                                                    "vueKey": 1753595331693,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588234532,
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
                                                    "vueKey": 1753595331693,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588118106,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 56,
                                            "chronaxie": 16
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
                                    "vueKey": 1753588118106,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588109106,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588109106,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 3,
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
                                                    "id": 1753588109106,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 3,
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
                                                    "vueKey": 1753591723039,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588239380,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 3,
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
                                                    "vueKey": 1753591723039,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588109106,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 54,
                                            "chronaxie": 16
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753588109106,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753588105330,
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
                            "vueKey": 1753588105330,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588105330,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588105330,
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
                                            "vueKey": 1753588105330,
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
                                    "vueKey": 1753588105330,
                                    "msTypeName": 5
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "2": {
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
                "highlight": false,
                "highlightColor": "red",
                "color": "transparent"
            },
            "singleStaffMarginBottom": 30,
            "measureArray": [
                {
                    "id": 1753588106297,
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
                    "vueKey": 1753588106297,
                    "msSymbolContainerArray": [
                        {
                            "id": 1753588106297,
                            "msSymbolArray": [
                                {
                                    "id": 1753588106297,
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
                                    "vueKey": 1753588106297,
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
                            "vueKey": 1753588106297,
                            "msTypeName": 5
                        }
                    ]
                },
                {
                    "id": 1753588094889,
                    "msTypeName": 3,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1
                    },
                    "bindingStartId": [
                        1753619397420,
                        1753619397420
                    ],
                    "bindingEndId": [
                        1753619397420
                    ],
                    "options": {
                        "highlight": true,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1753588094889,
                    "msSymbolContainerArray": [
                        {
                            "id": 1753588094889,
                            "msSymbolArray": [
                                {
                                    "id": 1753588094889,
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
                                    "vueKey": 1753588094889,
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
                            "vueKey": 1753588094889,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753588108258,
                            "msSymbolArray": [
                                {
                                    "id": 1753588108258,
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
                                            "id": 1753588108258,
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
                                            "vueKey": 1753595331693,
                                            "direction": "down",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753588232388,
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
                                            "vueKey": 1753595331693,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1,
                                            "direction": "down"
                                        }
                                    ],
                                    "vueKey": 1753588108258,
                                    "beamId": "2",
                                    "type": "noteHead",
                                    "region": 35,
                                    "chronaxie": 16
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
                            "vueKey": 1753588108258,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753588118106,
                            "msSymbolArray": [
                                {
                                    "id": 1753588118106,
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
                                            "id": 1753588118106,
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
                                            "vueKey": 1753595331693,
                                            "direction": "down",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753588234532,
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
                                            "vueKey": 1753595331693,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1,
                                            "direction": "down"
                                        }
                                    ],
                                    "vueKey": 1753588118106,
                                    "beamId": "2",
                                    "type": "noteHead",
                                    "region": 56,
                                    "chronaxie": 16
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
                            "vueKey": 1753588118106,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753588109106,
                            "msSymbolArray": [
                                {
                                    "id": 1753588109106,
                                    "msTypeName": 6,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3,
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
                                            "id": 1753588109106,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 3,
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
                                            "vueKey": 1753591723039,
                                            "direction": "down",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753588239380,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 3,
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
                                            "vueKey": 1753591723039,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1,
                                            "direction": "down"
                                        }
                                    ],
                                    "vueKey": 1753588109106,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 54,
                                    "chronaxie": 16
                                }
                            ],
                            "type": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1,
                                "msSymbolContainerIndex": 3
                            },
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753588109106,
                            "msTypeName": 5
                        }
                    ]
                },
                {
                    "id": 1753588105330,
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
                    "vueKey": 1753588105330,
                    "msSymbolContainerArray": [
                        {
                            "id": 1753588105330,
                            "msSymbolArray": [
                                {
                                    "id": 1753588105330,
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
                                    "vueKey": 1753588105330,
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
                            "vueKey": 1753588105330,
                            "msTypeName": 5
                        }
                    ]
                }
            ]
        },
        "1753588106297": {
            "id": 1753588106297,
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
            "vueKey": 1753588106297,
            "type": "barLine",
            "barLineType": 1
        },
        "1753588094889": {
            "id": 1753588094889,
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
            "vueKey": 1753588094889,
            "type": "barLine",
            "barLineType": 1
        },
        "1753588108258": {
            "id": 1753588108258,
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
                    "id": 1753588108258,
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
                    "vueKey": 1753595331693,
                    "direction": "down",
                    "type": "noteBar"
                },
                {
                    "id": 1753588232388,
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
                    "vueKey": 1753595331693,
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamType": 1,
                    "direction": "down"
                }
            ],
            "vueKey": 1753588108258,
            "beamId": "2",
            "type": "noteHead",
            "region": 35,
            "chronaxie": 16
        },
        "1753588118106": {
            "id": 1753588118106,
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
                    "id": 1753588118106,
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
                    "vueKey": 1753595331693,
                    "direction": "down",
                    "type": "noteBar"
                },
                {
                    "id": 1753588234532,
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
                    "vueKey": 1753595331693,
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamType": 1,
                    "direction": "down"
                }
            ],
            "vueKey": 1753588118106,
            "beamId": "2",
            "type": "noteHead",
            "region": 56,
            "chronaxie": 16
        },
        "1753588109106": {
            "id": 1753588109106,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 1,
                "msSymbolContainerIndex": 3,
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
                    "id": 1753588109106,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1,
                        "msSymbolContainerIndex": 3,
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
                    "vueKey": 1753591723039,
                    "direction": "down",
                    "type": "noteBar"
                },
                {
                    "id": 1753588239380,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1,
                        "msSymbolContainerIndex": 3,
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
                    "vueKey": 1753591723039,
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamType": 1,
                    "direction": "down"
                }
            ],
            "vueKey": 1753588109106,
            "beamId": -1,
            "type": "noteHead",
            "region": 54,
            "chronaxie": 16
        },
        "1753588105330": {
            "id": 1753588105330,
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
            "vueKey": 1753588105330,
            "type": "barLine",
            "barLineType": 1
        },
        "1751898743265": {
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
                "highlight": false,
                "highlightColor": "red",
                "color": "transparent"
            },
            "singleStaffMarginBottom": 30,
            "measureArray": [
                {
                    "id": 1753588102305,
                    "msTypeName": 3,
                    "index": {
                        "multipleStavesIndex": 1,
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
                    "vueKey": 1753588102305,
                    "msSymbolContainerArray": [
                        {
                            "id": 1753588102305,
                            "msSymbolArray": [
                                {
                                    "id": 1753588102305,
                                    "msTypeName": 6,
                                    "index": {
                                        "multipleStavesIndex": 1,
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
                                    "vueKey": 1753588102305,
                                    "type": "barLine",
                                    "barLineType": 1
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
        "1753588102305": {
            "id": 1753588102305,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 1,
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
            "vueKey": 1753588102305,
            "type": "barLine",
            "barLineType": 1
        },
        "1753588232388": {
            "id": 1753588232388,
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
            "vueKey": 1753588232388,
            "type": "noteTail",
            "chronaxie": 16,
            "beamType": 1,
            "direction": "up"
        },
        "1753588234532": {
            "id": 1753588234532,
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
            "vueKey": 1753588234532,
            "type": "noteTail",
            "chronaxie": 16,
            "beamType": 1,
            "direction": "up"
        },
        "1753588239380": {
            "id": 1753588239380,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 1,
                "msSymbolContainerIndex": 3,
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
            "vueKey": 1753588239380,
            "type": "noteTail",
            "chronaxie": 16,
            "beamType": 1,
            "direction": "up"
        },
        "1753619397420": {
            "type": 1,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 2,
            "startTargetId": 1753588094889,
            "endTargetId": 1753588094889,
            "id": 1753619397420,
            "rect": {},
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1753619397420
        }
    },
    "measureHeight": 50,
    "widthDynamicRatio": 0.4,
    "spanSymbolArray": [
        {
            "type": 1,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 2,
            "startTargetId": 1753588094889,
            "endTargetId": 1753588094889,
            "id": 1753619397420,
            "rect": {},
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1753619397420
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1753588106297,
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
                            "vueKey": 1753588106297,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588106297,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588106297,
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
                                            "vueKey": 1753588106297,
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
                                    "vueKey": 1753588106297,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753588094889,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [
                                1753619397420,
                                1753619397420
                            ],
                            "bindingEndId": [
                                1753619397420
                            ],
                            "options": {
                                "highlight": true,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753588094889,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588094889,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588094889,
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
                                            "vueKey": 1753588094889,
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
                                    "vueKey": 1753588094889,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588108258,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588108258,
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
                                                    "id": 1753588108258,
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
                                                    "vueKey": 1753595331693,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588232388,
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
                                                    "vueKey": 1753595331693,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588108258,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 35,
                                            "chronaxie": 16
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
                                    "vueKey": 1753588108258,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588118106,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588118106,
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
                                                    "id": 1753588118106,
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
                                                    "vueKey": 1753595331693,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588234532,
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
                                                    "vueKey": 1753595331693,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588118106,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 56,
                                            "chronaxie": 16
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
                                    "vueKey": 1753588118106,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753588109106,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588109106,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 0,
                                                "singleStaffIndex": 0,
                                                "measureIndex": 1,
                                                "msSymbolContainerIndex": 3,
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
                                                    "id": 1753588109106,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 3,
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
                                                    "vueKey": 1753591723039,
                                                    "direction": "down",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753588239380,
                                                    "msTypeName": 6,
                                                    "index": {
                                                        "multipleStavesIndex": 0,
                                                        "singleStaffIndex": 0,
                                                        "measureIndex": 1,
                                                        "msSymbolContainerIndex": 3,
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
                                                    "vueKey": 1753591723039,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1,
                                                    "direction": "down"
                                                }
                                            ],
                                            "vueKey": 1753588109106,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 54,
                                            "chronaxie": 16
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1753588109106,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753588105330,
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
                            "vueKey": 1753588105330,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588105330,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588105330,
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
                                            "vueKey": 1753588105330,
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
                                    "vueKey": 1753588105330,
                                    "msTypeName": 5
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "transparent"
                    },
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1753588102305,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 1,
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
                            "vueKey": 1753588102305,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753588102305,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753588102305,
                                            "msTypeName": 6,
                                            "index": {
                                                "multipleStavesIndex": 1,
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
                                            "vueKey": 1753588102305,
                                            "type": "barLine",
                                            "barLineType": 1
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