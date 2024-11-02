<template>
  <div class="item fa">111111111111111 </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, onUnmounted, onBeforeUnmount } from 'vue';

  const load = () => {};
  onMounted(() => {
    load();
  });
  onBeforeUnmount(() => {
    console.log('销毁 ');
  });
</script>
<style>
  .item {
    width: 200px;
    height: 200px;
  }
  .fa {
    background-color: aqua;
  }
</style>
