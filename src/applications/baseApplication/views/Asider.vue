<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
  >
    <el-menu-item title="通用产品组装关系"> 通用产品组装关系 </el-menu-item>
    <el-menu-item title="定制产品"> 定制产品 </el-menu-item>
    <el-menu-item title="产品发布"> 产品发布 </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <span>授权管理</span>
      </template>
      <el-menu-item title="授权协议"> 授权协议 </el-menu-item>
      <el-menu-item title="客户单位"> 客户单位 </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts"></script>
<style scoped>
.el-menu {
  height: 100%;
}
</style>
