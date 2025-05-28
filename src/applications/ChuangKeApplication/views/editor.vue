<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem whiteBoard" :floatBoardWidth="1000" :floatBoardHeight="800"></whiteBoard>
    <!--    <music-score ref="ms" :width="800" :measure-height="40"></music-score>-->
    <div class="stackItem rightTools">
      <right-tool-renderer v-model="commonTools"></right-tool-renderer>
    </div>
    <div class="stackItem bottomMenu">
      <bottomMenuBar v-model="bottomMenuData"></bottomMenuBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import whiteBoard from '../components/whiteBoard/whiteBoard.vue';
import {App, createApp, onMounted, onUnmounted, Ref, ref} from 'vue';

import commonToolsData from './components/rightTools/commonTools.ts';
import RightToolRenderer from './components/rightTools/rightToolRenderer.vue';
import BottomMenuBar from '../components/bottomMenuBar.vue';
import MusicScore from "@/applications/ChuangKeApplication/components/musicScore/musicScore.vue";
import {AddElementOptions, WBElement} from "@/applications/ChuangKeApplication/components/whiteBoard/types";
import {whiteBoardState} from "@/applications/ChuangKeApplication/components/whiteBoard/enum.ts";
import mockData from "@/applications/ChuangKeApplication/components/musicScore/mock.ts";


const wb: Ref<WBElement> = ref(null!);
const ms: Ref<HTMLElement> = ref(null!)
const commonTools = ref(commonToolsData);
const play = () => {
  wb.value.play();
};
const pause = () => {
  wb.value.pause();
};
const stop = () => {
  wb.value.stop();
};
const bottomMenuData = ref([{
  text: '播放',
  fn: play
}, {
  text: '暂停',
  fn: pause
}, {
  text: '恢复播放',
  fn: play
}, {
  text: '停止',
  fn: stop
}]);

const data = ref(mockData);

let app: App<Element> | null = null
let container: HTMLElement | null = null
onMounted(() => {
  const container = document.createElement('div');
  const props = {
    modelValue: data.value,
    'update:modelValue': (val: any) => data.value = val,
    width: 1000,
    height: 800
  }
  app = createApp(MusicScore, props);
  app.mount(container); //
  const musicScoreDom: Element = container.children[0]!
  const options: AddElementOptions = {
    center: 'center'
  }
  wb.value.switchState(whiteBoardState.add)
  wb.value.cacheElement(musicScoreDom, 'musicScore');
  wb.value.addElement(options, 'musicScore')
  wb.value.switchState(whiteBoardState.normal)
  wb.value.delCacheElement('musicScore')
});
onUnmounted(() => {
  // 卸载 Vue app
  if (app) {
    app.unmount();
    app = null;
  }

  // 移除 DOM（如果你不再需要）
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
  container = null;
});
</script>

<style scoped lang="scss" comment="布局">
.stack {
  position: relative;
  width: 100%;
  height: 100%;

  > .stackItem {
    position: absolute;
    display: grid;

  }
}
</style>
<style scoped lang="scss">
.whiteBoard {
  width: 100%;
  height: 100%;
}

.rightTools {
  right: 0;
  top: 7%;
}

.bottomMenu {
  bottom: 0;
  height: 10%;
}
</style>
