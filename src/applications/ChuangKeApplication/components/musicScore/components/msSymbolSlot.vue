<template>
  <div class="msSymbolSlot p-stackItem"

       :style="msSymbolSlotStyle">
    <msSymbolVue v-if="msSymbol" ref="mainMsSymbolRef" :measureHeight="measureHeight"
                 :slot-width="slotWidth"
                 :containerWidth="containerWidth"
                 :isMain="true"
                 :componentWidth="componentWidth"
                 :componentHeight="componentHeight"
                 :musicScore="props.musicScore"
                 :ms-symbol="msSymbol"></msSymbolVue>
    <template v-if="msSymbol?.msSymbolArray">
      <msSymbolVue :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray"
                   :containerWidth="containerWidth"
                   :isMain="false"
                   :slot-width="slotWidth"
                   :componentWidth="componentWidth"
                   :componentHeight="componentHeight"
                   :musicScore="props.musicScore"
                   :ms-symbol="item"></msSymbolVue>
    </template>
  </div>


</template>

<script setup lang="ts">
import {
  Measure,
  MsSymbol,
  MsSymbolContainer,
  MultipleStaves, MusicScore,
  SingleStaff,
} from "@/applications/ChuangKeApplication/components/musicScore/types.d.ts";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {
  MsSymbolCategoryEnum,
  MsSymbolTypeEnum,
  MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import msSymbolVue from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";

import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import {
  getMultipleAspectRatio
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {getMsSymbolHeight} from "@/applications/ChuangKeApplication/components/musicScore/utils/heightUtil.ts";
import {getSlotBottomToMeasure} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
    required: true,
  },
  msSymbolContainer: {
    type: Object as PropType<MsSymbolContainer>,
    required: true,
  },
  containerWidth: {
    type: Number,
    default: 60,
    required: true,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60,
    required: true,
  },
  measure: {
    type: Object as PropType<Measure>,
    required: true,
  },
  measureWidth: {
    type: Number,
    default: 200,
    required: true,
  },
  componentWidth: {
    type: Number,
    default: 1000,
  },
  componentHeight: {
    type: Number,
    default: 800,
  },
  singleStaff: {
    type: Object as PropType<SingleStaff>,
    required: true,
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
    required: true,
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },
})


const msSymbolSlotStyle = computed<CSSProperties>(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return {}
  }

  return {
    left: slotLeft.value + 'px',
    height: props.measureHeight + 'px',
    width: slotWidth.value + 'px',
    bottom: slotBottom.value + 'px',

  }
});

const aspectRatio = computed<number>(() => {
  if (!props.msSymbol?.type) return 1
  // 单小节符号，赋值
  const information = MsSymbolInformationMap[props.msSymbol.type]
  if ('aspectRatio' in information && typeof information.aspectRatio === 'number') {
    return information.aspectRatio
  } else if ('aspectRatio' in information && typeof information.aspectRatio === 'object') {
    return getMultipleAspectRatio(props.msSymbol)
  }
  return 1
})
const height = computed(() => {
  return getMsSymbolHeight(props.msSymbol, props.measureHeight)
})
const slotWidth = computed(() => {

  return height.value * aspectRatio.value
})
const slotLeft = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: { // 音符头居中
      return props.containerWidth / 2 - slotWidth.value / 2
    }
    case MsSymbolTypeEnum.noteBar: { // 音符头居中
      return props.containerWidth / 2 + props.measureHeight / 8 - slotWidth.value
    }
  }
  return 0
})
const slotBottom = computed(() => {
  return getSlotBottomToMeasure(props.msSymbol, props.measureHeight)
})


onMounted(() => {
  // 如果是音符头，获取到谱号

})


const mouseDownFn = () => {

};
</script>


<style scoped>
.msSymbolSlot {
  display: flex;
}
</style>