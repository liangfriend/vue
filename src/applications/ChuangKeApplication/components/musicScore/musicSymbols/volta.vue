<template>
  <div class="volta" :style="voltaStyle">
    <div>1,2,3</div>
  </div>
</template>
<script setup lang="ts">
import {computed, CSSProperties, PropType} from "vue";
import {SpanSymbol, Volta} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {SpanSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const props = defineProps({
  volta: {
    type: Object as PropType<Volta>,
    required: true
  }
})
const voltaStyle = computed(() => {

  const style: CSSProperties = {
    width: 0,
    left: 0,
    bottom: 0,
  }

  if (props.volta.rect.width == null || props.volta.rect.left == null || props.volta.rect.bottom == null) {
    console.error("volta没有生成rect数据", props.volta.rect)
    return style
  }
  style.width = props.volta.rect.width + 'px'
  style.left = '0px'
  style.bottom = '0px'
  style.borderColor = props.volta.options.highlight
      ? props.volta.options.highlightColor : props.volta.options.color

  return style
})
</script>


<style scoped>
.volta {
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