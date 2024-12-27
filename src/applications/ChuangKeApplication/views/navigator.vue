<template>
  <div class="stack">
    <div class="stackItem container">
      <div class="top"></div>
      <div class="left"></div>
      <div class="chuangzuobeike1" @click="goTo('/chuangKeIndex/editor')">创作备课</div>
      <div class="chuangzuobeike2">授课教学</div>
      <div class="chuangzuobeike3">创作备课</div>
      <div class="chuangzuobeike4">创作备课</div>
      <div class="chuangzuobeike5">创作备课</div>
      <div class="chuangzuobeike6">创作备课</div>
      <div class="chuangzuobeike7">创作备课</div>
      <div class="chuangzuobeike8">创作备课</div>
      <div class="chuangzuobeike9">创作备课</div>
      <div class="chuangzuobeike10">创作备课</div>
      <div class="right"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {useRouter} from 'vue-router';

const router = useRouter();
const goTo = (path) => {
  router.push(path);
};
</script>
<style scoped lang="scss">
@for $i from 1 through 10 {
  .chuangzuobeike#{$i} {
    width: 100%;
    height: 100%;
    outline: 1px solid black;
  }
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
.container {
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr 3fr 3fr 1fr;
  grid-template-areas:
        "top top top top top top top"
        "left chuangzuobeike1 chuangzuobeike2 chuangzuobeike3 chuangzuobeike4 chuangzuobeike5 right"
        "left chuangzuobeike6 chuangzuobeike7 chuangzuobeike8 chuangzuobeike9 chuangzuobeike10 right"
        "bottom bottom bottom bottom bottom bottom bottom";
}
.top{
  grid-area: top;
}
.left{
  grid-area: left;
}
.right{
  grid-area: right;
}
.bottom{
  grid-area: bottom;
}
@for $i from 1 through 10 {
  .chuangzuobeike#{$i} {
    grid-area: chuangzuobeike#{$i};
  }
}
</style>
