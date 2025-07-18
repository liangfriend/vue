/*
* 对changeStructure更改高级的封装，用于用户自定义编辑模式
* */
import {
    measureTemplate, msSymbolContainerTemplate,
    msSymbolTemplate,
    multipleStavesTemplate,
    singleStaffTemplate
} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    BarLineTypeEnum,
    ClefEnum, KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    addBarLineToMeasure,
    addClefToMeasure, addKeySignatureToMeasure,
    addMeasure,
    addMultipleStaves,
    addSingleStaff, addTimeSignatureToMeasure, changeBarLine, changeClef, changeKeySignature, changeTimeSignature,
    removeMeasure,
    removeMeasureRelatedSpanSymbol,
    removeMultipleStaves,
    removeMultipleStavesRelatedSpanSymbol,
    removeSingleStaff,
    removeSingleStaffRelatedSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {
    getDataWithIndex,
    getMultipleStavesRelatedSpanSymbolList,
    getMusicScoreRelatedSpanSymbolList,
    getSingleStaffRelatedSpanSymbolList,
    setMeasureArrayIndex,
    setMultipleStavesIndex,
    setSingleStaffArrayIndex,
    updateSpanSymbolView
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    BarLine,
    ClefMsSymbol, KeySignatureMsSymbol,
    Measure,
    MultipleStaves,
    MusicScore,
    SingleStaff, TimeSignature, TimeSignatureMsSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import KeySignature from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/keySignature.vue";


// 关联数据更新


// 基本功能


// 小节功能
export function insertMeasure(measure: Measure, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newMeasure = measureTemplate({})
    if (!measure) return console.error("缺乏定位元素，小节添加失败")
    addMeasure(newMeasure, measure, musicScoreData, position)

}

export function deleteMeasure(measure: Measure, musicScoreData: MusicScore) {
    // 如果是单谱表内最后的小节，则不可以删除
    const singleStaff = getDataWithIndex(measure.index, musicScoreData).singleStaff
    if (singleStaff && singleStaff.measureArray.length <= 1) return console.error("")
    removeMeasure(measure, musicScoreData)
}

export function insertClef(clef: ClefEnum, measure: Measure, musicScore: MusicScore) {
    const index = measure.index
    // 如果是单谱表内第一个小节
    if (index.measureIndex === 0) {
        const clefSymbol = measure.msSymbolContainerArray.find((msSymbolContainer) => {
            return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef_f
        })?.msSymbolArray[0] as (ClefMsSymbol | undefined)
        if (clefSymbol) {
            changeClef(clefSymbol, clef, musicScore)
        } else { // clef不存在则添加clef
            const newClef = msSymbolTemplate({type: MsSymbolTypeEnum.clef_f, clef})
            const newMsSymbolContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.frontFixed})
            newMsSymbolContainer.msSymbolArray.push(newClef)
            addClefToMeasure(newMsSymbolContainer, measure, musicScore)
        }
    } else { // 非第一个单谱表，要在前一个小节加上结尾谱号
        const index = JSON.parse(JSON.stringify(measure.index))
        index.measureIndex -= 1
        const preMeasure = getDataWithIndex(index, musicScore).measure
        if (!preMeasure) return console.error("找不到当前小节的前一个小节，谱号添加失败")
        const clefSymbol = preMeasure.msSymbolContainerArray.find((msSymbolContainer) => {
            return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef
        })?.msSymbolArray[0] as (ClefMsSymbol | undefined)
        if (clefSymbol) {
            changeClef(clefSymbol, clef, musicScore)
        } else { // clef不存在则添加clef
            const newClef = msSymbolTemplate({type: MsSymbolTypeEnum.clef, clef})
            const newMsSymbolContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.rearFixed})
            newMsSymbolContainer.msSymbolArray.push(newClef)
            addClefToMeasure(newMsSymbolContainer, preMeasure, musicScore)
        }
    }
}

export function insertKeySignature(keySignature: KeySignatureEnum, measure: Measure, musicScore: MusicScore) {
    const keySignatureSymbol = measure.msSymbolContainerArray.find((msSymbolContainer) => {
        return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.keySignature
    })?.msSymbolArray[0] as (KeySignatureMsSymbol | undefined)
    if (keySignatureSymbol) {
        changeKeySignature(keySignatureSymbol, keySignature, musicScore)
    } else { // keySignature不存在则添加keySignature
        const newKeySignature = msSymbolTemplate({type: MsSymbolTypeEnum.keySignature, keySignature})
        const newMsSymbolContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.frontFixed})
        newMsSymbolContainer.msSymbolArray.push(newKeySignature)
        addKeySignatureToMeasure(newMsSymbolContainer, measure, musicScore)
    }
}

export function insertTimeSignature(timeSignature: TimeSignature, measure: Measure, musicScore: MusicScore) {
    const timeSignatureSymbol = measure.msSymbolContainerArray.find((msSymbolContainer) => {
        return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.timeSignature
    })?.msSymbolArray[0] as (TimeSignatureMsSymbol | undefined)
    if (timeSignatureSymbol) {
        changeTimeSignature(timeSignatureSymbol, timeSignature, musicScore)
    } else { // keySignature不存在则添加keySignature
        const newKeySignature = msSymbolTemplate({type: MsSymbolTypeEnum.timeSignature, timeSignature})
        const newMsSymbolContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.frontFixed})
        newMsSymbolContainer.msSymbolArray.push(newKeySignature)

        addTimeSignatureToMeasure(newMsSymbolContainer, measure, musicScore)
    }
}

// 添加小节线
export function insertBarLine(barLineType: BarLineTypeEnum, measure: Measure, musicScore: MusicScore) {
    const isFront = [BarLineTypeEnum.reverseFinal, BarLineTypeEnum.startRepeatSign].includes(barLineType)
    if (isFront) {
        const barLineSymbol = measure.msSymbolContainerArray.find((msSymbolContainer) => {
            return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine_f
        })?.msSymbolArray[0] as (BarLine | undefined)
        if (barLineSymbol) {
            changeBarLine(barLineSymbol, barLineType, musicScore)
        } else { // barLine_f不存在则添加keySignature
            const newBarLine = msSymbolTemplate({type: MsSymbolTypeEnum.barLine_f, barLineType})
            const newBarLineContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.frontFixed})
            newBarLineContainer.msSymbolArray.push(newBarLine)
            addBarLineToMeasure(newBarLineContainer, measure, musicScore)
        }

    } else {
        const barLineSymbol = measure.msSymbolContainerArray.find((msSymbolContainer) => {
            return msSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine
        })?.msSymbolArray[0] as (BarLine | undefined)
        if (barLineSymbol) {
            changeBarLine(barLineSymbol, barLineType, musicScore)
        } else { // keySignature不存在则添加keySignature
            const newKeySignature = msSymbolTemplate({type: MsSymbolTypeEnum.barLine, barLineType})
            const newMsSymbolContainer = msSymbolContainerTemplate({type: MsSymbolContainerTypeEnum.rearFixed})
            newMsSymbolContainer.msSymbolArray.push(newKeySignature)
            addBarLineToMeasure(newMsSymbolContainer, measure, musicScore)
        }
    }

}

// 单谱表功能
export function insertSingleStaff(singleStaff: SingleStaff, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newSingleStaff = singleStaffTemplate({})
    if (!singleStaff) return console.error("缺乏定位元素，单谱表添加失败")
    addSingleStaff(newSingleStaff, singleStaff, musicScoreData, position)
}

export function deleteSingleStaff(singleStaff: SingleStaff, musicScoreData: MusicScore) {
    // 如果是复谱表内最后的单谱表，则不可以删除
    const multipleStaves = getDataWithIndex(singleStaff.index, musicScoreData).multipleStaves
    if (multipleStaves && multipleStaves.singleStaffArray.length <= 1) return console.error("")

    removeSingleStaff(singleStaff, musicScoreData)
}

// 复谱表功能
export function insertMultipleStaves(multipleStaves: MultipleStaves, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newMultipleStaves = multipleStavesTemplate({})
    if (!multipleStaves) return console.error("缺乏定位元素，复谱表添加失败")
    addMultipleStaves(newMultipleStaves, multipleStaves, musicScoreData, position)
}


export function deleteMultipleStaves(multipleStaves: MultipleStaves, musicScoreData: MusicScore) {
    // 如果是谱表内最后的复谱表，则不可以删除
    if (musicScoreData.multipleStavesArray.length <= 1) return console.error("")
    removeMultipleStaves(multipleStaves, musicScoreData)
}
