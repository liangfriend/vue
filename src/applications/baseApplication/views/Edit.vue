<template>
  <div class="container">
    <div class="header">
      <div class="sizeInput">
        <el-input v-model="sceneWidth"></el-input>
        <el-input v-model="sceneHeight"></el-input>
      </div>
    </div>
    <div class="dom-tree">
      <treeView></treeView>
    </div>
    <div class="table">
      <div ref="scene" class="scene" :style="sceneStyle"></div>
    </div>
    <div class="attributes"></div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, computed } from 'vue';
  import mockData from './mock.json';
  import { loader } from './renderer';
  import treeView from './components/treeView.vue';

  const sceneWidth = ref(500);
  const sceneHeight = ref(300);
  const scene = ref(null);
  const domTree = ref(mockData);
  const sceneStyle = computed(() => {
    return {
      width: sceneWidth.value + 'px',
      height: sceneHeight.value + 'px',
      backgroundColor: 'red',
      outline: '1px solid'
    };
  });
  const load = () => {
    const data: any = domTree.value;
    const dom = scene.value;
    loader(dom, data);
  };
  onMounted(() => {
    load();
  });
</script>
<style scoped>
  * {
    outline: 1px solid;
  }
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 1fr 5fr 1fr;
  }
  .header {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .dom-tree {
    grid-column: 1/2;
    grid-row: 2/3;
  }
  .table {
    grid-column: 2/3;
    grid-row: 2/3;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .attributes {
    grid-column: 3/4;
    grid-row: 2/3;
  }
  .sizeInput {
    width: 220px;
    display: flex;
    justify-content: space-between;
    outline: 1px solid;
  }
  .sizeInput > .el-input {
    width: 100px;
  }
</style>
