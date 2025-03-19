<template>
  <button @click="switchMode">模式切换</button>
  <canvas width="200" height="200" id="c"></canvas>
</template>

<script setup>
import * as fabric from 'fabric';
import {onMounted} from 'vue';

let canvas = null;
let mainPath = null; // 用于存储合并后的主路径

function switchMode() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
}

onMounted(() => {
  // 初始化画布
  canvas = new fabric.Canvas('c', {
    isDrawingMode: true,
  });

  // 配置画笔
  const brush = new fabric.PencilBrush(canvas);
  brush.color = 'black';
  brush.width = 10;
  canvas.freeDrawingBrush = brush;

  // 路径创建事件处理
  canvas.on('path:created', (event) => {
    const newPath = event.path;

    // 立即移除新创建的路径
    canvas.remove(newPath);

    if (!mainPath) {
      // 创建主路径（使用第一个路径的样式）
      mainPath = new fabric.Path(newPath.path, {
        stroke: newPath.stroke,
        strokeWidth: newPath.strokeWidth,
        fill: null
      });
      canvas.add(mainPath);
    } else {
      // 合并路径数据
      mainPath.path = mainPath.path.concat(newPath.path);

      // 更新路径几何信息
      mainPath.setCoords();
    }

    // 请求重新渲染
    canvas.requestRenderAll();
  });

  // 添加示例矩形
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'red',
    angle: 45
  });
  canvas.add(rect);
});
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>