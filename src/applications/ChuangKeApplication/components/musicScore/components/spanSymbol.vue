<script setup lang="ts">
import Volta from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/volta.vue";
import {onBeforeMount, onMounted, PropType} from "vue";
import {type MusicScore, SpanSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
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

function voltaRect(volta: Extract<SpanSymbol, {
  type: SpanSymbolTypeEnum.volta
}>, musicScore: MusicScore, componentWidth: number, componentHeight: number) {
  const rect = {
    width: 0,
    left: 0,
    bottom: 0
  }
  const startMeasure = getTarget(volta.startTargetId, musicScore)
  const endMeasure = getTarget(volta.endTargetId, musicScore)
  if (!startMeasure || !endMeasure) return console.error('获取不到绑定元素')
  if (startMeasure.msTypeName !== MsTypeNameEnum.Measure || endMeasure.msTypeName !== MsTypeNameEnum.Measure) return console.error('volta绑定元素错误')
  // 反复符号绑定的两个小节必须在同一单谱表上
  if (startMeasure.index.multipleStavesIndex !== endMeasure.index.multipleStavesIndex) {
    console.error("反复符号绑定小节有误")
    return
  }
  rect.left = getMeasureLeftToMusicScore(startMeasure, musicScore, componentWidth)
  traverseMeasure(startMeasure.index, endMeasure.index, musicScore, (measure, singleStaff, multipleStaves) => {
    rect.width += getMeasureWidth(measure, singleStaff, musicScore, componentWidth)
    rect.bottom = Math.max(rect.bottom, getMaxMsSymbolBottomInMeasure(measure, musicScore.measureHeight) + getMeasureBottomToMusicScore(measure, musicScore, componentHeight))
  })

  volta.rect = rect

}

function getSpanSymbolRect(spanSymbol: SpanSymbol, musicScore: MusicScore, componentWidth: number, componentHeight: number) {
  switch (spanSymbol.type) {
    case SpanSymbolTypeEnum.volta: {
      voltaRect(spanSymbol, musicScore, componentWidth, componentHeight)
      break
    }
  }
}

onBeforeMount(() => {
  getSpanSymbolRect(props.spanSymbol, props.musicScore, props.componentWidth, props.componentHeight)

})
</script>

<template>
  <volta v-if="spanSymbol && spanSymbol.type === SpanSymbolTypeEnum.volta" :spanSymbol="spanSymbol"></volta>
</template>

<style scoped>

</style>