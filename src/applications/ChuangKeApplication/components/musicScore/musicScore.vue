<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <!--    -->
    <measure-container :musicScoreData="modelValue" class="stackItem lineLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="谱线层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <measure
            :key="'measure'+measureIndex"
            :strokeWidth="strokeWidth"
            :x="measureIndex * measureWidth"
            :width="measureWidth"
            :height="modelValue.measureHeight"
        >
        </measure>
      </template>
    </measure-container>
    <measure-container :musicScoreData="modelValue" class="stackItem symbolLayer"
                       :style="{width:width+'px',height:height+'px'}"
                       comment="符号层">
      <template #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <ms-symbol-container v-for="(msSymbolContainer,symbolIndex) in measure.msSymbolContainerArray"
                             :msSymbolContainer="msSymbolContainer"
                             :measure="measure"
                             :measureWidth="measureWidth"
                             :singleStaff="singleStaff"
                             :multipleStaves="multipleStaves"
                             :measureHeight="modelValue.measureHeight"
                             :key="'note-symbol'+symbolIndex"
        ></ms-symbol-container>
      </template>
    </measure-container>
    <!--  跨小节符号目前只有小节跟随型和符号（音符头）跟随型  -->
    <span-symbol-vue :key="'span-symbol'+spanSymbolIndex"
                     v-for="(spanSymbol,spanSymbolIndex) in modelValue.spanSymbolArray"
                     :spanSymbol="spanSymbol"></span-symbol-vue>
  </div>
</template>
<script setup lang="ts">
import measure from './components/measure.vue';
import {computed, onMounted, onUnmounted, type PropType, provide, ref} from 'vue';
import type {
  MusicScore, SpanSymbol
} from "./types.d.ts";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/components/measureContainer.vue";

import MsSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolContainer.vue";
import {
  ClefEnum,
  MsSymbolTypeEnum,
  SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import SpanSymbolVue
  from "@/applications/ChuangKeApplication/components/musicScore/components/spanSymbol.vue";
import {
  msSymbolComputedData
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
  // 计算属性
  msSymbolComputedData(props.modelValue)
  // 跨小节符号rect计算

}

function getSpanSymbolRect(spanSymbol: SpanSymbol, musicScoreData: MusicScore) {
  switch (spanSymbol.type) {
    case SpanSymbolTypeEnum.volta: {
      let width = 0 // 获取开始节点和结束节点的小节宽度， 有三种情况，同单谱表不同小节 同单谱表相同小节 不同单谱表
      let left = 0 // 获取开始小节的单谱表
      let bottom = 0 // 小节bottom加范围内小节最高的符号的bottom
      break
    }
  }
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