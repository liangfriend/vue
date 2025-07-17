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
  <div v-else ref="msSymbolRef" class="msSymbol" :style="msSymbolStyle" @mouseup.self="handleMouseUp"
       @mousedown.self="handleMouseDown"
  ></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, onMounted, PropType, ref} from "vue";
import {MsSymbol, type MusicScore, NoteHead} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  AccidentalEnum,
  BarlineTypeEnum,
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
import barlineSingleSvg from '../musicSymbols/barlineSingle.svg'
import barlineFinalSvg from '../musicSymbols/barlineFinal.svg'
import barlineReverseFinalSvg from '../musicSymbols/barlineReverseFinal.svg'
import barlineStartRepeatSignSvg from '../musicSymbols/barlineStartRepeatSign.svg'
import barlineEndRepeatSignSvg from '../musicSymbols/barlineEndRepeatSign.svg'
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
import {getMsSymbolLeftToSlot} from "@/applications/ChuangKeApplication/components/musicScore/utils/leftUtil.ts";
import {getMsSymbolWidth} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },
  containerWidth: {
    type: Number,
    default: 200
  },
  isMain: {
    type: Boolean,
    default: false,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
  parentMsSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  // 符号槽位宽度（父级符号宽度）
  slotWidth: {
    type: Number,
    default: 60
  },
  slotBottom: {
    type: Number,
    default: 0
  },
  componentWidth: {
    type: Number,
    default: 1000,
  },
  componentHeight: {
    type: Number,
    default: 800,
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
      const noteHead = getDataWithIndex(props.msSymbol.index, props.musicScore)
          .msSymbol as NoteHead
      if (noteHead && 'region' in noteHead
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

    }
    case MsSymbolTypeEnum.clef: {
      return ''
    }
    case MsSymbolTypeEnum.clef_f: {
      return ''
    }
    case MsSymbolTypeEnum.barline: {
      switch (props.msSymbol?.barlineType) {
        case BarlineTypeEnum.single: {
          return barlineSingleSvg
        }
        case BarlineTypeEnum.final: {
          return barlineFinalSvg
        }
        case BarlineTypeEnum.reverseFinal: {
          return barlineReverseFinalSvg
        }
        case BarlineTypeEnum.startRepeatSign: {
          return barlineStartRepeatSignSvg
        }
        case BarlineTypeEnum.endRepeatSign: {
          return barlineEndRepeatSignSvg
        }

      }

      return ''
    }
    case MsSymbolTypeEnum.barline_f: {
      switch (props.msSymbol?.barlineType) {
        case BarlineTypeEnum.single: {
          return barlineSingleSvg
        }
        case BarlineTypeEnum.final: {
          return barlineFinalSvg
        }
        case BarlineTypeEnum.reverseFinal: {
          return barlineReverseFinalSvg
        }
        case BarlineTypeEnum.startRepeatSign: {
          return barlineStartRepeatSignSvg
        }
        case BarlineTypeEnum.endRepeatSign: {
          return barlineEndRepeatSignSvg
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
  return getMsSymbolHeight(props.msSymbol, props.musicScore)
})
// 符号宽度
const width = computed(() => {
  return getMsSymbolWidth(props.msSymbol, props.musicScore)
})
const msSymbolLeft = computed(() => {
  return getMsSymbolLeftToSlot(props.msSymbol, props.musicScore)
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
    background: props.msSymbol.options.hightlight ? props.msSymbol.options.hightlightColor : props.msSymbol.options.color,
  }
  if (props.msSymbol?.type && [MsSymbolTypeEnum.keySignature, MsSymbolTypeEnum.timeSignature].includes(props.msSymbol.type)) {
    style.background = 'unset'
  }
  if (svgHref.value) {
    style.mask = `url(${svgHref.value}) center center / cover no-repeat`
  }

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
<style scoped>
.msSymbol {
  pointer-events: all;
}
</style>