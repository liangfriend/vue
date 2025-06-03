<template>
  <div class="symbol" :style="symbolStyle"></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteHeadSvg from "../musicSymbols/noteHead.svg"

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
    position: 'absolute',
    bottom: '0',
  }
});
</script>
<style scoped>

</style>