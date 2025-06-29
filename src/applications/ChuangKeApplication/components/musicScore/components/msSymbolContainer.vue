<template>
  <div class="msSymbolContainer "
       :style="msSymbolContainerStyle">
    <ms-symbol-slot v-for="msSymbol in msSymbolContainer?.msSymbolArray"
                    :msSymbol="msSymbol"
                    :msSymbolContainer="props.msSymbolContainer"
                    :measure="props.measure"
                    :measureWidth="props.measureWidth"
                    :singleStaff="props.singleStaff"
                    :containerWidth="containerWidth"
                    :componentWidth="componentWidth"
                    :componentHeight="componentHeight"
                    :multipleStaves="props.multipleStaves"
                    :musicScore="props.musicScore"
                    :measureHeight="props.measureHeight"></ms-symbol-slot>
  </div>


</template>

<script setup lang="ts">
import type {
  Measure,
  MsSymbolContainer,
  MultipleStaves, MusicScore,
  SingleStaff,
} from "@/applications/ChuangKeApplication/components/musicScore/types.d.ts";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {
  MsSymbolContainerTypeEnum,
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import MsSymbolSlot from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolSlot.vue";
import {
  getMsSymboLContainerWidth,
  getWidthFixedContainerWidth,
  getWidthFixedContainerWidthSumInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import {
  getWidthConstantInMeasure, getWidthConstantInMsSymbolContainer
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthConstantUtil.ts";

const props = defineProps({
  msSymbolContainer: {
    type: Object as PropType<MsSymbolContainer>,
    required: true
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60,
    required: true
  },
  measure: {
    type: Object as PropType<Measure>,
    required: true
  },
  measureWidth: {
    type: Number,
    default: 200
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
    required: true
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },
})


const msSymbolContainerStyle = computed<CSSProperties>(() => {
  if (!props.msSymbolContainer || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return {}
  }


  return {
    left: containerLeft.value + 'px',
    height: props.measureHeight + 'px',
    width: containerWidth.value + 'px',
    bottom: 0 + 'px',

  }
});

// 符号容器宽度计算
const containerWidth = computed(() => {
  return getMsSymboLContainerWidth(props.msSymbolContainer, props.measure, props.singleStaff, props.musicScore, props.measureHeight, props.componentWidth)
})

// 符号容器横坐标计算
const containerLeft = computed(() => {
  if (!props.msSymbolContainer || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return 0
  }
  let left = 0
  const containerType = props.msSymbolContainer.type
  if ([MsSymbolContainerTypeEnum.frontFixed].includes(containerType)) { // 如果是前置定宽容器 left = 当前符号之前的前置定宽容器的宽度
    left = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'front', props.msSymbolContainer)
  } else if ([MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) {// 如果是后置定宽容器 left =  小节宽度 - 小节定宽容器宽度 + 当前小节之前的定宽容器的宽度

    left = props.measureWidth - getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight) + getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'all', props.msSymbolContainer)
  } else {  //变宽容器 （小节宽度 - 定宽容器宽度）/ 小节变宽容器宽度系数之和 * 截止当前容器小节的宽度系数之和 + 前置定宽容器宽度之和
    const widthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight)
    const widthConstantInMeasure = getWidthConstantInMeasure(props.measure)
    const preWidConstantInMeasure = getWidthConstantInMeasure(props.measure, props.msSymbolContainer)
    const preWidthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'front')
    left = (props.measureWidth - widthFixedContainerWidthSumInMeasure) / widthConstantInMeasure * preWidConstantInMeasure + preWidthFixedContainerWidthSumInMeasure
  }


  return left
})


onMounted(() => {
  // 如果是音符头，获取到谱号

})


const mouseDownFn = () => {

};
</script>


<style scoped>
.msSymbolContainer {
  overflow: visible;
  position: absolute;
}


</style>