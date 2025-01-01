<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem whiteBoard" :floatBoardWidth="1000" :floatBoardHeight="800"></whiteBoard>
    <div class="stackItem rightTools">
      <right-tool-renderer v-model="commonTools"></right-tool-renderer>
    </div>
    <div class="stackItem bottomMenu"></div>
  </div>
</template>

<script setup lang="ts">
import whiteBoard from '../components/whiteBoard/whiteBoard.vue';
import {ref} from 'vue';

import commonToolsData from './components/rightTools/commonTools.ts';
import RightToolRenderer from './components/rightTools/rightToolRenderer.vue';

const commonTools = ref(commonToolsData);

</script>

<style scoped lang="scss" comment="布局">
.stack {
  position: relative;
  width: 100%;
  height: 100%;
  > .stackItem{
    position: absolute;
    display: grid;

  }
}
</style>
<style scoped lang="scss">
.whiteBoard{
  width: 100%;
  height: 100%;
}
.rightTools{
  right:0;
  top:7%;
}
</style>
