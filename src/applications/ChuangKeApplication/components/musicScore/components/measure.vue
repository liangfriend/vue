<template>
  <div class="measure" :style="measureStyle" @mousedown.self="handleMouseDown">
    <div :style="barLineStyle"></div>
  </div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, inject, PropType, ref} from 'vue';

import bar from '../musicSymbols/barLineSingle.svg';
import barLine from '../musicSymbols/bar.svg';
import {
  Measure,

} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {measureMouseDown, select} from "@/applications/ChuangKeApplication/components/musicScore/utils/eventUtil.ts";
import {MsMode} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";


const props = defineProps({
  measure: {
    type: Object as PropType<Measure>,
    required: true,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 80,
  },
  componentWidth: {
    type: Number,
    default: 1000,
  },
  componentHeight: {
    type: Number,
    default: 800,
  },
  strokeWidth: {
    type: Number,
    default: 1
  }

});

const measureStyle = computed(() => {
  return {
    'width': '100%',
    'display': 'grid',
    'grid-template-rows': '1fr',
    'grid-template-columns': `1fr`,

  };
});
const barLineStyle = computed((): CSSProperties => {
  return {
    width: (props.width) + 'px',
    height: props.height + 'px',
    'background-color': 'black',
    mask: `url(${barLine}) no-repeat center`,
    'mask-size': '100% 100%',
    background: props.measure.options.highlight ? props.measure.options.highlightColor : props.measure.options.color,
    pointerEvents: 'none',
  };
});
const emits = defineEmits(['measureMouseDown']);

function handleMouseDown(e: MouseEvent) {
  emits('measureMouseDown', e, props.measure)

}

</script>
<style scoped lang="scss">
img {
  display: block;
}

.measure {
  pointer-events: all;
}
</style>