<script setup lang="ts">
import Volta from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/volta.vue";
import {PropType} from "vue";
import {SpanSymbol} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {SpanSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const props = defineProps({
  spanSymbol: {
    type: Object as PropType<SpanSymbol>,
    required: true
  }
})
</script>

<template>
  <volta v-if="spanSymbol.type === SpanSymbolTypeEnum.volta" :spanSymbol="spanSymbol"></volta>
</template>

<style scoped>

</style>