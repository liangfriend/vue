<template>
  <div class="stack whiteBoard" comment="白板，内含浮动展示板，左右工具栏等（也许不含工具栏）">
    <div v-drag class="floatBoard stackItem" ref="floatBoard" :style="floatBoardStyle" comment="浮动展示板，此元素可被拖动位移，背景为白色">
      <music-score :width="800" :measure-height="40"></music-score>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {parseAndFormatDimension} from '../utils/util.ts';
import MusicScore from '@/applications/ChuangKeApplication/components/musicScore/musicScore.vue';
//展示板实例
const floatBoard = ref(null);
//宽高只允许传入px,为了保证缩放功能的正常进行
const props = defineProps({
  floatBoardWidth:{
    type:Number,
    default:100
  },
  floatBoardHeight:{
    type:Number,
    default:100
  },
  floatBoardPosition: {
    type: String, //leftTop center
    default:'center'
  }
});

onMounted(()=>{

});
onUnmounted(()=>{

});

const floatBoardStyle=computed(()=>{
  const { value: widthValue, unit: widthUnit } = parseAndFormatDimension(props.floatBoardWidth);
  const { value: heightValue, unit: heightUnit } = parseAndFormatDimension(props.floatBoardHeight);
  const style = {
    width:widthValue+widthUnit,
    height:heightValue+heightUnit,
  };
  console.log(props.floatBoardPosition);
  switch(props.floatBoardPosition) {
  case 'leftTop':
    //
    break;
  case 'center':{
    // 解析宽度和高度
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
  //这里还要套一层壳，把元素全部放到这层壳里，防止svg元素设置top,left不生效
  const wbDom = document.createElement('div');
  wbDom.appendChild(element);
  wbDom.style.position = 'absolute';
  wbDom.style.top = top + 'px';
  wbDom.style.left = left + 'px';
  floatBoard.value.appendChild(wbDom);
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