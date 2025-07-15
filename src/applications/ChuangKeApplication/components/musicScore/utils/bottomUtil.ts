// 五线谱区域转换bottom
import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    Measure,
    MsSymbol,
    MsSymbolContainer, MusicScore, NoteHead,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {getMsSymbolHeight} from "@/applications/ChuangKeApplication/components/musicScore/utils/heightUtil.ts";
import {
    getDataWithIndex,
    traverseMusicScore
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

export function staffRegionToBottom(region: MusicScoreRegionEnum, measureHeight: number): number {
    return measureHeight * ((region - 38) * 2) / 16
}

// 获取符号在符号槽位中的相对bottom。
export function getMsSymbolBottomToSlot(msSymbol: MsSymbol, musicScore: MusicScore): number {
    const parentMsSymbol = getDataWithIndex(msSymbol.index, musicScore).msSymbol
    const measureHeight = musicScore.measureHeight
    switch (msSymbol?.type) {
        case MsSymbolTypeEnum.noteBar: {
            if (parentMsSymbol && 'region' in parentMsSymbol
                && parentMsSymbol.region <= MusicScoreRegionEnum.space_2) {
                return measureHeight / 8

            } else {
                const height = getMsSymbolHeight(msSymbol, musicScore)
                return -height + measureHeight / 8

            }
        }
        case MsSymbolTypeEnum.noteTail: {
            const slotBottom = getSlotBottomToMeasure(msSymbol, musicScore)
            const noteBarHeight = measureHeight * 6 / 8 // 符杠高度
            const noteBarOffset = measureHeight * 1 / 8 // 符杠相对slot的偏差
            const height = getMsSymbolHeight(msSymbol, musicScore)

            if (parentMsSymbol && 'region' in parentMsSymbol
                && parentMsSymbol.region <= MusicScoreRegionEnum.space_2) {
                return Math.max(noteBarHeight - height + noteBarOffset, Math.abs(slotBottom))
            } else {
                return -Math.max(noteBarHeight - noteBarOffset, Math.abs(slotBottom) - height
                )
            }
        }
        default: {
            return 0
        }
    }
}

// 获取符号槽位在符号容器中的相对bottom。因为MsSymbolContainer的y轴位置及高度都是等同于measure的，所以这个bottom等同于相对measure的bottom
export function getSlotBottomToMeasure(msSymbol: MsSymbol, musicScore: MusicScore): number {
    if (!msSymbol) return 0
    const measureHeight = musicScore.measureHeight
    // 未防止传入跟随符号，需要经过下面一行转换
    const targetMsSymbol = getDataWithIndex(msSymbol.index, musicScore)?.msSymbol as MsSymbol
    switch (targetMsSymbol.type) {
        case MsSymbolTypeEnum.noteHead: {
            if (!targetMsSymbol) return 0
            const noteRegion: MusicScoreRegionEnum = targetMsSymbol.region
            return staffRegionToBottom(noteRegion, measureHeight)
        }
        default: {
            return 0
        }

    }
}

// 获取符号容器内最高的单小节符号bottom + 符号高度  不考虑符号跟随型符号
export function getMaxMsSymbolBottomInMsSymbolContainer(msSymbolContainer: MsSymbolContainer, musicScore: MusicScore, plusHeight = true): number {
    let maxBottom = 0
    const measureHeight = musicScore.measureHeight
    for (let msSymbol of msSymbolContainer.msSymbolArray) {
        const bottom = getSlotBottomToMeasure(msSymbol, musicScore)
        const height = getMsSymbolHeight(msSymbol, musicScore)
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
export function getMinMsSymbolBottomInMsSymbolContainer(msSymbolContainer: MsSymbolContainer, musicScore: MusicScore) {
    let minBottom = 10000
    for (let msSymbol of msSymbolContainer.msSymbolArray) {
        const bottom = getSlotBottomToMeasure(msSymbol, musicScore)
        minBottom = Math.min(bottom, minBottom)
    }
    return minBottom
}

// 获取小节内最高的单小节符号bottom + 符号高度
export function getMaxMsSymbolBottomInMeasure(measure: Measure, musicScore: MusicScore, plusHeight = true) {
    let maxBottom = 0
    for (let msSymbol of measure.msSymbolContainerArray) {
        const bottom = getMaxMsSymbolBottomInMsSymbolContainer(msSymbol, musicScore, plusHeight)
        maxBottom = Math.max(bottom, maxBottom)
    }
    return maxBottom
}

// 获取小节内最低的单小节符号bottom
export function getMinMsSymbolBottomInMeasure(measure: Measure, musicScore: MusicScore) {
    let minBottom = 10000
    for (let msSymbolContainer of measure.msSymbolContainerArray) {
        const bottom = getMinMsSymbolBottomInMsSymbolContainer(msSymbolContainer, musicScore)
        minBottom = Math.min(bottom, minBottom)
    }
    return minBottom
}

// 获取单谱表内最高的单小节符号bottom + 符号高度
export function getMaxMsSymbolBottomInSingleStaff(singleStaff: SingleStaff, musicScore: MusicScore, plusHeight = true) {
    let maxBottom = 0
    for (let measure of singleStaff.measureArray) {
        const bottom = getMaxMsSymbolBottomInMeasure(measure, musicScore, plusHeight)
        maxBottom = Math.max(bottom, maxBottom)
    }
    return maxBottom
}

// 获取单谱表内最低的单小节符号bottom
export function getMinMsSymbolBottomInSingleStaff(singleStaff: SingleStaff, musicScore: MusicScore) {
    let minBottom = 10000
    for (let measure of singleStaff.measureArray) {
        const bottom = getMinMsSymbolBottomInMeasure(measure, musicScore)
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
            if (!multipleStaves) return true
            top += multipleStaves.multipleStavesPaddingTop
            for (let curSingleStaff of multipleStaves.singleStaffArray) {
                top += curSingleStaff.singleStaffPaddingTop + musicScore.measureHeight
                for (let curMeasure of curSingleStaff.measureArray) {
                    if (curMeasure === measure) {
                        return true
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