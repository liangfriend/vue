<template>
  <div class="container">
    <div class="description" v-html="description"></div>
    <textarea class="code" :rows="rows" v-model="code"/>
    <div class="operation">
      <button @click="runCode" style="resize:none">执行</button>
    </div>
    <textarea class="result" style="resize:none" :rows="rows" v-model="result"/>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  description: {
    type: String,
    default: "代码教学"
  },
  code: {
    type: String,
    default: 'console.log("asd")',
  },
  mode: {
    type: String,
    default: "function",   // function eval
  }

})
const emit = defineEmits(["update:code"])
const rows = ref(10)
const code = computed({
  get: () => props.code,
  set: (val: string) => {
    emit('update:code', val)
  }
})

const result = ref('')

function runCode() {
  if (props.mode === 'function') {
    result.value = new Function(code.value)()

  } else if (props.mode === 'eval') {
    result.value = eval(code.value)
  } else {
    result.value = '请传入正确的mode'
  }
}

function mounted() {
  runCode()
}

onMounted(mounted)
</script>
<style scoped lang="scss">
.container {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 100px 1fr;
}

.description {
  grid-column: 1 / span 3;
}

.operation {
  > button {
    width: 100px;
    height: 40px;
  }
}
</style>