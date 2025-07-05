import {
    MsMode,
    MsSymbolTypeEnum,
    MsTypeNameEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
    Measure,
    MsState,
    MsSymbol, MsSymbolContainer,
    MsType, MultipleStaves, MusicScore, SingleStaff,
    VirtualSymbolContainerType
} from "@/applications/ChuangKeApplication/components/musicScore/types";

import {computed, onMounted, onBeforeMount, onUnmounted, type PropType, provide, ref, Ref} from 'vue';
import {
    msSymbolContainerTemplate,
    msSymbolTemplate
} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    getSpanSymbolIdSetInSingleStaff,
    msSymbolComputedData, setMeasureArrayIndex, updateSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
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


export const eventConstant = {
    startX: 0, //鼠标按下时相对视口坐标
    startY: 0,
}


export function handleMouseMoveSelected(e: MouseEvent, measureHeight: number, currentSelected: MsType | null) {
    if (!currentSelected) return
    switch (currentSelected.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            const msSymbol = currentSelected
            if (msSymbol.type === MsSymbolTypeEnum.noteHead) {
                const dx = e.clientX - eventConstant.startX;
                const dy = e.clientY - eventConstant.startY;
                if (Math.abs(dy) > measureHeight / 8 && msSymbol) {
                    const index = Math.floor(dy / measureHeight * 8);
                    const targetIndex = msSymbol.region - index;
                    if (targetIndex in MusicScoreRegionEnum) {
                        msSymbol.region = targetIndex as MusicScoreRegionEnum;
                        eventConstant.startY = e.clientY;
                    }
                }
            }

            break
        }
    }

}


export function handleMouseUpSelected(e: MouseEvent, currentSelected: MsType | null) {
    if (!currentSelected) return
    switch (currentSelected.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            currentSelected.options.hightlight = false
            break
        }
        case MsTypeNameEnum.Measure: {
        }
    }

}

export function msSymbolMouseDown(e: MouseEvent, msState: MsState, msSymbol: MsSymbol) {
    if (msState.mode.value === MsMode.edit) {
        // 订阅
        select(msSymbol, msState.currentSelected)
        // 抛出回调
        // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})
    }
}

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

    const newNoteHead = msSymbolTemplate({
        type: MsSymbolTypeEnum.noteHead,
        region: params.msSymbolInformation.region
    })
    const newMsSymbolContainer = msSymbolContainerTemplate({})
    // 给音符进行计算属性赋值及index赋值

    if (['front'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        if (params.msData.msSymbolContainer) {
            addMsSymbolContainer(params.msData.musicScore, newMsSymbolContainer,
                params.msData.msSymbolContainer, 'before')
        } else {
            addMsSymbolContainer(params.msData.musicScore, newMsSymbolContainer,
                params.msData.measure, 'before')
        }

    } else if (['end', 'middle'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        if (!params.msData.msSymbolContainer) return console.error("没有作为对照的符号容器，符号容器添加失败")
        addMsSymbolContainer(params.msData.musicScore, newMsSymbolContainer,
            params.msData.msSymbolContainer, 'after')
    } else if (['self'].includes(params.virtualSymbolContainerType)) {
        // 需要判断同region是否已经存在音符
    }
    // 索引生成
    setMeasureArrayIndex(params.msData.singleStaff)
    // 跨小节符号位置更新
    const spanSymbolIdSet = getSpanSymbolIdSetInSingleStaff(params.msData.singleStaff, params.msData.musicScore)
    updateSpanSymbol(spanSymbolIdSet, params.msData.musicScore)
}

export function measureMouseDown(e: MouseEvent, msState: MsState, measure: Measure) {
    if (msState.mode.value === MsMode.edit) {
        // 订阅
        select(measure, msState.currentSelected)
        // 抛出回调
        // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})
    }
}

