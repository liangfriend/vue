<template>
  <div class="msSymbolContainer p-stackItem"
       :style="msSymbolContainerStyle">
    <msSymbolVue v-if="msSymbol" :measureHeight="measureHeight" :symbol="msSymbol"></msSymbolVue>
    <template v-if="msSymbol?.msSymbolArray">
      <msSymbolVue :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray" :symol="item"></msSymbolVue>
    </template>
  </div>


</template>

<script setup lang="ts">
import type {
  Measure,
  MultipleStaves,
  SingleStaff,
  MsSymbol,
} from "@/applications/ChuangKeApplication/components/musicScore/types.d.ts";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {
  ClefEnum,
  MsSymbolTypeEnum,
  MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import msSymbolVue from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";
import {
  calculationOfStaffRegion, getPreWidthConstantForMsSymbolOnMeasure, getTotalWidthConstantOnMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

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
  singleStaff: {
    type: Object as PropType<SingleStaff>,
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
  }
})

const bottom = computed(() => {
  if (!props.msSymbol) return 0
  switch (props.msSymbol.type) {
    case MsSymbolTypeEnum.noteHead: {
      if (!props.msSymbol || !props.measure || !props.singleStaff) return 0
      const clef = getClef(props.measure, props.singleStaff, props.msSymbol)
      if (clef) {
        const noteRegion: MusicScoreRegionEnum = calculationOfStaffRegion(clef, props.msSymbol.musicalAlphabet)
        console.log('chicken', staffRegionToBottom(noteRegion, props.measureHeight))
        return staffRegionToBottom(noteRegion, props.measureHeight)
      }
      return 0
    }
    default: {
      return 0
    }

  }
});
const msSymbolContainerStyle = computed<CSSProperties>(() => {
  if (!props.msSymbol || !props.measure || !props.singleStaff) {
    console.log('chicken', props.msSymbol, props.measure, props.singleStaff)
    console.error("缺少必要的参数，坐标计算出错")
    return {bottom: `${bottom.value}px`}
  }
  let height = 0 // 符号容器的高度度等于小节的高度
  let width = 0 // 定宽容器的宽度等于主符号宽度（通过调用符号组件暴露的获取宽高比方法获取宽高比），非定宽容器宽度通过计算宽度系数设置

  return {
    left: getLeft(props.msSymbol, props.measure, props.singleStaff),
    height: props.measureHeight + 'px',
    width: getWidth(props.msSymbol, props.measure, props.singleStaff),
    bottom: `${bottom.value}px`,

  }
});

// 符号横坐标计算
function getLeft(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff): string {
  const symnbolIndex = measure.msSymbolArray.indexOf(msSymbol)
  const preWidthConstantOnMeasure = getPreWidthConstantForMsSymbolOnMeasure(msSymbol, measure)
  const totalWidthConstantOnMeasure = getTotalWidthConstantOnMeasure(measure)

  return preWidthConstantOnMeasure / totalWidthConstantOnMeasure * 100 + '%'
}

function getWidth(msSymbol: MsSymbol, measure: Measure, singleStaff: SingleStaff): string {
  const symbolIndex = measure.msSymbolArray.indexOf(msSymbol)
  const preWidthConstantOnMeasure = getPreWidthConstantForMsSymbolOnMeasure(msSymbol, measure)
  const totalWidthConstantOnMeasure = getTotalWidthConstantOnMeasure(measure)

  return preWidthConstantOnMeasure / totalWidthConstantOnMeasure * 100 + '%'
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


  return clef
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