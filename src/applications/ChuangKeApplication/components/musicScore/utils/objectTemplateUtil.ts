import {
    ChronaxieEnum, MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MsTypeNameEnum, MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    MsSymbol, MsSymbolContainer,
    musicScoreIndex,
    MusicScoreOptions
} from "@/applications/ChuangKeApplication/components/musicScore/types";

export function msSymbolTemplate(options: { type?: MsSymbolTypeEnum, region?: MusicScoreRegionEnum }): MsSymbol {
    const msSymbol: MsSymbol = {
        id: Date.now(),
        msTypeName: MsTypeNameEnum.MsSymbol,
        index: {},
        type: MsSymbolTypeEnum.noteHead,
        region: options.region || MusicScoreRegionEnum.space_3,
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
    }
    switch (options.type) {
        case MsSymbolTypeEnum.noteHead: {
            return msSymbol
        }
    }
    return msSymbol;
}

export function msSymbolContainerTemplate(options: { type?: MsSymbolContainerTypeEnum }): MsSymbolContainer {
    const msSymbolContainer: MsSymbolContainer = {
        id: Date.now(),
        msSymbolArray: [],
        type: options.type || MsSymbolContainerTypeEnum.variable,
        index: {},
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'black',
        },
        msTypeName: MsTypeNameEnum.MsSymbolContainer,
    }

    return msSymbolContainer;
}