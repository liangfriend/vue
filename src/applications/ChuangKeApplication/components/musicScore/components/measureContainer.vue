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
             :style="measureSlotStyle(measure, singleStaff, multipleStaves)" class="measureSlot"
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
import type {PropType} from 'vue';
import {computed} from "vue";
import type {Measure, MsSymbol, MultipleStaves, MusicScore, SingleStaff, WidthConstant} from "../types";
import {
  getWidthConstantInMeasure, getWidthConstantInSingleStaff, getWidthFixedContainerWidthSumInMeasure,
  getWidthFixedContainerWidthSumInSingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {MsSymbolInformationMap} from "@/applications/ChuangKeApplication/components/musicScore/constant.ts";
import {MsSymbolCategoryEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

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
// 边距全部用padding避免margin折叠
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
  const totalSingleStaffWidthConstant = getWidthConstantInSingleStaff(singleStaff,);
  const totalMeasureWidthConstant = getWidthConstantInMeasure(measure,);
  const fixedContainerWidthInSngleStaff = getWidthFixedContainerWidthSumInSingleStaff(singleStaff, props.measureHeight)
  const fixedContainerWidthInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, props.measureHeight)
  return (props.width - fixedContainerWidthInSngleStaff) / totalSingleStaffWidthConstant * totalMeasureWidthConstant + fixedContainerWidthInMeasure;
});
const measureSlotStyle = computed(() => (measure: Measure, singleStaff: SingleStaff, multipleStaves: MultipleStaves) => {
  let style: any = {};
  style.height = props.measureHeight + 'px';
  style.width = measureWidth.value(measure, singleStaff, multipleStaves) + 'px';
  return style;
});

</script>
<style scoped>
.singleStaff {
  display: grid;
  grid-template-rows: 1fr;
}

.measureSlot {
  display: grid;
  position: relative;
}
</style>