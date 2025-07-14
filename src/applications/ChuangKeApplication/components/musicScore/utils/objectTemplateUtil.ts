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
    chronaxie?: ChronaxieEnum,
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
            console.log('chicken', options.chronaxie)
            // chronaxie不存在默认为四分音符，添加符杠
            if (!options.chronaxie || ![ChronaxieEnum.whole].includes(options.chronaxie)) {
                const noteBar = msSymbolTemplate({
                    type: MsSymbolTypeEnum.noteBar
                })
                baseMsSymbol.msSymbolArray.push(noteBar)

            }
            // 如果不为全，二分，四分音符，添加符尾
            if (options.chronaxie && ![ChronaxieEnum.whole, ChronaxieEnum.half, ChronaxieEnum.quarter].includes(options.chronaxie)) {

                const noteTail = msSymbolTemplate({
                    type: MsSymbolTypeEnum.noteTail,
                    chronaxie: options.chronaxie || ChronaxieEnum.quarter
                })
                baseMsSymbol.msSymbolArray.push(noteTail)
            }
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteHead,
                region: options.region || MusicScoreRegionEnum.space_3,
                chronaxie: options.chronaxie || ChronaxieEnum.quarter,
                computed: {},
            }
        }
        case MsSymbolTypeEnum.barline: {
            const barLineType = options.barLineType ?? BarlineTypeEnum.single
            if (BarlineTypeEnum.endRepeatSign === barLineType || BarlineTypeEnum.startRepeatSign === barLineType) {
                return {
                    ...baseMsSymbol,
                    type: MsSymbolTypeEnum.barline,
                    barlineType: barLineType,
                    loopCount: 2
                }
            } else {
                return {
                    ...baseMsSymbol,
                    type: MsSymbolTypeEnum.barline,
                    barlineType: barLineType
                }
            }

        }
        case MsSymbolTypeEnum.noteBar: {
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteBar,
            }
        }
        case MsSymbolTypeEnum.noteTail: {
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteTail,
                chronaxie: options.chronaxie || ChronaxieEnum.quarter,
            }
        }
        default: {
            return {
                ...baseMsSymbol,
                type: MsSymbolTypeEnum.noteHead,
                region: options.region || MusicScoreRegionEnum.space_3,
                chronaxie: options.chronaxie || ChronaxieEnum.quarter,
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