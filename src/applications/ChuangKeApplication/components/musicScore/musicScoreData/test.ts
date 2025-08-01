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
        "1754052470541": {
            "id": 1754052470541,
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
            "vueKey": 1754052470536,
            "singleStaffArray": [
                {
                    "id": 1754052470540,
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
                    "vueKey": 1754052470536,
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1754052482635,
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
                            "vueKey": 1754052482632,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754058092430,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754058092429,
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
                                            "vueKey": 1754058092428,
                                            "type": "clef",
                                            "clef": 3
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754058092428,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052482634,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052482633,
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
                                            "vueKey": 1754052482632,
                                            "type": "barLine",
                                            "barLineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052482632,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1754052482987,
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
                            "vueKey": 1754052482984,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754052482986,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052482985,
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
                                            "vueKey": 1754052482984,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052482984,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052487171,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052487170,
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
                                            "bindingStartId": [
                                                1754052493008
                                            ],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754052487170,
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
                                                    "vueKey": 1754052487169,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052487169,
                                            "beamId": -1,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052487169,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052489979,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052489978,
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
                                            "bindingEndId": [
                                                1754052493008
                                            ],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754052489978,
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
                                                    "vueKey": 1754052489977,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052489977,
                                            "beamId": -1,
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
                                        "msSymbolContainerIndex": 2
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052489977,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052488403,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052488402,
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
                                                    "id": 1754052488402,
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
                                                    "vueKey": 1754052488401,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052488401,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 41,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052488401,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1754052470539,
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
                            "vueKey": 1754052470536,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754052470538,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052470537,
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
                                            "vueKey": 1754052470536,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052470536,
                                    "msTypeName": 5
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "1754052470540": {
            "id": 1754052470540,
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
            "vueKey": 1754052470536,
            "singleStaffMarginBottom": 30,
            "measureArray": [
                {
                    "id": 1754052482635,
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
                    "vueKey": 1754052482632,
                    "msSymbolContainerArray": [
                        {
                            "id": 1754058092430,
                            "msSymbolArray": [
                                {
                                    "id": 1754058092429,
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
                                    "vueKey": 1754058092428,
                                    "type": "clef",
                                    "clef": 3
                                }
                            ],
                            "type": 2,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
                                "msSymbolContainerIndex": 0
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754058092428,
                            "msTypeName": 5
                        },
                        {
                            "id": 1754052482634,
                            "msSymbolArray": [
                                {
                                    "id": 1754052482633,
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
                                    "vueKey": 1754052482632,
                                    "type": "barLine",
                                    "barLineType": 1
                                }
                            ],
                            "type": 2,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 0,
                                "msSymbolContainerIndex": 1
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052482632,
                            "msTypeName": 5
                        }
                    ]
                },
                {
                    "id": 1754052482987,
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
                    "vueKey": 1754052482984,
                    "msSymbolContainerArray": [
                        {
                            "id": 1754052482986,
                            "msSymbolArray": [
                                {
                                    "id": 1754052482985,
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
                                    "vueKey": 1754052482984,
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
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052482984,
                            "msTypeName": 5
                        },
                        {
                            "id": 1754052487171,
                            "msSymbolArray": [
                                {
                                    "id": 1754052487170,
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
                                    "bindingStartId": [
                                        1754052493008
                                    ],
                                    "bindingEndId": [],
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052487170,
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
                                            "vueKey": 1754052487169,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1754052487169,
                                    "beamId": -1,
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
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052487169,
                            "msTypeName": 5
                        },
                        {
                            "id": 1754052489979,
                            "msSymbolArray": [
                                {
                                    "id": 1754052489978,
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
                                    "bindingEndId": [
                                        1754052493008
                                    ],
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052489978,
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
                                            "vueKey": 1754052489977,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1754052489977,
                                    "beamId": -1,
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
                                "msSymbolContainerIndex": 2
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052489977,
                            "msTypeName": 5
                        },
                        {
                            "id": 1754052488403,
                            "msSymbolArray": [
                                {
                                    "id": 1754052488402,
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
                                            "id": 1754052488402,
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
                                            "vueKey": 1754052488401,
                                            "direction": "up",
                                            "type": "noteBar"
                                        }
                                    ],
                                    "vueKey": 1754052488401,
                                    "beamId": -1,
                                    "type": "noteHead",
                                    "region": 41,
                                    "chronaxie": 4
                                }
                            ],
                            "type": 3,
                            "index": {
                                "multipleStavesIndex": 0,
                                "singleStaffIndex": 0,
                                "measureIndex": 1,
                                "msSymbolContainerIndex": 3
                            },
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052488401,
                            "msTypeName": 5
                        }
                    ]
                },
                {
                    "id": 1754052470539,
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
                    "vueKey": 1754052470536,
                    "msSymbolContainerArray": [
                        {
                            "id": 1754052470538,
                            "msSymbolArray": [
                                {
                                    "id": 1754052470537,
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
                                    "vueKey": 1754052470536,
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
                            "bindingStartId": [],
                            "bindingEndId": [],
                            "options": {
                                "highlight": false,
                                "highlightColor": "red",
                                "color": "black"
                            },
                            "vueKey": 1754052470536,
                            "msTypeName": 5
                        }
                    ]
                }
            ]
        },
        "1754052482635": {
            "id": 1754052482635,
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
            "vueKey": 1754052482632,
            "msSymbolContainerArray": [
                {
                    "id": 1754058092430,
                    "msSymbolArray": [
                        {
                            "id": 1754058092429,
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
                            "vueKey": 1754058092428,
                            "type": "clef",
                            "clef": 3
                        }
                    ],
                    "type": 2,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
                        "msSymbolContainerIndex": 0
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754058092428,
                    "msTypeName": 5
                },
                {
                    "id": 1754052482634,
                    "msSymbolArray": [
                        {
                            "id": 1754052482633,
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
                            "vueKey": 1754052482632,
                            "type": "barLine",
                            "barLineType": 1
                        }
                    ],
                    "type": 2,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 0,
                        "msSymbolContainerIndex": 1
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052482632,
                    "msTypeName": 5
                }
            ]
        },
        "1754052482634": {
            "id": 1754052482634,
            "msSymbolArray": [
                {
                    "id": 1754052482633,
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
                    "vueKey": 1754052482632,
                    "type": "barLine",
                    "barLineType": 1
                }
            ],
            "type": 2,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 0,
                "msSymbolContainerIndex": 1
            },
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052482632,
            "msTypeName": 5
        },
        "1754052482633": {
            "id": 1754052482633,
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
            "vueKey": 1754052482632,
            "type": "barLine",
            "barLineType": 1
        },
        "1754052482987": {
            "id": 1754052482987,
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
            "vueKey": 1754052482984,
            "msSymbolContainerArray": [
                {
                    "id": 1754052482986,
                    "msSymbolArray": [
                        {
                            "id": 1754052482985,
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
                            "vueKey": 1754052482984,
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
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052482984,
                    "msTypeName": 5
                },
                {
                    "id": 1754052487171,
                    "msSymbolArray": [
                        {
                            "id": 1754052487170,
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
                            "bindingStartId": [
                                1754052493008
                            ],
                            "bindingEndId": [],
                            "msSymbolArray": [
                                {
                                    "id": 1754052487170,
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
                                    "vueKey": 1754052487169,
                                    "direction": "up",
                                    "type": "noteBar"
                                }
                            ],
                            "vueKey": 1754052487169,
                            "beamId": -1,
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
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052487169,
                    "msTypeName": 5
                },
                {
                    "id": 1754052489979,
                    "msSymbolArray": [
                        {
                            "id": 1754052489978,
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
                            "bindingEndId": [
                                1754052493008
                            ],
                            "msSymbolArray": [
                                {
                                    "id": 1754052489978,
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
                                    "vueKey": 1754052489977,
                                    "direction": "up",
                                    "type": "noteBar"
                                }
                            ],
                            "vueKey": 1754052489977,
                            "beamId": -1,
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
                        "msSymbolContainerIndex": 2
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052489977,
                    "msTypeName": 5
                },
                {
                    "id": 1754052488403,
                    "msSymbolArray": [
                        {
                            "id": 1754052488402,
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
                                    "id": 1754052488402,
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
                                    "vueKey": 1754052488401,
                                    "direction": "up",
                                    "type": "noteBar"
                                }
                            ],
                            "vueKey": 1754052488401,
                            "beamId": -1,
                            "type": "noteHead",
                            "region": 41,
                            "chronaxie": 4
                        }
                    ],
                    "type": 3,
                    "index": {
                        "multipleStavesIndex": 0,
                        "singleStaffIndex": 0,
                        "measureIndex": 1,
                        "msSymbolContainerIndex": 3
                    },
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052488401,
                    "msTypeName": 5
                }
            ]
        },
        "1754052482986": {
            "id": 1754052482986,
            "msSymbolArray": [
                {
                    "id": 1754052482985,
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
                    "vueKey": 1754052482984,
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
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052482984,
            "msTypeName": 5
        },
        "1754052482985": {
            "id": 1754052482985,
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
            "vueKey": 1754052482984,
            "type": "barLine",
            "barLineType": 1
        },
        "1754052487171": {
            "id": 1754052487171,
            "msSymbolArray": [
                {
                    "id": 1754052487170,
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
                    "bindingStartId": [
                        1754052493008
                    ],
                    "bindingEndId": [],
                    "msSymbolArray": [
                        {
                            "id": 1754052487170,
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
                            "vueKey": 1754052487169,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1754052487169,
                    "beamId": -1,
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
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052487169,
            "msTypeName": 5
        },
        "1754052487170": {
            "id": 1754052487170,
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
            "bindingStartId": [
                1754052493008
            ],
            "bindingEndId": [],
            "msSymbolArray": [
                {
                    "id": 1754052487170,
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
                    "vueKey": 1754052487169,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1754052487169,
            "beamId": -1,
            "type": "noteHead",
            "region": 39,
            "chronaxie": 4
        },
        "1754052489979": {
            "id": 1754052489979,
            "msSymbolArray": [
                {
                    "id": 1754052489978,
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
                    "bindingEndId": [
                        1754052493008
                    ],
                    "msSymbolArray": [
                        {
                            "id": 1754052489978,
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
                            "vueKey": 1754052489977,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1754052489977,
                    "beamId": -1,
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
                "msSymbolContainerIndex": 2
            },
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052489977,
            "msTypeName": 5
        },
        "1754052489978": {
            "id": 1754052489978,
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
            "bindingEndId": [
                1754052493008
            ],
            "msSymbolArray": [
                {
                    "id": 1754052489978,
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
                    "vueKey": 1754052489977,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1754052489977,
            "beamId": -1,
            "type": "noteHead",
            "region": 39,
            "chronaxie": 4
        },
        "1754052488403": {
            "id": 1754052488403,
            "msSymbolArray": [
                {
                    "id": 1754052488402,
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
                            "id": 1754052488402,
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
                            "vueKey": 1754052488401,
                            "direction": "up",
                            "type": "noteBar"
                        }
                    ],
                    "vueKey": 1754052488401,
                    "beamId": -1,
                    "type": "noteHead",
                    "region": 41,
                    "chronaxie": 4
                }
            ],
            "type": 3,
            "index": {
                "multipleStavesIndex": 0,
                "singleStaffIndex": 0,
                "measureIndex": 1,
                "msSymbolContainerIndex": 3
            },
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052488401,
            "msTypeName": 5
        },
        "1754052488402": {
            "id": 1754052488402,
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
                    "id": 1754052488402,
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
                    "vueKey": 1754052488401,
                    "direction": "up",
                    "type": "noteBar"
                }
            ],
            "vueKey": 1754052488401,
            "beamId": -1,
            "type": "noteHead",
            "region": 41,
            "chronaxie": 4
        },
        "1754052470539": {
            "id": 1754052470539,
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
            "vueKey": 1754052470536,
            "msSymbolContainerArray": [
                {
                    "id": 1754052470538,
                    "msSymbolArray": [
                        {
                            "id": 1754052470537,
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
                            "vueKey": 1754052470536,
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
                    "bindingStartId": [],
                    "bindingEndId": [],
                    "options": {
                        "highlight": false,
                        "highlightColor": "red",
                        "color": "black"
                    },
                    "vueKey": 1754052470536,
                    "msTypeName": 5
                }
            ]
        },
        "1754052470538": {
            "id": 1754052470538,
            "msSymbolArray": [
                {
                    "id": 1754052470537,
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
                    "vueKey": 1754052470536,
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
            "bindingStartId": [],
            "bindingEndId": [],
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754052470536,
            "msTypeName": 5
        },
        "1754052470537": {
            "id": 1754052470537,
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
            "vueKey": 1754052470536,
            "type": "barLine",
            "barLineType": 1
        }
    },
    "measureHeight": 50,
    "widthDynamicRatio": 0.4,
    "spanSymbolArray": [
        {
            "type": 2,
            "msTypeName": 4,
            "spanSymbolFollowingCategoryEnum": 1,
            "startTargetId": 1754052487170,
            "endTargetId": 1754052489978,
            "id": 1754052493008,
            "rect": {
                "width": 141.82666666666665,
                "left": 372.67333333333335,
                "top": 40,
                "height": 50
            },
            "options": {
                "highlight": false,
                "highlightColor": "red",
                "color": "black"
            },
            "vueKey": 1754058092429
        }
    ],
    "multipleStavesArray": [
        {
            "id": 1754052470541,
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
            "vueKey": 1754052470536,
            "singleStaffArray": [
                {
                    "id": 1754052470540,
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
                    "vueKey": 1754052470536,
                    "singleStaffMarginBottom": 30,
                    "measureArray": [
                        {
                            "id": 1754052482635,
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
                            "vueKey": 1754052482632,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754058092430,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754058092429,
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
                                            "vueKey": 1754058092428,
                                            "type": "clef",
                                            "clef": 3
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 0
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754058092428,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052482634,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052482633,
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
                                            "vueKey": 1754052482632,
                                            "type": "barLine",
                                            "barLineType": 1
                                        }
                                    ],
                                    "type": 2,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 0,
                                        "msSymbolContainerIndex": 1
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052482632,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1754052482987,
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
                            "vueKey": 1754052482984,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754052482986,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052482985,
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
                                            "vueKey": 1754052482984,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052482984,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052487171,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052487170,
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
                                            "bindingStartId": [
                                                1754052493008
                                            ],
                                            "bindingEndId": [],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754052487170,
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
                                                    "vueKey": 1754052487169,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052487169,
                                            "beamId": -1,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052487169,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052489979,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052489978,
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
                                            "bindingEndId": [
                                                1754052493008
                                            ],
                                            "msSymbolArray": [
                                                {
                                                    "id": 1754052489978,
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
                                                    "vueKey": 1754052489977,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052489977,
                                            "beamId": -1,
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
                                        "msSymbolContainerIndex": 2
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052489977,
                                    "msTypeName": 5
                                },
                                {
                                    "id": 1754052488403,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052488402,
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
                                                    "id": 1754052488402,
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
                                                    "vueKey": 1754052488401,
                                                    "direction": "up",
                                                    "type": "noteBar"
                                                }
                                            ],
                                            "vueKey": 1754052488401,
                                            "beamId": -1,
                                            "type": "noteHead",
                                            "region": 41,
                                            "chronaxie": 4
                                        }
                                    ],
                                    "type": 3,
                                    "index": {
                                        "multipleStavesIndex": 0,
                                        "singleStaffIndex": 0,
                                        "measureIndex": 1,
                                        "msSymbolContainerIndex": 3
                                    },
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052488401,
                                    "msTypeName": 5
                                }
                            ]
                        },
                        {
                            "id": 1754052470539,
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
                            "vueKey": 1754052470536,
                            "msSymbolContainerArray": [
                                {
                                    "id": 1754052470538,
                                    "msSymbolArray": [
                                        {
                                            "id": 1754052470537,
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
                                            "vueKey": 1754052470536,
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
                                    "bindingStartId": [],
                                    "bindingEndId": [],
                                    "options": {
                                        "highlight": false,
                                        "highlightColor": "red",
                                        "color": "black"
                                    },
                                    "vueKey": 1754052470536,
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