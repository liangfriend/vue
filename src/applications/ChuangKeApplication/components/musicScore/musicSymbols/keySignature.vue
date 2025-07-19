<template>
  <div
      class="keySignature"
      v-if="msSymbol && msSymbol.type === MsSymbolTypeEnum.keySignature"
  >
    <img
        v-for="(yOffset, i) in verticalOffsets"
        :key="i"
        :src="symbolSrc"
        class="symbol"
        :style="getSymbolStyle(i, yOffset)"
        alt=""
    />
  </div>
</template>

<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {MsSymbol, type MusicScore} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  ClefEnum,
  KeySignatureEnum,
  MsSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import sharpSvg from './sharp.svg';
import flatSvg from './flat.svg';
import {getMsSymbolClef} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
    required: true,
  },
  slotWidth: {
    type: Number,
    default: 50,
  },
  measureHeight: {
    type: Number,
    default: 60,
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },

});
const clef = computed((): ClefEnum => {
  if (!props.msSymbol) return ClefEnum.treble
  return getMsSymbolClef(props.msSymbol, props.musicScore)
})
const keySignatureInfo = computed(() => {
  const map: Record<KeySignatureEnum, { type: 'flat' | 'sharp' | 'none', count: number }> = {
    'Cb': {type: 'flat', count: 7},
    'Gb': {type: 'flat', count: 6},
    'Db': {type: 'flat', count: 5},
    'Ab': {type: 'flat', count: 4},
    'Eb': {type: 'flat', count: 3},
    'Bb': {type: 'flat', count: 2},
    'F': {type: 'flat', count: 1},
    'C': {type: 'none', count: 0},
    'G': {type: 'sharp', count: 1},
    'D': {type: 'sharp', count: 2},
    'A': {type: 'sharp', count: 3},
    'E': {type: 'sharp', count: 4},
    'B': {type: 'sharp', count: 5},
    'F#': {type: 'sharp', count: 6},
    'C#': {type: 'sharp', count: 7},
  }
  if (props.msSymbol.type === MsSymbolTypeEnum.keySignature) {
    return map[props.msSymbol.keySignature];
  } else {
    console.error("keySignature出错，没有keySignature属性", props.msSymbol)
    return map[KeySignatureEnum.C];
  }

});

const symbolSrc = computed(() =>
    keySignatureInfo.value.type === 'sharp' ? sharpSvg : flatSvg
);

// 五线谱间距单位
const spacing = computed(() => props.measureHeight / 8);

// 三种谱号对应的升降号垂直位置，单位是谱线间距 multiples，0为最低线（第一线）
const sharpPositionsMap = {
  [ClefEnum.treble]: [6, 3.5, 5, 2.5, 4, 2, 3],
  [ClefEnum.bass]: [3, 0.5, 2, -0.5, 1, -1, 0],  // 低音谱号升号位置，模拟五线谱线和间的对应
  [ClefEnum.alto]: [4.5, 2, 3.5, 1, 2.5, 0, 1.5], // 中音谱号
};

const flatPositionsMap = {
  [ClefEnum.treble]: [5, 8, 4, 7, 3, 6, 2],
  [ClefEnum.bass]: [6, 3.5, 5, 2.5, 4, 2, 3],
  [ClefEnum.alto]: [2, 4.5, 1, 3.5, 0, 2.5, -0.5],
};

const verticalOffsets = computed(() => {
  if (keySignatureInfo.value.type === 'sharp') {
    const positions = sharpPositionsMap[clef.value] || sharpPositionsMap[ClefEnum.treble];
    return positions
        .slice(0, keySignatureInfo.value.count)
        .map(p => p * spacing.value);
  }
  if (keySignatureInfo.value.type === 'flat') {
    const positions = flatPositionsMap[clef.value] || flatPositionsMap[ClefEnum.treble];
    return positions
        .slice(0, keySignatureInfo.value.count)
        .map(p => p * spacing.value);
  }
  return [];
});

const getSymbolStyle = computed(() => {
  const symbolSize = props.measureHeight * 0.5;
  const horizontalGap = props.measureHeight * 0.4;
  return (index: number, yOffset: number): CSSProperties => {
    return {
      width: symbolSize + 'px',
      height: symbolSize + 'px',
      position: 'absolute',
      left: `${index * horizontalGap}px`,
      // 因为0是最底线，向上是增加y坐标，这里从底部往上算，减去符号高度一半垂直居中
      top: `${props.measureHeight - yOffset - symbolSize / 2}px`,
    }

  };
});
</script>

<style scoped>
.keySignature {
  position: relative;
}

.symbol {
  object-fit: contain;
}
</style>
