<template>
  <div class="measure" :style="measureStyle">
    <div v-selected="mouseDownBarLineFn">
      <div draggable="false"  :style="barLineStyle"></div>
    </div>
    <div v-selected="mouseDownBarFn">
      <div draggable="false"  :style="barStyle"></div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {computed, ref} from 'vue';

import bar from './musicSymbols/bar.svg';
import barLine from './musicSymbols/barLine.svg';

import vSelected from './directives/selected.ts';

const props = defineProps({
  x:{
    type:Number,
    default: 0,
  },
  y:{
    type:Number,
    default: 0,
  },
  width:{
    type:Number,
    default: 400,
  },
  height:{
    type:Number,
    default: 80,
  },
  strokeWidth:{
    type:Number,
    default:1
  }
});

const measureStyle=computed(()=> {
  return {
    'display':'grid',
    'grid-template-rows':'1fr',
    'grid-template-columns': `1fr ${props.strokeWidth}px`,
  };
});
const barLineStyle=computed(()=>{
  return {
    width: (props.width - props.strokeWidth)+'px',
    height:props.height+'px',
    'background-color': 'black',
    mask:`url(${barLine}) no-repeat center`,
    'mask-size': '100% 100%'
  };
});
const barStyle=computed(()=>{
  return {
    width: props.strokeWidth+'px',
    height:props.height+'px',
    'background-color': 'black',
    mask:`url(${bar}) no-repeat center`,
    'mask-size': '100% 100%'
  };
});

const mouseDownBarLineFn = ()=> {

};
const mouseDownBarFn = ()=> {

};
</script>
<style scoped lang="scss">
img{
  display: block;
}
</style>