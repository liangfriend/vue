<template>
  <canvas
    ref="canvasRef"
    :style="canvasStyle"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { PixelArtData } from '@/applications/pixelCreatorApplicaton/types'

const props = withDefaults(
  defineProps<{
    data: PixelArtData | null
    scale?: number
  }>(),
  { scale: 1 }
)

const canvasRef = ref<HTMLCanvasElement | null>(null)

const canvasStyle = computed(() => {
  const d = props.data
  if (!d) return { display: 'none' }
  const s = Math.max(1, Math.floor(props.scale))
  return {
    width: `${d.width * s}px`,
    height: `${d.height * s}px`,
    imageRendering: 'pixelated' as const,
    display: 'block',
  }
})

function render() {
  const d = props.data
  const c = canvasRef.value
  if (!d?.content?.length || !c) return

  const w = d.width
  const h = d.height

  if (c.width !== w || c.height !== h) {
    c.width = w
    c.height = h
  }

  const ctx = c.getContext('2d')
  if (!ctx) return

  const imgData = ctx.createImageData(w, h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = d.content[y]?.[x] ?? { r: 0, g: 0, b: 0, a: 0 }
      const i = (y * w + x) * 4
      imgData.data[i] = p.r
      imgData.data[i + 1] = p.g
      imgData.data[i + 2] = p.b
      imgData.data[i + 3] = p.a
    }
  }
  ctx.putImageData(imgData, 0, 0)
}

watch(() => [props.data, props.scale], render, { deep: true })
onMounted(render)
</script>

<style scoped>
canvas {
  display: block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
