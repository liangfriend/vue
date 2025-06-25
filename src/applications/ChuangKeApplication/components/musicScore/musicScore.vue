<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <!--    -->
    <measure-container :musicScoreData="musicScore" class="stackItem lineLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="谱线层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <measure
            :key="'measure'+measureIndex"
            :strokeWidth="strokeWidth"
            :x="measureIndex * measureWidth"
            :width="measureWidth"
            :height="musicScore.measureHeight"
            :componentWidth="width"
            :componentHeight="height"
        >
        </measure>
      </template>
    </measure-container>
    <measure-container :musicScoreData="musicScore" class="stackItem symbolLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="符号层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <ms-symbol-container v-for="(msSymbolContainer,symbolIndex) in measure.msSymbolContainerArray"
                             :msSymbolContainer="msSymbolContainer"
                             :measure="measure"
                             :musicScore="musicScore"
                             :measureWidth="measureWidth"
                             :singleStaff="singleStaff"
                             :multipleStaves="multipleStaves"
                             :measureHeight="musicScore.measureHeight"
                             :key="'note-symbol'+symbolIndex"
                             :componentWidth="width"
                             :componentHeight="height"
        ></ms-symbol-container>
      </template>
    </measure-container>
    <!--  跨小节符号目前只有小节跟随型和符号（音符头）跟随型  -->
    <span-symbol-vue :key="'span-symbol'+spanSymbolIndex"
                     :musicScore="musicScore"
                     v-for="(spanSymbol,spanSymbolIndex) in musicScore.spanSymbolArray"
                     :componentWidth="width"
                     :componentHeight="height"
                     :spanSymbol="spanSymbol"></span-symbol-vue>
  </div>
</template>
<script setup lang="ts">
import measure from './components/measure.vue';
import {computed, onMounted, onBeforeMount, onUnmounted, type PropType, provide, ref} from 'vue';
import type {
  MusicScore, musicScoreIndex, SpanSymbol, Rect, MouseDownData
} from "./types.d.ts";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/components/measureContainer.vue";

import MsSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolContainer.vue";

import SpanSymbolVue
  from "@/applications/ChuangKeApplication/components/musicScore/components/spanSymbol.vue";
import {
  getIndex,
  getTarget,
  mapGenerate,
  msSymbolComputedData, traverseMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";


const props = defineProps({
  musicScore: {
    type: Object as PropType<MusicScore>,
    default: {}
  },
  width: {
    type: Number,
    default: 1000,
  },
  height: {
    type: Number,
    default: 800,
  },
  //小节的线条宽度
  strokeWidth: {
    type: Number,
    default: 1
  },
});
const emits = defineEmits(['msSymbolMouseDown', 'measureMouseDown', 'singleStaffMouseDown', 'multipleStavesMouseDown'])

function msSymbolMouseDown(_: MouseEvent, msData: MouseDownData) {

  emits('msSymbolMouseDown')
}

function measureMouseDown() {
  emits('measureMouseDown')
}

function singleStaffMouseDown() {
  emits('singleStaffMouseDown')
}

function multipleStavesMouseDown() {
  emits('multipleStavesMouseDown')
}

provide('mouseDown', {
  msSymbolMouseDown,
  measureMouseDown,
  singleStaffMouseDown,
  multipleStavesMouseDown,
})

const musicScoreStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    overflow: 'hidden',
  };
});

function created() {
  console.log('chicken', props.musicScore)
  // 遍历生成hashMap方便快速查找
  mapGenerate(props.musicScore)
  // 索引生成
  getIndex(props.musicScore)
  // 计算属性
  msSymbolComputedData(props.musicScore)

  window.musicScore = props.musicScore
}


onBeforeMount(created)
// onMounted(mounted);
onUnmounted(() => {

});


</script>
<style scoped lang="scss" comment="布局">
.stack {
  position: relative;

  > .stackItem {
    position: absolute;
    display: grid;
  }
}
</style>
<style scoped lang="scss">
.lineLayer {
  align-items: start;
}

.symbolLayer {
  align-items: start;
}


</style>