<template>
  <div class="pixel-editor">
    <header class="toolbar">
      <div class="toolbar-group">
        <el-button size="small" @click="newCanvas">新建</el-button>
        <el-button size="small" @click="importJson">导入 JSON</el-button>
        <el-button size="small" @click="exportJson">导出 JSON</el-button>
      </div>
      <div class="toolbar-group">
        <span class="label">宽</span>
        <el-input-number v-model="newWidth" :min="4" :max="128" size="small" controls-position="right" />
        <span class="label">高</span>
        <el-input-number v-model="newHeight" :min="4" :max="128" size="small" controls-position="right" />
        <el-button size="small" @click="resizeGrid">应用尺寸</el-button>
      </div>
      <div class="toolbar-group">
        <span class="label">颜色</span>
        <input v-model="hexColor" type="color" class="color-picker" />
        <el-input v-model="hexColor" size="small" class="hex-input" placeholder="#000000" />
      </div>
      <div class="toolbar-group">
        <el-button type="primary" size="small" @click="exportPng">导出 PNG</el-button>
        <el-button size="small" @click="exportSvgFile">导出 SVG 文件</el-button>
        <el-button size="small" @click="exportSvgDataUrl">导出 SVG data URL</el-button>
      </div>
    </header>

    <input ref="fileInputRef" type="file" accept=".json" style="display: none" @change="onFileSelect" />

    <div class="canvas-wrap">
      <div
        class="pixel-grid"
        :style="gridStyle"
        @mousedown="startDraw"
        @mousemove="draw"
        @mouseup="stopDraw"
        @mouseleave="stopDraw"
      >
        <div
          v-for="(row, y) in grid"
          :key="y"
          class="pixel-row"
        >
          <div
            v-for="(pixel, x) in row"
            :key="x"
            class="pixel"
            :style="pixelStyle(pixel)"
            @mousedown.prevent="setPixel(x, y)"
          />
        </div>
      </div>
    </div>

    <div v-if="exportDataUrl" class="export-preview">
      <div class="export-header">
        <span>导出预览（可复制下方 data URL 用于 img 标签）</span>
        <el-button size="small" text @click="copyDataUrl">复制</el-button>
      </div>
      <img :src="exportDataUrl" class="preview-img" alt="export" />
      <el-input
        v-model="exportDataUrl"
        type="textarea"
        :rows="3"
        readonly
        class="data-url-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { PixelArtData, PixelRGBA } from '../types'
import { createEmptyGrid, createEmptyPixel } from '../types'

const fileInputRef = ref<HTMLInputElement | null>(null)
const grid = ref<PixelRGBA[][]>(createEmptyGrid(16, 16))
const newWidth = ref(16)
const newHeight = ref(16)
const hexColor = ref('#000000')
const isDrawing = ref(false)
const exportDataUrl = ref('')

function hexToRgba(hex: string): PixelRGBA {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) return createEmptyPixel(0, 0, 0, 255)
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
    a: 255
  }
}

const gridStyle = computed(() => {
  const cellSize = Math.min(24, 400 / Math.max(grid.value[0]?.length ?? 1, grid.value.length))
  return { '--cell-size': `${cellSize}px` }
})

function pixelStyle(p: PixelRGBA) {
  return {
    backgroundColor: `rgba(${p.r},${p.g},${p.b},${p.a / 255})`
  }
}

function setPixel(x: number, y: number) {
  const row = grid.value[y]
  if (!row || row[x] === undefined) return
  grid.value = grid.value.map((r, yi) =>
    yi === y ? r.map((px, xi) => (xi === x ? hexToRgba(hexColor.value) : px)) : r
  )
}

function startDraw(e: MouseEvent) {
  if (e.button !== 0) return
  isDrawing.value = true
  const { x, y } = getCellFromEvent(e)
  if (x >= 0 && y >= 0) setPixel(x, y)
}

function draw(e: MouseEvent) {
  if (!isDrawing.value) return
  const { x, y } = getCellFromEvent(e)
  if (x >= 0 && y >= 0) setPixel(x, y)
}

function stopDraw() {
  isDrawing.value = false
}

function getCellFromEvent(e: MouseEvent): { x: number; y: number } {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const cellSize = parseFloat(getComputedStyle(target).getPropertyValue('--cell-size') || '24')
  const x = Math.floor((e.clientX - rect.left) / cellSize)
  const y = Math.floor((e.clientY - rect.top) / cellSize)
  return { x, y }
}

function newCanvas() {
  grid.value = createEmptyGrid(newWidth.value, newHeight.value)
}

function resizeGrid() {
  const w = newWidth.value
  const h = newHeight.value
  const old = grid.value
  const newGrid = createEmptyGrid(w, h)
  for (let y = 0; y < Math.min(h, old.length); y++) {
    for (let x = 0; x < Math.min(w, old[y]?.length ?? 0); x++) {
      newGrid[y][x] = { ...old[y][x] }
    }
  }
  grid.value = newGrid
}

function toPixelArtData(): PixelArtData {
  return {
    width: grid.value[0]?.length ?? 0,
    height: grid.value.length,
    content: grid.value.map(row => row.map(p => ({ ...p })))
  }
}

function importJson() {
  fileInputRef.value?.click()
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result as string) as PixelArtData
      if (!data.content || !Array.isArray(data.content)) throw new Error('Invalid format')
      grid.value = data.content.map(row =>
        row.map(p => ({
          r: Math.max(0, Math.min(255, p.r ?? 0)),
          g: Math.max(0, Math.min(255, p.g ?? 0)),
          b: Math.max(0, Math.min(255, p.b ?? 0)),
          a: Math.max(0, Math.min(255, p.a ?? 255))
        }))
      )
      newWidth.value = grid.value[0]?.length ?? 16
      newHeight.value = grid.value.length
      ElMessage.success('导入成功')
    } catch {
      ElMessage.error('JSON 格式无效')
    }
  }
  reader.readAsText(file)
  input.value = ''
}

function exportJson() {
  const data = toPixelArtData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pixel-art-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 JSON')
}

function canvasToDataUrl(): string {
  const data = grid.value
  const w = data[0]?.length ?? 0
  const h = data.length
  if (w === 0 || h === 0) return ''

  const scale = Math.max(1, Math.min(32, Math.floor(512 / Math.max(w, h))))
  const cw = w * scale
  const ch = h * scale

  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d')!
  const imgData = ctx.createImageData(cw, ch)

  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const py = Math.floor(y / scale)
      const px = Math.floor(x / scale)
      const p = data[py]?.[px] ?? createEmptyPixel()
      const i = (y * cw + x) * 4
      imgData.data[i] = p.r
      imgData.data[i + 1] = p.g
      imgData.data[i + 2] = p.b
      imgData.data[i + 3] = p.a
    }
  }
  ctx.putImageData(imgData, 0, 0)
  return canvas.toDataURL('image/png')
}

function exportPng() {
  exportDataUrl.value = canvasToDataUrl()
  if (exportDataUrl.value) ElMessage.success('已生成 PNG，可复制 data URL')
}

function buildSvgString(): string {
  const data = grid.value
  const w = data[0]?.length ?? 0
  const h = data.length
  if (w === 0 || h === 0) return ''
  const scale = 1
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w * scale}" height="${h * scale}">`
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = data[y][x]
      svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgba(${p.r},${p.g},${p.b},${p.a / 255})"/>`
    }
  }
  svg += '</svg>'
  return svg
}

function exportSvgFile() {
  const svg = buildSvgString()
  if (!svg) return
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pixel-art.svg'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已下载 SVG 文件')
}

function exportSvgDataUrl() {
  const svg = buildSvgString()
  if (!svg) return
  const base64 = btoa(unescape(encodeURIComponent(svg)))
  exportDataUrl.value = `data:image/svg+xml;base64,${base64}`
  ElMessage.success('已生成 SVG data URL，可复制')
}

function copyDataUrl() {
  if (!exportDataUrl.value) return
  navigator.clipboard.writeText(exportDataUrl.value).then(() => {
    ElMessage.success('已复制到剪贴板')
  })
}
</script>

<style scoped>
.pixel-editor {
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 12px;
  color: #606266;
}

.color-picker {
  width: 32px;
  height: 28px;
  padding: 2px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}

.hex-input {
  width: 90px;
}

.canvas-wrap {
  display: flex;
  justify-content: center;
  padding: 16px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: auto;
}

.pixel-grid {
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0 0 0 1px #dcdfe6;
  user-select: none;
}

.pixel-row {
  display: flex;
}

.pixel {
  width: var(--cell-size, 24px);
  height: var(--cell-size, 24px);
  box-sizing: border-box;
  cursor: crosshair;
}

.pixel:hover {
  outline: 1px solid rgba(64, 158, 255, 0.6);
}

.export-preview {
  margin-top: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: #606266;
}

.preview-img {
  display: block;
  max-width: 200px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  margin-bottom: 12px;
}

.data-url-input {
  font-family: monospace;
  font-size: 11px;
}
</style>
