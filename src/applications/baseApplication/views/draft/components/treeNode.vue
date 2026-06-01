<!-- TreeNode.vue -->
<script setup lang="ts">
import {computed} from 'vue'

type NodeType = {
  id: number
  value: number
  children?: NodeType[]
}

const props = defineProps<{
  node: NodeType
}>()

const color = computed(() => {
  const hue =
      props.node.value % 360

  return `hsl(${hue}, 80%, 55%)`
})
</script>

<template>
  <div class="wrapper">
    <div
        class="box"
        :style="{
        background: color
      }"
    >
      {{ node.value.toFixed(0) }}
    </div>

    <div
        class="children"
        v-if="node.children"
    >
      <TreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.children {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-left: 6px;
}

.box {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  font-weight: bold;

  color: white;

  border-radius: 4px;

  transition: background 0.05s linear,
  transform 0.05s linear;

  will-change: background,
  transform;
}
</style>