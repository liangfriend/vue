import {
    AccidentalEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolContainerTypeEnum,
    MsSymbolTypeEnum,
    MusicalAlphabetEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbol,
    MsSymbolContainer, type MultipleStaves,
    MusicScore,
    NoteHead,
    SingleStaff,
    WidthConstant
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap,} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import {
    getWidthConstantInMeasure,
    getWidthConstantInMsSymbolContainer, getWidthConstantInSingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthConstantUtil.ts";

// 获取定宽容器的宽度
export function getWidthFixedContainerWidth(msSymbolContainer: MsSymbolContainer, measureHeight: number): number {
    let width = 0
    for (let i = 0; i < msSymbolContainer.msSymbolArray.length; i++) {
        const curMsSymbol: MsSymbol = msSymbolContainer.msSymbolArray[i]
        const information = MsSymbolInformationMap[curMsSymbol.type]
        let curW = 0
        if ('aspectRatio' in information && (typeof information.aspectRatio === 'number')) {
            curW += information.aspectRatio * measureHeight
        } else if ('aspectRatio' in information && (typeof information.aspectRatio === 'object')) { // 特殊情况处理
            if (curMsSymbol.type === MsSymbolTypeEnum.keySignature) {
                curW += information.aspectRatio[curMsSymbol.keySignature] * measureHeight
            } else if (curMsSymbol.type === MsSymbolTypeEnum.barline || curMsSymbol.type === MsSymbolTypeEnum.barline_f) {
                curW += information.aspectRatio[curMsSymbol.barlineType] * measureHeight
            }
        } else {
            console.error('符号的svg宽高比不存在')
        }
        if (width < curW) {
            width = curW
        }

    }
    return width
}

// 获取符号容器宽度
export function getMsSymboLContainerWidth(msSymbolContainer: MsSymbolContainer, measure: Measure, singleStaff: SingleStaff, musicScoreData: MusicScore, measureHeight: number, componentWidth: number): number {
    if (!msSymbolContainer || !measure) {
        console.error("缺少必要的参数，坐标计算出错")
        return 0
    }
    let width: number = 0 // 定宽容器的宽度等于主符号宽度（通过调用符号组件暴露的获取宽高比方法获取宽高比），非定宽容器宽度通过计算宽度系数设置
    const containerType = msSymbolContainer.type
    if ([MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) { // 如果是定宽容器
        width = getWidthFixedContainerWidth(msSymbolContainer, measureHeight)
    } else { // 如果是变宽容器  宽度 = (小节宽度 - 定宽容器宽度) / 变宽容器宽度系数和 * 当前容器宽度系数
        const fixedSymbolContainerSum = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight)
        const totalWidthConstantOfFixedContainerInMeasure = getWidthConstantInMeasure(measure)
        const curMsSymbolContainerWidthConstant = getWidthConstantInMsSymbolContainer(msSymbolContainer)
        const measureWidth = getMeasureWidth(measure, singleStaff, musicScoreData, componentWidth)
        width = (measureWidth - fixedSymbolContainerSum) / totalWidthConstantOfFixedContainerInMeasure * curMsSymbolContainerWidthConstant
    }
    return width
}

// 获取小节宽度
export function getMeasureWidth(measure: Measure, singleStaff: SingleStaff, musicScoreData: MusicScore, componentWidth: number) {
    const totalSingleStaffWidthConstant = getWidthConstantInSingleStaff(singleStaff); // 获取单谱表宽度系数和
    const totalMeasureWidthConstant = getWidthConstantInMeasure(measure,); // 获取小节宽度系数和
    const fixedContainerWidthInSngleStaff = getWidthFixedContainerWidthSumInSingleStaff(singleStaff, musicScoreData.measureHeight) // 单谱表内定宽容器宽度
    const fixedContainerWidthInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, musicScoreData.measureHeight) // 小节定宽容器宽度
    const measureLength = singleStaff.measureArray.length // 单谱表内小节数量
    const totalVariableContainerWidth = (componentWidth - fixedContainerWidthInSngleStaff) // 变宽容器总宽度
    const widthPerWidthConstant = totalVariableContainerWidth / totalSingleStaffWidthConstant * musicScoreData.widthDynamicRatio // 每宽度常亮的宽度
    const fixedWidth = totalVariableContainerWidth * (1 - musicScoreData.widthDynamicRatio) / measureLength   // 小节内就算没有变宽符号也要分配一定宽度，这里是计算出来每个小节固定分出来的宽度

    return widthPerWidthConstant * totalMeasureWidthConstant + fixedContainerWidthInMeasure + fixedWidth;
}

// 获取当前小节内定宽符号容器宽度之和, 第二个参数判断是否只计算当前符号之前的
export function getWidthFixedContainerWidthSumInMeasure(measure: Measure, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbolContainer?: MsSymbolContainer): number {
    let widthSum = 0
    for (let i = 0; i < measure.msSymbolContainerArray.length; i++) {
        const curMsSymbolContainer: MsSymbolContainer = measure.msSymbolContainerArray[i]

        if (msSymbolContainer && msSymbolContainer === curMsSymbolContainer) {
            return widthSum
        }
        const containerType = curMsSymbolContainer.type
        if (filter === 'all' && [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        } else if (filter === 'front' && [MsSymbolContainerTypeEnum.frontFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        } else if (filter === 'rear' && [MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {
            widthSum += getWidthFixedContainerWidth(curMsSymbolContainer, measureHeight)
        }

    }
    return widthSum
}


// 获取单谱表内定宽容器符号宽度之和，单位px
export function getWidthFixedContainerWidthSumInSingleStaff(singleStaff: SingleStaff, measureHeight: number, filter: 'front' | 'rear' | 'all' = 'all', msSymbolContainer?: MsSymbolContainer): number {
    let widthSum = 0
    singleStaff.measureArray.forEach((measure: Measure) => {
        widthSum += getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, filter, msSymbolContainer)
    })
    return widthSum
}

