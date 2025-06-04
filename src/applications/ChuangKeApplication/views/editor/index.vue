<template>
  <div class="stack">
    <whiteBoard ref="wb" class="stackItem whiteBoard" :floatBoardWidth="1000" :floatBoardHeight="800"></whiteBoard>
    <div class="b-stackItem" comment="工具层">
      <div class="justify-center">
        <bottom-menu class="bottomMenu" v-model="bottomMenuData"></bottom-menu>
      </div>
      <div class="back" @click="router.go(-1)">返回</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import whiteBoard from '../../components/whiteBoard/whiteBoard.vue';
import {App, createApp, onMounted, onUnmounted, Ref, ref, watch} from 'vue';

import MusicScore from "@/applications/ChuangKeApplication/components/musicScore/musicScore.vue";
import {AddElementOptions, WBElement} from "@/applications/ChuangKeApplication/components/whiteBoard/types";
import {whiteBoardState} from "@/applications/ChuangKeApplication/components/whiteBoard/enum.ts";
import mockData from "@/applications/ChuangKeApplication/components/musicScore/mock.ts";
import BottomMenu from "@/applications/ChuangKeApplication/views/editor/components/bottomMenu.vue";
import {msPlayUtils} from "@/applications/ChuangKeApplication/utils/ms-playUtils.ts";
import {MusicMapKey} from "@/applications/ChuangKeApplication/views/editor/constant.ts";
import * as Tone from "tone";
import {useRouter} from "vue-router";

const router = useRouter()
const wb: Ref<WBElement> = ref(null!);
const ms: Ref<HTMLElement> = ref(null!)
const play = async () => {
// 存储播放序列
  await msPlayUtils.addMusicToMap(MusicMapKey.CMK, musicScoreData.value)
  await msPlayUtils.play(MusicMapKey.CMK)
};
const pause = () => {
  msPlayUtils.pause((MusicMapKey.CMK))
};
const stop = () => {
  msPlayUtils.stop((MusicMapKey.CMK))
};
const resume = () => {
  msPlayUtils.resume(MusicMapKey.CMK)
}
const musicScoreData = ref(mockData);
const bottomMenuData = ref([{
  title: '播放',
  callback: play
}, {
  title: '暂停',
  callback: pause
}, {
  title: '恢复播放',
  callback: resume
}, {
  title: '停止',
  callback: stop
}]);


let app: App<Element> | null = null
let container: HTMLElement | null = null

// 添加musicScore到白板中心
function initMusicScore() {
  container = document.createElement('div');
  const props = {
    modelValue: musicScoreData.value,
    'update:modelValue': (val: any) => musicScoreData.value = val,
    width: 1000,
    height: 800
  }
  app = createApp(MusicScore, props);
  app.mount(container); //
  const musicScoreDom: Element = container.children[0]!
  const options: AddElementOptions = {
    center: 'center',
    cloneNode: false
  }
  wb.value.switchState(whiteBoardState.add)
  wb.value.cacheElement(musicScoreDom, 'musicScore');
  wb.value.addElement(options, 'musicScore')
  wb.value.switchState(whiteBoardState.normal)
  wb.value.delCacheElement('musicScore')


  // 移除 DOM 这行代码似乎是可有可无
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
  container = null;
}

const musicLoaded = ref(false)
watch(musicScoreData, (newVal) => {
  musicLoaded.value = false
  msPlayUtils.addMusicToMap(MusicMapKey.CMK, newVal, () => {
    musicLoaded.value = true
  })
}, {deep: true})
onMounted(() => {
  initMusicScore()
});
onUnmounted(() => {
  // 卸载 Vue app
  if (app) {
    app.unmount();
    app = null;
  }
});
</script>


<style scoped lang="scss">
.whiteBoard {
  width: 100%;
  height: 100%;
}


.bottomMenu {
  position: absolute;
  bottom: 0;
}

.back {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
