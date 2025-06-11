<template>

  <clef
      v-if="msSymbol?.type === MsSymbolTypeEnum.clef || msSymbol?.type === MsSymbolTypeEnum.clef_f && 'clef' in msSymbol"
      :clef="msSymbol?.clef" class="msSymbol"
      :style="msSymbolStyle"></clef>
  <key-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.keySignature && msSymbol.computed?.clef"
                 :style="msSymbolStyle"
                 :measure-height="measureHeight"
                 :slotWidth="slotWidth"
                 :msSymbol="msSymbol" :clef="msSymbol.computed.clef"></key-signature>
  <time-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.timeSignature" :style="msSymbolStyle"
                  :msSymbol="msSymbol" :measure-height="measureHeight"></time-signature>
  <div v-else ref="msSymbolRef" class="msSymbol" :style="msSymbolStyle"></div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, onMounted, PropType, ref} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  AccidentalEnum,
  MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import noteHeadSvg from "../musicSymbols/noteHead.svg"
import noteBarSvg from "../musicSymbols/noteHead.svg"
import sharpSvg from '../musicSymbols/sharp.svg'
import flatSvg from '../musicSymbols/flat.svg'
import natureSvg from '../musicSymbols/nature.svg'
import doubleSharpSvg from '../musicSymbols/sharp.svg'
import doubleFlatpSvg from '../musicSymbols/flat.svg'


import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import Clef from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/clef.vue";
import KeySignature from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/keySignature.vue";
import TimeSignature from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/timeSignature.vue";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
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
  // 符号槽位宽度（父级符号宽度）
  slotWidth: {
    type: Number,
    default: 60
  }
})

const svgHref = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      // TODO 不同时值用不同svg,accidental，clef也一样 ,timeSignature这种要组合，所以写成组件
      return noteHeadSvg
    }
    case MsSymbolTypeEnum.clef: {
      return ''
    }
    case MsSymbolTypeEnum.noteBar: {
      return noteBarSvg
    }
    case MsSymbolTypeEnum.clef_f: {
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
  if (!props.msSymbol?.type) return 1
  // 单小节符号，赋值
  const information = MsSymbolInformationMap[props.msSymbol.type]
  if ('aspectRatio' in information && (typeof information.aspectRatio === 'number')) {
    return information.aspectRatio
  } else if ('aspectRatio' in information && (typeof information.aspectRatio === 'object')) {
    if (props.msSymbol.type === MsSymbolTypeEnum.keySignature) {
      return information.aspectRatio[props.msSymbol.keySignature]
    }
  }
  return 1
})


const height = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      return props.measureHeight / 4
    }
    case MsSymbolTypeEnum.noteBar: {
      return props.measureHeight * 0.6
    }
    case MsSymbolTypeEnum.accidental: {
      return props.measureHeight * 0.4
    }
  }
  return props.measureHeight
})
// 符号宽度
const width = computed(() => {
  return height.value * aspectRatio.value
})
const msSymbolLeft = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: { // 音符头居中
      return
    }
    case MsSymbolTypeEnum.noteBar: { // 音符头居中
      return props.slotWidth - width.value
    }
    case MsSymbolTypeEnum.accidental: { // 音符头居中
      return -width.value
    }
  }
  return 0
})

const msSymbolBottom = computed(() => {
  switch (props.msSymbol?.type) {

    case MsSymbolTypeEnum.noteBar: {
      return props.measureHeight / 8
    }
  }
  return 0
})
const msSymbolStyle = computed<CSSProperties>(() => {
  let bgColor = 'black'
  if (props.msSymbol?.type && [MsSymbolTypeEnum.keySignature, MsSymbolTypeEnum.timeSignature].includes(props.msSymbol.type)) {
    bgColor = 'unset'
  }
  const style: CSSProperties = {
    width: `${width.value}px`,
    height: `${height.value}px`,
    backgroundColor: bgColor,
    position: 'absolute',
    left: msSymbolLeft.value + 'px',
    bottom: msSymbolBottom.value + 'px',

  }
  if (svgHref.value) {
    style.mask = `url(${svgHref.value}) center center / cover no-repeat`
  }

  return style
});
onMounted(() => {

})
defineExpose({aspectRatio})
</script>
<style scoped>

</style>