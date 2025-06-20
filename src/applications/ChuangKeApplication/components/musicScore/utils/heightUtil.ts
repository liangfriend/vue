import {MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";

export function getMsSymbolHeight(msSymbol: MsSymbol, measureHeight: number): number {
    const information = MsSymbolInformationMap[msSymbol?.type]
    switch (msSymbol?.type) {
        //
    }
    if ('heightMultiplier' in information) {
        return measureHeight * information.heightMultiplier
    }
    return measureHeight
}
