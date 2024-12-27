<template>
  <div><form action="">
    <input type="file"/>
  </form>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';

  const load = () => {};
  onMounted(() => {
    load();
  });
</script>
<style scoped></style>
