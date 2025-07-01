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
    MsType, MultipleStaves, SingleStaff,
    VirtualSymbolContainerType
} from "@/applications/ChuangKeApplication/components/musicScore/types";

import {computed, onMounted, onBeforeMount, onUnmounted, type PropType, provide, ref, Ref} from 'vue';
import {
    msSymbolContainerTemplate,
    msSymbolTemplate
} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
    addMsSymbolToMeasure, msSymbolComputedData, setMeasureArrayIndex
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

// 当前选择对象
export const currentSelected: Ref<MsType | null> = ref(null)


// 添加发布者
export function select(value: MsType) {
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


export function handleMouseMoveSelected(e: MouseEvent, measureHeight: number) {
    if (!currentSelected.value) return
    switch (currentSelected.value.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            const msSymbol = currentSelected.value
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


export function handleMouseUpSelected(e: MouseEvent) {
    if (!currentSelected.value) return
    switch (currentSelected.value.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            currentSelected.value.options.hightlight = false
            break
        }
        case MsTypeNameEnum.Measure: {
        }
    }

}

export function msSymbolMouseDown(e: MouseEvent, msState: MsState, msSymbol: MsSymbol) {
    if (msState.mode.value === MsMode.edit) {
        // 订阅
        select(msSymbol)
        // 抛出回调
        // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})
    }
}

export function virtualSymbolMouseDown(
    e: MouseEvent, params: {
        msState: MsState,
        virtualSymbolContainerType: VirtualSymbolContainerType,
        msData: {
            msSymbolContainer: MsSymbolContainer,
            measure: Measure,
            singleStaff: SingleStaff,
            multipleStaves: MultipleStaves,
        },
        msSymbolInformation: {
            region: MusicScoreRegionEnum
        }
    },) {
    if (!currentSelected.value) return
    if (params.msState.mode.value !== MsMode.edit || currentSelected.value.msTypeName !== MsTypeNameEnum.Measure) return

    const newNoteHead = msSymbolTemplate({
        type: MsSymbolTypeEnum.noteHead,
        region: params.msSymbolInformation.region
    })
    const newMsSymbolContainer = msSymbolContainerTemplate({})
    // 给音符进行计算属性赋值及index赋值

    if (['front'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        console.log('chicken', newMsSymbolContainer)
        addMsSymbolToMeasure(params.msData.measure, newMsSymbolContainer,
            {msSymbolContainer: params.msData.msSymbolContainer, type: 'front'})
    } else if (['end', 'middle'].includes(params.virtualSymbolContainerType)) {
        newMsSymbolContainer.msSymbolArray.push(newNoteHead)
        addMsSymbolToMeasure(params.msData.measure, newMsSymbolContainer,
            {msSymbolContainer: params.msData.msSymbolContainer, type: 'back'})
    } else if (['self'].includes(params.virtualSymbolContainerType)) {
        // 需要判断同region是否已经存在音符
    }
    // 索引生成
    setMeasureArrayIndex(params.msData.singleStaff)
}

export function measureMouseDown(e: MouseEvent, msState: MsState, measure: Measure) {
    if (msState.mode.value === MsMode.edit) {
        // 订阅
        select(measure)
        // 抛出回调
        // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})
    }
}

