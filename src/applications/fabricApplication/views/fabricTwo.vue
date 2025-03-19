<template>
  <button @click="getNewPath">融合</button>
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" ref="canvasRef">
    <path
        fill="red"
        :d="pathA" />
    <path
        fill="green"
        :d="pathB" />
  </svg>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ClipperLib from 'js-clipper';

const pathA =ref(`M 10,30
           A 20,20 0,0,1 50,30
           A 20,20 0,0,1 90,30
           Q 90,60 50,90
           Q 10,60 10,30 z`);
const pathB =ref(`M 50,50
           L 100,100
           L 150,50 z`);
onMounted(() => {

});
function paths2string (paths, scale) {
  var svgpath = '', i, j;
  if (!scale) {scale = 1;}
  for(i = 0; i < paths.length; i++) {
    for(j = 0; j < paths[i].length; j++){
      if (!j) {svgpath += 'M';}
      else {svgpath += 'L';}
      svgpath += (paths[i][j].X / scale) + ', ' + (paths[i][j].Y / scale);
    }
    svgpath += 'Z';
  }
  if (svgpath=='') {svgpath = 'M0,0';}
  return svgpath;
}
function parseSVGPathToClipper(pathString) {
  const commands = pathString.split(/(?=[A-Za-z])/g); // 更准确的分割命令
  let points = [];
  let currentPoint = { X: 0, Y: 0 };

  for (let cmd of commands) {
    const type = cmd[0];
    const values = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

    switch (type.toUpperCase()) {
    case 'M':{

    }

    case 'L':
      for (let i = 0; i < values.length; i += 2) {
        currentPoint = { X: values[i], Y: values[i + 1] };
        points.push(currentPoint);
      }
      break;

    case 'Q':{
      const [x1, y1, x2, y2] = values;
      const cp1 = { X: x1, Y: y1 };
      const end = { X: x2, Y: y2 };
      const steps = 10;
      for (let t = 0; t <= 1; t += 1 / steps) {
        const point = {
          X: (1 - t) ** 2 * currentPoint.X + 2 * (1 - t) * t * cp1.X + t ** 2 * end.X,
          Y: (1 - t) ** 2 * currentPoint.Y + 2 * (1 - t) * t * cp1.Y + t ** 2 * end.Y
        };
        points.push(point);
        currentPoint = point;
      }
      break;
    }

    case 'A':
      const [rx, ry, xrot, largeFlag, sweepFlag, x2, y2] = values;
      const start = { ...currentPoint };
      const end = { X: x2, Y: -y2 }; // 翻转 Y 轴
      const steps = 10;
      for (let t = 0; t <= 1; t += 1 / steps) {
        const point = approximateArcPoint(start, end, rx, ry, xrot, largeFlag, sweepFlag, t);
        points.push(point);
        currentPoint = point;
      }
      break;

    case 'Z':
      if (points.length > 0) {
        points.push({ ...points[0] }); // 显式闭合路径
      }
      break;
    }
  }

  return [points];
}

// 椭圆弧近似函数
function approximateArcPoint(start, end, rx, ry, xrot, largeFlag, sweepFlag, t) {
  // 实现椭圆弧参数化计算（需完整数学实现）
  // 这里简化为线性插值示意
  return {
    X: start.X + (end.X - start.X) * t,
    Y: start.Y + (end.Y - start.Y) * t
  };
}
function convertQToL(pathData) {
  return pathData.map(command => {
    if (command[0] === 'Q') {
      // 提取二次贝塞尔曲线的终点（忽略控制点）
      const [_, x1, y1, x, y] = command;
      return ['L', x, y];
    }
    return command;
  });
}
function merge(pathA, pathB) {
  const cpr = new ClipperLib.Clipper();
  const scale = 100;
  //path路径转数组
  const cPathA = parseSVGPathToClipper(pathA);
  const cPathB = parseSVGPathToClipper(pathB);
  //将路径放大一百倍，避免浮点误差精度丢失
  ClipperLib.JS.ScaleUpPaths(cPathA,scale);
  ClipperLib.JS.ScaleUpPaths(cPathB,scale);
  /*
  * AddPaths(路径，类型，是否闭合)
  * ClipperLib.PolyType.ptSubject  //主体
  * ClipperLib.PolyType.ptClip    //裁剪
  * */
  cpr.AddPaths(cPathA, ClipperLib.PolyType.ptSubject, true);  // true means closed path
  cpr.AddPaths(cPathB, ClipperLib.PolyType.ptClip, true);
  const solution_paths = new ClipperLib.Paths();

  /*
  * Execute(类型，路径，填充规则)
  * ClipperLib.ClipType.ctUnion 并集运算
  * solution_paths  存放合并后的路径
  * pftNonZero 填充规则
  * pftNonZero 代表非零环绕数填充规则，用于确定内部和外部区域。
  * pftEvenOdd 代表奇偶环绕数填充规则，用于确定内部和外部区域。
  * */
  cpr.Execute(ClipperLib.ClipType.ctDifference,solution_paths,ClipperLib.ClipType.pftNonZero, ClipperLib.ClipType.pftNonZero);
  //clipper数组转path路径
  console.log('chicken', solution_paths);
  const new_path = paths2string(solution_paths, scale);
  return new_path;
}

const canvasRef = ref(null);
function getNewPath() {
  const newPath = merge(pathA.value,pathB.value);
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', newPath);
  path.setAttribute('y', 100);
  canvasRef.value.appendChild(path);

}
</script>

