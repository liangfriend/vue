<template>
  <div comment="精确到measure的循环体">
    <div v-for="(MultipleStaves,MultipleStavesIndex) in musicScoreData.multipleStavesArray"
         :key="'MultipleStaves'+MultipleStavesIndex"
         :style="MultipleStavesStyle(MultipleStaves)"
         class="MultipleStaves">
      <div v-for="(singleStaff,singleStaffIndex) in MultipleStaves.singleStaffArray"
           :key="'singleStaff'+singleStaffIndex"
           :style="singleStaffStyle(singleStaff,MultipleStaves)"
           class="singleStaff">
        <div v-for="(measure,measureIndex) in singleStaff.measureArray"
             :style="measureStyle(measure, singleStaff, MultipleStaves)" class="measure"
             :key="'measure'+measureIndex">
          <!-- 使用作用域插槽，传递 measure 等数据 -->
          <slot
              :measure="measure"
              :measureIndex="measureIndex"
              :singleStaff="singleStaff"
              :singleStaffIndex="singleStaffIndex"
              :MultipleStaves="MultipleStaves"
              :MultipleStavesIndex="MultipleStavesIndex"
              :measureWidth="measureWidth(measure, singleStaff, MultipleStaves)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import type {PropType} from 'vue';
import type {
  SingleStaff,
  Measure,
  Note,
  MultipleStaves, MusicScore
} from "./types";

const props = defineProps({
  musicScoreData: {
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

//动态style
//获取一个小节的宽度占比常数
const getMeasureWidthRatioIndex = (measure: Measure) => {
  let fr = 0;
  measure.noteArray.forEach((_note: Note) => {
    fr += 1;
  });
  return fr;
};
//获取一个单谱表下宽度占比常数
const getSingleStaffWidthRatioIndex = (singleStaffStyle: SingleStaff) => {
  let fr = 0;
  const distribution = [];
  singleStaffStyle.measureArray.forEach((measure: Measure) => {
    fr += getMeasureWidthRatioIndex(measure);
    distribution.push(measure);
  });
  return fr;
};


const MultipleStavesStyle = computed(() => (MultipleStaves: MultipleStaves) => {
  return {
    'grid-template-rows': `repeat(${MultipleStaves.singleStaffArray.length},1fr)`,
    'padding-top': props.MultipleStavesPadding + 'px',
    'padding-bottom': props.MultipleStavesPadding + 'px',
  };
});
const singleStaffStyle = computed(() => (singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  return {
    'grid-template-columns': `repeat(${singleStaff.measureArray.length},1fr)`,
    'padding-top': props.singleStaffPadding + 'px',
    'padding-bottom': props.singleStaffPadding + 'px',
  };
});
const measureWidth = computed(() => (measure: Measure, singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  const totalFr = getSingleStaffWidthRatioIndex(singleStaff);
  const selfFr = getMeasureWidthRatioIndex(measure);
  return props.width * selfFr / totalFr;
});
const measureStyle = computed(() => (measure: Measure, singleStaff: SingleStaff, multipleStaves: MultipleStaves) => {
  let style: any = {};
  style.height = props.measureHeight + 'px';
  style['justify-content'] = 'space-evenly';
  style['grid-auto-flow'] = 'column';
  style.width = measureWidth.value(measure, singleStaff, multipleStaves) + 'px';
  return style;
});

</script>
<style scoped>
.singleStaff {
  display: grid;
  grid-template-rows: 1fr;
}

.measure {
  display: grid;
}
</style>