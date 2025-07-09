<template>
  <div></div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const option = ref({
  series: [{data: []}],
});

function test(op) {
  op.value.series[0].data = [{value: 0}];
  console.log('打印 Proxy 整体对象（未触发 getter）:', op.value);
}

onMounted(() => {
  test(option);
});
</script>
