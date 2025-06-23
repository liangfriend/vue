<template>
  <div class="volta" :style="voltaStyle">
    <div>1,2,3</div>
  </div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import type {SpanSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {SpanSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const props = defineProps({
  spanSymbol: {
    type: Object as PropType<Extract<SpanSymbol, { type: SpanSymbolTypeEnum.volta }>>,
    required: true
  }
})
const voltaStyle = computed(() => {

  const style: CSSProperties = {
    width: 0,
    left: 0,
    bottom: 0,
  }

  if (props.spanSymbol.rect.width == null || props.spanSymbol.rect.left == null || props.spanSymbol.rect.bottom == null) {
    console.error("spanSymbol没有生成rect数据", props.spanSymbol.rect)
    return style
  }
  style.width = props.spanSymbol.rect.width + 'px'
  style.left = props.spanSymbol.rect.left + 'px'
  style.bottom = props.spanSymbol.rect.bottom + 'px'

  return style
})
</script>


<style scoped>
.volta {
  height: 40px;
  position: absolute;
  border-left: 1px solid black;
  border-top: 1px solid black;
}
</style>