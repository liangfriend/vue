<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <div class="stackItem lineLayer" :style="{width:width+'px',height:height+'px'}" comment="谱线层">
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
                   :x="measureIndex * measureWidth(measure, singleStaff, multipleStaff)"
                   :height="measureHeight"
                   :width="measureWidth(measure, singleStaff, multipleStaff)"></measure>

        </div>
      </div>
    </div>
    <div class="stackItem symbolLayer" :style="{width:width+'px',height:height+'px'}" comment="符号层">
      <div v-for="(multipleStaff,multipleStaffIndex) in data.multipleStavesArray"
           :key="'multipleStaff-symbol'+multipleStaffIndex"
           :style="multipleStaffStyle(multipleStaff)"
           class="multipleStaff">
        <div v-for="(singleStaff,singleStaffIndex) in multipleStaff.singleStaffArray"
             :key="'singleStaff-symbol'+singleStaffIndex"
             :style="singleStaffStyle(singleStaff,multipleStaff)"
             class="singleStaff">
          <div v-for="(measure,measureIndex) in singleStaff.measureArray"
               :style="measureStyle(measure, singleStaff, multipleStaff)"
               class="measure"
               :key="'measure-symbol'+singleStaffIndex">
            <note v-for="(note,noteIndex) in measure.noteArray"
                  :key="'note-symbol'+singleStaffIndex"
                  :measureHeight="measureHeight"
                  :note="note" ></note>
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
import note from './note.vue';

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
//获取一个小节的宽度占比常数
const getMeasureWidthRatioIndex = (measure)=>{
  let fr = 0;
  measure.noteArray.forEach(note =>{
    fr+=1;
  });
  return fr;
};
//获取一个单谱表下宽度占比常数
const getSingleStaffWidthRatioIndex = (singleStaffStyle)=>{
  let fr = 0;
  const distribution = [];
  singleStaffStyle.measureArray.forEach(measure =>{
    fr+=getMeasureWidthRatioIndex(measure);
    distribution.push(measure);
  });
  return fr;
};

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
const measureWidth = computed(()=>(measure,singleStaff,multipleStaff)=> {
  const totalFr = getSingleStaffWidthRatioIndex(singleStaff);
  const selfFr = getMeasureWidthRatioIndex(measure);
  return props.width * selfFr / totalFr;
});
const measureStyle=computed(()=>(measure,singleStaff,multipleStaff)=> {
  let style= {};
  style.height = props.measureHeight+'px';
  style.width = measureWidth.value(measure,singleStaff,multipleStaff)+'px';
  return style;
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
.lineLayer{
  align-items: start;
}
.symbolLayer .multipleStaff{
  align-items: start;
}

.singleStaff{
  display: grid;
  grid-template-rows: 1fr;
}
.measure{
  display: grid;
  justify-items: stretch;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>