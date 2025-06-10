<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <measure-container :musicScoreData="modelValue" class="stackItem lineLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       :measureHeight="measureHeight"
                       comment="谱线层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
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
                       :measureHeight="measureHeight"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="符号层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <ms-symbol-container v-for="(msSymbolContainer,symbolIndex) in measure.msSymbolContainerArray"
                             :msSymbolContainer="msSymbolContainer"
                             :measure="measure"
                             :measureWidth="measureWidth"
                             :singleStaff="singleStaff"
                             :multipleStaves="multipleStaves"
                             :measureHeight="measureHeight"
                             :key="'note-symbol'+symbolIndex"
        ></ms-symbol-container>
      </template>
    </measure-container>
  </div>
</template>
<script setup lang="ts">
import measure from './components/measure.vue';
import {computed, onMounted, onUnmounted, type PropType, provide, ref} from 'vue';
import type {
  MusicScore
} from "./types.d.ts";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/components/measureContainer.vue";

import MsSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolContainer.vue";
import {ClefEnum, MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {computedClef} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

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

function mounted() {
  // 计算clef
  computedClef(props.modelValue)
}

onMounted(mounted);
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
  pointer-events: none;
}


</style>