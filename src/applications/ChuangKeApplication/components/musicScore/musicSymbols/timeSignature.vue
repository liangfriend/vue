

<template>
  <div class="timeSignature" v-if="msSymbol && msSymbol.type === MsSymbolTypeEnum.timeSignature"
       :style="timeSignatureStyle">
    <div>{{ msSymbol.timeSignature.beat }}</div>
    <div>{{ msSymbol.timeSignature.chronaxie }}</div>
  </div>
</template>
<script setup lang="ts">
import {computed, PropType} from "vue";
import {MsSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {MsSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
})

const timeSignatureStyle = computed(() => {
  return {
    fontSize: props.measureHeight / 3 + 'px',
  }
})
</script>
<style scoped>
.timeSignature {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
}
</style>