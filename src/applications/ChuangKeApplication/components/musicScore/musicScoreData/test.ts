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
                            "id": 1753275370832,
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
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753275370832,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753275370832,
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
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753343317334,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753343317334,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753343317334,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343317334,
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
                                            "vueKey": 1753343317334,
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
                                    "vueKey": 1753343317334,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343326089,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343326089,
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
                                                    "id": 1753343326089,
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
                                                    "vueKey": 1753343326089,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343326089,
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
                                                    "vueKey": 1753343326089,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343326089,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 38,
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
                                    "vueKey": 1753343326089,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343324720,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343324719,
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
                                                    "id": 1753343324719,
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
                                                    "vueKey": 1753343324719,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343324720,
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
                                                    "vueKey": 1753343324720,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343324719,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 41,
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
                                    "vueKey": 1753343324720,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343323302,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343323302,
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
                                                    "id": 1753343323302,
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
                                                    "vueKey": 1753343323302,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343323302,
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
                                                    "vueKey": 1753343323302,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343323302,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 38,
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
                                    "vueKey": 1753343323302,
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
                                "highlight": false,
                                "highlightColor": "red",
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
                    "id": 1753275370832,
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
                    "msSymbolContainerArray": [
                        {
                            "id": 1753275370832,
                            "msSymbolArray": [
                                {
                                    "id": 1753275370832,
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
                            "msTypeName": 5
                        }
                    ]
                },
                {
                    "id": 1753343317334,
                    "msTypeName": 3,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1753343317334,
                    "msSymbolContainerArray": [
                        {
                            "id": 1753343317334,
                            "msSymbolArray": [
                                {
                                    "id": 1753343317334,
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
                                    "vueKey": 1753343317334,
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
                            "vueKey": 1753343317334,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753343326089,
                            "msSymbolArray": [
                                {
                                    "id": 1753343326089,
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
                                            "id": 1753343326089,
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
                                            "vueKey": 1753343326089,
                                            "direction": "up",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753343326089,
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
                                            "vueKey": 1753343326089,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1
                                        }
                                    ],
                                    "vueKey": 1753343326089,
                                    "beamId": "2",
                                    "type": "noteHead",
                                    "region": 38,
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
                            "vueKey": 1753343326089,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753343324720,
                            "msSymbolArray": [
                                {
                                    "id": 1753343324719,
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
                                            "id": 1753343324719,
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
                                            "vueKey": 1753343324719,
                                            "direction": "up",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753343324720,
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
                                            "vueKey": 1753343324720,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1
                                        }
                                    ],
                                    "vueKey": 1753343324719,
                                    "beamId": "2",
                                    "type": "noteHead",
                                    "region": 41,
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
                            "vueKey": 1753343324720,
                            "msTypeName": 5
                        },
                        {
                            "id": 1753343323302,
                            "msSymbolArray": [
                                {
                                    "id": 1753343323302,
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
                                            "id": 1753343323302,
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
                                            "vueKey": 1753343323302,
                                            "direction": "up",
                                            "type": "noteBar"
                                        },
                                        {
                                            "id": 1753343323302,
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
                                            "vueKey": 1753343323302,
                                            "type": "noteTail",
                                            "chronaxie": 16,
                                            "beamType": 1
                                        }
                                    ],
                                    "vueKey": 1753343323302,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 38,
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
                            "vueKey": 1753343323302,
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
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "msSymbolContainerArray": []
                }
            ]
        },
        "8": {
            "id": 8,
            "msTypeName": 3,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 2
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "bindingStartId": [],
            "bindingEndId": [],
            "msSymbolContainerArray": []
        },
        "1752547441001": {
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1752547455408": {
            "id": 1752547455408,
            "msSymbolArray": [
                {
                    "id": 1752547455407,
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
                            "id": 1752547455408,
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
                "msSymbolContainerIndex": 2
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "msTypeName": 5
        },
        "1752547455407": {
            "id": 1752547455407,
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
                    "id": 1752547455408,
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
                    "type": "noteBar"
                }
            ],
            "type": "noteHead",
            "region": 40,
            "chronaxie": 4,
            "computed": {}
        },
        "1752547444618": {
            "id": 1752547444618,
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
                    "id": 1752547444618,
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
                    "type": "noteBar"
                }
            ],
            "type": "noteHead",
            "region": 40,
            "chronaxie": 4,
            "computed": {}
        },
        "1751898743265": {
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
                "highlight": false,
                "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "msTypeName": 5
                }
            ]
        },
        "1752547449816": {
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1752547451912": {
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
                        "highlight": false,
                        "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "msTypeName": 5
        },
        "1752547451911": {
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1752547450984": {
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
                        "highlight": false,
                        "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "msTypeName": 5
        },
        "1752547450983": {
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1752547448382": {
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
                "highlight": false,
                "highlightColor": "red",
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
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1752983190148": {
            "id": 1752983190148,
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
            "msSymbolArray": [
                {
                    "id": 1752983190148,
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
                    "type": "noteBar"
                },
                {
                    "id": 1752983190148,
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
                    "type": "noteTail",
                    "chronaxie": 16
                }
            ],
            "type": "noteHead",
            "region": 39,
            "chronaxie": 16,
            "computed": {}
        },
        "1752983191980": {
            "id": 1752983191980,
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
                    "id": 1752983191980,
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
                    "type": "noteBar"
                },
                {
                    "id": 1752983191980,
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
                    "type": "noteTail",
                    "chronaxie": 16
                }
            ],
            "type": "noteHead",
            "region": 42,
            "chronaxie": 16,
            "computed": {}
        },
        "1753274678267": {
            "id": 1753274678267,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 0,
                "msSymbolIndex": 1
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
                    "id": 1753274678267,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
                        "msSymbolContainerIndex": 0,
                        "msSymbolIndex": 1
                    },
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
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
        },
        "1753274692060": {
            "id": 1753274692060,
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
                    "id": 1753274692060,
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
                    "type": "noteBar"
                }
            ],
            "type": "noteHead",
            "region": 42,
            "chronaxie": 4,
            "computed": {}
        },
        "1753274703517": {
            "id": 1753274703517,
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
                    "id": 1753274703517,
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
                    "type": "noteBar"
                },
                {
                    "id": 1753274703517,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 41,
            "chronaxie": 16,
            "computed": {}
        },
        "1753274704923": {
            "id": 1753274704923,
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
                    "id": 1753274704923,
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
                    "type": "noteBar"
                },
                {
                    "id": 1753274704923,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 44,
            "chronaxie": 16,
            "computed": {}
        },
        "1753274707348": {
            "id": 1753274707348,
            "msTypeName": 6,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 1,
                "msSymbolContainerIndex": 4,
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
                    "id": 1753274707348,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1,
                        "msSymbolContainerIndex": 4,
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
                    "type": "noteBar"
                },
                {
                    "id": 1753274707348,
                    "msTypeName": 6,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1,
                        "msSymbolContainerIndex": 4,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 43,
            "chronaxie": 16,
            "computed": {}
        },
        "1753275370832": {
            "id": 1753275370832,
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
            "type": "barLine",
            "barLineType": 1
        },
        "1753275376056": {
            "id": 1753275376056,
            "msSymbolArray": [
                {
                    "id": 1753275376056,
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
                            "id": 1753275376056,
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
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "type": "noteHead",
                    "region": 39,
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
            "msTypeName": 5
        },
        "1753275384848": {
            "id": 1753275384848,
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
                    "id": 1753275384848,
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
                    "direction": "up",
                    "type": "noteBar"
                },
                {
                    "id": 1753275384848,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 39,
            "chronaxie": 16,
            "beamId": "2"
        },
        "1753275386896": {
            "id": 1753275386896,
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
                    "id": 1753275386896,
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
                    "direction": "up",
                    "type": "noteBar"
                },
                {
                    "id": 1753275386896,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 44,
            "chronaxie": 16,
            "beamId": "2"
        },
        "1753275387848": {
            "id": 1753275387848,
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
                    "id": 1753275387848,
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
                    "direction": "up",
                    "type": "noteBar",
                    "vueKey": 1753343057113
                },
                {
                    "id": 1753275387848,
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
                    "type": "noteTail",
                    "chronaxie": 16,
                    "beamId": -1,
                    "beamType": 1
                }
            ],
            "type": "noteHead",
            "region": 37,
            "chronaxie": 16
        },
        "1753343317334": {
            "id": 1753343317334,
            "msTypeName": 3,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 1
            },
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1753343317334,
            "msSymbolContainerArray": [
                {
                    "id": 1753343317334,
                    "msSymbolArray": [
                        {
                            "id": 1753343317334,
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
                            "vueKey": 1753343317334,
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
                    "vueKey": 1753343317334,
                    "msTypeName": 5
                },
                {
                    "id": 1753343326089,
                    "msSymbolArray": [
                        {
                            "id": 1753343326089,
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
                                    "id": 1753343326089,
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
                                    "vueKey": 1753343326089,
                                    "direction": "up",
                                    "type": "noteBar"
                                },
                                {
                                    "id": 1753343326089,
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
                                    "vueKey": 1753343326089,
                                    "type": "noteTail",
                                    "chronaxie": 16,
                                    "beamType": 1
                                }
                            ],
                            "vueKey": 1753343326089,
                            "beamId": "2",
                            "type": "noteHead",
                            "region": 38,
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
                    "vueKey": 1753343326089,
                    "msTypeName": 5
                },
                {
                    "id": 1753343324720,
                    "msSymbolArray": [
                        {
                            "id": 1753343324719,
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
                                    "id": 1753343324719,
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
                                    "vueKey": 1753343324719,
                                    "direction": "up",
                                    "type": "noteBar"
                                },
                                {
                                    "id": 1753343324720,
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
                                    "vueKey": 1753343324720,
                                    "type": "noteTail",
                                    "chronaxie": 16,
                                    "beamType": 1
                                }
                            ],
                            "vueKey": 1753343324719,
                            "beamId": "2",
                            "type": "noteHead",
                            "region": 41,
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
                    "vueKey": 1753343324720,
                    "msTypeName": 5
                },
                {
                    "id": 1753343323302,
                    "msSymbolArray": [
                        {
                            "id": 1753343323302,
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
                                    "id": 1753343323302,
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
                                    "vueKey": 1753343323302,
                                    "direction": "up",
                                    "type": "noteBar"
                                },
                                {
                                    "id": 1753343323302,
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
                                    "vueKey": 1753343323302,
                                    "type": "noteTail",
                                    "chronaxie": 16,
                                    "beamType": 1
                                }
                            ],
                            "vueKey": 1753343323302,
                            "beamId": -1,
                            "type": "noteHead",
                            "region": 38,
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
                    "vueKey": 1753343323302,
                    "msTypeName": 5
                }
            ]
        },
        "1753343323302": {
            "id": 1753343323302,
            "msSymbolArray": [
                {
                    "id": 1753343323302,
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
                            "id": 1753343323302,
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
                            "vueKey": 1753343323302,
                            "direction": "up",
                            "type": "noteBar"
                        },
                        {
                            "id": 1753343323302,
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
                            "vueKey": 1753343323302,
                            "type": "noteTail",
                            "chronaxie": 16,
                            "beamType": 1
                        }
                    ],
                    "vueKey": 1753343323302,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 38,
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
            "vueKey": 1753343323302,
            "msTypeName": 5
        },
        "1753343324720": {
            "id": 1753343324720,
            "msSymbolArray": [
                {
                    "id": 1753343324719,
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
                            "id": 1753343324719,
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
                            "vueKey": 1753343324719,
                            "direction": "up",
                            "type": "noteBar"
                        },
                        {
                            "id": 1753343324720,
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
                            "vueKey": 1753343324720,
                            "type": "noteTail",
                            "chronaxie": 16,
                            "beamType": 1
                        }
                    ],
                    "vueKey": 1753343324719,
                    "beamId": "2",
                    "type": "noteHead",
                    "region": 41,
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
            "vueKey": 1753343324720,
            "msTypeName": 5
        },
        "1753343326089": {
            "id": 1753343326089,
            "msSymbolArray": [
                {
                    "id": 1753343326089,
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
                            "id": 1753343326089,
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
                            "vueKey": 1753343326089,
                            "direction": "up",
                            "type": "noteBar"
                        },
                        {
                            "id": 1753343326089,
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
                            "vueKey": 1753343326089,
                            "type": "noteTail",
                            "chronaxie": 16,
                            "beamType": 1
                        }
                    ],
                    "vueKey": 1753343326089,
                    "beamId": "2",
                    "type": "noteHead",
                    "region": 38,
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
            "vueKey": 1753343326089,
            "msTypeName": 5
        }
    },
    "measureHeight": 50,
    "widthDynamicRatio": 0.4,
    "spanSymbolArray": [],
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
                            "id": 1753275370832,
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
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753275370832,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753275370832,
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
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1753343317334,
                            "msTypeName": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1753343317334,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1753343317334,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343317334,
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
                                            "vueKey": 1753343317334,
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
                                    "vueKey": 1753343317334,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343326089,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343326089,
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
                                                    "id": 1753343326089,
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
                                                    "vueKey": 1753343326089,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343326089,
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
                                                    "vueKey": 1753343326089,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343326089,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 38,
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
                                    "vueKey": 1753343326089,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343324720,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343324719,
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
                                                    "id": 1753343324719,
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
                                                    "vueKey": 1753343324719,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343324720,
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
                                                    "vueKey": 1753343324720,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343324719,
                                            "beamId": "2",
                                            "type": "noteHead",
                                            "region": 41,
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
                                    "vueKey": 1753343324720,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1753343323302,
                                    "msSymbolArray": [
                                        {
                                            "id": 1753343323302,
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
                                                    "id": 1753343323302,
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
                                                    "vueKey": 1753343323302,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                },
                                                {
                                                    "id": 1753343323302,
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
                                                    "vueKey": 1753343323302,
                                                    "type": "noteTail",
                                                    "chronaxie": 16,
                                                    "beamType": 1
                                                }
                                            ],
                                            "vueKey": 1753343323302,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 38,
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
                                    "vueKey": 1753343323302,
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                "highlight": false,
                                "highlightColor": "red",
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
                                                "highlight": false,
                                                "highlightColor": "red",
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
                                                        "highlight": false,
                                                        "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                                                "highlight": false,
                                                "highlightColor": "red",
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
                                                        "highlight": false,
                                                        "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                                                "highlight": false,
                                                "highlightColor": "red",
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
                                                        "highlight": false,
                                                        "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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
                                                "highlight": false,
                                                "highlightColor": "red",
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
                                                        "highlight": false,
                                                        "highlightColor": "red",
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
                                        "highlight": false,
                                        "highlightColor": "red",
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