<template>
  <div class="msSymbolContainer p-stackItem"

       :style="msSymbolSlotStyle">
    <msSymbolVue v-if="msSymbol" ref="mainMsSymbolRef" :measureHeight="measureHeight"
                 :ms-symbol="msSymbol"></msSymbolVue>
    <template v-if="msSymbol?.msSymbolArray">
      <msSymbolVue :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray"
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
  MsSymbolTypeEnum,
  MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import msSymbolVue from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";
import {
  calculationOfStaffRegion,
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
const msSymbolSlotStyle = computed<CSSProperties>(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.error("缺少必要的参数，坐标计算出错")
    return {bottom: `${bottom.value}px`}
  }


  return {
    left: getLeft(props.msSymbol, props.measure, props.singleStaff, props.measureHeight, props.measureWidth) + 'px',
    height: props.measureHeight + 'px',
    width: getWidth(props.msSymbol, props.measure, props.singleStaff, props.measureHeight, props.measureWidth) + 'px',
    bottom: getBottom(props.msSymbol, props.measure, props.singleStaff, props.measureHeight, props.measureWidth) + 'px',

  }
});

// 符号容器宽度计算
function getWidth(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff, measureHeight: number, measureWidth: number): number {
  let width: string | number = 0 // 定宽容器的宽度等于主符号宽度（通过调用符号组件暴露的获取宽高比方法获取宽高比），非定宽容器宽度通过计算宽度系数设置
  const mainSymbolInformation = MsSymbolInformationMap[msSymbol.type]
  if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.frontFixed, MsSymbolContainerTypeEnum.rearFixed].includes(mainSymbolInformation.containerType)) { // 如果是定宽容器
    width = measureHeight * mainSymbolInformation.aspectRatio
  } else { // 如果是变宽容器  宽度 = (小节宽度 - 定宽容器宽度) / 变宽容器宽度系数和 * 当前容器宽度系数
    const fixedSymbolContainerSum = getWidthFixedContainerWidthSumInMeasure(measure, props.measureHeight)
    const totalWidthConstantOfFixedContainerInMeasure = getWidthConstantInMeasure(measure,)
    const curMsSymbolWidthConstant = getWidthConstantInMsSymbol(msSymbol)

    width = (measureWidth - fixedSymbolContainerSum) / totalWidthConstantOfFixedContainerInMeasure * curMsSymbolWidthConstant
  }
  return width
}

// 符号容器横坐标计算
function getLeft(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff, measureHeight: number, measureWidth: number): number {
  let left = 0
  const mainSymbolInformation = MsSymbolInformationMap[msSymbol.type]
  if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.frontFixed].includes(mainSymbolInformation.containerType)) { // 如果是前置定宽容器 left = 当前符号之前的前置定宽容器的宽度
    left = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'front', msSymbol)
  } else if ('containerType' in mainSymbolInformation && [MsSymbolContainerTypeEnum.rearFixed].includes(mainSymbolInformation.containerType)) {// 如果是后置定宽容器 left =  小节宽度 - 小节定宽容器宽度 + 当前小节之前的定宽容器的宽度

    left = measureWidth - getWidthFixedContainerWidthSumInMeasure(measure, measureHeight) + getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'all', msSymbol)
  } else {  //变宽容器 （小节宽度 - 定宽容器宽度）/ 小节变宽容器宽度系数之和 * 截止当前容器小节的宽度系数之和 + 前置定宽容器宽度之和
    const widthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight)
    const widthConstantInMeasure = getWidthConstantInMeasure(measure)
    const preWidConstantInMeasure = getWidthConstantInMeasure(measure, msSymbol)
    const preWidthFixedContainerWidthSumInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, measureHeight, 'front')
    left = (measureWidth - widthFixedContainerWidthSumInMeasure) / widthConstantInMeasure * preWidConstantInMeasure + preWidthFixedContainerWidthSumInMeasure
  }


  return left
}

// 符号容器纵坐标计算
function getBottom(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff, measureHeight: number, measureWidth: number): number {
  if (!msSymbol) return 0
  switch (msSymbol.type) {
    case MsSymbolTypeEnum.noteHead: {
      if (!msSymbol || !measure || !singleStaff) return 0
      const clef = getClef(measure, singleStaff, msSymbol)
      if (clef) {
        const noteRegion: MusicScoreRegionEnum = calculationOfStaffRegion(clef, msSymbol.musicalAlphabet)
        return staffRegionToBottom(noteRegion, props.measureHeight)
      }
      return 0
    }
    default: {
      return 0
    }

  }
}
function getClef(measure: Measure, singleStaff: SingleStaff, noteHead: Extract<MsSymbol, {
  type: MsSymbolTypeEnum.noteHead
}>): ClefEnum | null {


  let clef: ClefEnum | null = null
  // 如果音符上没有clef，就从最近的小节上找
  const measuerIndex = singleStaff.measureArray.indexOf(measure)
  let msSymbolIndex = measure.msSymbolArray.indexOf(noteHead)
  for (let i = measuerIndex; i >= 0; i--) {
    for (let j = msSymbolIndex; j >= 0; j--) {
      const curMsSymbol = singleStaff.measureArray[i].msSymbolArray[j]
      const childMsSymbolArray = singleStaff.measureArray[i].msSymbolArray[j].msSymbolArray
      if (childMsSymbolArray) {
        // 寻找最近的音符上的谱号信息
        for (let k = 0; j < childMsSymbolArray.length; j++) {
          if (childMsSymbolArray[k].type === MsSymbolTypeEnum.clef) {
            const clefSymbol = childMsSymbolArray[k] as Extract<MsSymbol, { type: MsSymbolTypeEnum.clef }>
            clef = clefSymbol.clef
            break;
          }
        }
      }
      // 寻找小节上的谱号信息
      if (curMsSymbol.type === MsSymbolTypeEnum.clef) {
        clef = curMsSymbol.clef
      }
    }
    if (i > 1) {
      msSymbolIndex = singleStaff.measureArray[i - 1].msSymbolArray.length - 1
    }
  }

  // TODO 完成前置谱号功能，记录好符号顺序必须固定这个原则，并且就算符号顺序固定，也要分清前后置符号，否则没有变宽符号时，就没办法区分前后置了
  return clef || ClefEnum.treble
}

function staffRegionToBottom(region: MusicScoreRegionEnum, measureHeight: number): number {
  switch (region) {
    case 'line_1':
      return measureHeight * 9 / 9;
    case 'space_1':
      return measureHeight * 8 / 9;
    case 'line_2':
      return measureHeight * 7 / 9;
    case 'space_2':
      return measureHeight * 6 / 9;
    case 'line_3':
      return measureHeight * 5 / 9;
    case 'space_3':
      return measureHeight * 4 / 9;
    case 'line_4':
      return measureHeight * 3 / 9;
    case 'space_4':
      return measureHeight * 2 / 9;
    case 'line_5':
      return measureHeight * 1 / 9;
    case 'upper_space_1':
      return measureHeight * 2 / 9;
    case 'upper_line_1':
      return measureHeight * 1 / 9;
    case 'upper_space_2':
      return measureHeight * 2 / 9;
    case 'upper_line_2':
      return measureHeight * 1 / 9;
    case 'upper_space_3':
      return measureHeight * 2 / 9;
    case 'upper_line_3':
      return measureHeight * 1 / 9;
    case 'upper_space_4':
      return measureHeight * 2 / 9;
    case 'upper_line_4':
      return measureHeight * 1 / 9;
    case 'upper_space_5':
      return measureHeight * 2 / 9;
    case 'upper_line_5':
      return measureHeight * 1 / 9;
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

</style>