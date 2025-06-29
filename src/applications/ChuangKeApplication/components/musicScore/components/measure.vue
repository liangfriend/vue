<template>
  <div class="measure" :style="measureStyle" @mousedown="measureMouseDown">
    <div>
      <div draggable="false" :style="barLineStyle"></div>
    </div>
    <!--    <div>-->
    <!--      <div draggable="false" :style="barStyle"></div>-->
    <!--    </div>-->
  </div>
</template>
<script setup lang="ts">
import {computed, inject, PropType, ref} from 'vue';

import bar from '../musicSymbols/barlineSingle.svg';
import barLine from '../musicSymbols/bar.svg';
import {Measure, MouseDownData, msType} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {addSubscriber} from "@/applications/ChuangKeApplication/components/musicScore/utils/eventUtil.ts";


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
const barLineStyle = computed(() => {
  return {
    width: (props.width) + 'px',
    height: props.height + 'px',
    'background-color': 'black',
    mask: `url(${barLine}) no-repeat center`,
    'mask-size': '100% 100%',
    background: props.measure.options.hightlight ? props.measure.options.hightlightColor : props.measure.options.color,
  };
});


// 点击事件处理
interface MouseDownInject {
  msSymbolMouseDown: (e: MouseEvent, data: MouseDownData) => void
  measureMouseDown: (e: MouseEvent, data: MouseDownData) => void
  singleStaffMouseDown: (e: MouseEvent, data: MouseDownData) => void
  multipleStavesMouseDown: (e: MouseEvent, data: MouseDownData) => void
}

const mouseDown = inject("mouseDown") as MouseDownInject

function measureMouseDown(e: MouseEvent) {
  props.measure.options.hightlight = true
  // 订阅
  addSubscriber('measure', props.measure)
  // 抛出回调
  // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})

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