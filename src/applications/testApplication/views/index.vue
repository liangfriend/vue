<template>
  <div class="la-container">
    <svg class="la-svg" ref="svg" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>
</template>
<script lang="ts" setup>
  import { Ref, ref, onMounted } from 'vue';

  //dom
  const svg = ref();
  //
  const NodeType: laNodeType = {
    ROOT: 1,
    NORMAL: 2,
    END: 3
  };
  const end: Ref<laNode> = ref({
    type: NodeType.END
  });
  const root: Ref<laNode> = ref({
    type: NodeType.ROOT,
    next: end
  });

  //节点插入方法
  function insert(parent: laNode, target: laNode) {
    if (parent.type === NodeType.NORMAL) {
      parent.next = target;
    }
  }
  //初始化
  function init() {
    //初始化svg宽高
    svg.value.style.width = '200';
    svg.value.style.height = '400';
  }
  //核心渲染函数
  function render() {
    //
  }
  onMounted(() => {
    init();
    const node: laNode = {
      type: NodeType.NORMAL,
      next: null,
      data: { text: '开始处' }
    };
    insert(root.value, node);
  });
</script>
<style>
  .la-container {
    min-width: 100%;
    height: 100%;
  }
  .la-svg {
    /* 如果不使用这个block布局，会与外层div出现4px的间隙 */
    display: block;
  }
</style>
