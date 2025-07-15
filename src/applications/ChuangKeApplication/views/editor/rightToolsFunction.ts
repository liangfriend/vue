import {
    measureTemplate,
    multipleStavesTemplate,
    singleStaffTemplate
} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {MsTypeNameEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    addMeasure,
    addMultipleStaves,
    addSingleStaff,
    removeMeasure,
    removeMeasureRelatedSpanSymbol,
    removeMultipleStaves,
    removeMultipleStavesRelatedSpanSymbol,
    removeSingleStaff,
    removeSingleStaffRelatedSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {
    getDataWithIndex,
    getSpanSymbolIdSetInMultipleStaves,
    getSpanSymbolIdSetInMusicScore,
    getSpanSymbolIdSetInSingleStaff,
    setMeasureArrayIndex,
    setMultipleStavesIndex,
    setSingleStaffArrayIndex,
    updateSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    Measure,
    MsType,
    MultipleStaves,
    MusicScore,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {ref} from "vue";


// 关联数据更新
function updateMeasureRelatedData(measure: Measure, musicScoreData: MusicScore) {
    const singleStaff = getDataWithIndex(measure.index, musicScoreData).singleStaff
    if (!singleStaff) return console.error("找不到单谱表")
    setMeasureArrayIndex(singleStaff)
    const spanSymbolSet = getSpanSymbolIdSetInSingleStaff(singleStaff, musicScoreData)
    updateSpanSymbol(spanSymbolSet, musicScoreData)
}

function updateSingleStaffRelatedData(singleStaff: SingleStaff, musicScoreData: MusicScore) {
    const multipleStaves = getDataWithIndex(singleStaff.index, musicScoreData).multipleStaves
    if (!multipleStaves) return console.error("找不到复谱表")
    setSingleStaffArrayIndex(multipleStaves)
    const spanSymbolSet = getSpanSymbolIdSetInMultipleStaves(multipleStaves, musicScoreData)
    updateSpanSymbol(spanSymbolSet, musicScoreData)
}

function updateMultipleStavesRelatedData(multipleStaves: MultipleStaves, musicScoreData: MusicScore) {

    setMultipleStavesIndex(musicScoreData)
    const spanSymbolSet = getSpanSymbolIdSetInMusicScore(musicScoreData)
    updateSpanSymbol(spanSymbolSet, musicScoreData)
}


// 基本功能


// 小节功能
export function insertMeasure(measure: Measure, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newMeasure = measureTemplate({})
    if (!measure) return console.error("缺乏定位元素，小节添加失败")
    addMeasure(newMeasure, measure, musicScoreData, position)
    updateMeasureRelatedData(measure, musicScoreData)
}

export function deleteMeasure(measure: Measure, musicScoreData: MusicScore) {
    // 如果是单谱表内最后的小节，则不可以删除
    const singleStaff = getDataWithIndex(measure.index, musicScoreData).singleStaff
    if (singleStaff && singleStaff.measureArray.length <= 1) return console.error("")

    removeMeasure(measure, musicScoreData)
    removeMeasureRelatedSpanSymbol(measure, musicScoreData)
    updateMeasureRelatedData(measure, musicScoreData)
}

// 单谱表功能
export function insertSingleStaff(singleStaff: SingleStaff, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newSingleStaff = singleStaffTemplate({})
    if (!singleStaff) return console.error("缺乏定位元素，单谱表添加失败")
    addSingleStaff(newSingleStaff, singleStaff, musicScoreData, position)
    updateSingleStaffRelatedData(singleStaff, musicScoreData)
}

export function deleteSingleStaff(singleStaff: SingleStaff, musicScoreData: MusicScore) {
    // 如果是复谱表内最后的单谱表，则不可以删除
    const multipleStaves = getDataWithIndex(singleStaff.index, musicScoreData).multipleStaves
    if (multipleStaves && multipleStaves.singleStaffArray.length <= 1) return console.error("")

    removeSingleStaff(singleStaff, musicScoreData)
    removeSingleStaffRelatedSpanSymbol(singleStaff, musicScoreData)
    updateSingleStaffRelatedData(singleStaff, musicScoreData)
}

// 复谱表功能
export function insertMultipleStaves(multipleStaves: MultipleStaves, musicScoreData: MusicScore, position: 'after' | 'before' = 'after') {
    const newMultipleStaves = multipleStavesTemplate({})
    if (!multipleStaves) return console.error("缺乏定位元素，复谱表添加失败")
    addMultipleStaves(newMultipleStaves, multipleStaves, musicScoreData, position)
    updateMultipleStavesRelatedData(multipleStaves, musicScoreData)
}


export function deleteMultipleStaves(multipleStaves: MultipleStaves, musicScoreData: MusicScore) {
    // 如果是谱表内最后的复谱表，则不可以删除
    if (musicScoreData.multipleStavesArray.length <= 1) return console.error("")
    removeMultipleStaves(multipleStaves, musicScoreData)
    removeMultipleStavesRelatedSpanSymbol(multipleStaves, musicScoreData)
    updateMultipleStavesRelatedData(multipleStaves, musicScoreData)
}
