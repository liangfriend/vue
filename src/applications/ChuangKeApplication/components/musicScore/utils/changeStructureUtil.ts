import {MsTypeNameEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbolContainer,
    MsType, MusicScore,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {measureTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    getDataWithIndex,
    setMeasureArrayIndex
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";


// 添加符号容器
export function addMsSymbolContainer(musicScore: MusicScore, newMsSymbolContainer: MsSymbolContainer, currSelected: MsType, position: 'after' | 'before' = 'after') {
    if (currSelected.msTypeName === MsTypeNameEnum.MsSymbolContainer) {
        const measure = getDataWithIndex(currSelected.index, musicScore).measure
        const msSymbolContainer = getDataWithIndex(currSelected.index, musicScore).msSymbolContainer
        if (!measure) return console.error("小节不存在，符号容器添加失败")
        if (!msSymbolContainer) return console.error("符号容器不存在，符号容器添加失败")
        const array = measure.msSymbolContainerArray;
        const targetIndex = array.findIndex(item => item === msSymbolContainer);
        if (position === 'before') {
            array.splice(targetIndex, 0, newMsSymbolContainer);
        } else {
            array.splice(targetIndex + 1, 0, newMsSymbolContainer);
        }
    }
}

// 移除符号容器
export function removeMsSymbolContainer(
    musicScore: MusicScore,
    msSymbolContainer: MsSymbolContainer
) {
    const measure = getDataWithIndex(msSymbolContainer.index, musicScore).measure
    if (!measure) return console.error("小节不存在，符号容器移除失败")
    const array = measure.msSymbolContainerArray;
    const index = array.findIndex(item => item === msSymbolContainer);

    if (index !== -1) {
        array.splice(index, 1);
    } else {
        console.error("找不到目标符号容器")
    }
}


// 添加小节
export function addMeasure(musicScore: MusicScore, newMeasure: Measure, currSelected: MsType, position: 'after' | 'before' = 'after') {

    if (currSelected.msTypeName === MsTypeNameEnum.Measure) {
        const singleStaff = getDataWithIndex(currSelected.index, musicScore).singleStaff
        if (!singleStaff) return console.error("单谱表不存在，小节插入失败");
        const array = singleStaff.measureArray;
        const targetIndex = array.findIndex(item => item === currSelected);
        if (position === 'before') {
            array.splice(targetIndex, 0, newMeasure);
        } else {
            array.splice(targetIndex + 1, 0, newMeasure);
        }
        // 计算index
        setMeasureArrayIndex(singleStaff)
    } else if (currSelected.msTypeName === MsTypeNameEnum.SingleStaff) {
        const array = currSelected.measureArray
        if (position === 'before') {
            array.splice(0, 0, newMeasure);
        } else {
            array.push(newMeasure);
        }
        // 计算index
        setMeasureArrayIndex(currSelected)
    }

}

