<template>
  <div class="musicScore stack" :style="musicScoreStyle" ref="musicScoreRef">
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
            :measure="measure"
        >
        </measure>
      </template>
    </measure-container>
    <measure-container :musicScoreData="musicScore" class="stackItem symbolLayer"
                       :style="{width:width+'px',height:height+'px', pointerEvents:'none'}"
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
    <measure-container v-show="mode === MsMode.edit" :musicScoreData="musicScore" class="stackItem symbolLayer"
                       :style="{width:width+'px',height:height+'px', pointerEvents:'none'}"
                       comment="编辑模式虚拟音符层">
      <template
          #default="{ measure, measureIndex, singleStaff, multipleStaves, measureWidth }">
        <template v-if="currentSelected === measure">
          <virtual-symbol-container

              comment="第一个变宽容器"
              :msSymbolContainer="variableContainerArray(measure)[0]"
              :measure="measure"
              type="front"
              :musicScore="musicScore"
              :measureWidth="measureWidth"
              :singleStaff="singleStaff"
              :multipleStaves="multipleStaves"
              :measureHeight="musicScore.measureHeight"
              :componentWidth="width"
              :componentHeight="height"
          ></virtual-symbol-container>
          <virtual-symbol-container
              v-for="(msSymbolContainer,symbolIndex) in variableContainerArray(measure)"
              :msSymbolContainer="msSymbolContainer"
              :measure="measure"
              type="self"
              :musicScore="musicScore"
              :measureWidth="measureWidth"
              :ind="symbolIndex"
              :singleStaff="singleStaff"
              :multipleStaves="multipleStaves"
              :measureHeight="musicScore.measureHeight"
              :key="'virtual-symbol'+symbolIndex"
              :componentWidth="width"
              :componentHeight="height"
          ></virtual-symbol-container>
          <virtual-symbol-container
              v-for="(msSymbolContainer,symbolIndex) in variableContainerArray(measure)"

              :msSymbolContainer="msSymbolContainer"
              :measure="measure"
              :type="(symbolIndex === (variableContainerArray(measure).length - 1))?'end':'middle'"
              :musicScore="musicScore"
              :measureWidth="measureWidth"
              :ind="symbolIndex"
              :singleStaff="singleStaff"
              :multipleStaves="multipleStaves"
              :measureHeight="musicScore.measureHeight"
              :key="'virtual-symbol'+symbolIndex"
              :componentWidth="width"
              :componentHeight="height"
          ></virtual-symbol-container>
        </template>

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
  MusicScore, musicScoreIndex, SpanSymbol, Rect, MouseDownData, Measure, MsType, MusicScoreRef
} from "./types.d.ts";
import MeasureContainer from "@/applications/ChuangKeApplication/components/musicScore/components/measureContainer.vue";

import MsSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbolContainer.vue";

import SpanSymbolVue
  from "@/applications/ChuangKeApplication/components/musicScore/components/spanSymbol.vue";
import {
  getTarget,
  mapGenerate,
  msSymbolComputedData, setMultipleStavesIndex, traverseMeasure
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
  MsMode,
  MsSymbolContainerTypeEnum,

} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {
  eventConstant, handleMouseMoveSelected, handleMouseUpSelected
} from "@/applications/ChuangKeApplication/components/musicScore/utils/eventUtil.ts";
import VirtualSymbolContainer
  from "@/applications/ChuangKeApplication/components/musicScore/components/virtualSymbolContainer.vue";


const props = defineProps({
  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true,
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

const mode = ref(MsMode.edit)

// 当前选择对象
const currentSelected = ref<MsType | null>(null)
// 变宽符号容器
const variableContainerArray = computed(() => {
  return (measure: Measure) => {
    return measure.msSymbolContainerArray.filter(e => {
      return e.type === MsSymbolContainerTypeEnum.variable
    })
  }
})
const emits = defineEmits(['msSymbolMouseDown', 'measureMouseDown', 'singleStaffMouseDown', 'multipleStavesMouseDown', 'update:mode'])


function msSymbolMouseDown(e: MouseEvent, msData: MouseDownData) {
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

// 切换模式
function changeMode(newMode: MsMode) {
  mode.value = newMode
}

function getMode() {
  return mode.value
}

function getCurrentSelected() {
  return currentSelected.value
}


const musicScoreStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    overflow: 'hidden',
  };
});

function beforeMount() {
  // 遍历生成hashMap方便快速查找
  mapGenerate(props.musicScore)
  // 索引生成
  setMultipleStavesIndex(props.musicScore)

  window.musicScore = props.musicScore
}


onBeforeMount(beforeMount)
const musicScoreRef = ref<HTMLElement>(null!)

const downLock = ref(false) // 鼠标按下锁，鼠标抬起解锁
function handleMouseDown(e: MouseEvent) {
  eventConstant.startX = e.clientX;
  eventConstant.startY = e.clientY;
  downLock.value = true
}

function handleMouseUp(e: MouseEvent) {
  downLock.value = false
  handleMouseUpSelected(e, currentSelected.value)
}

function handleMouseMove(e: MouseEvent) {
  if (downLock.value) {
    handleMouseMoveSelected(e, props.musicScore?.measureHeight, currentSelected.value)
  }
}


onMounted(() => {

  musicScoreRef.value.addEventListener('mousemove', handleMouseMove)
  musicScoreRef.value.addEventListener('mousedown', handleMouseDown)
  musicScoreRef.value.addEventListener('mouseup', handleMouseUp)
  //遍历所有订阅者，执行操作
})
// onMounted(mounted);
onUnmounted(() => {

});

provide('mouseDown', {
  msSymbolMouseDown,
  measureMouseDown,
  singleStaffMouseDown,
  multipleStavesMouseDown,
})
provide('msState', {
  mode,
  currentSelected
})
defineExpose<MusicScoreRef>({changeMode, root: musicScoreRef, getMode, getCurrentSelected})
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