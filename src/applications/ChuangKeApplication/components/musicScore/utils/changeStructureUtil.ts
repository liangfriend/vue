import {
    BarLineTypeEnum,
    ChronaxieEnum,
    ClefEnum,
    KeySignatureEnum,
    MsSymbolTypeEnum,
    MsTypeNameEnum,
    MusicScoreRegionEnum, SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import {
    BarLine,
    ClefMsSymbol,
    KeySignatureMsSymbol,
    Measure,
    MsSymbol,
    MsSymbolContainer,
    MsType,
    MultipleStaves,
    MusicScore,
    NoteBar, NoteHead,
    NoteTail,
    SingleStaff, Slur,
    SpanSymbol,
    TimeSignature,
    TimeSignatureMsSymbol, Volta
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {msSymbolTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    getDataWithIndex,
    getMultipleStavesRelatedSpanSymbolList,
    getMusicScoreRelatedSpanSymbolList,
    getSingleStaffRelatedSpanSymbolList,
    setChildMsSymbolArrayIndex,
    setMeasureArrayIndex,
    setMsSymbolArrayIndex,
    setMsSymbolContainerArrayIndex,
    setMultipleStavesIndex,
    setSingleStaffArrayIndex,
    updateSpanSymbolView
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {Note} from "tone/build/esm/core/type/NoteUnits";

export function musicScoreMapAdd(msData: MsType, musicScore: MusicScore) {
    musicScore.map[msData.id] = msData
}

export function musicScoreMapRemove(id: number, musicScore: MusicScore) {
    delete musicScore.map[id]
}


export function addChildMsSymbol(childMsSymbol: MsSymbol, msSymbol: MsSymbol, musicScore: MusicScore) {
    msSymbol.msSymbolArray.push(childMsSymbol);
    setChildMsSymbolArrayIndex(msSymbol)
    musicScoreMapAdd(childMsSymbol, musicScore)
}

export function removeChildMsSymbol(childMsSymbol: MsSymbol, msSymbol: MsSymbol, musicScore: MusicScore) {
    const index = msSymbol.msSymbolArray.indexOf(childMsSymbol)
    if (index === -1) return console.error('符号内找不到目标跟随符号，跟随符号删除失败')
    msSymbol.msSymbolArray.splice(index, 1)
    musicScoreMapRemove(childMsSymbol.id, musicScore)
}

//
export function addVolta(volta: Volta, startMeasure: Measure, endMeasure: Measure, musicScore: MusicScore) {
    addBindingStartId(startMeasure, volta.id)
    addBindingEndId(endMeasure, volta.id)
    musicScore.spanSymbolArray.push(volta);
    musicScoreMapAdd(volta, musicScore)
}

export function addSlur(slur: Slur, startNoteHead: NoteHead, endNoteHead: NoteHead, musicScore: MusicScore) {
    addBindingStartId(startNoteHead, slur.id)
    addBindingEndId(endNoteHead, slur.id)
    musicScore.spanSymbolArray.push(slur);
    musicScoreMapAdd(slur, musicScore)
}

// 添加跨小节符号
export function addSpanSymbol(newSpanSymbol: SpanSymbol, startMsData: Exclude<MsType, SpanSymbol>, endMsData: Exclude<MsType, SpanSymbol>, musicScore: MusicScore) {
    switch (newSpanSymbol.type) {
        case SpanSymbolTypeEnum.volta: {
            if (startMsData.msTypeName === MsTypeNameEnum.Measure && endMsData.msTypeName === MsTypeNameEnum.Measure) {
                addVolta(newSpanSymbol, startMsData, endMsData, musicScore)
            } else {
                console.error("添加跨小节符号volta出错")
            }
            break
        }
        case SpanSymbolTypeEnum.slur: {
            if (startMsData.msTypeName === MsTypeNameEnum.MsSymbol && endMsData.msTypeName === MsTypeNameEnum.MsSymbol
                && startMsData.type === MsSymbolTypeEnum.noteHead && endMsData.type === MsSymbolTypeEnum.noteHead) {
                addSlur(newSpanSymbol, startMsData, endMsData, musicScore)
            } else {
                console.error("添加跨小节符号slur出错")
            }
            break
        }
    }

}

// 添加符号
export function addMsSymbol(newMsSymbol: MsSymbol, currSelected: MsType, musicScore: MusicScore, position: 'after' | 'before' = 'after') {
    if (currSelected.msTypeName === MsTypeNameEnum.MsSymbol) {
        const msSymbolContainer = getDataWithIndex(currSelected.index, musicScore).msSymbolContainer
        const msSymbol = getDataWithIndex(currSelected.index, musicScore).msSymbol
        if (!msSymbolContainer) return console.error("符号容器不存在，符号添加失败")
        if (!msSymbol) return console.error("符号不存在，符号添加失败")
        const array = msSymbolContainer.msSymbolArray;
        const targetIndex = array.findIndex(item => item === msSymbol);
        if (position === 'before') {
            array.splice(targetIndex, 0, newMsSymbol);
        } else {
            array.splice(targetIndex + 1, 0, newMsSymbol);
        }
        setMsSymbolArrayIndex(msSymbolContainer)
    } else if (currSelected.msTypeName === MsTypeNameEnum.MsSymbolContainer) {
        const msSymbolContainer = currSelected
        if (!msSymbolContainer) return console.error("小节不存在，符号容器添加失败")
        const array = msSymbolContainer.msSymbolArray;
        array.push(newMsSymbol)
        setMsSymbolArrayIndex(msSymbolContainer)
    }
    musicScoreMapAdd(newMsSymbol, musicScore)
    if (!('index' in currSelected)) return console.error("当前选中对象缺少index,符号添加失败")
    const singleStaff = getDataWithIndex(currSelected.index, musicScore).singleStaff
    if (!singleStaff) return console.error("单谱表查找出错，符号添加失败")
    // 索引生成
    setMeasureArrayIndex(singleStaff)
    // 跨小节符号位置更新
    const spanSymbolIdSet = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolIdSet, musicScore)
}

// 移除符号
export function removeMsSymbol(
    msSymbol: MsSymbol,
    musicScore: MusicScore,
) {
    const msSymbolContainer = getDataWithIndex(msSymbol.index, musicScore).msSymbolContainer
    if (!msSymbolContainer) return console.error("符号容器不存在，符号移除失败")
    const array = msSymbolContainer.msSymbolArray;
    const index = array.findIndex(item => item === msSymbol);


    if (index === -1) return console.error("找不到目标符号")
    array.splice(index, 1);
    setMsSymbolArrayIndex(msSymbolContainer)
    musicScoreMapRemove(msSymbolContainer.id, musicScore)

}

// 添加符号容器
export function addMsSymbolContainer(newMsSymbolContainer: MsSymbolContainer, currSelected: MsType, musicScore: MusicScore, position: 'after' | 'before' = 'after') {

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
        setMsSymbolContainerArrayIndex(measure)
    } else if (currSelected.msTypeName === MsTypeNameEnum.Measure) {
        const measure = currSelected
        if (!measure) return console.error("小节不存在，符号容器添加失败")
        const array = measure.msSymbolContainerArray;
        array.push(newMsSymbolContainer)
        setMsSymbolContainerArrayIndex(measure)
    }
    musicScoreMapAdd(newMsSymbolContainer, musicScore)
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

    if (index === -1) return console.error("找不到目标符号容器")
    array.splice(index, 1);
    musicScoreMapRemove(msSymbolContainer.id, musicScore)
    setMsSymbolContainerArrayIndex(measure)


}

// 添加小节
export function addMeasure(newMeasure: Measure, currSelected: MsType, musicScore: MusicScore, position: 'after' | 'before' = 'after') {

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
        // 更新跨小节符号
        const spanSymbolSet = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
        updateSpanSymbolView(spanSymbolSet, musicScore)
    } else if (currSelected.msTypeName === MsTypeNameEnum.SingleStaff) {
        const array = currSelected.measureArray
        if (position === 'before') {
            array.splice(0, 0, newMeasure);
        } else {
            array.push(newMeasure);
        }
        // 计算index
        setMeasureArrayIndex(currSelected)
        // 更新跨小节符号
        const spanSymbolSet = getSingleStaffRelatedSpanSymbolList(currSelected, musicScore)
        updateSpanSymbolView(spanSymbolSet, musicScore)
    }
    musicScoreMapAdd(newMeasure, musicScore)
}

// 删除小节
export function removeMeasure(
    measure: Measure,
    musicScore: MusicScore,
) {

    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (!singleStaff) return console.error("单谱表不存在，小节移除失败")
    // 如果是单谱表内最后的小节，则不可以删除
    if (singleStaff && singleStaff.measureArray.length <= 1) return console.error("弹幕表内至少保留一个小节")
    const array = singleStaff.measureArray;
    const index = array.findIndex(item => item === measure);
    if (index === -1) return console.error("找不到目标小节")
    array.splice(index, 1);
    // 更新map
    musicScoreMapRemove(measure.id, musicScore)

    // 计算index
    setMeasureArrayIndex(singleStaff)
    // 更新跨小节符号
    const spanSymbolSet = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    // 更新跨小节符号视图
    updateSpanSymbolView(spanSymbolSet, musicScore)
    // 移除小节相关联跨小节符号
    removeMeasureRelatedSpanSymbol(measure, musicScore)


}

// 删除小节相关联的跨小节符号
export function removeMeasureRelatedSpanSymbol(measure: Measure, musicScore: MusicScore) {
    for (let i = 0; i < musicScore.spanSymbolArray.length; i++) {
        const spanSymbol = musicScore.spanSymbolArray[i];
        if (measure.bindingStartId.includes(spanSymbol.id) || measure.bindingEndId.includes(spanSymbol.id)) {
            // 删除关联的跨小节符号
            musicScore.spanSymbolArray.splice(i, 1);
            musicScoreMapRemove(spanSymbol.id, musicScore)

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
                musicScoreMapRemove(spanSymbol.id, musicScore)
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
                    musicScoreMapRemove(spanSymbol.id, musicScore)
                }
            })
        })
    }
}

// 添加单谱表
export function addSingleStaff(newSingleStaff: SingleStaff, currSelected: MsType, musicScore: MusicScore, position: 'after' | 'before' = 'after') {

    if (currSelected.msTypeName === MsTypeNameEnum.SingleStaff) {
        const multipleStaves = getDataWithIndex(currSelected.index, musicScore).multipleStaves
        if (!multipleStaves) return console.error("复谱表表不存在，单谱表插入失败");
        const array = multipleStaves.singleStaffArray;
        const targetIndex = array.findIndex(item => item === currSelected);
        if (position === 'before') {
            array.splice(targetIndex, 0, newSingleStaff);
        } else {
            array.splice(targetIndex + 1, 0, newSingleStaff);
        }
        // 计算index
        setSingleStaffArrayIndex(multipleStaves)
        // 更新跨小节符号
        const spanSymbolSet = getMultipleStavesRelatedSpanSymbolList(multipleStaves, musicScore)
        updateSpanSymbolView(spanSymbolSet, musicScore)
    } else if (currSelected.msTypeName === MsTypeNameEnum.MultipStaves) {
        const array = currSelected.singleStaffArray
        if (position === 'before') {
            array.splice(0, 0, newSingleStaff);
        } else {
            array.push(newSingleStaff);
        }
        // 计算index
        setSingleStaffArrayIndex(currSelected)
        // 更新跨小节符号
        const spanSymbolSet = getMultipleStavesRelatedSpanSymbolList(currSelected, musicScore)
        updateSpanSymbolView(spanSymbolSet, musicScore)
    }
    // 更新map
    musicScoreMapAdd(newSingleStaff, musicScore)
}

// 删除单谱表
export function removeSingleStaff(
    singleStaff: SingleStaff,
    musicScore: MusicScore,
) {
    const multipleStaves = getDataWithIndex(singleStaff.index, musicScore).multipleStaves
    if (!multipleStaves) return console.error("复谱表表不存在，单谱表移除失败")
    // 如果是复谱表内最后的单谱表，则不可以删除
    if (multipleStaves && multipleStaves.singleStaffArray.length <= 1) return console.error("复谱表内至少保留一个单谱表")
    const array = multipleStaves.singleStaffArray;
    const index = array.findIndex(item => item === singleStaff);
    if (index === -1) return console.error("找不到目标单谱表")
    array.splice(index, 1);
    // 更新map
    musicScoreMapRemove(singleStaff.id, musicScore)
    // 更新index
    setSingleStaffArrayIndex(multipleStaves)
    // 删除相关联的跨小节符号
    removeSingleStaffRelatedSpanSymbol(singleStaff, musicScore)
}

// 添加复谱表
export function addMultipleStaves(newMultipleStaves: MultipleStaves, currSelected: MsType, musicScore: MusicScore, position: 'after' | 'before' = 'after') {
    if (currSelected.msTypeName === MsTypeNameEnum.MultipStaves) {
        const array = musicScore.multipleStavesArray;
        const targetIndex = array.findIndex(item => item === currSelected);
        if (position === 'before') {
            array.splice(targetIndex, 0, newMultipleStaves);
        } else {
            array.splice(targetIndex + 1, 0, newMultipleStaves);
        }
        // 更新index
        setMultipleStavesIndex(musicScore)
        // 更新跨小节符号
        const spanSymbolSet = getMultipleStavesRelatedSpanSymbolList(currSelected, musicScore)
        // 更新跨小节符号视图
        updateSpanSymbolView(spanSymbolSet, musicScore)
    }
    // 更新map
    musicScoreMapAdd(newMultipleStaves, musicScore)
}

// 删除复谱表
export function removeMultipleStaves(
    multipleStaves: MultipleStaves,
    musicScore: MusicScore,
) {
    // 如果是谱表内最后的复谱表，则不可以删除
    if (musicScore.multipleStavesArray.length <= 1) return console.error("")
    const array = musicScore.multipleStavesArray
    const index = array.findIndex(item => item === multipleStaves);
    if (index === -1) return console.error("找不到目标复谱表")
    array.splice(index, 1);
    // 更新map
    musicScoreMapRemove(multipleStaves.id, musicScore)
    // 更新index
    setMultipleStavesIndex(musicScore)
    // 更新跨小节符号
    const spanSymbolSet = getMusicScoreRelatedSpanSymbolList(musicScore)
    // 更新跨小节符号视图
    updateSpanSymbolView(spanSymbolSet, musicScore)
    // 删除相关联的跨小节符号
    removeMultipleStavesRelatedSpanSymbol(multipleStaves, musicScore)

}

// 更新符号属性
export function updateMsSymbol(oldMsSymbol: MsSymbol, newProperties: Partial<MsSymbol>) {
    return Object.assign(oldMsSymbol, newProperties);
}

// 更换音符或休止符时值
export function noteChronaxie(note: MsSymbol, newChronaxie: ChronaxieEnum, musicScore: MusicScore) {
    if (note.type !== MsSymbolTypeEnum.noteHead && note.type !== MsSymbolTypeEnum.rest) {
        return console.error("符号类型有误，时值更改失败。请传入音符或休止符");
    }
    if (note.chronaxie === newChronaxie) {
        return
    }
    // 更换时值
    note.chronaxie = newChronaxie
    const noteBar = note.msSymbolArray.find((item) => {
        return item.type === MsSymbolTypeEnum.noteBar
    })
    const noteTail = note.msSymbolArray.find((item) => {
        return item.type === MsSymbolTypeEnum.noteTail
    }) as (NoteTail | null)
    // 全音符且noteBar存在，去掉noteBar
    if ([ChronaxieEnum.whole].includes(newChronaxie) && noteBar) {
        removeChildMsSymbol(noteBar, note, musicScore)
    }
    // 非全音符且noteBar不存在，新增noteBar
    if (![ChronaxieEnum.whole].includes(newChronaxie) && !noteBar) {
        const newNoteBar = msSymbolTemplate({type: MsSymbolTypeEnum.noteBar})
        addChildMsSymbol(newNoteBar, note, musicScore)
    }
    // 全,二分，四分音符且noteTail存在，去掉noteTail
    if ([ChronaxieEnum.whole, ChronaxieEnum.half, ChronaxieEnum.quarter
    ].includes(newChronaxie) && noteTail) {
        removeChildMsSymbol(noteTail, note, musicScore)
    }
    // 非全,二分，四分音符且noteTail存在，更新noteTail
    if (![ChronaxieEnum.whole, ChronaxieEnum.half, ChronaxieEnum.quarter
    ].includes(newChronaxie) && noteTail) {
        updateMsSymbol(noteTail, {chronaxie: newChronaxie})
    }
    // 非全,二分，四分音符且noteTail不存在，添加noteTail
    if (![ChronaxieEnum.whole, ChronaxieEnum.half, ChronaxieEnum.quarter
    ].includes(newChronaxie) && !noteTail) {
        const newNoteTail = msSymbolTemplate({
            type: MsSymbolTypeEnum.noteTail,
            chronaxie: newChronaxie
        })
        addChildMsSymbol(newNoteTail, note, musicScore)
    }
}

export function addBindingStartId(msData: MsSymbol | Measure | SingleStaff, id: number) {
    msData.bindingStartId.push(id)
}

export function removeBindingStartId(msData: MsSymbol | Measure | SingleStaff, id: number) {
    const index = msData.bindingStartId.indexOf(id)
    if (index !== -1) {
        msData.bindingStartId.splice(index, 1)
    }
}

export function addBindingEndId(msData: MsSymbol | Measure | SingleStaff, id: number) {
    msData.bindingEndId.push(id)
}

export function removeBindingEndId(msData: MsSymbol | Measure | SingleStaff, id: number) {
    const index = msData.bindingEndId.indexOf(id)
    if (index !== -1) {
        msData.bindingEndId.splice(index, 1)
    }
}

// 移除跨小节符号
export function removeSpanSymbol(spanSymbol: SpanSymbol, musicScore: MusicScore) {
    const index = musicScore.spanSymbolArray.indexOf(spanSymbol)
    const bindingStartId = spanSymbol.startTargetId
    const bindingEndId = spanSymbol.endTargetId
    if (index !== -1) {
        musicScore.spanSymbolArray.splice(index, 1)
    }
    // 删除相关联对象中的绑定id
    const id = spanSymbol.id
    const bindingStartTarget = musicScore.map[bindingStartId]
    if (bindingStartTarget && 'bindingStartId' in bindingStartTarget) {
        const bindingStartIdIndex = bindingStartTarget.bindingStartId.indexOf(id)
        if (bindingStartIdIndex !== -1) {
            bindingStartTarget.bindingStartId.splice(index, 1)
        }
    }
    const bindingEndTarget = musicScore.map[bindingEndId]
    if (bindingEndTarget && 'bindingEndId' in bindingEndTarget) {
        const bindingEndIdIndex = bindingEndTarget.bindingEndId.indexOf(id)
        if (bindingEndIdIndex !== -1) {
            bindingEndTarget.bindingEndId.splice(index, 1)
        }
    }
}

// 往小节上添加谱号, 因为定宽容器的位置特殊，所以要单独拿出一个方法去处理
export function addClefToMeasure(clefSymbolContainer: MsSymbolContainer, measure: Measure, musicScore: MusicScore) {
    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (clefSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef_f) {
        // 如果有前置小节线，谱号需要添加到前置小节线之后
        const barLine_f = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine_f
        })
        if (barLine_f) { // 前置谱号存在
            const index = barLine_f.index.msSymbolContainerIndex
            if (index == null) return console.error("前置小节线索引异常，谱号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, clefSymbolContainer)
        } else { // 前置谱号不存在
            measure.msSymbolContainerArray.splice(0, 0, clefSymbolContainer)

        }
    } else if (clefSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef) {
        // 如果有小节线，谱号需要添加到前置小节线之前
        const barLine = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine
        })
        if (barLine) { // 小节线存在
            const index = barLine.index.msSymbolContainerIndex
            if (index == null) return console.error("小节线索引异常，谱号添加失败")
            measure.msSymbolContainerArray.splice(index, 0, clefSymbolContainer)
        } else { // 小节线不存在
            measure.msSymbolContainerArray.push(clefSymbolContainer)
        }

    }
    if (!singleStaff) return console.error('单谱表查找出错，谱号添加失败')
    // 更新索引
    setMeasureArrayIndex(singleStaff)
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 往小节上添加调号
export function addKeySignatureToMeasure(keySignatureSymbolContainer: MsSymbolContainer, measure: Measure, musicScore: MusicScore) {
    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (keySignatureSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.keySignature) {
        // 如果有前置谱号，调号需要添加到前置谱号之后
        const clef_f = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef_f
        })
        // 如果有前置小节线，谱号需要添加到前置小节线之后
        const barLine_f = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine_f
        })
        if (clef_f) { // 前置谱号存在
            const index = clef_f.index.msSymbolContainerIndex
            if (index == null) return console.error("前置谱号号索引异常，调号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, keySignatureSymbolContainer)
        } else if (barLine_f) { // 前置小节线存在
            const index = barLine_f.index.msSymbolContainerIndex
            if (index == null) return console.error("前置小节线索引异常，调号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, keySignatureSymbolContainer)
        } else {
            measure.msSymbolContainerArray.splice(0, 0, keySignatureSymbolContainer)
        }
    }
    if (!singleStaff) return console.error('单谱表查找出错，谱号添加失败')
    // 更新索引
    setMeasureArrayIndex(singleStaff)
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 往小节上添加拍号
export function addTimeSignatureToMeasure(timeSignatureContainer: MsSymbolContainer, measure: Measure, musicScore: MusicScore) {

    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (timeSignatureContainer.msSymbolArray[0].type === MsSymbolTypeEnum.timeSignature) {
        // 如果有调号，拍号号需要添加到调号之后
        const keySignature = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.keySignature
        })
        // 如果有前置谱号，调号需要添加到前置谱号之后
        const clef_f = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.clef_f
        })
        // 如果有前置小节线，谱号需要添加到前置小节线之后
        const barLine_f = measure.msSymbolContainerArray.find((curMsSymbolContainer) => {
            return curMsSymbolContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine_f
        })
        if (keySignature) { // 调号存在
            const index = keySignature.index.msSymbolContainerIndex
            if (index == null) return console.error("调号索引异常，调号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, timeSignatureContainer)
        } else if (clef_f) { // 前置谱号存在
            const index = clef_f.index.msSymbolContainerIndex
            if (index == null) return console.error("前置谱号索引异常，调号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, timeSignatureContainer)
        } else if (barLine_f) { // 前置小节线存在
            const index = barLine_f.index.msSymbolContainerIndex
            if (index == null) return console.error("前置小节线索引异常，调号添加失败")
            measure.msSymbolContainerArray.splice(index + 1, 0, timeSignatureContainer)
        } else {
            measure.msSymbolContainerArray.splice(0, 0, timeSignatureContainer)
        }
    }
    if (!singleStaff) return console.error('单谱表查找出错，谱号添加失败')
    // 更新索引
    setMeasureArrayIndex(singleStaff)
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 往小节上添加小节线
export function addBarLineToMeasure(barLineContainer: MsSymbolContainer, measure: Measure, musicScore: MusicScore) {
    const singleStaff = getDataWithIndex(measure.index, musicScore).singleStaff
    if (barLineContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine_f) {
        measure.msSymbolContainerArray.unshift(barLineContainer)
    } else if (barLineContainer.msSymbolArray[0].type === MsSymbolTypeEnum.barLine) {
        measure.msSymbolContainerArray.push(barLineContainer)
    }
    if (!singleStaff) return console.error('单谱表查找出错，谱号添加失败')
    // 更新索引
    setMeasureArrayIndex(singleStaff)
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 更改谱号
export function changeClef(clefMsSymbol: ClefMsSymbol, clef: ClefEnum, musicScore: MusicScore) {
    clefMsSymbol.clef = clef
}

// 更改调号
export function changeKeySignature(keySignatureMsSymbol: KeySignatureMsSymbol, keySignature: KeySignatureEnum, musicScore: MusicScore) {
    keySignatureMsSymbol.keySignature = keySignature
    const singleStaff = getDataWithIndex(keySignatureMsSymbol.index, musicScore).singleStaff
    if (!singleStaff) return console.error('单谱表查找失败，调号更改失败')
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 更改拍号
export function changeTimeSignature(timeSignatureMsSymbol: TimeSignatureMsSymbol, timeSignature: TimeSignature, musicScore: MusicScore) {
    timeSignatureMsSymbol.timeSignature = timeSignature
    const singleStaff = getDataWithIndex(timeSignatureMsSymbol.index, musicScore).singleStaff
    if (!singleStaff) return console.error('单谱表查找失败，调号更改失败')
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}


// 更改小节线
export function changeBarLine(barLineMsSymbol: BarLine, barLineType: BarLineTypeEnum, musicScore: MusicScore) {
    barLineMsSymbol.barLineType = barLineType
    const singleStaff = getDataWithIndex(barLineMsSymbol.index, musicScore).singleStaff
    if (!singleStaff) return console.error('单谱表查找失败，调号更改失败')
    // 更新跨小节符号视图
    const spanSymbolList = getSingleStaffRelatedSpanSymbolList(singleStaff, musicScore)
    updateSpanSymbolView(spanSymbolList, musicScore)
}

// 更新bemId
export function changeBeamId(newBeamId: number, noteHead: NoteHead, musicScore: MusicScore) {
    noteHead.beamId = newBeamId

}

// 更新符杠方向
export function changeNoteBarDirection(direction: 'up' | 'down', noteBar: NoteBar) {
    noteBar.direction = direction
    noteBar.vueKey = Date.now()
}

// 更新符尾方向
export function changeNoteTailDirection(direction: 'up' | 'down', noteTail: NoteTail) {
    noteTail.direction = direction
    noteTail.vueKey = Date.now()
}


// 成组音符更新
export function updateBeamGroupNote(beamId: number, measure: Measure, musicScore: MusicScore) {
    const group: { noteBar: NoteBar, noteTail: NoteTail }[] = []
    let direction: 'up' | 'down' = 'up'
    let farthestRegion: MusicScoreRegionEnum = MusicScoreRegionEnum.line_3
    let start = false
    for (const i in measure.msSymbolContainerArray) {
        const msSymbolContainer = measure.msSymbolContainerArray[i]
        for (const j in msSymbolContainer.msSymbolArray) {
            const mainSymbol = msSymbolContainer.msSymbolArray[j]
            // 找到音符头存储(这里要考虑多声部，container中可能有多个音符头)
            if (mainSymbol.type === MsSymbolTypeEnum.noteHead
                && ![ChronaxieEnum.whole, ChronaxieEnum.half, ChronaxieEnum.quarter].includes(mainSymbol.chronaxie)) {
                const distanceFromMiddle = Math.abs(mainSymbol.region - MusicScoreRegionEnum.line_3)
                const currentFarthest = Math.abs(farthestRegion - MusicScoreRegionEnum.line_3)
                if (distanceFromMiddle > currentFarthest) {
                    farthestRegion = mainSymbol.region
                }

                const noteBar = mainSymbol.msSymbolArray.find(item => item.type === MsSymbolTypeEnum.noteBar) as NoteBar | null
                const noteTail = mainSymbol.msSymbolArray.find(item => item.type === MsSymbolTypeEnum.noteTail) as NoteTail | null
                if (noteTail && noteBar && mainSymbol.beamId === beamId) {
                    group.push({noteBar, noteTail})
                    start = true
                }
            } else if (start) {
                break
            }
        }
    }
    // 更新 direction
    direction = farthestRegion >= MusicScoreRegionEnum.space_2 ? 'down' : 'up'
    for (const i in group) {
        const noteBar = group[i].noteBar
        const noteTail = group[i].noteTail
        changeNoteBarDirection(direction, noteBar)
        changeNoteTailDirection(direction, noteTail)
    }
}