import {MsTypeNameEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    Measure,
    MsSymbolContainer,
    MsType, MultipleStaves, MusicScore,
    SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {measureTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    getDataWithIndex,
    setMeasureArrayIndex, setMultipleStavesIndex, setSingleStaffArrayIndex
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import Single from "echarts/types/src/coord/single/Single";


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
    } else if (currSelected.msTypeName === MsTypeNameEnum.Measure) {
        const measure = currSelected
        if (!measure) return console.error("小节不存在，符号容器添加失败")
        const array = measure.msSymbolContainerArray;
        array.push(newMsSymbolContainer)
    }
}

// 移除符号容器
export function removeMsSymbolContainer(
    msSymbolContainer: MsSymbolContainer,
    musicScore: MusicScore,
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

// 删除小节
export function removeMeasure(
    measure: Measure,
    musicScore: MusicScore,
) {
    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (!singleStaff) return console.error("单谱表不存在，小节移除失败")
    const array = singleStaff.measureArray;
    const index = array.findIndex(item => item === measure);
    if (index !== -1) {
        array.splice(index, 1);
    } else {
        console.error("找不到目标小节")
    }
}
// 删除小节相关联的跨小节符号
export function removeMeasureRelatedSpanSymbol(measure: Measure, musicScore: MusicScore) {
    for (let i = 0; i < musicScore.spanSymbolArray.length; i++) {
        const spanSymbol = musicScore.spanSymbolArray[i];
        if (measure.bindingStartId.includes(spanSymbol.id) || measure.bindingEndId.includes(spanSymbol.id)) {
            // 删除关联的跨小节符号
            musicScore.spanSymbolArray.splice(i, 1);
        }
    }
}

// 删除单谱表相关联的跨小节符号
export function removeSingleStaffRelatedSpanSymbol(singleStaff: SingleStaff, musicScore: MusicScore) {
    for (let i = 0; i < musicScore.spanSymbolArray.length; i++) {
        const spanSymbol = musicScore.spanSymbolArray[i];
        singleStaff.measureArray.forEach((measure) => {
            if (measure.bindingStartId.includes(spanSymbol.id) || measure.bindingEndId.includes(spanSymbol.id)) {
                // 删除关联的跨小节符号
                musicScore.spanSymbolArray.splice(i, 1);
            }
        })

    }
}

// 删除复谱表相关联的跨小节符号
export function removeMultipleStavesRelatedSpanSymbol(multipleStaves: MultipleStaves, musicScore: MusicScore) {
    for (let i = 0; i < musicScore.spanSymbolArray.length; i++) {
        const spanSymbol = musicScore.spanSymbolArray[i];
        multipleStaves.singleStaffArray.forEach((singleStaff) => {
            singleStaff.measureArray.forEach((measure) => {
                if (measure.bindingStartId.includes(spanSymbol.id) || measure.bindingEndId.includes(spanSymbol.id)) {
                    // 删除关联的跨小节符号
                    musicScore.spanSymbolArray.splice(i, 1);
                }
            })
        })
    }
}

// 添加单谱表
export function addSingleStaff(musicScore: MusicScore, newSingleStaff: SingleStaff, currSelected: MsType, position: 'after' | 'before' = 'after') {

    if (currSelected.msTypeName === MsTypeNameEnum.SingleStaff) {
        const multipleStaves = getDataWithIndex(currSelected.index, musicScore).multipleStaves
        if (!multipleStaves) return console.error("复谱表表不存在，单谱表插入失败");
        const array = multipleStaves.singleStaffArray;
        const targetIndex = array.findIndex(item => item === currSelected);
        console.log('chicken', position)
        if (position === 'before') {
            array.splice(targetIndex, 0, newSingleStaff);
        } else {
            array.splice(targetIndex + 1, 0, newSingleStaff);
        }
        // 计算index
        setSingleStaffArrayIndex(multipleStaves)
    } else if (currSelected.msTypeName === MsTypeNameEnum.MultipStaves) {
        const array = currSelected.singleStaffArray
        if (position === 'before') {
            array.splice(0, 0, newSingleStaff);
        } else {
            array.push(newSingleStaff);
        }
        // 计算index
        setSingleStaffArrayIndex(currSelected)
    }

}

// 删除单谱表
export function removeSingleStaff(
    singleStaff: SingleStaff,
    musicScore: MusicScore,
) {
    const multipleStaves = getDataWithIndex(singleStaff.index, musicScore).multipleStaves
    if (!multipleStaves) return console.error("复谱表表不存在，单谱表移除失败")
    const array = multipleStaves.singleStaffArray;
    const index = array.findIndex(item => item === singleStaff);
    if (index !== -1) {
        array.splice(index, 1);
    } else {
        console.error("找不到目标单谱表")
    }
}

// 添加复谱表
export function addMultipleStaves(musicScore: MusicScore, newMultipleStaves: MultipleStaves, currSelected: MsType, position: 'after' | 'before' = 'after') {
    if (currSelected.msTypeName === MsTypeNameEnum.MultipStaves) {
        const array = musicScore.multipleStavesArray;
        const targetIndex = array.findIndex(item => item === currSelected);
        if (position === 'before') {
            array.splice(targetIndex, 0, newMultipleStaves);
        } else {
            array.splice(targetIndex + 1, 0, newMultipleStaves);
        }
        // 计算index
        setMultipleStavesIndex(musicScore)
    }

}

// 删除复谱表
export function removeMultipleStaves(
    multipleStaves: MultipleStaves,
    musicScore: MusicScore,
) {
    const array = musicScore.multipleStavesArray
    const index = array.findIndex(item => item === multipleStaves);
    if (index !== -1) {
        array.splice(index, 1);
    } else {
        console.error("找不到目标复谱表")
    }
}