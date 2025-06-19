import type {MusicScore} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    AccidentalEnum,
    ChronaxieEnum,
    ClefEnum, KeySignatureEnum,
    MsSymbolContainerTypeEnum, MsSymbolTypeEnum, MusicalAlphabetEnum,
    MusicScoreShowModeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const data: MusicScore = {
    showMode: MusicScoreShowModeEnum.standardStaff,
    measureHeight: 60,
    multipleStavesArray: [{
        id: 1,
        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        spanSymbolArray: [],
        singleStaffArray: [{
            id: 1,
            bindingStartId: [],
            bindingEndId: [],
            singleStaffPaddingTop: 30,
            singleStaffPaddingBottom: 30,
            singleStaffMarginBottom: 30,
            measureArray: [{
                id: 1,
                bindingStartId: [],
                bindingEndId: [],
                msSymbolContainerArray: [{
                    type: MsSymbolContainerTypeEnum.frontFixed,
                    msSymbolArray: [{
                        id: 1,
                        clef: ClefEnum.treble,
                        type: MsSymbolTypeEnum.clef_f,
                        options: {},
                        bindingStartId: [],
                        bindingEndId: [],
                    }]
                }],
            }]
        }]
    }]
}

export default data;