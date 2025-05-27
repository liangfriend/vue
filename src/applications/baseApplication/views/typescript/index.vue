<template>
  typescript

  泛型函数
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {Person} from "@/applications/baseApplication/views/typescript/types.ts";




onMounted(() => {
  const person: Person = {
    name: 'asd',
    age: 258
  }
  console.log(person)
})


</script>
<style scoped>

</style>