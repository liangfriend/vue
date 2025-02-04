
<template>
  <div class="container" :style="containerStyle">
      <div class="item" :style="itemStyle" v-for="item in modelValue">
        <div class="url" @click="item.fn"></div>
        <div class="text">{{item.text}}</div>
      </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';

interface modelValueType {
  text?:string;
  url?:string;
  fn?:any;
}
const props = defineProps({
  modelValue:{
    type: Array<modelValueType>,
    default:[{text:'测试'}]
  },
  containerHeight:{
    type:String,
    default:'100%'
  },
  itemWidth:{
    type:String,
    default:'100px'
  },
});
const containerStyle = computed(()=>{
  return {
    height:props.containerHeight,
    'grid-template-columns': `repeat(${props.modelValue.length}, 1fr)`
  };
});
const itemStyle = computed(()=>{
  return {
    width:props.itemWidth,

  };
});
</script>
<style scoped lang="scss">
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  outline:1px solid black;
  overflow: hidden;  //取消margin重叠
  grid-template-columns: repeat(4, 1fr);
  > .item {
    overflow:hidden; //取消margin重叠
    height:100%;
    width:80%;
    margin-left: 12px;
    margin-right: 12px;
    > .url{
      margin: auto;
      height: 80%;
      aspect-ratio: 1/1;
      border-radius: 50%;
      outline: 1px solid black;
    }
    > .text {
      text-align: center;
      height: 20%;
  }
  }
}

</style>