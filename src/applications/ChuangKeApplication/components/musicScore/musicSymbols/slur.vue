<template>
  <div class="slur" :style="slurStyle">
  </div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import type {Slur, SpanSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {SpanSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const props = defineProps({
  slur: {
    type: Object as PropType<Slur>,
    required: true
  }
})
const slurStyle = computed(() => {

  const style: CSSProperties = {
    width: 0,
    left: 0,
    bottom: 0,
  }

  if (props.slur.rect.width == null || props.slur.rect.left == null || props.slur.rect.bottom == null) {
    console.error("spanSymbol没有生成rect数据", props.slur.rect)
    return style
  }
  style.width = props.slur.rect.width + 'px'
  style.left = props.slur.rect.left + 'px'
  style.bottom = props.slur.rect.bottom + 'px'
  style.borderColor = props.slur.options.highlight
      ? props.slur.options.highlightColor : props.slur.options.color

  return style
})
</script>


<style scoped>
.slur {
  height: 40px;
  position: absolute;
  border-left: 1px solid black;
  border-top: 1px solid black;
  pointer-events: auto;
  user-select: none;

  > * {
    pointer-events: none;
  }
}
</style>