<template>
  <div class="item fa">222222222222222222</div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';

  const load = () => {};
  onMounted(() => {
    load();
  });
</script>
<style>
  .item {
    width: 200px;
    height: 200px;
  }
  .fa {
    background-color: red;
    font-size: 50px;
  }
</style>
