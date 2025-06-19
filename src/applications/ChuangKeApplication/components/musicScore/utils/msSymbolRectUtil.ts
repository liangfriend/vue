// 五线谱区域转换bottom
import {
    MsSymbolTypeEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {Measure, MsSymbol, SingleStaff} from "@/applications/ChuangKeApplication/components/musicScore/types";

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

// 获取符号槽位在符号容器中的相对bottom。因为MsSymbol的上下边都是紧贴measure的，所以这个bottom等同于相对measure的bottom
export function getSlotBottomInMsSymbolContainer(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff, measureHeight: number): number {
    if (!msSymbol) return 0
    switch (msSymbol.type) {
        case MsSymbolTypeEnum.noteHead: {
            if (!msSymbol || !measure || !singleStaff) return 0
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

// 获取符号槽位高度
export function getSlotHeight() {

}