<template>
  <h1>typescript</h1>
  <div v-for="item in teachingList">
    <code-teaching v-if="item.type === 'codeTeaching'" v-model:code="item.code"></code-teaching>

  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import CodeTeaching from "@/components/codeTeaching.vue";


function test() {

}
const teachingList = ref([{
  type: 'codeTeaching',
  code: 'return "helloworld"',
}])
onMounted(() => {
  test()
})


</script>
<style scoped>

</style>