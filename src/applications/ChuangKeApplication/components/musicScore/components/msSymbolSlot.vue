<template>
  <div class="msSymbolSlot p-stackItem"

       :style="msSymbolSlotStyle">
    <msSymbolVue v-if="msSymbol" ref="mainMsSymbolRef" :measureHeight="measureHeight"
                 :slot-width="slotWidth"
                 :containerWidth="containerWidth"
                 :isMain="true"
                 :ms-symbol="msSymbol"></msSymbolVue>
    <template v-if="msSymbol?.msSymbolArray">
      <msSymbolVue :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray"
                   :containerWidth="containerWidth"
                   :isMain="false"
                   :slot-width="slotWidth"
                   :ms-symbol="item"></msSymbolVue>
    </template>
  </div>


</template>

<script setup lang="ts">
import type {
  Measure,
  MsSymbol,
  MsSymbolContainer,
  MultipleStaves,
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
  },
  measureWidth: {
    type: Number,
    default: 200,
    required: true,
  },
  singleStaff: {
    type: Object as PropType<SingleStaff>,
    required: true,
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
    required: true,
  }
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
    if (props.msSymbol.type === MsSymbolTypeEnum.keySignature) {
      return information.aspectRatio[props.msSymbol.keySignature]
    }
  }
  return 1
})
const height = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      return props.measureHeight / 4
    }
    case MsSymbolTypeEnum.noteBar: {
      return props.measureHeight * 0.6
    }
  }
  return props.measureHeight
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
  if (!props.msSymbol) return 0
  switch (props.msSymbol.type) {
    case MsSymbolTypeEnum.noteHead: {
      if (!props.msSymbol || !props.measure || !props.singleStaff) return 0
      const clef = props.msSymbol.computed.clef
      if (clef) {
        const noteRegion: MusicScoreRegionEnum = props.msSymbol.region
        return staffRegionToBottom(noteRegion, props.measureHeight)
      }
      return 0
    }
    default: {
      return 0
    }

  }
})


// 五线谱区域转换bottom
function staffRegionToBottom(region: MusicScoreRegionEnum, measureHeight: number): number {
  switch (region) {

    case 'lower_line_6':
      return -measureHeight * 26 / 16;
    case 'lower_space_6':
      return -measureHeight * 24 / 16;
    case 'lower_line_5':
      return -measureHeight * 22 / 16;
    case 'lower_space_5':
      return -measureHeight * 20 / 16;
    case 'lower_line_4':
      return -measureHeight * 18 / 16;
    case 'lower_space_4':
      return -measureHeight * 16 / 16;
    case 'lower_line_3':
      return -measureHeight * 14 / 16;
    case 'lower_space_3':
      return -measureHeight * 12 / 16;
    case 'lower_line_2':
      return -measureHeight * 10 / 16;
    case 'lower_space_2':
      return -measureHeight * 8 / 16;
    case 'lower_line_1':
      return -measureHeight * 6 / 16;
    case 'lower_space_1':
      return -measureHeight * 4 / 16;
    case 'line_1':
      return -measureHeight * 2 / 16;
    case 'space_1':
      return 0;
    case 'line_2':
      return measureHeight * 2 / 16;
    case 'space_2':
      return measureHeight * 4 / 16;
    case 'line_3':
      return measureHeight * 6 / 16;
    case 'space_3':
      return measureHeight * 8 / 16;
    case 'line_4':
      return measureHeight * 10 / 16;
    case 'space_4':
      return measureHeight * 12 / 16;
    case 'line_5':
      return measureHeight * 14 / 16;
    case 'upper_space_1':
      return measureHeight * 16 / 16;
    case 'upper_line_1':
      return measureHeight * 18 / 16;
    case 'upper_space_2':
      return measureHeight * 20 / 16;
    case 'upper_line_2':
      return measureHeight * 22 / 16;
    case 'upper_space_3':
      return measureHeight * 24 / 16;
    case 'upper_line_3':
      return measureHeight * 26 / 16;
    case 'upper_space_4':
      return measureHeight * 28 / 16;
    case 'upper_line_4':
      return measureHeight * 30 / 16;
    case 'upper_space_5':
      return measureHeight * 32 / 16;
    case 'upper_line_5':
      return measureHeight * 34 / 16;
    case 'upper_space_6':
      return measureHeight * 36 / 16;
    case 'upper_line_6':
      return measureHeight * 38 / 16;
    case 'upper_space_7':
      return measureHeight * 40 / 16;
    case 'upper_line_7':
      return measureHeight * 42 / 16;
    case 'upper_space_8':
      return measureHeight * 44 / 16;
    case 'upper_line_8':
      return measureHeight * 46 / 16;
    default:
      return 0;
  }


}

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