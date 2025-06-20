<template>
  <div class="volta" :style="voltaStyle">
    <div>1,2,3</div>
  </div>
</template>
<script setup lang="ts">
import {computed, CSSProperties} from "vue";

const props = defineProps({
  width: {
    default: 60,
    required: true
  }
})
const voltaStyle = computed(() => {
  const style: CSSProperties = {
    width: props.width + 'px'
  }
  return style
})
</script>


<style scoped>
.volta {
  height: 40px;
}
</style>