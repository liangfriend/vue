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
    MsSymbolContainer,
    MultipleStaves,
    SingleStaff
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

export function measureTemplate(options: { barLineType?: BarlineTypeEnum }): Measure {


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
    // 小节必须有结束小节线
    const barLine: MsSymbol = msSymbolTemplate({
        type: MsSymbolTypeEnum.barline,
        barLineType: options.barLineType || BarlineTypeEnum.single
    });
    const container = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.rearFixed})
    container.msSymbolArray.push(barLine)
    measure.msSymbolContainerArray.push(container)


    return measure;
}

// 会默认添加一个小节
export function singleStaffTemplate(options: {}): SingleStaff {
    const singleStaff: SingleStaff = {
        id: Date.now(),
        msTypeName: MsTypeNameEnum.SingleStaff,
        index: {},
        bindingStartId: [],
        bindingEndId: [],
        singleStaffPaddingTop: 30,
        singleStaffPaddingBottom: 30,
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'transparent',
        },
        singleStaffMarginBottom: 30,
        measureArray: []
    }
    const measure = measureTemplate({})
    singleStaff.measureArray.push(measure)


    return singleStaff;
}

// 会默认添加一个带小节的单谱表
export function multipleStavesTemplate(options: {}): MultipleStaves {
    const multipleStaves: MultipleStaves = {
        id: Date.now(),
        msTypeName: MsTypeNameEnum.MultipStaves,
        index: {},
        multipleStavesPaddingTop: 60,
        multipleStavesPaddingBottom: 60,
        multipleStavesMarginBottom: 60,
        options: {
            hightlight: false,
            hightlightColor: 'red',
            color: 'transparent',
        },
        singleStaffArray: []
    }
    const singleStaff = singleStaffTemplate({})
    multipleStaves.singleStaffArray.push(singleStaff)


    return multipleStaves;
}