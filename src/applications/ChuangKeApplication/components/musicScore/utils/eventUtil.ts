import {
    ChronaxieEnum,
    MsMode,
    MsSymbolTypeEnum,
    MsTypeNameEnum,
    MusicScoreRegionEnum,
    ReserveMsSymbolType
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    Measure,
    MsState,
    MsSymbol,
    MsSymbolContainer,
    MsType,
    MultipleStaves,
    MusicScore,
    SingleStaff, SpanSymbol,
    VirtualSymbolContainerType
} from "@/applications/ChuangKeApplication/components/musicScore/types";

import {Ref} from 'vue';
import {
    msSymbolContainerTemplate,
    msSymbolTemplate, spanSymbolTemplate
} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    getDataWithIndex,
    getSpanSymbolIdSetInSingleStaff,
    setMeasureArrayIndex,
    updateSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    addMsSymbol,
    addMsSymbolContainer
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";


// 添加发布者
export function select(value: MsType, currentSelected: Ref<null | MsType>) {
    if (currentSelected.value) {
        currentSelected.value.options.hightlight = false
    }
    value.options.hightlight = true
    currentSelected.value = value

}


export const eventConstant: { startX: number, startY: number, originRegion: MusicScoreRegionEnum } = {
    startX: 0, //鼠标按下时相对视口坐标
    startY: 0,
    originRegion: MusicScoreRegionEnum.space_1, // 音符按下专用，记录初始region
}

// 处理选中元素mousemove事件
export function handleMouseMoveSelected(e: MouseEvent, measureHeight: number, currentSelected: Ref<MsType | null>, musicScore: MusicScore) {

    if (!currentSelected.value) return
    switch (currentSelected.value.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            const msSymbol = currentSelected.value
            if (msSymbol.type === MsSymbolTypeEnum.noteHead) {
                const dx = e.clientX - eventConstant.startX;
                const dy = e.clientY - eventConstant.startY;
                if (Math.abs(dy) > measureHeight / 8 && msSymbol) {
                    const index = Math.floor(dy / measureHeight * 8);
                    const targetIndex = eventConstant.originRegion - index;
                    if (targetIndex in MusicScoreRegionEnum) {
                        msSymbol.region = targetIndex as MusicScoreRegionEnum;
                        // 跨小节符号位置更新
                        const singleStaff = getDataWithIndex(currentSelected.value.index, musicScore).singleStaff
                        if (!singleStaff) return console.error("找不到单谱表，跨小节符号更新失败")
                        const spanSymbolIdSet = getSpanSymbolIdSetInSingleStaff(singleStaff, musicScore)
                        updateSpanSymbol(spanSymbolIdSet, musicScore)
                    }
                }
            }
            break
        }
    }
}


export function handleMouseUpSelected(e: MouseEvent, currentSelected: Ref<MsType | null>, musicScore: MusicScore) {
    if (!currentSelected.value) return
    switch (currentSelected.value.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {


            currentSelected.value.options.hightlight = false
            currentSelected.value = null

            break
        }
        case MsTypeNameEnum.Measure: {
        }
    }
}

// 虚拟音符鼠标按下事件
export function virtualSymbolMouseDown(
    e: MouseEvent, params: {
        msState: MsState,
        virtualSymbolContainerType: VirtualSymbolContainerType,
        msData: {
            musicScore: MusicScore,
            msSymbolContainer: MsSymbolContainer | null,
            measure: Measure,
            singleStaff: SingleStaff,
            multipleStaves: MultipleStaves,
        },
        msSymbolInformation: {
            region: MusicScoreRegionEnum
        }
    },) {
    if (!params.msState.currentSelected.value) return
    if (params.msState.mode.value !== MsMode.edit || params.msState.currentSelected.value.msTypeName !== MsTypeNameEnum.Measure) return
    let chronaxie = null
    const reserveNote = params.msState.reserveMsSymbolMap.value.get(ReserveMsSymbolType.note)
    if (reserveNote && 'chronaxie' in reserveNote) {
        chronaxie = reserveNote.chronaxie
    }
    const newNoteHead = msSymbolTemplate({
        type: MsSymbolTypeEnum.noteHead,
        region: params.msSymbolInformation.region,
        chronaxie: chronaxie || ChronaxieEnum.quarter
    }) as Extract<MsSymbol, { type: MsSymbolTypeEnum.noteHead }>
    const newMsSymbolContainer = msSymbolContainerTemplate({})
    // 给音符进行计算属性赋值及index赋值

    if (['front'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        if (params.msData.msSymbolContainer) {
            addMsSymbolContainer(newMsSymbolContainer,
                params.msData.msSymbolContainer, params.msData.musicScore, 'before')
        } else {
            addMsSymbolContainer(newMsSymbolContainer,
                params.msData.measure, params.msData.musicScore, 'before')
        }

    } else if (['end', 'middle'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        if (!params.msData.msSymbolContainer) return console.error("没有作为对照的符号容器，符号容器添加失败")
        addMsSymbolContainer(newMsSymbolContainer,
            params.msData.msSymbolContainer, params.msData.musicScore, 'after')
    } else if (['self'].includes(params.virtualSymbolContainerType)) {
        // TODO 需要判断同region是否已经存在音符
        if (!params.msData.msSymbolContainer) return console.error("没有作为对照的符号容器，符号添加失败")

        const sameRegionNoteHead = params.msData.msSymbolContainer.msSymbolArray.find(m => {
            return m.type === MsSymbolTypeEnum.noteHead && m.region === newNoteHead.region
        })
        if (sameRegionNoteHead) {
            msSymbolMouseDown(e, params.msState.mode, params.msState.currentSelected, sameRegionNoteHead)
        } else {
            addMsSymbol(newNoteHead,
                params.msData.msSymbolContainer, params.msData.musicScore, 'after')
        }

    }
    // 索引生成
    setMeasureArrayIndex(params.msData.singleStaff)
    // 跨小节符号位置更新
    const spanSymbolIdSet = getSpanSymbolIdSetInSingleStaff(params.msData.singleStaff, params.msData.musicScore)
    updateSpanSymbol(spanSymbolIdSet, params.msData.musicScore)
}

export function spanSymbolMouseDown(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, spanSymbol: SpanSymbol) {

    if (mode.value === MsMode.edit) {
        // 订阅
        select(spanSymbol, currentSelected)
    }
}

export function spanSymbolMouseUp(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, spanSymbol: SpanSymbol) {

}

export function msSymbolMouseDown(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, msSymbol: MsSymbol) {
    if (msSymbol.type === MsSymbolTypeEnum.noteHead) {  // 赋值region
        eventConstant.originRegion = msSymbol.region
    }
    if (mode.value === MsMode.edit) {
        // 订阅
        select(msSymbol, currentSelected)
    }
}

export function msSymbolMouseUp(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, msSymbol: MsSymbol) {

}

export function measureMouseDown(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, measure: Measure) {
    if (mode.value === MsMode.edit) {
        // 订阅
        select(measure, currentSelected)
    }
}

export function singleStaffMouseDown(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, singleStaff: SingleStaff) {
    if (mode.value === MsMode.edit) {
        // 订阅
        select(singleStaff, currentSelected)
    }
}

export function multipleStavesMouseDown(e: MouseEvent, mode: Ref<MsMode>, currentSelected: Ref<MsType | null>, multipleStaves: MultipleStaves) {
    if (mode.value === MsMode.edit) {
        // 订阅
        select(multipleStaves, currentSelected)
    }
}
