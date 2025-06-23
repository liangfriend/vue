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
            :componentWidth="width"
            :componentHeight="height"
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
                             :musicScore="modelValue"
                             :measureWidth="measureWidth"
                             :singleStaff="singleStaff"
                             :multipleStaves="multipleStaves"
                             :measureHeight="modelValue.measureHeight"
                             :key="'note-symbol'+symbolIndex"
                             :componentWidth="width"
                             :componentHeight="height"
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
import {computed, onMounted, onBeforeMount, onUnmounted, type PropType, provide, ref} from 'vue';
import type {
  MusicScore, musicScoreIndex, SpanSymbol, Rect
} from "./types.d.ts";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/components/measureContainer.vue";

import MsSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolContainer.vue";
import {
  ClefEnum,
  MsSymbolTypeEnum, MsTypeNameEnum,
  SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

import SpanSymbolVue
  from "@/applications/ChuangKeApplication/components/musicScore/components/spanSymbol.vue";
import {
  getIndex,
  getTarget,
  mapGenerate,
  msSymbolComputedData, traverseMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {getMeasureLeftToMusicScore} from "@/applications/ChuangKeApplication/components/musicScore/utils/leftUtil.ts";
import {getMeasureWidth} from "@/applications/ChuangKeApplication/components/musicScore/utils/widthUtil.ts";
import {
  getMaxMsSymbolBottomInMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/bottomUtil.ts";

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

function created() {
  // 遍历生成hashMap方便快速查找
  mapGenerate(props.modelValue)
  // 索引生成
  getIndex(props.modelValue)
  // 计算属性
  msSymbolComputedData(props.modelValue)

  // 跨小节符号rect计算)
  props.modelValue.spanSymbolArray.forEach((spanSymbol) => {
    getSpanSymbolRect(spanSymbol, props.modelValue)
  })
  window.musicScore = props.modelValue
}

function getSpanSymbolRect(spanSymbol: SpanSymbol, musicScoreData: MusicScore) {
  switch (spanSymbol.type) {
    case SpanSymbolTypeEnum.volta: {
      voltaRect(spanSymbol)
      break
    }
  }
}

function voltaRect(volta: Extract<SpanSymbol, { type: SpanSymbolTypeEnum.volta }>) {
  const rect = {
    width: 0,
    left: 0,
    bottom: 0
  }
  const startMeasure = getTarget(volta.startTargetId, props.modelValue)
  const endMeasure = getTarget(volta.endTargetId, props.modelValue)
  if (!startMeasure || !endMeasure) return console.error('获取不到绑定元素')
  if (startMeasure.msTypeName !== MsTypeNameEnum.Measure || endMeasure.msTypeName !== MsTypeNameEnum.Measure) return console.error('volta绑定元素错误')
  // 处理同行情况
  if (startMeasure.index.multipleStavesIndex === endMeasure.index.multipleStavesIndex) {
    rect.left = getMeasureLeftToMusicScore(startMeasure, props.modelValue, props.width)
    traverseMeasure(startMeasure.index, endMeasure.index, props.modelValue, (measure, singleStaff, multipleStaves) => {
      rect.width += getMeasureWidth(measure, singleStaff, props.modelValue, props.width)

      rect.bottom = Math.max(rect.bottom, getMaxMsSymbolBottomInMeasure(measure, props.modelValue.measureHeight))
    })
  }

  volta.rect = rect

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
  pointer-events: none;
}


</style>