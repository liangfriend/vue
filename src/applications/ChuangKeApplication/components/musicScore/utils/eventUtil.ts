import {
    MsTypeNameEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {msType} from "@/applications/ChuangKeApplication/components/musicScore/types";

import {computed, onMounted, onBeforeMount, onUnmounted, type PropType, provide, ref} from 'vue';

// 当前选择对象
export const currentSelected: MsType = ref(null)


// 添加发布者
export function select(value: msType) {
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
            break
        }
    }

}


export function handleMouseUpSelected(e: MouseEvent) {
    if (!currentSelected.value) return
    switch (currentSelected.value.msTypeName) {
        case MsTypeNameEnum.MsSymbol: {
            currentSelected.value.options.hightlight = false
        }
        case MsTypeNameEnum.Measure: {
        }
    }

}

