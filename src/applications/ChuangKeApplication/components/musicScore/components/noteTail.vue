<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {getDataWithIndex} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
  type Measure,
  MsSymbol,
  type MsSymbolContainer, type MusicScore,
  NoteHead, type SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  ChronaxieEnum,
  MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteTailOneUpSvg from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/noteTailOneUp.svg";
import noteTailTwoUpSvg from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/noteTailTwoUp.svg";
import noteTailOneDownSvg
  from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/noteTailOneDown.svg";
import noteTailTwoDownSvg
  from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/noteTailTwoDown.svg";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<NoteTail>,
    required: true
  },

  measure: {
    type: Object as PropType<Measure>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true
  },

  parentMsSymbol: {
    type: Object as PropType<MsSymbol>,
  },

})
const mask = computed(() => {
  const noteHead = getDataWithIndex(props.msSymbol.index, props.musicScore)
      .msSymbol as NoteHead
  if (noteHead && 'chronaxie' in noteHead
      && noteHead.region <= MusicScoreRegionEnum.space_2) {
    switch (props.msSymbol.chronaxie) {
      case ChronaxieEnum.eighth: {
        return noteTailOneUpSvg

      }
      case ChronaxieEnum.sixteenth: {
        return noteTailTwoUpSvg
      }
      default: {
        return ''
      }
    }
  } else {
    switch (props.msSymbol.chronaxie) {
      case ChronaxieEnum.eighth: {
        return noteTailOneDownSvg

      }
      case ChronaxieEnum.sixteenth: {
        return noteTailTwoDownSvg
      }
      default: {
        return ''
      }
    }
  }
})

const noteTailStyle = computed((): CSSProperties => {
  const style = {}
  return style
})
</script>

<template>
  <div>
    <div :style="noteTailStyle"></div>
  </div>
</template>

<style scoped>

</style>