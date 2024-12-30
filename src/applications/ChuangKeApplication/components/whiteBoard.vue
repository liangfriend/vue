<template>
  <div class="stack whiteBoard" comment="白板，内含浮动展示板，左右工具栏等（也许不含工具栏）">
    <div v-drag class="floatBoard stackItem" ref="floatBoard" :style="floatBoardStyle" comment="浮动展示板，此元素可被拖动位移，背景为白色">
      <music-score></music-score>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {parseAndFormatDimension} from '../utils/util.ts';
import MusicScore from '@/applications/ChuangKeApplication/components/musicScore/musicScore.vue';
//展示板实例
const floatBoard = ref(null);
const props = defineProps({
  floatBoardWidth:{
    type:String,
    default:'100%'
  },
  floatBoardHeight:{
    type:String,
    default:'100%'
  },
  floatBoardPosition: {
    type: String, //leftTop center
    default:'center'
  }
});
// const preventDefault = (e)=>{
//   if (e.ctrlKey === true || e.metaKey) {
//     e.preventDefault();
//   };
// };
onMounted(()=>{
  // window.devicePixelRatio = 1;
  // window.addEventListener('mousewheel', preventDefault,{ passive: false});

  //firefox
  // window.addEventListener('DOMMouseScroll', preventDefault);

});
onUnmounted(()=>{
  // window.removeEventListener('mousewheel',preventDefault);
  // window.removeEventListener('DOMMouseScroll',preventDefault);
});

const floatBoardStyle=computed(()=>{
  const style = {
    width:props.floatBoardWidth,
    height:props.floatBoardHeight,

  };
  switch(props.floatBoardPosition) {
  case 'leftTop':
    //
    break;
  case 'center':{
    // 解析宽度和高度
    const { value: widthValue, unit: widthUnit } = parseAndFormatDimension(props.floatBoardWidth);
    const { value: heightValue, unit: heightUnit } = parseAndFormatDimension(props.floatBoardHeight);
    style.left = `calc(50% - ${widthValue / 2}${widthUnit})`;
    style.top = `calc(50% - ${heightValue / 2}${heightUnit})`;
    break;
  }
  default:
    break;
  }
  return style;
});
//-------------------------------------添加元素逻辑-------------------------------------------
//白板组件暂存区
const cacheMap = new Map();
//添加元素到暂存区
const cacheElement = (element) => {
  cacheMap.set('element', element);
};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const addElement = (e, options) => {
  const left = e.offsetX;
  const top = e.offsetY;
  const element = cacheMap.get('element').cloneNode(true);
  element.style.position = 'absolute';
  element.style.top = top + 'px';
  element.style.left = left + 'px';
  floatBoard.value.appendChild(element);
  endAddElement();
};
  //开始监听元素添加
const startAddElement = (key,element) => {
  //添加元素到暂存区
  if(element && key){
    cacheElement(key,element);
  }
  //添加元素到展示板
  floatBoard.value.addEventListener('mouseup', addElement);
};
  //取消监听元素添加
const endAddElement = () => {
  floatBoard.value.removeEventListener('mouseup', addElement);
};
//-------------------------------------变量-------------------------------------------
//暴露方法
defineExpose({ startAddElement, endAddElement });

</script>
<style>
.floatBoard{
  background-color: #fff;
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.1);
}
</style>
<style scoped lang="scss" comment="布局">
.stack {
  position: relative;
  width: 100%;
  height: 100%;
  > .stackItem{
    position: absolute;
    display: grid;
    width: 100%;
    height: 100%;
  }
}
</style>