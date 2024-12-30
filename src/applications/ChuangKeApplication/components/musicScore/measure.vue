<template>
  <div class="measure" :style="measureStyle">
    <div>
      <img draggable="false" :src="barLine" :style="{width: (width - strokeWidth)+'px',height:height+'px','object-fit':'fill'}">
    </div>
    <div>
      <img draggable="false" :src="bar" :style="{width: strokeWidth+'px',height:height+'px','object-fit':'fill'}">
    </div>
  </div>

</template>
<script setup lang="ts">
import {computed, ref} from 'vue';

import bar from './musicSymbols/bar.svg';
import barLine from './musicSymbols/barLine.svg';

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
</script>
<style scoped lang="scss">

</style>