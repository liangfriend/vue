<template>
  <div class="noteContainer"
       :style="{width: measureHeight / 5 + 'px',height:measureHeight + 'px'}">
    <MsSymbol :measureHeight="measureHeight" :symbol="msSymbol"></MsSymbol>
    <template v-if="msSymbol?.msSymbolArray">
      <MsMsSymbol :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray" :symol="item"></MsMsSymbol>
    </template>
  </div>


</template>
<script setup lang="ts">
import {
  Measure,
  MsSymbol,
  MultipleStaves,
  SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {Chronaxie} from "@/applications/ChuangKeApplication/components/musicScore/dataMap.ts";
import wholeNote from "*.svg";
import halfNote from "*.svg";
import quarterNote from "*.svg";
import eighthNote from "*.svg";
import sixteenthNote from "*.svg";
import {
  ClefEnum, MsSymbolTypeEnum,
  MusicalAlphabetEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import msSymbol from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";

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
  MultipleStaves: {
    type: Object as PropType<MultipleStaves>,
  }
})

function getClef(measure: Measure, noteHead: Extract<MsSymbol, { type: MsSymbolTypeEnum.NoteHead }>): ClefEnum {
  if (noteHead.clef) {
    return noteHead.clef
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