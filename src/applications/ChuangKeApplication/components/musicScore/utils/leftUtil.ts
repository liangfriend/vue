// 获取小节相对于musicScore组件的left
import {
    IndexData,
    Measure,
    MsSymbol,
    MusicScore,
    NoteHead
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
    getDataWithIndex,
    traverseMusicScore
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    getMeasureWidth,
    getMsSymbolSlotWidth, getMsSymbolWidth
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

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


export function getMsSymbolLeftToSlot(msSymbol: MsSymbol, musicScore: MusicScore,) {
    const parentMsSymbol = getDataWithIndex(msSymbol.index, musicScore).msSymbol
    const slotWidth = getMsSymbolSlotWidth(msSymbol, musicScore)
    const width = getMsSymbolWidth(msSymbol, musicScore)
    switch (msSymbol?.type) {
        case MsSymbolTypeEnum.noteHead: { // 音符头居中
            return
        }
        case MsSymbolTypeEnum.noteBar: { // 音符头居中
            if (parentMsSymbol &&
                'region' in parentMsSymbol &&
                parentMsSymbol.region <= MusicScoreRegionEnum.space_2) {
                return slotWidth - width
            } else {
                return 0

            }
        }
        case MsSymbolTypeEnum.noteTail: { // 音符头居中
            if (parentMsSymbol &&
                'region' in parentMsSymbol &&
                parentMsSymbol.region <= MusicScoreRegionEnum.space_2) {
                return slotWidth
            } else {
                return slotWidth - width
            }
        }
        case MsSymbolTypeEnum.accidental: { // 音符头居中
            return -width
        }
    }
    return 0
}