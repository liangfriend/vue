<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Asider :route="route"></Asider>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router';
import Asider from '@/components/Asider.vue';
import route from '../.router.ts';
</script>
<style scoped>
.el-container {
  height: 100vh;
}
</style>
