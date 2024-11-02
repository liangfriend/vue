<template>
  <div class="root"> </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    domTree: {
      type: Object as () => Record<string, any>
    }
  });
  const load = () => {};
  onMounted(() => {
    load();
  });
</script>
<style scoped></style>
