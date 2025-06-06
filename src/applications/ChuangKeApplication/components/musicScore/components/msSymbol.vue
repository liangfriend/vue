<template>

  <clef
      v-if="msSymbol?.type === MsSymbolTypeEnum.clef || msSymbol?.type === MsSymbolTypeEnum.clef_f && 'clef' in msSymbol"
      :clef="msSymbol?.clef" class="msSymbol"
      :style="msSymbolStyle"></clef>
  <key-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.keySignature" :style="msSymbolStyle"></key-signature>
  <time-signature v-else-if="msSymbol?.type === MsSymbolTypeEnum.timeSignature" :style="msSymbolStyle"></time-signature>
  <div v-else ref="msSymbolRef" class="msSymbol" :style="msSymbolStyle"></div>
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

})

const svgHref = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: {
      return noteHeadSvg
    }
    case MsSymbolTypeEnum.clef: {
      return ''
    }
    case MsSymbolTypeEnum.clef_f: {
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
  if ('aspectRatio' in information) {
    return information.aspectRatio
  }
  return 1
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
    maskSize: '100% 100%',
    position: 'absolute',
    left: msSymbolLeft.value + 'px',
    bottom: msSymbolBottom.value + 'px',

  }
  if (svgHref.value) {
    style.mask = `url(${svgHref.value}) no-repeat center`
  }

  return style
});
const width = computed(() => {
  return props.measureHeight * aspectRatio.value
})
const height = computed(() => {
  return props.measureHeight
})
const msSymbolLeft = computed(() => {
  switch (props.msSymbol?.type) {
    case MsSymbolTypeEnum.noteHead: { // 音符头居中
      return props.containerWidth / 2 - width.value / 2
    }
  }

  return 0
})

const msSymbolBottom = computed(() => {

  return 0
})

onMounted(() => {

})
defineExpose({aspectRatio})
</script>
<style scoped>

</style>