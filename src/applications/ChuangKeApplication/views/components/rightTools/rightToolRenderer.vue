<template>
  <div class="rightToolRenderer">
    <div v-for="item in modelValue">
      <div class="title">{{item.title}}</div>
      <div class="box">
        <div class="card" v-for="card in item.content">
          <img :src="card.image">
          <div>{{card.name}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
/*
* 点击触发效果
* 点击存储dom开启添加dom监听
*
* */
const props=defineProps({
  modelValue:{
    type: Array,
    default:()=>{return [];}
  },

});
</script>
<style scoped lang="scss">
$rowNumber:5;
$containerWidth:20vw;
.rightToolRenderer{
  outline: 1px solid black;
  height: 80vh;
  width: $containerWidth;
  overflow: auto;
}
.title{
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.box{
  padding-top: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: repeat($rowNumber,1fr);
  row-gap: calc($containerWidth / 4 / $rowNumber);
  border-bottom: 1px solid #ccc;
  > .card{
    display: grid;
    >img{
      height: calc($containerWidth / 2 / $rowNumber);
      width: calc($containerWidth / 2 / $rowNumber);
      justify-self: center;
    }
    >div{
      justify-self: center;
    }
  }
}
</style>