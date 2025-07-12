import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {MsSymbol, MusicScore, NoteHead} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import {getSlotBottomToMeasure} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";
import {getDataWithIndex} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

export function getMsSymbolHeight(msSymbol: MsSymbol, musicScore: MusicScore): number {
    const information = MsSymbolInformationMap[msSymbol?.type]
    const measureHeight = musicScore.measureHeight
    switch (msSymbol.type) {
        case MsSymbolTypeEnum.noteBar: {
            let min = 0
            if ('heightMultiplier' in information) {
                min = measureHeight * information.heightMultiplier
            }
            const slotBottom = getSlotBottomToMeasure(msSymbol, musicScore)
            const noteHead = getDataWithIndex(msSymbol.index, musicScore).msSymbol as NoteHead
            if (noteHead.region <= MusicScoreRegionEnum.space_2) {
                return Math.max(min, Math.abs(slotBottom) + min - measureHeight * 3 / 8)
            } else {
                return Math.max(min, Math.abs(slotBottom) - measureHeight + measureHeight * 5 / 8)
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
