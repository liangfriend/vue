<template>
  <div class="noteContainer" v-selected="{mouseDownFn:mouseDownFn}"
       :style="{width: measureHeight / 5 + 'px',height:measureHeight + 'px'}">
    <!--    这里要加入倚音，附点等位置-->
    <div class="note" :style="noteStyle"></div>
    {{ top }}
  </div>

</template>
<script setup lang="ts">
import wholeNote from './musicSymbols/wholeNote.svg';
import halfNote from './musicSymbols/halfNote.svg';
import quarterNote from './musicSymbols/quarterNote.svg';
import eighthNote from './musicSymbols/eighthNote.svg';
import sixteenthNote from './musicSymbols/sixteenthNote.svg';
import {computed, CSSProperties, onMounted, ref} from 'vue';
import {Chronaxie} from '@/applications/ChuangKeApplication/components/musicScore/dataMap.ts';

import vSelected from './directives/selected.ts';
import bar from '@/applications/ChuangKeApplication/components/musicScore/musicSymbols/bar.svg';

const props = defineProps({
  note: {
    //这里不知道为什么全局类型引入不了
    type: Object,
    default: () => {
    },
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
});
const top = computed(() => {
  console.log('chicken', props.measureHeight)
  const noteHeight = props.measureHeight;  //音符高度，这个功能二期, 现在直接等于小节高度
  switch (props.note.position) {
    case 'line_1':
      return props.measureHeight * 9 / 9 - noteHeight;
    case 'space_1':
      return props.measureHeight * 8 / 9 - noteHeight;
    case 'line_2':
      return props.measureHeight * 7 / 9 - noteHeight;
    case 'space_2':
      return props.measureHeight * 6 / 9 - noteHeight;
    case 'line_3':
      return props.measureHeight * 5 / 9 - noteHeight;
    case 'space_3':
      return props.measureHeight * 4 / 9 - noteHeight;
    case 'line_4':
      return props.measureHeight * 3 / 9 - noteHeight;
    case 'space_4':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'line_5':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_1':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_1':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_2':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_2':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_3':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_3':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_4':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_4':
      return props.measureHeight * 1 / 9 - noteHeight;
    case 'upper_space_5':
      return props.measureHeight * 2 / 9 - noteHeight;
    case 'upper_line_5':
      return props.measureHeight * 1 / 9 - noteHeight;
    default:
      return 0;
  }
});
const svgHref = computed(() => {
  switch (props.note.chronaxie) {
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
    default:
      return quarterNote;
  }
});
const noteStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.measureHeight / 5}px`,
    height: `${props.measureHeight}px`,
    backgroundColor: 'black',
    mask: `url(${svgHref.value}) no-repeat center`,
    maskSize: '100% 100%',
    position: 'relative',
    top: `${top.value}px`,
  }
});
onMounted(() => {

})


const mouseDownFn = () => {

};
</script>
<style scoped lang="scss">
image {
  display: block;
}

.noteContainer {
  pointer-events: all;
}
</style>