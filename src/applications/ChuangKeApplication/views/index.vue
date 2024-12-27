<template>
  <div class="container">
    <div class="stack1">
      <div class="top"></div>
      <div class="left"></div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">授课教学</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="chuangzuobeike">创作备课</div>
      <div class="right"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style scoped lang="scss">
.container {
    position: relative;
  .stack1{
    position: absolute;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr 3fr 1fr;
  }
}
.top{
  grid-area: top;
}
</style>
