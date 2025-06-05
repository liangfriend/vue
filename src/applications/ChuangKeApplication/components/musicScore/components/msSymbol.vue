<template>
  <div ref="msSymbolRef" class="msSymbol" :style="msSymbolStyle"></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, onMounted, PropType, ref} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  ClefEnum,
  MsSymbolCategoryEnum,
  MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteHeadSvg from "../musicSymbols/noteHead.svg"
import trebleClefSvg from "../musicSymbols/trebleClef.svg"
import altoClefSvg from "../musicSymbols/altoClef.svg"
import bassClefSvg from "../musicSymbols/bassClef.svg"
import defaultSymbolSvg from "../musicSymbols/defaultSymbol.svg"
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  clef: {},
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
})

const svgHref = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      return noteHeadSvg
    }
    case MsSymbolTypeEnum.clef: {
      if (props.msSymbol.clef === ClefEnum.treble) {
        return trebleClefSvg
      } else if (props.msSymbol.clef === ClefEnum.alto) {
        return altoClefSvg
      } else if (props.msSymbol.clef === ClefEnum.bass) {
        return bassClefSvg
      }
      console.error('未知的谱号类别', props.msSymbol.clef)
      return defaultSymbolSvg
    }
    default: {
      console.error("未知的符号类别", props.msSymbol?.type)
      return defaultSymbolSvg
    }
  }
})
const msSymbolRef = ref(null!)

const aspectRatio = computed<number>(() => {
  if (!props.msSymbol?.type) return 1
  // 单小节符号，赋值
  const information = MsSymbolInformationMap[props.msSymbol.type]
  if (information.category === MsSymbolCategoryEnum.singleMeasure) {
    return information.aspectRatio
  }
  return 1
})

const msSymbolStyle = computed<CSSProperties>(() => {
  let height = 0 // 符号的高度度等于小节的高度
  let width = 0 // 符号的宽高比不变 通过js获取svg的width和height属性得到宽高比
  return {
    width: `${props.measureHeight * aspectRatio.value}px`,
    height: `${props.measureHeight}px`,
    backgroundColor: 'black',
    mask: `url(${svgHref.value}) no-repeat center`,
    maskSize: '100% 100%',
    position: 'absolute',
    bottom: '0',
  }
});
onMounted(() => {

})
defineExpose({aspectRatio})
</script>
<style scoped>

</style>