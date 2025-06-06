<template>
  <div class="msSymbolContainer p-stackItem"

       :style="msSymbolContainerStyle">
    <msSymbolVue v-if="msSymbol" ref="mainMsSymbolRef" :measureHeight="measureHeight"
                 :container-width="containerWidth"
                 :isMain="true"
                 :ms-symbol="msSymbol"></msSymbolVue>
    <template v-if="msSymbol?.msSymbolArray">
      <msSymbolVue :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray"
                   :isMain="false"
                   :container-width="containerWidth"
                   :ms-symbol="item"></msSymbolVue>
    </template>
  </div>


</template>

<script setup lang="ts">
import type {
  Measure,
  MsSymbol,
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
  calculationOfStaffRegion, getClef,
  getWidthConstantInMeasure,
  getWidthConstantInMsSymbol,
  getWidthFixedContainerWidthSumInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
  measure: {
    type: Object as PropType<Measure>,
  },
  measureWidth: {
    type: Number,
    default: 200
  },
  singleStaff: {
    type: Object as PropType<SingleStaff>,
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
  }
})

const mainSymbolAspectRatio = computed<number>(() => {
  if (!props.msSymbol?.type) return 1
  // 单小节符号，赋值
  const information = MsSymbolInformationMap[props.msSymbol.type]
  if (information.category === MsSymbolCategoryEnum.singleMeasure) {
    return information.aspectRatio
  }
  return 1
})
const msSymbolContainerStyle = computed<CSSProperties>(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return {}
  }


  return {
    left: containerLeft.value + 'px',
    height: props.measureHeight + 'px',
    width: containerWidth.value + 'px',
    bottom: containerBottom.value + 'px',

  }
});

// 符号容器宽度计算
const containerWidth = computed(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return 0
  }
  let width: number = 0 // 定宽容器的宽度等于主符号宽度（通过调用符号组件暴露的获取宽高比方法获取宽高比），非定宽容器宽度通过计算宽度系数设置
  const mainSymbolInformation = MsSymbolInformationMap[props.msSymbol.type]
  if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(mainSymbolInformation.containerType)) { // 如果是定宽容器
    width = props.measureHeight * mainSymbolInformation.aspectRatio
  } else { // 如果是变宽容器  宽度 = (小节宽度 - 定宽容器宽度) / 变宽容器宽度系数和 * 当前容器宽度系数
    const fixedSymbolContainerSum = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight)
    const totalWidthConstantOfFixedContainerInMeasure = getWidthConstantInMeasure(props.measure,)
    const curMsSymbolWidthConstant = getWidthConstantInMsSymbol(props.msSymbol)

    width = (props.measureWidth - fixedSymbolContainerSum) / totalWidthConstantOfFixedContainerInMeasure * curMsSymbolWidthConstant
  }
  return width
})

// 符号容器横坐标计算
const containerLeft = computed(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return 0
  }
  let left = 0
  const mainSymbolInformation = MsSymbolInformationMap[props.msSymbol.type]
  if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.frontFixed].includes(mainSymbolInformation.containerType)) { // 如果是前置定宽容器 left = 当前符号之前的前置定宽容器的宽度
    left = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'front', props.msSymbol)
  } else if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.rearFixed].includes(mainSymbolInformation.containerType)) {// 如果是后置定宽容器 left =  小节宽度 - 小节定宽容器宽度 + 当前小节之前的定宽容器的宽度

    left = props.measureWidth - getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight) + getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'all', props.msSymbol)
  } else {  //变宽容器 （小节宽度 - 定宽容器宽度）/ 小节变宽容器宽度系数之和 * 截止当前容器小节的宽度系数之和 + 前置定宽容器宽度之和
    const widthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight)
    const widthConstantInMeasure = getWidthConstantInMeasure(props.measure)
    const preWidConstantInMeasure = getWidthConstantInMeasure(props.measure, props.msSymbol)
    const preWidthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(props.measure, props.measureHeight, 'front')
    left = (props.measureWidth - widthFixedContainerWidthSumInMeasure) / widthConstantInMeasure * preWidConstantInMeasure + preWidthFixedContainerWidthSumInMeasure
  }


  return left
})

// 符号容器纵坐标计算
const containerBottom = computed(() => {
  if (!props.msSymbol) return 0
  switch (props.msSymbol.type) {
    case MsSymbolTypeEnum.noteHead: {
      if (!props.msSymbol || !props.measure || !props.singleStaff) return 0
      const clef = getClef(props.measure, props.singleStaff, props.msSymbol)
      if (clef) {
        const noteRegion: MusicScoreRegionEnum = calculationOfStaffRegion(clef, props.msSymbol.musicalAlphabet)[0].region
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
      return -measureHeight * 26 / 18;
    case 'lower_space_6':
      return -measureHeight * 24 / 18;
    case 'lower_line_5':
      return -measureHeight * 22 / 18;
    case 'lower_space_5':
      return -measureHeight * 20 / 18;
    case 'lower_line_4':
      return -measureHeight * 18 / 18;
    case 'lower_space_4':
      return -measureHeight * 16 / 18;
    case 'lower_line_3':
      return -measureHeight * 14 / 18;
    case 'lower_space_3':
      return -measureHeight * 12 / 18;
    case 'lower_line_2':
      return -measureHeight * 10 / 18;
    case 'lower_space_2':
      return -measureHeight * 8 / 18;
    case 'lower_line_1':
      return -measureHeight * 6 / 18;
    case 'lower_space_1':
      return -measureHeight * 4 / 18;
    case 'line_1':
      return -measureHeight * 2 / 18;
    case 'space_1':
      return 0;
    case 'line_2':
      return measureHeight * 2 / 18;
    case 'space_2':
      return measureHeight * 4 / 18;
    case 'line_3':
      return measureHeight * 6 / 18;
    case 'space_3':
      return measureHeight * 8 / 18;
    case 'line_4':
      return measureHeight * 10 / 18;
    case 'space_4':
      return measureHeight * 12 / 18;
    case 'line_5':
      return measureHeight * 14 / 18;
    case 'upper_space_1':
      return measureHeight * 16 / 18;
    case 'upper_line_1':
      return measureHeight * 18 / 18;
    case 'upper_space_2':
      return measureHeight * 20 / 18;
    case 'upper_line_2':
      return measureHeight * 22 / 18;
    case 'upper_space_3':
      return measureHeight * 24 / 18;
    case 'upper_line_3':
      return measureHeight * 26 / 18;
    case 'upper_space_4':
      return measureHeight * 28 / 18;
    case 'upper_line_4':
      return measureHeight * 30 / 18;
    case 'upper_space_5':
      return measureHeight * 32 / 18;
    case 'upper_line_5':
      return measureHeight * 34 / 18;
    case 'upper_space_6':
      return measureHeight * 36 / 18;
    case 'upper_line_6':
      return measureHeight * 38 / 18;
    case 'upper_space_7':
      return measureHeight * 40 / 18;
    case 'upper_line_7':
      return measureHeight * 42 / 18;
    case 'upper_space_8':
      return measureHeight * 44 / 18;
    case 'upper_line_8':
      return measureHeight * 46 / 18;
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
.msSymbolContainer {
  display: flex;
}
</style>