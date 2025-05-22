<template>
  typescript
</template>
<script setup lang="ts">
import {onMounted} from "vue";


function test() {
  const a = Color.Red
  const b = Color.Blue
  console.log('chicken', a === b)
}

onMounted(() => {
  test()
})


</script>
<style scoped>

</style>