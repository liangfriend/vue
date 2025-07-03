import {
    BarlineTypeEnum,
    ChronaxieEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MsTypeNameEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    BaseMsSymbol,
    Measure,
    MsSymbol,
    MsSymbolContainer
} from "@/applications/ChuangKeApplication/components/musicScore/types";

export function msSymbolTemplate(options: {
    type?: MsSymbolTypeEnum,
    region?: MusicScoreRegionEnum,
    barLineType?: BarlineTypeEnum
}): MsSymbol {
    const baseMsSymbol: BaseMsSymbol = {
        id: Date.now(),
        msTypeName: MsTypeNameEnum.MsSymbol,
        index: {},
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'black',
        },
        bindingStartId: [],
        bindingEndId: [],
        msSymbolArray: []
    }
    switch (options.type) {
        case MsSymbolTypeEnum.noteHead: {
            return {

                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteHead,
                region: options.region || MusicScoreRegionEnum.space_3,
                chronaxie: ChronaxieEnum.eighth,
                computed: {},
            }
        }
        case MsSymbolTypeEnum.barline: {
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.barline,
                barlineType: options.barLineType ?? BarlineTypeEnum.single
            }
        }
        default: {
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteHead,
                region: options.region || MusicScoreRegionEnum.space_3,
                chronaxie: ChronaxieEnum.eighth,
                computed: {},
            }
        }

    }
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

export function measureTemplate(options: { barLine?: BarlineTypeEnum }): Measure {
    const measure: Measure = {
        id: Date.now(),
        msTypeName: MsTypeNameEnum.Measure,
        index: {},
        bindingStartId: [],
        bindingEndId: [],
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'black',
        },
        msSymbolContainerArray: []
    }
    if (options.barLine) {
        const barLine: MsSymbol = msSymbolTemplate({type: MsSymbolTypeEnum.barline, barLineType: options.barLine});
        const container = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.rearFixed})
        container.msSymbolArray.push(barLine)
        measure.msSymbolContainerArray.push(container)
    }

    return measure;
}