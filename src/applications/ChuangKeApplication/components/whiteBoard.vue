<template>
  <div class="stack whiteBoard" comment="白板，内含浮动展示板，左右工具栏等（也许不含工具栏）">
    <div v-drag class="floatBoard stackItem" ref="floatBoard" comment="浮动展示板，此元素可被拖动位移，背景为白色">
<!--      <div class="sketchpad stackItem" comment="画板，包含画笔内容"></div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
//展示板实例
const floatBoard = ref(null);
//元素暂存区
const cacheMap = new Map();

//添加元素到暂存区
const cacheElement = (left:string, top:string, element) => {

};
const add = (e) => {
  const left = 0;
  const top = 0;

  endAdd();
};
const startAdd = (element) => {
  //添加元素到暂存区

  //添加元素到展示板
  floatBoard.value.addEventListener('moouseup', add);
};
//取消监听
const endAdd = () => {
  floatBoard.value.removeEventListener('moouseup', add);
};
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