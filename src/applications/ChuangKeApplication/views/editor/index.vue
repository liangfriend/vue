

<script setup lang="ts">
import prefabWb from '../../views/prefabWhiteBoard/addedMusicScore.vue';
import {computed, onMounted, ref, Ref, UnwrapRef, watch} from 'vue';

// import mockData from "@/applications/ChuangKeApplication/components/musicScore/musicScoreData/happyBirthdayToYou.ts";
import mockData from "@/applications/ChuangKeApplication/components/musicScore/musicScoreData/test.ts";
import BottomMenu from "@/applications/ChuangKeApplication/views/editor/components/bottomMenu.vue";
import {msPlayUtils} from "@/applications/ChuangKeApplication/utils/ms-playUtils.ts";
import {MusicMapKey} from "@/applications/ChuangKeApplication/views/editor/constant.ts";
import {useRouter} from "vue-router";
import {
  BarlineTypeEnum,
  MsMode,
  MsTypeNameEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import RightTools from "@/applications/ChuangKeApplication/views/editor/components/rightTools/rightTools.vue";
import {MusicScoreRef} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {addMeasure} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {measureTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
  getDataWithIndex,
  getSpanSymbolIdSetInSingleStaff, setMeasureArrayIndex, updateSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
  handleRightToolsBtn,
  insertMeasureAfter,
  insertMeasureBefore, measureFunctionList, multipleStavesFunctionList, singleStaffFunctionList
} from "@/applications/ChuangKeApplication/views/editor/rightToolsFunction.ts";
import {FunctionListItem} from "@/applications/ChuangKeApplication/views/editor/type";
import {measureFunctionEnum} from "@/applications/ChuangKeApplication/views/editor/enum.ts";

const router = useRouter()
type addedWb = {
  getMsRef: () => UnwrapRef<MusicScoreRef>
}
const wbRef = ref(null!) as Ref<addedWb>
const msRef = computed(() => {
  if (!wbRef.value) return
  return wbRef.value.getMsRef()
})
const curModeText = ref("教学模式")
const msMode = computed(() => {
  return msRef.value?.mode
})
function switchMode() {
  if (!msRef.value) return
  if (msMode.value === MsMode.edit) {
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
const currentSelected = computed(() => {
  return msRef.value?.currentSelected
})



onMounted(() => {
  //TEST
  window.musicScore = mockData
});

</script>
<template>
  <div class="stack">
    <div class="stackItem">
      <prefabWb ref="wbRef" class="whiteBoard"
                :wbDrag="wbDrag"
                :musicScoreData="musicScoreData"
                :msHeight="800"
                :msWidth="1000"
                :floatBoardWidth="1200"
                :floatBoardHeight="1000"
                :msMode="MsMode.normal"></prefabWb>
    </div>

    <div class="stackItem toolsLayer" comment="工具层">
      <div class="rightTools">
        <right-tools>
          <template v-slot:function>
            <template v-if="currentSelected?.msTypeName === MsTypeNameEnum.Measure">
              <div class="rightToolsFunction">
                <el-button @click="handleRightToolsBtn(item,currentSelected,musicScoreData)"
                           v-for="(item) in measureFunctionList">
                  {{ item.name }}
                </el-button>
              </div>
            </template>
            <template v-if="currentSelected?.msTypeName === MsTypeNameEnum.SingleStaff">
              <div class="rightToolsFunction">
                <el-button @click="handleRightToolsBtn(item,currentSelected,musicScoreData)"
                           v-for="(item) in singleStaffFunctionList">
                  {{ item.name }}
                </el-button>
              </div>
            </template>
            <template v-if="currentSelected?.msTypeName === MsTypeNameEnum.MultipStaves">
              <div class="rightToolsFunction">
                <el-button @click="handleRightToolsBtn(item,currentSelected,musicScoreData)"
                           v-for="(item) in multipleStavesFunctionList">
                  {{ item.name }}
                </el-button>
              </div>
            </template>

          </template>
        </right-tools>
      </div>

      <div class="bottomMenu">
        <bottom-menu v-model="bottomMenuData"></bottom-menu>
      </div>
      <div class="back" @click="router.go(-1)">返回</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.whiteBoard {
  width: 100%;
  height: 100%;
}


.bottomMenu {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.toolsLayer {
  pointer-events: none;
}
.rightTools {
  position: absolute;
  right: 0;
  height: 100%;
  pointer-events: auto;
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

.rightToolsFunction {
  display: flex;
  justify-content: space-between;
  row-gap: 10px;
  flex-wrap: wrap;

  > button {
    width: 120px;
    margin-left: 0;
  }
}
</style>
