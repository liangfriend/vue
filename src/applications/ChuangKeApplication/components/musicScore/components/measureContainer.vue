<template>
  <div>
    <div v-for="(multipleStaves, multipleStavesIndex) in musicScoreData.multipleStavesArray"
         :key="'multipleStaves'+multipleStavesIndex"
         :style="multipleStavesStyle(multipleStaves)"
         class="multipleStaves">
      <slot name="multipleStaves"></slot>
      <div v-for="(singleStaff,singleStaffIndex) in multipleStaves.singleStaffArray"
           :key="'singleStaff'+singleStaffIndex"
           :style="singleStaffStyle(singleStaff,multipleStaves)"
           class="singleStaff">
        <slot name="singleStaff"></slot>
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
import type {CSSProperties, PropType} from 'vue';
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
});
// 边距全部用padding避免margin折叠
const multipleStavesStyle = computed(() => (multipleStaves: MultipleStaves) => {
  return {
    'grid-template-rows': `repeat(${multipleStaves.singleStaffArray.length},1fr)`,
    'padding-top': multipleStaves.multipleStavesPaddingTop + 'px',
    'padding-bottom': multipleStaves.multipleStavesPaddingBottom + 'px',
    'margin-bottom': multipleStaves.multipleStavesMarginBottom + 'px'
  };
});
const singleStaffStyle = computed(() => (singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  return {
    'grid-template-columns': `repeat(${singleStaff.measureArray.length},1fr)`,
    'padding-top': singleStaff.singleStaffPaddingTop + 'px',
    'padding-bottom': singleStaff.singleStaffPaddingBottom + 'px',
    'margin-bottom': singleStaff.singleStaffMarginBottom + 'px'
  };
});
const measureWidth = computed(() => (measure: Measure, singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  const totalSingleStaffWidthConstant = getWidthConstantInSingleStaff(singleStaff,);
  const totalMeasureWidthConstant = getWidthConstantInMeasure(measure,);
  const fixedContainerWidthInSngleStaff = getWidthFixedContainerWidthSumInSingleStaff(singleStaff, props.musicScoreData.measureHeight)
  const fixedContainerWidthInMeasure = getWidthFixedContainerWidthSumInMeasure(measure, props.musicScoreData.measureHeight)
  return (props.width - fixedContainerWidthInSngleStaff) / totalSingleStaffWidthConstant * totalMeasureWidthConstant + fixedContainerWidthInMeasure;
});
const measureSlotStyle = computed(() => (measure: Measure, singleStaff: SingleStaff, multipleStaves: MultipleStaves) => {
  let style: CSSProperties = {};
  style.height = props.musicScoreData.measureHeight + 'px';
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