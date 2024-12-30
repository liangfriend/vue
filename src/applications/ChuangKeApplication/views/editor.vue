<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem" :floatBoardWidth="1000" :floatBoardHeight="800"></whiteBoard>
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
