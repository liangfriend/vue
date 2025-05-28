<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <measure-container :musicScoreData="modelValue" class="stackItem lineLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="谱线层">
      <template #default="{ measure, measureIndex, singleStaff, MultipleStaves, measureWidth }">
        <!--        <measure-->
        <!--            :key="'measure'+measureIndex"-->
        <!--            :strokeWidth="strokeWidth"-->
        <!--            :x="measureIndex * measureWidth(measure, singleStaff, MultipleStaves)"-->
        <!--            :height="measureHeight"-->
        <!--            :width="measureWidth(measure, singleStaff, MultipleStaves)">-->
        <!--          -->
        <!--        </measure>-->
        <measure
            :key="'measure'+measureIndex"
            :strokeWidth="strokeWidth"
            :x="measureIndex * measureWidth"
            :width="measureWidth"
            :height="measureHeight"
        >
        </measure>
      </template>
    </measure-container>
    <measure-container :musicScoreData="modelValue" class="stackItem symbolLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="符号层">
      <template #default="{ measure, measureIndex, singleStaff, MultipleStaves, measureWidth }">
        <note
            v-for="(note,noteIndex) in measure.noteArray"
            :key="'note-symbol'+noteIndex"
            :measureHeight="measureHeight"
            :note="note"></note>
      </template>
    </measure-container>
  </div>
</template>
<script setup lang="ts">
import measure from './measure.vue';
import {computed, onMounted, onUnmounted, type PropType, ref} from 'vue';
import note from './note.vue';
import {
  ClefEnum, KeySignatureEnum,
  TimeSignatureEnum
} from './musicScoreEnum.ts';
import {calculateNotePosition} from './utils/musicScoreDataUtil.ts';
import * as Tone from 'tone';
import type {
  SingleStaff,
  Measure,
  Note,
  MultipleStaves, MusicScore
} from "./types";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/measureContainer.vue";
import {
  positionCalculation
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

const props = defineProps({
  modelValue: {
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
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
  //单谱表的上下内边距
  singleStaffPadding: {
    type: Number,
    default: 60
  },
  //复谱表的上下内边距
  MultipleStavesPadding: {
    type: Number,
    default: 60
  },
  //小节的线条宽度
  strokeWidth: {
    type: Number,
    default: 1
  },
});


const musicScoreStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    overflow: 'hidden',
  };
});
// 和selected指令配合，让目标元素高亮
const documentClickHandler = (e: Event) => {
  const el = window.musicScore.selected;
  if (el && !el.contains(e.target)) {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
const keyUpHandler = (e: KeyboardEvent) => {
  const el = window.musicScore.selected;
  if (el && e.key === 'Escape') {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
onMounted(() => {
  if (!window.musicScore) {
    window.musicScore = {
      selected: null
    };
  }
  Tone.getTransport().bpm.value = 120;
  positionCalculation(props.modelValue);  //计算音符所在五线谱的位置区
  console.log('chicken', props.modelValue)
  // 通过位置计算高度
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keyup', keyUpHandler);
});
onUnmounted(() => {
  document.removeEventListener('click', documentClickHandler);
  document.removeEventListener('keyup', keyUpHandler);
});

function play() {

}

function pause() {

}

function stop() {

}

defineExpose({
  play, pause, stop
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
  pointer-events: none;
}


</style>