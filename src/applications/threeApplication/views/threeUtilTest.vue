<template>
  <div><div ref="canvas"></div></div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, Ref } from 'vue';
  import * as THREE from 'three';
  import { ArcballControls } from 'three/examples/jsm/Addons.js';

  const canvas: Ref = ref(null);
  const load = () => {
    //渲染函数
    //渲染
  };

  onMounted(() => {
    load();
  });
</script>
<style scoped></style>
