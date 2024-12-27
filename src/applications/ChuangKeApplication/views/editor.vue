<template>
  <div class="stack">
    <whiteBoard class="stackItem"></whiteBoard>
  </div>
</template>

<script setup lang="ts">

import WhiteBoard from '../components/whiteBoard.vue';
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