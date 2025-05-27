<template>
  <div>
    <h1>这是一个音域检测系统</h1>
    <div>当前频率：{{ curFrequent.toFixed(2) }} Hz</div>
    <div>当前音名：{{ curPitch }}</div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue'
import pitchDetect from "@/applications/baseApplication/views/pitchDetect/index.ts";

const curFrequent = ref<number>(0);
const curPitch = ref<string>('');

// 页面挂载时开始监听
onMounted(async () => {
  await pitchDetect.startDetect((DetectRes) => {
    curFrequent.value = DetectRes.frequency
    curPitch.value = DetectRes.pitch
  })
})

// 页面卸载时清理
onUnmounted(() => {
  pitchDetect.dispose()
})


</script>

<style scoped>
h1 {
  color: #409EFF;
}
</style>
