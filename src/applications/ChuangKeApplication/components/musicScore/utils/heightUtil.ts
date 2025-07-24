import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {MsSymbol, MusicScore, NoteHead} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import {getSlotBottomToMeasure} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";
import {
    getBeamGroup,
    getDataWithIndex
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

export function getMsSymbolHeight(msSymbol: MsSymbol, musicScore: MusicScore): number {
    const information = MsSymbolInformationMap[msSymbol?.type]
    const measureHeight = musicScore.measureHeight
    switch (msSymbol.type) {
        case MsSymbolTypeEnum.noteBar: {
            const noteHead = getDataWithIndex(msSymbol.index, musicScore).msSymbol as NoteHead

            let minHeight = 0
            if ('heightMultiplier' in information) { // noteBar的最小高度
                minHeight = measureHeight * information.heightMultiplier
            }
            const NoteBarBottomToSlotUp = -measureHeight * 3 / 8
            const NoteBarBottomToSlotBottom = measureHeight * 5 / 8

            if (noteHead.beamId === -1) {

                const slotBottom = getSlotBottomToMeasure(msSymbol, musicScore)

                if (msSymbol.direction === 'up') {
                    return Math.max(minHeight, Math.abs(slotBottom) + minHeight + NoteBarBottomToSlotUp)
                } else {
                    return Math.max(minHeight, Math.abs(slotBottom) - measureHeight + NoteBarBottomToSlotBottom)
                }
            } else { // 成组的情况

                const measure = getDataWithIndex(noteHead.index, musicScore).measure
                if (!measure) {
                    console.error("索引找不到measure,符杠height计算失败")
                    return 0
                }
                const beamGroup = getBeamGroup(noteHead.beamId, measure)
                if (!beamGroup) {
                    console.error('连音组获取不到，符杠高度计算出错')
                    return 0
                }
                const slotBottom = getSlotBottomToMeasure(msSymbol, musicScore)

                if (msSymbol.direction === 'up') {
                    // 找到最靠上的音符头
                    const farthestNoteHead = beamGroup.reduce((acc, cur) => {
                        if (acc.region < cur.noteHead.region) {
                            return cur.noteHead
                        }
                        return acc
                    }, beamGroup[0].noteHead)
                    const farthestSlotBottom = getSlotBottomToMeasure(farthestNoteHead, musicScore)

                    return Math.max(minHeight, Math.abs(slotBottom + farthestSlotBottom) + minHeight - NoteBarBottomToSlotUp)
                } else {
                    // 找到最靠下的音符头
                    const farthestNoteHead = beamGroup.reduce((acc, cur) => {
                        if (acc.region > cur.noteHead.region) {
                            return cur.noteHead
                        }
                        return acc
                    }, beamGroup[0].noteHead)
                    const farthestSlotBottom = getSlotBottomToMeasure(farthestNoteHead, musicScore)
                    return Math.max(minHeight, Math.abs(slotBottom + farthestSlotBottom) - measureHeight + NoteBarBottomToSlotBottom)
                }
            }

            break
        }
        default: {
            if ('heightMultiplier' in information) {
                return measureHeight * information.heightMultiplier
            }
        }
    }
    return measureHeight
}
