<template>
  <div class="note" :style="{width: measureHeight / 5 + 'px',height:measureHeight + 'px'}">
    <!--    这里要加入倚音，附点等位置-->
    <img :src="svgHref" :style="{width: measureHeight / 5 + 'px',height:measureHeight + 'px','object-fit':'fill'}">
  </div>

</template>
<script setup lang="ts">
import wholeNote from './musicSymbols/wholeNote.svg';
import halfNote from './musicSymbols/halfNote.svg';
import quarterNote from './musicSymbols/quarterNote.svg';
import eighthNote from './musicSymbols/eighthNote.svg';
import sixteenthNote from './musicSymbols/sixteenthNote.svg';
import {computed} from 'vue';
import {Chronaxie} from '@/applications/ChuangKeApplication/components/musicScore/dataMap.ts';

const props = defineProps({
  note:{
    //这里不知道为什么全局类型引入不了
    type:Object,
    default: ()=>{},
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight:{
    type:Number,
    default:60
  },
});

const svgHref = computed(()=>{
  switch (props.note.chronaxie){
  case Chronaxie.WHOLE:
    return wholeNote;
  case Chronaxie.HALF:
    return halfNote;
  case Chronaxie.QUARTER:
    return quarterNote;
  case Chronaxie.EIGHTH:

    return eighthNote;
  case Chronaxie.SIXTH:
    return sixteenthNote;
  }
});
</script>
<style scoped lang="scss">
image{
  display: block;
}
</style>