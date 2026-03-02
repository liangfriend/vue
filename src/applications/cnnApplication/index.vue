<template>
  <div class="cnn-app">
    <div class="nav-tabs">
      <router-link to="/cnn/mlp" active-class="active">MLP 全连接</router-link>
      <router-link to="/cnn/demo" active-class="active">CNN 示例</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-tabs {
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  border-bottom: 1px solid #ebeef5;
}
.nav-tabs a {
  color: #606266;
  text-decoration: none;
}
.nav-tabs a.active {
  color: #409eff;
  font-weight: 600;
}
</style>
