<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem whiteBoard" :floatBoardWidth="1000" :floatBoardHeight="800"></whiteBoard>
    <div class="stackItem rightTools">
      <right-tool-renderer v-model="commonTools"></right-tool-renderer>
    </div>
    <div class="stackItem bottomMenu"><bottomMenuBar v-model="bottomMenuData"></bottomMenuBar></div>
  </div>
</template>

<script setup lang="ts">
import whiteBoard from '../components/whiteBoard/whiteBoard.vue';
import {onMounted, ref} from 'vue';

import commonToolsData from './components/rightTools/commonTools.ts';
import RightToolRenderer from './components/rightTools/rightToolRenderer.vue';
import BottomMenuBar from '../components/bottomMenuBar.vue';
const wb =ref();
const commonTools = ref(commonToolsData);
const play = ()=> {
  wb.value.play();
};
const pause = ()=>{
  wb.value.pause();
};
const stop = ()=>{
  wb.value.stop();
};
const bottomMenuData = ref([{
  text:'播放',
  fn:play
},{
  text:'暂停',
  fn:pause
},{
  text:'恢复播放',
  fn:play
},{
  text:'停止',
  fn:stop
}]);

onMounted(()=>{
});
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
.bottomMenu{
  bottom:0;
  height: 10%;
}
</style>
