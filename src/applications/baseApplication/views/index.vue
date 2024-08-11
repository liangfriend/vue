<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Asider></Asider>
      </el-aside>
      <el-main
        >dfsa
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
  import { RouterView } from "vue-router";
  import Asider from "./Asider.vue";
</script>
<style scoped>
  .el-container {
    height: 100vh;
  }
</style>
