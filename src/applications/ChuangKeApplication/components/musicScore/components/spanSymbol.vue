<script setup lang="ts">
import Volta from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/volta.vue";
import {inject, onBeforeMount, onMounted, PropType} from "vue";
import {MsState, type MusicScore, SpanSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  MsTypeNameEnum,
  SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
  getTarget,
  traverseMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {getMeasureLeftToMusicScore} from "@/applications/ChuangKeApplication/components/musicScore/utils/leftUtil.ts";
import {getMeasureWidth} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import {
  getMaxMsSymbolBottomInMeasure,
  getMeasureBottomToMusicScore
} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";
import RectDragShell from "@/applications/ChuangKeApplication/components/musicScore/components/rectDragShell.vue";

const props = defineProps({
  spanSymbol: {
    type: Object as PropType<SpanSymbol>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },
  componentWidth: {
    type: Number,
    default: 1000,
  },
  componentHeight: {
    type: Number,
    default: 800,
  },
})
const msState = inject('msState') as MsState

function voltaRect(volta: Extract<SpanSymbol, {
  type: SpanSymbolTypeEnum.volta
}>, musicScore: MusicScore, componentWidth: number, componentHeight: number) {
  const rect = {
    width: 0,
    left: 0,
    bottom: 0,
    height: 0
  }
  const startMeasure = getTarget(volta.startTargetId, musicScore.map)
  const endMeasure = getTarget(volta.endTargetId, musicScore.map)
  if (!startMeasure || !endMeasure) return console.error('获取不到绑定元素', startMeasure, endMeasure)
  console.log('chicken', startMeasure, endMeasure)
  if (startMeasure.msTypeName !== MsTypeNameEnum.Measure || endMeasure.msTypeName !== MsTypeNameEnum.Measure) return console.error('volta绑定元素错误')
  // 反复符号绑定的两个小节必须在同一单谱表上
  if (startMeasure.index.multipleStavesIndex !== endMeasure.index.multipleStavesIndex) {
    console.error("反复符号绑定小节有误")
    return
  }
  rect.left = getMeasureLeftToMusicScore(startMeasure, musicScore, componentWidth)
  traverseMeasure(startMeasure.index, endMeasure.index, musicScore, (measure, singleStaff, multipleStaves) => {
    rect.width += getMeasureWidth(measure, singleStaff, musicScore, componentWidth)
    const measureBottom = getMeasureBottomToMusicScore(measure, musicScore, componentHeight)
    const maxBottomMsSymbol = getMaxMsSymbolBottomInMeasure(measure, musicScore)
    rect.bottom = Math.max(musicScore.measureHeight + measureBottom, maxBottomMsSymbol + measureBottom)
  })
  rect.height = props.musicScore.measureHeight
  volta.rect = rect
  console.log('chicken', volta.rect)
}

function getSpanSymbolRect(spanSymbol: SpanSymbol, musicScore: MusicScore, componentWidth: number, componentHeight: number) {
  switch (spanSymbol.type) {
    case SpanSymbolTypeEnum.volta: {
      voltaRect(spanSymbol, musicScore, componentWidth, componentHeight)
      break
    }
  }
}

const emits = defineEmits(['spanSymbolMouseDown', 'spanSymbolMouseUp']);

function handleMouseDown(e: MouseEvent) {

  emits('spanSymbolMouseDown', e, props.spanSymbol)

}

function handleMouseUp(e: MouseEvent) {
  emits('spanSymbolMouseUp', e, props.spanSymbol)
}


onBeforeMount(() => {
  console.log('chicken',)
  getSpanSymbolRect(props.spanSymbol, props.musicScore, props.componentWidth, props.componentHeight)

})
</script>

<template>
  <rect-drag-shell v-if="spanSymbol && spanSymbol.type === SpanSymbolTypeEnum.volta"
                   :top-left="{x:spanSymbol.rect.left,y:componentHeight -spanSymbol.rect.bottom - musicScore.measureHeight}"
                   :top-right="{x:spanSymbol.rect.left + spanSymbol.rect.width,y:componentHeight - spanSymbol.rect.bottom- musicScore.measureHeight}"
                   :bottom-left="{x:spanSymbol.rect.left,y:componentHeight -spanSymbol.rect.bottom + spanSymbol.rect.height- musicScore.measureHeight}"
                   :bottom-right="{x:spanSymbol.rect.left + spanSymbol.rect.width,y:componentHeight - spanSymbol.rect.bottom+spanSymbol.rect.height- musicScore.measureHeight}">
    <volta :volta="spanSymbol"
           @mousedown.self="handleMouseDown" @mouseup.self="handleMouseUp"
    ></volta>
  </rect-drag-shell>
  <rect-drag-shell v-if="spanSymbol && spanSymbol.type === SpanSymbolTypeEnum.slur" :slur="spanSymbol"
                   :top-left="{x:spanSymbol.rect.left,y:spanSymbol.rect.bottom}" :top-right="{x:100,y:0}"
                   :bottom-left="{x:0,y:100}"
                   :bottom-right="{x:100,y:100}">
    <slur
        @mousedown.self="handleMouseDown" @mouseup.self="handleMouseUp"></slur>
  </rect-drag-shell>

</template>

<style scoped>

</style>