// 获取小节相对于musicScore组件的left
import type {
    IndexData,
    Measure,
    MsSymbol,
    MsSymbolContainer,
    MusicScore, NoteHead, NoteTail,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    getDataWithIndex,
    getMainMsSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    getMeasureWidth,
    getMsSymboLContainerWidth,
    getMsSymbolSlotWidth,
    getMsSymbolWidth, getNoteTailWidth,
    getWidthFixedContainerWidthSumInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import {
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    getWidthConstantInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthConstantUtil.ts";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";

export function getMeasureLeftToMusicScore(measure: Measure, musicScore: MusicScore, componentWidth: number): number {
    const indexData: IndexData = getDataWithIndex(measure.index, musicScore);
    if (indexData.singleStaff == null) {
        console.error('没有单谱表信息，无法计算小节left')
        return 0
    }
    let left = 0
    for (let curMeasure of indexData.singleStaff.measureArray) {
        if (curMeasure === measure) {
            return left
        }
        left += getMeasureWidth(curMeasure, indexData.singleStaff, musicScore, componentWidth)
    }
    return left

}

export function getNoteTailLeftToSlot(noteTail: NoteTail, noteHead: NoteHead, msSymbolContainer: MsSymbolContainer
    , measure: Measure, singleStaff: SingleStaff, musicScore: MusicScore, slotWidth: number,
                                      measureWidth: number, componentWidth: number): number {
    const slotLeft = getSlotLeftToContainer(noteHead, msSymbolContainer, measure, singleStaff, musicScore, slotWidth,
        componentWidth, true)
    return -slotLeft

}

export function getMsSymbolLeftToSlot(msSymbol: MsSymbol, musicScore: MusicScore, slotLeft: number, measureWidth: number,
                                      componentWidth: number, isMain: boolean = false) {
    const mainMsSymbol = isMain ? msSymbol : getMainMsSymbol(msSymbol, musicScore)
    const slotWidth = getMsSymbolSlotWidth(msSymbol, musicScore,)
    const width = getMsSymbolWidth(msSymbol, musicScore)
    switch (msSymbol?.type) {
        case MsSymbolTypeEnum.noteHead: { // 音符头居中
            return
        }
        case MsSymbolTypeEnum.noteBar: { // 音符头居中
            if (msSymbol.direction === 'up') {
                return slotWidth - width
            } else {
                return 0

            }
        }
        case MsSymbolTypeEnum.noteTail: { // 音符头居中
            if (mainMsSymbol.type !== MsSymbolTypeEnum.noteHead) {
                console.error("找不到音符头，符尾left计算出错")
                return 0
            }
            const msData = getDataWithIndex(msSymbol.index, musicScore)
            const msSymbolContainer = msData.msSymbolContainer
            const measure = msData.measure
            const singleStaff = msData.singleStaff
            if (!msSymbolContainer || !measure || !singleStaff) {
                console.error("数据索引有误，符尾left计算出错")
                return 0
            }
            return getNoteTailLeftToSlot(msSymbol, mainMsSymbol, msSymbolContainer
                , measure, singleStaff, musicScore, slotWidth,
                measureWidth, componentWidth)

        }
        case MsSymbolTypeEnum.accidental: { // 音符头居中
            return -width
        }
    }
    return 0
}

export function getSlotLeftToContainer(msSymbol: MsSymbol, msSymbolContainer: MsSymbolContainer, measure: Measure, singleStaff: SingleStaff,
                                       musicScore: MusicScore, slotWidth: number, componentWidth: number, isMain: boolean = false): number {
    const mainMsSymbol = isMain ? msSymbol : getMainMsSymbol(msSymbol, musicScore)
    const containerWidth = getMsSymboLContainerWidth(msSymbolContainer, measure, singleStaff, musicScore, componentWidth)
    const measureHeight = musicScore.measureHeight
    switch (mainMsSymbol?.type) {
        case MsSymbolTypeEnum.noteHead: { // 音符头居中
            return containerWidth / 2 - slotWidth / 2
        }
    }
    return 0
}

export function getContainerLeftToMeasure(msSymbolContainer: MsSymbolContainer, measure: Measure,
                                          singleStaff: SingleStaff, musicScore: MusicScore, measureWidth: number) {
    const measureHeight = musicScore.measureHeight
    if (!msSymbolContainer || !measure || !singleStaff) {
        console.error("缺少必要的参数，坐标计算出错")
        return 0
    }
    let left = 0
    const containerType = msSymbolContainer.type
    if ([MsSymbolContainerTypeEnum.frontFixed].includes(containerType)) { // 如果是前置定宽容器 left = 当前符号之前的前置定宽容器的宽度
        left = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'front', msSymbolContainer)
    } else if ([MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {// 如果是后置定宽容器 left =  小节宽度 - 小节定宽容器宽度 + 当前小节之前的定宽容器的宽度

        left = measureWidth - getWidthFixedContainerWidthSumInMeasure(measure, measureHeight) + getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'all', msSymbolContainer)
    } else {  //变宽容器 （小节宽度 - 定宽容器宽度）/ 小节变宽容器宽度系数之和 * 截止当前容器小节的宽度系数之和 + 前置定宽容器宽度之和
        const widthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight)
        const widthConstantInMeasure = getWidthConstantInMeasure(measure)
        const preWidConstantInMeasure = getWidthConstantInMeasure(measure, msSymbolContainer)
        const preWidthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'front')
        left = (measureWidth - widthFixedContainerWidthSumInMeasure) / widthConstantInMeasure * preWidConstantInMeasure + preWidthFixedContainerWidthSumInMeasure
        if (left === 50) {

        }
    }


    return left
}

export function getSlotLeftToMeasure(msSymbol: MsSymbol, msSymbolContainer: MsSymbolContainer,
                                     measure: Measure, singleStaff: SingleStaff, musicScore: MusicScore,
                                     slotWidth: number, measureWidth: number, componentWidth: number, isMain: boolean = false) {
    const mainMsSymbol = isMain ? msSymbol : getMainMsSymbol(msSymbol, musicScore)
    const slotLeftToContainer = getSlotLeftToContainer(mainMsSymbol, msSymbolContainer, measure, singleStaff,
        musicScore, slotWidth, componentWidth)
    const containerLeftToMeasure = getContainerLeftToMeasure(msSymbolContainer, measure, singleStaff,
        musicScore, measureWidth)
    return slotLeftToContainer + containerLeftToMeasure

}