import {measureTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    BarlineTypeEnum,
    MsTypeNameEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    addMeasure,
    removeMeasure, removeMeasureRelatedSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {
    getDataWithIndex, getSpanSymbolIdSetInSingleStaff,
    setMeasureArrayIndex, updateSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {Measure, MsType, MusicScore} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {ref} from "vue";
import {measureFunctionEnum} from "@/applications/ChuangKeApplication/views/editor/enum.ts";
import {FunctionListItem} from "@/applications/ChuangKeApplication/views/editor/type";

// 关联数据更新
function updateRelatedData(measure: Measure, musicScoreData: MusicScore) {
    const singleStaff = getDataWithIndex(measure.index, musicScoreData).singleStaff
    if (!singleStaff) return console.error("找不到单谱表")
    setMeasureArrayIndex(singleStaff)
    const spanSymbolSet = getSpanSymbolIdSetInSingleStaff(singleStaff, musicScoreData)
    updateSpanSymbol(spanSymbolSet, musicScoreData)
}

export function insertMeasureAfter(measure: Measure, musicScoreData: MusicScore) {
    const newMeasure = measureTemplate({barLine: BarlineTypeEnum.single})
    if (!measure) return console.error("缺乏定位元素，小节添加失败")
    addMeasure(musicScoreData, newMeasure, measure, 'after')
    updateRelatedData(measure, musicScoreData)

}

export function insertMeasureBefore(measure: Measure, musicScoreData: MusicScore) {
    const newMeasure = measureTemplate({barLine: BarlineTypeEnum.single})
    if (!measure) return console.error("缺乏定位元素，小节添加失败")
    addMeasure(musicScoreData, newMeasure, measure, 'before')
    updateRelatedData(measure, musicScoreData)
}

export function deleteMeasure(measure: Measure, musicScoreData: MusicScore) {
    // 如果是单谱表内最后的小节，则不可以删除
    const singleStaff = getDataWithIndex(measure.index, musicScoreData).singleStaff
    if (singleStaff && singleStaff.measureArray.length <= 1) return console.error("")

    removeMeasure(measure, musicScoreData)
    removeMeasureRelatedSpanSymbol(measure, musicScoreData)
    updateRelatedData(measure, musicScoreData)
}


export const measureFunctionList = ref<Array<FunctionListItem>>([{
    name: "向前插入小节",
    key: measureFunctionEnum.insertMeasureBefore
}, {
    name: "向后插入小节",
    key: measureFunctionEnum.insertMeasureAfter
}, {
    name: "删除小节",
    key: measureFunctionEnum.deleteMesure
}])

export function handleRightToolsBtn(item: FunctionListItem, currentSelected: MsType | null, musicScoreData: MusicScore) {
    if (currentSelected?.msTypeName === MsTypeNameEnum.Measure) {
        switch (item.key) {
            case measureFunctionEnum.insertMeasureAfter:
                insertMeasureAfter(currentSelected, musicScoreData)
                break
            case measureFunctionEnum.deleteMesure:
                deleteMeasure(currentSelected, musicScoreData)
                break;
            case measureFunctionEnum.insertMeasureBefore:
                insertMeasureBefore(currentSelected, musicScoreData)
                break
        }
    }

}