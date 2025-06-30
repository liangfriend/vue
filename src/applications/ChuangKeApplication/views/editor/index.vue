<template>
  <div class="stack">
    <prefabWb ref="wbRef" class="stackItem whiteBoard"
              :wbDrag="wbDrag"
              :musicScoreData="musicScoreData"
              :msHeight="800"
              :msWidth="1000"
              :floatBoardWidth="1000"
              :floatBoardHeight="800"
              :msMode="MsMode.normal"></prefabWb>
    <div class="b-stackItem" comment="工具层">
      <div class="bottomMenu">
        <bottom-menu v-model="bottomMenuData"></bottom-menu>
      </div>
      <div class="back" @click="router.go(-1)">返回</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import prefabWb from '../../views/prefabWhiteBoard/addedMusicScore.vue';
import {App, createApp, onMounted, onUnmounted, Ref, ref, watch, computed} from 'vue';

import MusicScore from "@/applications/ChuangKeApplication/components/musicScore/musicScore.vue";

// import mockData from "@/applications/ChuangKeApplication/components/musicScore/musicScoreData/happyBirthdayToYou.ts";
import mockData from "@/applications/ChuangKeApplication/components/musicScore/musicScoreData/test.ts";
import BottomMenu from "@/applications/ChuangKeApplication/views/editor/components/bottomMenu.vue";
import {msPlayUtils} from "@/applications/ChuangKeApplication/utils/ms-playUtils.ts";
import {MusicMapKey} from "@/applications/ChuangKeApplication/views/editor/constant.ts";
import * as Tone from "tone";
import {useRouter} from "vue-router";
import {MsMode} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const router = useRouter()

const wbRef = ref(null)
const msRef = computed(() => {
  return wbRef.value.getMsRef()
})
const curModeText = ref("教学模式")

function switchMode() {
  const curMode = msRef.value.getMode()
  if (curMode === MsMode.edit) {
    msRef.value.changeMode(MsMode.normal);
    curModeText.value = '编辑模式'
    wbDrag.value = true
  } else {
    msRef.value.changeMode(MsMode.edit);
    curModeText.value = '教学模式'
    wbDrag.value = false
  }
}

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
const wbDrag = ref(false)


const musicScoreData = ref(mockData);
const bottomMenuData = ref([{
  title: curModeText,
  callback: switchMode
}, {
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
const musicLoaded = ref(false)
watch(musicScoreData, (newVal) => {
  musicLoaded.value = false
  // musicScore发生变化时，需要更新播放器生成tonejs序列
  msPlayUtils.addMusicToMap(MusicMapKey.CMK, newVal, () => {
    musicLoaded.value = true
  })
}, {deep: true})
onMounted(() => {
  //TEST
  window.musicScore = mockData
});

</script>


<style scoped lang="scss">
.whiteBoard {
  width: 100%;
  height: 100%;
}


.bottomMenu {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.back {
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  left: 10px;
}
</style>
