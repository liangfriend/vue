<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <div class="stackItem" :style="{width:width,height:height}" comment="谱线层">
      <div v-for="(multipleStaff,multipleStaffIndex) in data.multipleStavesArray"
           :key="'multipleStaff'+multipleStaffIndex"
           :style="multipleStaffStyle(multipleStaff)"
           class="multipleStaff">
        <div v-for="(singleStaff,singleStaffIndex) in multipleStaff.singleStaffArray"
             :key="'singleStaff'+singleStaffIndex"
             :style="singleStaffStyle(singleStaff,multipleStaff)"
             class="singleStaff">
          <measure v-for="(measure,measureIndex) in singleStaff.measureArray"
                   :key="'measure'+measureIndex"
                   :strokeWidth="strokeWidth"
                   :x="measureIndex * measureWidth(measure, singleStaff,multipleStaff)"
                   :height="measureHeight"
                   :width="measureWidth(measure, singleStaff,multipleStaff)"></measure>

        </div>
      </div>
    </div>
    <div class="stackItem" :style="{width:width,height:height}" comment="符号层">
      <div v-for="(multipleStaff,multipleStaffIndex) in data.multipleStavesArray"
           :key="'multipleStaff-symbol'+multipleStaffIndex"
           :style="multipleStaffStyle(multipleStaff)"
           class="multipleStaff">
        <div v-for="(singleStaff,singleStaffIndex) in multipleStaff.singleStaffArray"
             :key="'singleStaff-symbol'+singleStaffIndex"
             :style="singleStaffStyle(singleStaff,multipleStaff)"
             class="singleStaff">

          <div>
            <img draggable="false" :src="note" :style="{width: measureHeight / 5 + 'px',height:measureHeight + 'px','object-fit':'fill'}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Measure from './measure.vue';
import mockData from './mock.ts';
import {computed, ref} from 'vue';
import note from './musicSymbols/note.svg';

const props = defineProps({
  width:{
    type:Number,
    default: 1000,
  },
  height:{
    type:Number,
    default: 800,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight:{
    type:Number,
    default:60
  },
  //单谱表的上下内边距
  singleStaffPadding:{
    type:Number,
    default:60
  },
  //复谱表的上下内边距
  multipleStaffPadding:{
    type:Number,
    default:60
  },
  //小节的线条宽度
  strokeWidth:{
    type:Number,
    default:1
  },
});
const musicScoreStyle = computed(()=>{
  return {
    width:props.width+'px',
    height:props.height+'px',
    overflow:'hidden',
  };
});
const multipleStaffStyle=computed(()=>(multipleStaff)=> {
  return {
    'grid-template-rows':`repeat(${multipleStaff.singleStaffArray.length},1fr)`,
    'padding-top':props.multipleStaffPadding+'px',
    'padding-bottom':props.multipleStaffPadding+'px',
  };
});
const singleStaffStyle=computed(()=>(singleStaff,multipleStaff)=> {
  return {
    'grid-template-columns':`repeat(${singleStaff.measureArray.length},1fr)`,
    'padding-top':props.singleStaffPadding+'px',
    'padding-bottom':props.singleStaffPadding+'px',
  };
});
const measureWidth =computed(()=>(measure,singleStaff,multipleStaff)=> {
  //小节上根据音符，休止符，谱号等等来获取宽度比值。通过这些比值来计算出宽度
  const width = props.width / singleStaff.measureArray.length;
  return width;
});

const data = ref(mockData);

</script>
<style scoped lang="scss" comment="布局">
.stack {
  position: relative;

  > .stackItem{
    position: absolute;
    display: grid;

  }
}
</style>
<style scoped lang="scss">
.multipleStaff{
  display: grid;
  grid-template-columns: 1fr;
}
.singleStaff{
  display: grid;
  grid-template-rows: 1fr;
}
</style>