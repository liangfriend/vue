
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <!-- 绘制五条水平线 -->
    <line v-for="index in [0,1,2,3,4]" :x1="0" :y1="index*height / 4" :x2="width"
          :y2="index*height / 4" stroke="black" :stroke-width="strokeWidth"/>
    <!-- 添加小节线 -->
    <line :x1="width" :y1="0" :x2="width" :y2="height" stroke="black" stroke-width="1"/>
  </svg>
</template>
<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
  width:{
    type:Number,
    default: 500,
  },
  height:{
    type:Number,
    default: 200,
  }
});
const strokeWidth = ref(1);
</script>
<style scoped lang="scss">

</style>