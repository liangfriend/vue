<template>
  <div class="room-editor">
    <div class="editor-layout">
      <div class="left-panel">
        <el-card class="panel-card" header="布局编辑">
          <el-form label-position="top">
            <el-form-item label="每米像素">
              <el-input-number v-model="pixelsPerMeter" :min="4" :max="32" :step="2" />
            </el-form-item>
            <el-form-item label="布局精灵图 (b=后墙 f=前墙 l=左墙 r=右墙 d=地板 .=空)">
              <el-input
                v-model="layoutText"
                type="textarea"
                :rows="10"
                placeholder="输入布局，例如：&#10;.bbbb.&#10;lddddr&#10;.ffff."
                class="layout-textarea"
              />
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="panel-card materials-card" header="材质库">
          <div class="material-list">
            <div
              v-for="(mat, idx) in materials"
              :key="idx"
              class="material-item"
              :class="{ active: selectedMaterialIdx === idx }"
              @click="selectedMaterialIdx = idx"
            >
              <div class="material-preview" :style="{ background: mat.color }" />
              <span class="material-name">{{ mat.name }}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="preview-area" ref="previewRef" @mousedown="onPreviewMouseDown" @wheel.prevent="onWheel" @contextmenu.prevent>
        <div
          class="room-3d"
          :style="roomStyle"
          @mousedown="onRoomMouseDown"
          @mouseover="onRoomMouseOver"
          @mouseout="onRoomMouseOut"
        >
          <template v-for="(row, ri) in layoutGrid" :key="ri">
            <template v-for="(cell, ci) in row" :key="`${ri}-${ci}`">
              <div
                v-if="cell !== '.'"
                class="tile"
                :class="[`tile-${cell}`, { hovered: hoverCell && hoverCell[0] === ri && hoverCell[1] === ci }]"
                :style="getTileStyle(cell, ri, ci)"
                :data-row="ri"
                :data-col="ci"
              />
            </template>
          </template>
        </div>
        <div class="view-hint">中键拖拽 旋转 | 滚轮 缩放</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { parseLayoutString } from '../utils';
import { DEFAULT_COLORS } from '../types';
import { DEFAULT_LAYOUT } from '../constants';

const pixelsPerMeter = ref(10);
const layoutText = ref(DEFAULT_LAYOUT);
const selectedMaterialIdx = ref(0);
const hoverCell = ref<[number, number] | null>(null);
const isPainting = ref(false);
/** 每个格子的材质索引 row-col -> idx */
const cellMaterials = ref<Record<string, number>>({});
const previewRef = ref<HTMLElement | null>(null);
const previewSize = ref({ w: 800, h: 600 });

const materials = ref([
  { name: '默认墙', color: '#9b59b6', texture: '' },
  { name: '默认地板', color: '#3498db', texture: '' },
  { name: '木质', color: '#8b4513', texture: '' },
  { name: '石材', color: '#7f8c8d', texture: '' }
]);

const layoutGrid = computed(() => parseLayoutString(layoutText.value));

const roomRotateX = ref(50);
const roomRotateZ = ref(45);
const zoomScale = ref(1);
const isDragging = ref(false);
const lastMouse = ref({ x: 0, y: 0 });

const roomCols = computed(() =>
  layoutGrid.value[0]?.length || 0
);
const roomRows = computed(() => layoutGrid.value.length || 0);

const baseScale = computed(() => {
  const cols = roomCols.value;
  const rows = roomRows.value;
  if (!cols || !rows) return 4;
  const size = pixelsPerMeter.value;
  const rw = cols * size;
  const rh = rows * size;
  const s = Math.min(
    previewSize.value.w / rw,
    previewSize.value.h / rh,
    12
  ) * 0.85;
  return Math.max(2, s);
});

const displayScale = computed(() => baseScale.value * zoomScale.value);

const roomStyle = computed(() => {
  const cols = roomCols.value;
  const rows = roomRows.value;
  const size = pixelsPerMeter.value;
  const w = cols * size;
  const h = rows * size;
  const s = displayScale.value;
  return {
    transform: `translate(-50%, -50%) scale(${s}) rotateX(${roomRotateX.value}deg) rotateZ(${roomRotateZ.value}deg)`,
    width: w,
    height: h,
    left: '50%',
    top: '50%'
  };
});

function getTileStyle(cell: string, row: number, col: number) {
  const size = pixelsPerMeter.value;
  const key = `${row}-${col}`;
  const matIdx = cellMaterials.value[key];
  const mat = matIdx !== undefined ? materials.value[matIdx] : null;
  const color = mat?.color ?? DEFAULT_COLORS[cell as keyof typeof DEFAULT_COLORS] ?? '#888';

  let x = col * size;
  let y = row * size;
  let rotate = '';

  switch (cell) {
    case 'b':
      y = row * size;
      rotate = 'rotateX(-90deg)';
      break;
    case 'f':
      y = row * size;
      rotate = 'rotateX(90deg)';
      break;
    case 'l':
      x = col * size;
      rotate = 'rotateY(90deg)';
      break;
    case 'r':
      x = col * size;
      rotate = 'rotateY(-90deg)';
      break;
  }

  const originMap: Record<string, string> = {
    b: 'bottom center',
    f: 'top center',
    l: 'right center',
    r: 'left center'
  };

  const transform = rotate
    ? `translate3d(${x}px, ${y}px, 0) ${rotate}`
    : `translate3d(${x}px, ${y}px, 0)`;

  const base: Record<string, string | number> = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    backgroundColor: color,
    position: 'absolute',
    left: 0,
    top: 0,
    transform,
    transformOrigin: originMap[cell] ?? 'center center'
  };
  return base;
}

function applyMaterialToTile(row: number, col: number) {
  const key = `${row}-${col}`;
  cellMaterials.value[key] = selectedMaterialIdx.value;
}

function getTileFromEvent(e: MouseEvent): [number, number] | null {
  const target = (e.target as HTMLElement).closest('.tile');
  if (!target) return null;
  const row = Number(target.getAttribute('data-row'));
  const col = Number(target.getAttribute('data-col'));
  return [row, col];
}

function onRoomMouseDown(e: MouseEvent) {
  if (e.button === 0) {
    const pos = getTileFromEvent(e);
    if (pos) {
      applyMaterialToTile(pos[0], pos[1]);
      isPainting.value = true;
      document.addEventListener('mousemove', onPaintMove, true);
      document.addEventListener('mouseup', onPaintUp, true);
    }
  }
}

function onPaintMove(e: MouseEvent) {
  if (!isPainting.value) return;
  const pos = getTileFromEvent(e);
  if (pos) applyMaterialToTile(pos[0], pos[1]);
}

function onPaintUp() {
  isPainting.value = false;
  document.removeEventListener('mousemove', onPaintMove, true);
  document.removeEventListener('mouseup', onPaintUp, true);
}

function onRoomMouseOver(e: MouseEvent) {
  const pos = getTileFromEvent(e);
  hoverCell.value = pos;
}

function onRoomMouseOut(e: MouseEvent) {
  const next = (e.relatedTarget as HTMLElement)?.closest('.tile');
  if (!next) {
    hoverCell.value = null;
    return;
  }
  const r = next.getAttribute('data-row');
  const c = next.getAttribute('data-col');
  hoverCell.value = r != null && c != null ? [Number(r), Number(c)] : null;
}

function onPreviewMouseDown(e: MouseEvent) {
  if (e.button === 1) {
    e.preventDefault();
    isDragging.value = true;
    lastMouse.value = { x: e.clientX, y: e.clientY };
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
  }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  const dx = e.clientX - lastMouse.value.x;
  const dy = e.clientY - lastMouse.value.y;
  lastMouse.value = { x: e.clientX, y: e.clientY };
  roomRotateZ.value += dx * 0.5;
  roomRotateX.value = Math.max(10, Math.min(80, roomRotateX.value - dy * 0.3));
}

function onMouseUp() {
  if (isDragging.value) {
    isDragging.value = false;
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('mouseup', onMouseUp, true);
  }
}

function resetDragStates() {
  if (isPainting.value) onPaintUp();
  if (isDragging.value) onMouseUp();
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  zoomScale.value = Math.max(0.3, Math.min(5, zoomScale.value + delta));
}

onMounted(() => {
  const el = previewRef.value;
  if (el) {
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? {};
      if (width && height) previewSize.value = { w: width, h: height };
    });
    ro.observe(el);
    previewSize.value = { w: el.clientWidth, h: el.clientHeight };
  }
  window.addEventListener('blur', resetDragStates);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove, true);
  document.removeEventListener('mouseup', onMouseUp, true);
  document.removeEventListener('mousemove', onPaintMove, true);
  document.removeEventListener('mouseup', onPaintUp, true);
  window.removeEventListener('blur', resetDragStates);
});
</script>

<style scoped lang="scss">
.room-editor {
  height: 100vh;
  overflow: hidden;
}
.editor-layout {
  display: flex;
  height: 100%;
}
.left-panel {
  width: 320px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.panel-card {
  flex-shrink: 0;
}
.materials-card {
  flex: 1;
  min-height: 120px;
}
.material-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.material-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  &.active {
    border-color: #409eff;
  }
}
.material-preview {
  width: 48px;
  height: 48px;
  border-radius: 4px;
}
.material-name {
  font-size: 12px;
}
.layout-textarea {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}
.preview-area {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
  cursor: grab;
  perspective: 1200px;
  &:active {
    cursor: grabbing;
  }
}
.room-3d {
  position: absolute;
  transform-origin: center center;
  transform-style: preserve-3d;
  overflow: visible;
}
.tile {
  position: absolute;
  transform-style: preserve-3d;
  box-sizing: border-box;
  cursor: pointer;
  &.hovered {
    outline: 2px solid #409eff;
    outline-offset: 2px;
    z-index: 10;
  }
}
.view-hint {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.5);
  font-size: 12px;
}
</style>
