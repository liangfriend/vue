<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {
  getBeamGroup,
  getDataWithIndex
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
  BeamGroup,
  type Measure,
  MsSymbol,
  type MsSymbolContainer, type MusicScore,
  NoteHead, NoteTail, type SingleStaff
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
  noteTail: {
    type: Object as PropType<NoteTail>,
    required: true
  },
  // 不知道这里是否有问题，外部使用了as进行了强转，定性了符杠的父符号只能是符头
  noteHead: {
    type: Object as PropType<NoteHead>,
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
const beamGroup = computed((): BeamGroup | null => {
  return getBeamGroup(props.noteHead.beamId, props.measure)
})
const mask = computed(() => {
  const noteHead = getDataWithIndex(props.noteTail.index, props.musicScore)
      .msSymbol as NoteHead
  if (noteHead && 'chronaxie' in noteHead
      && noteHead.region <= MusicScoreRegionEnum.space_2) {
    switch (props.noteTail.chronaxie) {
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
    switch (props.noteTail.chronaxie) {
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
  console.log('chicken', mask.value)
  const style = {
    mask: `url(${mask.value}) center center / cover no-repeat`
  }
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