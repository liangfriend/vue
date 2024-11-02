<template>
  <div class="container">
    <Item v-if="v === 1"> </Item>
    <ItemT v-if="v === 2"> </ItemT>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, onUnmounted, onBeforeUnmount } from 'vue';
  import Item from './components/testChild.vue';
  const ItemT = () => import('./components/testChild2.vue');
  const v = ref(1);
  const load = () => {};
  onMounted(() => {
    load();
  });
  onBeforeUnmount(() => {
    console.log('父组件销毁 ');
  });
</script>
<style></style>
