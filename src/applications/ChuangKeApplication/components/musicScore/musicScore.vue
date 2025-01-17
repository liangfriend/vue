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
               :key="'measure-symbol'+measureIndex">
            <note
                v-for="(note,noteIndex) in measure.noteArray"
                  :key="'note-symbol'+noteIndex"
                  :measureHeight="measureHeight"
                  :noteTop="noteTop(note)"
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
import {computed, onMounted, onUnmounted, ref} from 'vue';
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
//动态style
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
  style['justify-content'] = 'space-evenly';
  style['grid-auto-flow'] = 'column';
  style.width = measureWidth.value(measure,singleStaff,multipleStaff)+'px';
  return style;
});

const data = ref(mockData);

// 和selected指令配合，让目标元素高亮
const documentClickHandler = (e) => {
  const el = window.musicScore.selected;
  if (el && !el.contains(e.target)) {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
const keyUpHandler = (e) => {
  const el = window.musicScore.selected;
  if (el && e.key === 'Escape') {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
const positionCalculation = ()=> {
  let clef:ClefEnum = ClefEnum.g;
  let timeSignature:TimeSignatureEnum = TimeSignatureEnum['4/4'];
  let keySignature:KeySignatureEnum = KeySignatureEnum.c;
  data.value.multipleStavesArray.map(multipleStaves => {
    multipleStaves.singleStaffArray.map(singleStaff => {
      singleStaff.measureArray.map(measure => {
        measure.timeSignature && (timeSignature = measure.timeSignature);
        measure.keySignature && (keySignature = measure.keySignature);
        measure.noteArray.map(note => {
          note.clef && (clef = note.clef);
          // calculateNotePosition(clef, keySignature, note.musicalAlphabet );
          // note.t_;
        });
      });
    });
  });
};
//noteTop
const noteTop =  computed(()=>(note)=> {
  console.log(note);
  calculateNotePosition();
  //通过measureHeight，谱号，调号，note信息计算出高度
  return 20;
});
onMounted(()=>{
  if(!window.musicScore){
    window.musicScore = {};
  }
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keyup', keyUpHandler);
});
onUnmounted(()=>{
  document.removeEventListener('click', documentClickHandler);
  document.removeEventListener('keyup', keyUpHandler);
});

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
.symbolLayer{
  align-items: start;
  pointer-events: none;
}

.singleStaff{
  display: grid;
  grid-template-rows: 1fr;
}
.measure{
  display: grid;
}
</style>