<template>
  <div class="symbol" :style="symbolStyle"></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {ClefEnum, MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteHeadSvg from "../musicSymbols/noteHead.svg"
import trebleClefSvg from "../musicSymbols/trebleClef.svg"
import altoClefSvg from "../musicSymbols/altoClef.svg"
import bassClefSvg from "../musicSymbols/bassClef.svg"
import defaultSymbolSvg from "../musicSymbols/defaultSymbol.svg"

const props = defineProps({
  symbol: {
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
  switch (props.symbol?.type) {
    case MsSymbolTypeEnum.NoteHead: {
      return noteHeadSvg
    }
    case MsSymbolTypeEnum.Clef: {
      if (props.symbol.clef === ClefEnum.treble) {
        return trebleClefSvg
      } else if (props.symbol.clef === ClefEnum.alto) {
        return altoClefSvg
      } else if (props.symbol.clef === ClefEnum.bass) {
        return bassClefSvg
      }
      console.error('未知的谱号类别', props.symbol.clef)
      return defaultSymbolSvg
    }
    default: {
      console.error("未知的符号类别", props.symbol?.type)
      return defaultSymbolSvg
    }
  }
})
const symbolStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.measureHeight / 5}px`,
    height: `${props.measureHeight}px`,
    backgroundColor: 'black',
    mask: `url(${svgHref.value}) no-repeat center`,
    maskSize: '100% 100%',
    position: 'absolute',
    bottom: '0',
  }
});
</script>
<style scoped>

</style>