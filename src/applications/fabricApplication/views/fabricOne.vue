
<template>
<canvas width="200" height="200" id="c"></canvas>
</template>
<script setup>
import { StaticCanvas, FabricText } from 'fabric';
import * as fabric from 'fabric';
import {onMounted} from 'vue';

let canvas = null;
onMounted(()=>{
  canvas = new fabric.Canvas('c');
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'red',
    angle: 45
  });
  // canvas.renderAll()
  canvas.add(rect);
  // animate();
});
const animate = () => {
  canvas.renderAll();
  requestAnimationFrame(animate);
};
</script>
<style scoped>

</style>