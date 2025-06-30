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
import {Measure, MouseDownData, MsState, msType} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {addSubscriber, select} from "@/applications/ChuangKeApplication/components/musicScore/utils/eventUtil.ts";
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


const mouseDown = inject("mouseDown") as MouseDownInject
const msState = inject("msState") as MsState

function measureMouseDown(e: MouseEvent) {
  if (msState.mode.value === MsMode.edit) {
    // 订阅
    select(props.measure)

    // 抛出回调
    // mouseDown.msSymbolMouseDown(e, {msData: props.msSymbol})
  }


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