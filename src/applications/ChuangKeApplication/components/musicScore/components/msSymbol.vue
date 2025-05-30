<template>
  <div class="symbol" :style="symbolStyle"></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {SymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteHeadSvg from "../musicSymbols/noteHead.svg"

const props = defineProps({
  symbol: {
    type: Object as PropType<MsSymbol>,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
})
const top = computed(() => {
  const noteHeight = props.measureHeight;  //音符高度，这个功能二期, 现在直接等于小节高度
  switch (props.symbol?.position) {
    case 'line_1':
      return props.measureHeight * 9 / 9 - noteHeight;
    case 'space_1':
      return props.measureHeight * 8 / 9 - noteHeight;
    case 'line_2':
      return props.measureHeight * 7 / 9 - noteHeight;
    case 'space_2':
      return props.measureHeight * 6 / 9 - noteHeight;
    case 'line_3':
      return props.measureHeight * 5 / 9 - noteHeight;
    case 'space_3':
      return props.measureHeight * 4 / 9 - noteHeight;
    case 'line_4':
      return props.measureHeight * 3 / 9 - noteHeight;
    case 'space_4':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'line_5':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_1':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_1':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_2':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_2':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_3':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_3':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_4':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_4':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_5':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_5':
      return props.measureHeight * 1 / 9 - noteHeight;
    default:
      return 0;
  }
});
const svgHref = computed(() => {
  switch (props.symbol?.type) {
    case SymbolTypeEnum.NoteHead: {
      return noteHeadSvg
    }
    default: {
      return noteHeadSvg
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
    position: 'relative',
    top: `${top.value}px`,
  }
});
</script>
<style scoped>

</style>