<template>
  <div>
    <button @click="startRecording" :disabled="isRecording">开始录音</button>
    <button @click="stopRecording" :disabled="!isRecording">停止录音</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
    <button v-if="audioUrl" @click="downloadRecording">下载录音</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

const builderJson = {
  all: 360,
  charts: {
    创作备课: 186,
    授课学习: 360,
    鉴赏拓展: 26,
    钢琴演奏: 146,
    动感乐器: 222,
    管理任务: 47,
    悬浮球: 33
  },
  components: {
    创作备课: 29,
    授课学习: 54,
    鉴赏拓展: 6,
    钢琴演奏: 15,
    动感乐器: 17,
    管理任务: 8,
    悬浮球: 12
  },
  ie: 60
};
const downloadJson = {
  创作备课: 186,
  授课学习: 360,
  鉴赏拓展: 26,
  钢琴演奏: 146,
  动感乐器: 222,
  管理任务: 47,
  悬浮球: 33
};
const themeJson = {
  创作备课: 29,
  授课学习: 54,
  鉴赏拓展: 6,
  钢琴演奏: 15,
  动感乐器: 17,
  管理任务: 8,
  悬浮球: 12
};
const waterMarkText = 'ECHARTS';
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = 100;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.globalAlpha = 0.08;
ctx.font = '20px Microsoft Yahei';
ctx.translate(50, 50);
ctx.rotate(-Math.PI / 4);
ctx.fillText(waterMarkText, 0, 0);
option = {
  backgroundColor: {
    type: 'pattern',
    image: canvas,
    repeat: 'repeat'
  },
  tooltip: {},
  title: [
    {
      text: '全部BUG',
      subtext: '总计 ' + builderJson.all,
      left: '25%',
      textAlign: 'center'
    },
    {
      text: '由我处理',
      subtext: '总计 ' + builderJson.all,
      left: '25%',
      top: '50%',
      textAlign: 'center'
    },
    {
      text: '全部BUG分布',
      subtext:
          '总计 ' +
          Object.keys(downloadJson).reduce(function (all, key) {
            return all + downloadJson[key];
          }, 0),
      left: '75%',
      textAlign: 'center'
    },
    {
      text: '由我处理BUG分布',
      subtext:
          '总计 ' +
          Object.keys(themeJson).reduce(function (all, key) {
            return all + themeJson[key];
          }, 0),
      left: '75%',
      top: '50%',
      textAlign: 'center'
    }
  ],
  grid: [
    {
      top: 50,
      width: '50%',
      bottom: '52%',
      left: 10,
      containLabel: true
    },
    {
      top: '57%',
      width: '50%',
      bottom: 0,
      left: 10,
      containLabel: true
    }
  ],
  xAxis: [
    {
      type: 'value',
      max: builderJson.all,
      splitLine: {
        show: false
      }
    },
    {
      type: 'value',
      max: builderJson.all,
      gridIndex: 1,
      splitLine: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: Object.keys(builderJson.charts),
      axisLabel: {
        interval: 0,
        rotate: 30
      },
      splitLine: {
        show: false
      }
    },
    {
      gridIndex: 1,
      type: 'category',
      data: Object.keys(builderJson.components),
      axisLabel: {
        interval: 0,
        rotate: 30
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      type: 'bar',
      stack: 'chart',
      z: 3,
      label: {
        position: 'right',
        show: true
      },
      data: Object.keys(builderJson.charts).map(function (key) {
        return builderJson.charts[key];
      })
    },
    {
      type: 'bar',
      stack: 'chart',
      silent: true,
      itemStyle: {
        color: '#eee'
      },
      data: Object.keys(builderJson.charts).map(function (key) {
        return builderJson.all - builderJson.charts[key];
      })
    },
    {
      type: 'bar',
      stack: 'component',
      xAxisIndex: 1,
      yAxisIndex: 1,
      z: 3,
      label: {
        position: 'right',
        show: true
      },
      data: Object.keys(builderJson.components).map(function (key) {
        return builderJson.components[key];
      })
    },
    {
      type: 'bar',
      stack: 'component',
      silent: true,
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: '#eee'
      },
      data: Object.keys(builderJson.components).map(function (key) {
        return builderJson.all - builderJson.components[key];
      })
    },
    {
      type: 'pie',
      radius: [0, '30%'],
      center: ['75%', '25%'],
      data: Object.keys(downloadJson).map(function (key) {
        return {
          name: key.replace('.js', ''),
          value: downloadJson[key]
        };
      })
    },
    {
      type: 'pie',
      radius: [0, '30%'],
      center: ['75%', '75%'],
      data: Object.keys(themeJson).map(function (key) {
        return {
          name: key.replace('.js', ''),
          value: themeJson[key]
        };
      })
    }
  ]
};

option && myChart.setOption(option);



</script>

<style scoped>
button {
  margin: 5px;
}
</style>
