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
                    :multipleStaves="props.multipleStaves"
                    :measureHeight="props.measureHeight"></ms-symbol-slot>
  </div>


</template>

<script setup lang="ts">
import type {
  Measure,
  MsSymbol, MsSymbolContainer,
  MultipleStaves,
  SingleStaff,
} from "@/applications/ChuangKeApplication/components/musicScore/types.d.ts";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {
  ClefEnum,
  MsSymbolCategoryEnum,
  MsSymbolContainerTypeEnum,
  MsSymbolTypeEnum, MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import msSymbolVue from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";
import {
  getWidthConstantInMeasure,
  getWidthConstantInMsSymbol, getWidthConstantInMsSymbolContainer, getWidthFixedContainerWidth,
  getWidthFixedContainerWidthSumInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import MsSymbolSlot from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolSlot.vue";
import measure from "@/applications/ChuangKeApplication/components/musicScore/components/measure.vue";

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
  singleStaff: {
    type: Object as PropType<SingleStaff>,
    required: true
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
    required: true
  }
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
  if (!props.msSymbolContainer || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return 0
  }
  let width: number = 0 // 定宽容器的宽度等于主符号宽度（通过调用符号组件暴露的获取宽高比方法获取宽高比），非定宽容器宽度通过计算宽度系数设置
  const containerType = props.msSymbolContainer.type
  if ([MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(containerType)) { // 如果是定宽容器
    width = getWidthFixedContainerWidth(props.msSymbolContainer, props.measureHeight)
  } else { // 如果是变宽容器  宽度 = (小节宽度 - 定宽容器宽度) / 变宽容器宽度系数和 * 当前容器宽度系数
    const fixedSymbolContainerSum = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight)
    const totalWidthConstantOfFixedContainerInMeasure = getWidthConstantInMeasure(props.measure,)
    const curMsSymbolContainerWidthConstant = getWidthConstantInMsSymbolContainer(props.msSymbolContainer)

    width = (props.measureWidth - fixedSymbolContainerSum) / totalWidthConstantOfFixedContainerInMeasure * curMsSymbolContainerWidthConstant
  }
  return width
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