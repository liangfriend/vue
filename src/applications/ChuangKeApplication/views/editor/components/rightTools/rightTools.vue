<script setup lang="ts">
import {ref} from "vue";

const active = ref('function')

const emits = defineEmits<{
  (e: 'clickBtn', item: FunctionListItem): void
}>()

function handleClick(item: FunctionListItem) {
  emits('clickBtn', item)
}


const functionList = ref<Array<FunctionListItem>>([{
  name: "向前插入小节",
  key: RightToolsBtnEnum.insertMeasureBefore
}, {
  name: "向后插入小节",
  key: RightToolsBtnEnum.insertMeasureAfter
}])
</script>

<template>
  <div class="toolBox">
    <el-tabs class="tabs" v-model="active" type="border-card">
      <el-tab-pane label="功能" name="function">
        <el-button @click="" v-for="(item) in functionList">
          {{ item.name }}
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="属性" name="properties">
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<style scoped>
.toolBox {
  width: 300px;
  height: 100%;
  border-left: 1px solid black;
}

.tabs {
  height: 100%;
}
</style>