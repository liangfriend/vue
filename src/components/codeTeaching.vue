<template>
  <div class="container">
    <div v-html="description"></div>
    <input type="textarea" v-model="code"/>
    <button>执行</button>
    <input type="textarea" v-model="result"/>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['description', 'code'])
const result = ref('')
</script>
<style scoped>
.container {
  display: grid;
}
</style>