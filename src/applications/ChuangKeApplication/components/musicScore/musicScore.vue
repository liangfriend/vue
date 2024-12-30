<template>
  <div class="musicScore" :style="musicScoreStyle">
    <div v-for="(multipleStaff,multipleStaffIndex) in data.multipleStavesArray"
         :style="multipleStaffStyle(multipleStaff)"
         class="multipleStaff">
      <div v-for="(singleStaff,singleStaffIndex) in multipleStaff.singleStaffArray"
           :style="singleStaffStyle(singleStaff,multipleStaff)"
           class="singleStaff">
        <measure v-for="(measure,measureIndex) in singleStaff.measureArray"
                 :strokeWidth="strokeWidth"
                 :x="measureIndex * measureWidth(measure, singleStaff,multipleStaff)"
                 :height="measureHeight"
                 :width="measureWidth(measure, singleStaff,multipleStaff)"></measure>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import Measure from './measure.vue';
import mockData from './mock.ts';
import {computed, ref} from 'vue';

const props = defineProps({
  width:{
    type:Number,
    default: 600,
  },
  height:{
    type:Number,
    default: 800,
  },
  //小节高度
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
  //线条宽度
  strokeWidth:{
    type:Number,
    default:1
  }
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