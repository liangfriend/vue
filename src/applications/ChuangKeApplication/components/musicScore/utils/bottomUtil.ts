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
    switch (region) {

        case 'lower_line_6':
            return -measureHeight * 26 / 16;
        case 'lower_space_6':
            return -measureHeight * 24 / 16;
        case 'lower_line_5':
            return -measureHeight * 22 / 16;
        case 'lower_space_5':
            return -measureHeight * 20 / 16;
        case 'lower_line_4':
            return -measureHeight * 18 / 16;
        case 'lower_space_4':
            return -measureHeight * 16 / 16;
        case 'lower_line_3':
            return -measureHeight * 14 / 16;
        case 'lower_space_3':
            return -measureHeight * 12 / 16;
        case 'lower_line_2':
            return -measureHeight * 10 / 16;
        case 'lower_space_2':
            return -measureHeight * 8 / 16;
        case 'lower_line_1':
            return -measureHeight * 6 / 16;
        case 'lower_space_1':
            return -measureHeight * 4 / 16;
        case 'line_1':
            return -measureHeight * 2 / 16;
        case 'space_1':
            return 0;
        case 'line_2':
            return measureHeight * 2 / 16;
        case 'space_2':
            return measureHeight * 4 / 16;
        case 'line_3':
            return measureHeight * 6 / 16;
        case 'space_3':
            return measureHeight * 8 / 16;
        case 'line_4':
            return measureHeight * 10 / 16;
        case 'space_4':
            return measureHeight * 12 / 16;
        case 'line_5':
            return measureHeight * 14 / 16;
        case 'upper_space_1':
            return measureHeight * 16 / 16;
        case 'upper_line_1':
            return measureHeight * 18 / 16;
        case 'upper_space_2':
            return measureHeight * 20 / 16;
        case 'upper_line_2':
            return measureHeight * 22 / 16;
        case 'upper_space_3':
            return measureHeight * 24 / 16;
        case 'upper_line_3':
            return measureHeight * 26 / 16;
        case 'upper_space_4':
            return measureHeight * 28 / 16;
        case 'upper_line_4':
            return measureHeight * 30 / 16;
        case 'upper_space_5':
            return measureHeight * 32 / 16;
        case 'upper_line_5':
            return measureHeight * 34 / 16;
        case 'upper_space_6':
            return measureHeight * 36 / 16;
        case 'upper_line_6':
            return measureHeight * 38 / 16;
        case 'upper_space_7':
            return measureHeight * 40 / 16;
        case 'upper_line_7':
            return measureHeight * 42 / 16;
        case 'upper_space_8':
            return measureHeight * 44 / 16;
        case 'upper_line_8':
            return measureHeight * 46 / 16;
        default:
            return 0;
    }


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
export function getMeasureBottomToMusicScore(measure: Measure, musicScore: MusicScore) {
    let bottom = 0
    traverseMusicScore(musicScore, {
        level: 'singleStaff',
        order: 'desc',
        callback: ({singleStaff}) => {
            if (!singleStaff) return false
            bottom += singleStaff.singleStaffPaddingBottom + singleStaff.singleStaffMarginBottom
            for (let curMeasure of singleStaff.measureArray) {
                if (curMeasure === measure) {
                    return true
                }
            }
            bottom += musicScore.measureHeight + singleStaff.singleStaffPaddingTop
            return false
        }

    })

}