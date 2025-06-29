// 五线谱区域转换bottom
import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    Measure,
    MsSymbol,
    MsSymbolContainer, MusicScore,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {getMsSymbolHeight} from "@/applications/ChuangKeApplication/components/musicScore/utils/heightUtil.ts";
import {traverseMusicScore} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

export function staffRegionToBottom(region: MusicScoreRegionEnum, measureHeight: number): number {
    return measureHeight * ((region - 38) * 2) / 16
}

// 获取符号在符号槽位中的相对bottom。这个基本上用于符号跟随型符号
export function getMsSymbolBottomToSlot(msSymbol: MsSymbol, measureHeight: number): number {
    switch (msSymbol?.type) {
        case MsSymbolTypeEnum.noteBar: {
            return measureHeight / 8
        }
    }
    return 0
}

// 获取符号槽位在符号容器中的相对bottom。因为MsSymbolContainer的y轴位置及高度都是等同于measure的，所以这个bottom等同于相对measure的bottom
export function getSlotBottomToMeasure(msSymbol: MsSymbol, measureHeight: number): number {
    if (!msSymbol) return 0
    switch (msSymbol.type) {
        case MsSymbolTypeEnum.noteHead: {
            if (!msSymbol) return 0
            const clef = msSymbol.computed.clef
            if (clef) {
                const noteRegion: MusicScoreRegionEnum = msSymbol.region
                return staffRegionToBottom(noteRegion, measureHeight)
            }
            return 0
        }
        default: {
            return 0
        }

    }
}

// 获取符号容器内最高的单小节符号bottom + 符号高度  不考虑符号跟随型符号
export function getMaxMsSymbolBottomInMsSymbolContainer(msSymbolContainer: MsSymbolContainer, measureHeight: number, plusHeight = true): number {
    let maxBottom = 0
    for (let msSymbol of msSymbolContainer.msSymbolArray) {
        const bottom = getSlotBottomToMeasure(msSymbol, measureHeight)
        const height = getMsSymbolHeight(msSymbol, measureHeight)
        const max = bottom + height
        if (plusHeight) {
            maxBottom = Math.max(max, maxBottom)
        } else {
            maxBottom = Math.max(bottom, maxBottom)
        }

    }
    return maxBottom
}

// 获取符号容器内最低的单小节符号bottom
export function getMinMsSymbolBottomInMsSymbolContainer(msSymbolContainer: MsSymbolContainer, measureHeight: number) {
    let minBottom = 10000
    for (let msSymbol of msSymbolContainer.msSymbolArray) {
        const bottom = getSlotBottomToMeasure(msSymbol, measureHeight)
        minBottom = Math.min(bottom, minBottom)
    }
    return minBottom
}

// 获取小节内最高的单小节符号bottom + 符号高度
export function getMaxMsSymbolBottomInMeasure(measure: Measure, measureHeight: number, plusHeight = true) {
    let maxBottom = 0
    for (let msSymbol of measure.msSymbolContainerArray) {
        const bottom = getMaxMsSymbolBottomInMsSymbolContainer(msSymbol, measureHeight, plusHeight)
        maxBottom = Math.max(bottom, maxBottom)
    }
    return maxBottom
}

// 获取小节内最低的单小节符号bottom
export function getMinMsSymbolBottomInMeasure(measure: Measure, measureHeight: number) {
    let minBottom = 10000
    for (let msSymbolContainer of measure.msSymbolContainerArray) {
        const bottom = getMinMsSymbolBottomInMsSymbolContainer(msSymbolContainer, measureHeight)
        minBottom = Math.min(bottom, minBottom)
    }
    return minBottom
}

// 获取单谱表内最高的单小节符号bottom + 符号高度
export function getMaxMsSymbolBottomInSingleStaff(singleStaff: SingleStaff, measureHeight: number, plusHeight = true) {
    let maxBottom = 0
    for (let measure of singleStaff.measureArray) {
        const bottom = getMaxMsSymbolBottomInMeasure(measure, measureHeight, plusHeight)
        maxBottom = Math.max(bottom, maxBottom)
    }
    return maxBottom
}

// 获取单谱表内最低的单小节符号bottom
export function getMinMsSymbolBottomInSingleStaff(singleStaff: SingleStaff, measureHeight: number) {
    let minBottom = 10000
    for (let measure of singleStaff.measureArray) {
        const bottom = getMinMsSymbolBottomInMeasure(measure, measureHeight)
        minBottom = Math.min(bottom, minBottom)
    }
    return minBottom
}

// 获取小节相对于musicScore组件的bottom
export function getMeasureBottomToMusicScore(measure: Measure, musicScore: MusicScore, componentHeight: number): number {
    let top = 0

    traverseMusicScore(musicScore, {
        level: 'multipleStaves',
        order: 'asc',
        callback: ({multipleStaves}) => {
            if (!multipleStaves) return false
            top += multipleStaves.multipleStavesPaddingTop
            for (let curSingleStaff of multipleStaves.singleStaffArray) {
                top += curSingleStaff.singleStaffPaddingTop + musicScore.measureHeight
                for (let curMeasure of curSingleStaff.measureArray) {
                    if (curMeasure === measure) {
                        return false
                    }
                }
                top += curSingleStaff.singleStaffPaddingBottom + curSingleStaff.singleStaffMarginBottom
            }
            top += multipleStaves.multipleStavesPaddingBottom + multipleStaves.multipleStavesMarginBottom
            return false
        }

    })
    return componentHeight - top
}