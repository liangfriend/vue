<template>
  <div comment="精确到measure的循环体">
    <div v-for="(multipleStaves, multipleStavesIndex) in musicScoreData.multipleStavesArray"
         :key="'MultipleStaves'+multipleStavesIndex"
         :style="MultipleStavesStyle(multipleStaves)"
         class="MultipleStaves">
      <div v-for="(singleStaff,singleStaffIndex) in multipleStaves.singleStaffArray"
           :key="'singleStaff'+singleStaffIndex"
           :style="singleStaffStyle(singleStaff,multipleStaves)"
           class="singleStaff">
        <div v-for="(measure,measureIndex) in singleStaff.measureArray"
             :style="measureStyle(measure, singleStaff, multipleStaves)" class="measure"
             :key="'measure'+measureIndex">
          <!-- 使用作用域插槽，传递 measure 等数据 -->
          <slot
              :measure="measure"
              :measureIndex="measureIndex"
              :singleStaff="singleStaff"
              :singleStaffIndex="singleStaffIndex"
              :multipleStaves="multipleStaves"
              :multipleStavesIndex="multipleStavesIndex"
              :measureWidth="measureWidth(measure, singleStaff, multipleStaves)"
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
  MultipleStaves, MusicScore, MsSymbol
} from "../types";
import {widthRatioConstant} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";

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
  measure.msSymbolArray.forEach((msSymbol: MsSymbol) => {
    fr += widthRatioConstant[msSymbol.type];
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
  position: relative;
}
</style>