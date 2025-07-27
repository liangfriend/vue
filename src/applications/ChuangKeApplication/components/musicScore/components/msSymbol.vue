<script setup lang="ts">
import {computed, CSSProperties, onMounted, PropType, ref} from "vue";
import {
  type Measure,
  MsSymbol,
  type MsSymbolContainer,
  type MusicScore,
  NoteHead, type SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  AccidentalEnum,
  BarLineTypeEnum,
  ChronaxieEnum,
  MsSymbolTypeEnum, MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
// 音符头
import noteHeadWholeSvg from "../musicSymbols/noteHeadWhole.svg"
import noteHeadHalfSvg from "../musicSymbols/noteHeadHalf.svg"
import noteHeadQuarterSvg from "../musicSymbols/noteHeadQuarter.svg"
// 符杠
import noteBarSvg from '../musicSymbols/noteBar.svg'

// 变音符号
import sharpSvg from '../musicSymbols/sharp.svg'
import doubleSharpSvg from '../musicSymbols/sharp.svg'
import flatSvg from '../musicSymbols/flat.svg'
import doubleFlatpSvg from '../musicSymbols/flat.svg'
import natureSvg from '../musicSymbols/nature.svg'
// 小节线
import barLineSingleSvg from '../musicSymbols/barLineSingle.svg'
import barLineFinalSvg from '../musicSymbols/barLineFinal.svg'
import barLineReverseFinalSvg from '../musicSymbols/barLineReverseFinal.svg'
import barLineStartRepeatSignSvg from '../musicSymbols/barLineStartRepeatSign.svg'
import barLineEndRepeatSignSvg from '../musicSymbols/barLineEndRepeatSign.svg'
import Clef from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/clef.vue";
import KeySignature from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/keySignature.vue";
import TimeSignature from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/timeSignature.vue";
import noteTailOneUpSvg from "../musicSymbols/noteTailOneUp.svg"
import noteTailTwoUpSvg from "../musicSymbols/noteTailTwoUp.svg"
import noteTailOneDownSvg from "../musicSymbols/noteTailOneDown.svg"
import noteTailTwoDownSvg from "../musicSymbols/noteTailTwoDown.svg"
import {
  getDataWithIndex,
  getMsSymbolAspectRatio
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {getMsSymbolHeight} from "@/applications/ChuangKeApplication/components/musicScore/utils/heightUtil.ts";
import {
  getMsSymbolBottomToSlot,
  getSlotBottomToMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";
import {msSymbolMouseDown} from "@/applications/ChuangKeApplication/components/musicScore/utils/eventUtil.ts";
import {
  getMeasureLeftToMusicScore,
  getMsSymbolLeftToSlot, getSlotLeftToMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/leftUtil.ts";
import {
  getMsSymbolSlotWidth,
  getMsSymbolWidth, getNoteTailWidth
} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import NoteTail from "@/applications/ChuangKeApplication/components/musicScore/components/noteTail.vue";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
    required: true
  },
  msSymbolContainer: {
    type: Object as PropType<MsSymbolContainer>,
    required: true,
  },
  preContainer: {
    type: Object as PropType<MsSymbolContainer | null>,
    required: true
  },
  nextContainer: {
    type: Object as PropType<MsSymbolContainer | null>,
    required: true
  },
  measure: {
    type: Object as PropType<Measure>,
    required: true
  },
  measureWidth: {
    type: Number,
    required: true
  },
  singleStaff: {
    type: Object as PropType<SingleStaff>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true
  },
  containerWidth: {
    type: Number,
    required: true
  },
  isMain: {
    type: Boolean,
    default: false,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    required: true
  },
  parentMsSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  // 符号槽位宽度（父级符号宽度）
  slotWidth: {
    type: Number,
    required: true
  },
  slotBottom: {
    type: Number,
    required: true
  },
  slotLeft: {
    type: Number,
    required: true
  },
  componentWidth: {
    type: Number,
    required: true
  },
  componentHeight: {
    type: Number,
    required: true
  },
})

const svgHref = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      switch (props.msSymbol?.chronaxie) {
        case ChronaxieEnum.whole: {
          return noteHeadWholeSvg
        }
        case ChronaxieEnum.half: {
          return noteHeadHalfSvg
        }
        case ChronaxieEnum.quarter: {
          return noteHeadQuarterSvg
        }
        default: {
          return noteHeadQuarterSvg
        }

      }
    }
    case MsSymbolTypeEnum.noteBar: {
      return noteBarSvg
    }
    case MsSymbolTypeEnum.noteTail: {
      return ''
    }
    case MsSymbolTypeEnum.clef: {
      return ''
    }
    case MsSymbolTypeEnum.clef_f: {
      return ''
    }
    case MsSymbolTypeEnum.barLine: {
      switch (props.msSymbol?.barLineType) {
        case BarLineTypeEnum.single: {
          return barLineSingleSvg
        }
        case BarLineTypeEnum.final: {
          return barLineFinalSvg
        }
        case BarLineTypeEnum.reverseFinal: {
          return barLineReverseFinalSvg
        }
        case BarLineTypeEnum.startRepeatSign: {
          return barLineStartRepeatSignSvg
        }
        case BarLineTypeEnum.endRepeatSign: {
          return barLineEndRepeatSignSvg
        }

      }

      return ''
    }
    case MsSymbolTypeEnum.barLine_f: {
      switch (props.msSymbol?.barLineType) {
        case BarLineTypeEnum.single: {
          return barLineSingleSvg
        }
        case BarLineTypeEnum.final: {
          return barLineFinalSvg
        }
        case BarLineTypeEnum.reverseFinal: {
          return barLineReverseFinalSvg
        }
        case BarLineTypeEnum.startRepeatSign: {
          return barLineStartRepeatSignSvg
        }
        case BarLineTypeEnum.endRepeatSign: {
          return barLineEndRepeatSignSvg
        }
      }
      console.error("未知的小节线类型", props.msSymbol)
      return ''
    }
    case MsSymbolTypeEnum.keySignature: {
      return ''
    }
    case MsSymbolTypeEnum.timeSignature: {
      return ''
    }
    case MsSymbolTypeEnum.accidental: {
      switch (props.msSymbol?.accidental) {
        case AccidentalEnum.sharp: {
          return sharpSvg
        }
        case AccidentalEnum.flat: {
          return flatSvg
        }
        case AccidentalEnum.nature: {
          return natureSvg
        }
        case AccidentalEnum.doubleSharp: {
          return doubleSharpSvg
        }
        case AccidentalEnum.doubleFlat: {
          return doubleFlatpSvg
        }

      }
      console.error("未知的变音符号", props.msSymbol)
      return ''
    }
    default: {
      console.error("未知的符号类别", props.msSymbol?.type)
      return ''
    }
  }
})
const msSymbolRef = ref(null!)

const aspectRatio = computed<number>(() => {
  return getMsSymbolAspectRatio(props.msSymbol)
})


const height = computed(() => {
  // const parentMsSymbol = getDataWithIndex(props.msSymbol).msSymbol
  return getMsSymbolHeight(props.msSymbol, props.musicScore)
})
// 符号宽度
const width = computed(() => {
  // TODO 补全如果是成组的才这样做
  if (props.msSymbol.type === MsSymbolTypeEnum.noteTail && props.nextContainer) {
    return getNoteTailWidth(props.msSymbolContainer,
        props.measure, props.singleStaff, props.musicScore,
        props.componentWidth)
  }
  return getMsSymbolWidth(props.msSymbol, props.msSymbolContainer, props.measure,
      props.singleStaff, props.musicScore, props.componentWidth)
})
const msSymbolLeft = computed(() => {
  return getMsSymbolLeftToSlot(props.msSymbol, props.msSymbolContainer, props.measure, props.singleStaff, props.musicScore, props.slotLeft, props.measureWidth, props.componentWidth)
})

const msSymbolBottom = computed(() => {
  return getMsSymbolBottomToSlot(props.msSymbol, props.musicScore)

})
const msSymbolStyle = computed<CSSProperties>(() => {

  const style: CSSProperties = {
    width: `${width.value}px`,
    height: `${height.value}px`,
    position: 'absolute',
    left: msSymbolLeft.value + 'px',
    bottom: msSymbolBottom.value + 'px',
    background: props.msSymbol.options.highlight ? props.msSymbol.options.highlightColor : props.msSymbol.options.color,
  }
  if (props.msSymbol?.type && [MsSymbolTypeEnum.keySignature, MsSymbolTypeEnum.timeSignature,
    MsSymbolTypeEnum.noteTail].includes(props.msSymbol.type)) {
    style.background = 'unset'
  }

  if (svgHref.value) {
    style.mask = `url(${svgHref.value}) center center / cover no-repeat`
  }
  // TODO 测试代码
  // if (props.msSymbol.type === MsSymbolTypeEnum.noteTail) {
  //   style.background = 'red'
  // }
  return style
});
const emits = defineEmits(['msSymbolMouseDown', 'msSymbolMouseUp']);

function handleMouseDown(e: MouseEvent) {
  emits('msSymbolMouseDown', e, props.msSymbol)

}

function handleMouseUp(e: MouseEvent) {
  emits('msSymbolMouseUp', e, props.msSymbol)
}


onMounted(() => {

})
defineExpose({aspectRatio})
</script>
<template>
  <clef
      v-if="msSymbol?.type === MsSymbolTypeEnum.clef || msSymbol?.type === MsSymbolTypeEnum.clef_f && 'clef' in msSymbol"
      :clef="msSymbol?.clef"
      :musicScore="musicScore"
      :style="msSymbolStyle"></clef>
  <key-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.keySignature"
                 :measure-height="measureHeight"
                 :slotWidth="slotWidth"
                 :musicScore="musicScore"
                 :style="msSymbolStyle"
                 :msSymbol="msSymbol"></key-signature>
  <time-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.timeSignature" :style="msSymbolStyle"
                  :msSymbol="msSymbol" :measure-height="measureHeight"></time-signature>
  <note-tail v-else-if="msSymbol?.type === MsSymbolTypeEnum.noteTail"
             :ms-symbol-container="msSymbolContainer"
             :pre-container="preContainer"
             :next-container="nextContainer"
             :measure-width="measureWidth"
             :single-staff="singleStaff"
             :slot-left="slotLeft"
             :component-width="componentWidth"
             :noteTail="msSymbol" :noteHead="parentMsSymbol as NoteHead" :measure="measure"
             :musicScore="musicScore"></note-tail>
  <div v-else ref="msSymbolRef" class="msSymbol" :style="msSymbolStyle" @mouseup.self="handleMouseUp"
       @mousedown.self="handleMouseDown"
  ></div>
</template>
<style scoped>
.msSymbol {
  pointer-events: all;
}
</style>