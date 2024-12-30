<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem" floatBoardWidth="1000px" floatBoardHeight="800px"></whiteBoard>
  </div>
</template>

<script setup lang="ts">
import whiteBoard from '../components/whiteBoard.vue';
import {ref} from 'vue';

</script>

<style scoped lang="scss" comment="布局">
.stack {
  position: relative;
  width: 100%;
  height: 100%;
  > .stackItem{
    position: absolute;
    display: grid;
    width: 100%;
    height: 100%;
  }
}
</style>
<document>
要想缩放不出问题，需要whiteBoard添加的内容和whiteBoard使用同一种单位。px或百分比。百分比，缩放时一起不动，px，缩放时一起放大缩小
</document>