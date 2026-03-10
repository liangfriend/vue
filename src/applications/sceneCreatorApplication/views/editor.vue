<script setup lang="ts">
import {ref, computed, CSSProperties} from 'vue'
import type {Block, Floor, Scene} from '@/applications/sceneCreatorApplication/types'
import {DefaultColor} from '@/applications/sceneCreatorApplication/constant'
import BlockGridEditor from '@/applications/sceneCreatorApplication/components/BlockGridEditor.vue'

const unit = 10

function createDefaultBlock(type: Block['type']): Block {
  return {type, texture: '', anchor: false}
}

function createDefaultFloor(): Floor {
  return {
    floor: [
      [createDefaultBlock('blank'), createDefaultBlock('blank'), createDefaultBlock('blank')],
      [createDefaultBlock('blank'), createDefaultBlock('floor'), createDefaultBlock('floor'), createDefaultBlock('blank'), createDefaultBlock('blank')],
      [createDefaultBlock('blank'), createDefaultBlock('floor'), createDefaultBlock('blank')]
    ],
    wall: [
      [createDefaultBlock('blank'), createDefaultBlock('b-wall'), createDefaultBlock('blank'), createDefaultBlock('blank'), createDefaultBlock('blank')],
      [createDefaultBlock('l-wall'), createDefaultBlock('blank'), createDefaultBlock('blank'), createDefaultBlock('r-wall'), createDefaultBlock('blank')],
      [createDefaultBlock('blank'), createDefaultBlock('f-wall'), createDefaultBlock('blank'), createDefaultBlock('blank'), createDefaultBlock('blank')]
    ],
    height: unit
  }
}

const scene = ref<Scene>({
  floor: [createDefaultFloor()],
  unit
})

const selectedFloorIndex = ref(0)

const currentFloor = computed(() => scene.value.floor[selectedFloorIndex.value] ?? scene.value.floor[0])

const floorRows = computed(() => currentFloor.value?.floor.length ?? 0)
const floorCols = computed(() => currentFloor.value?.floor[0]?.length ?? 0)
const wallRows = computed(() => currentFloor.value?.wall.length ?? 0)
const wallCols = computed(() => currentFloor.value?.wall[0]?.length ?? 0)
const rows = computed(() => Math.max(floorRows.value, wallRows.value))
const cols = computed(() => Math.max(floorCols.value, wallCols.value))

function addFloor() {
  scene.value.floor.push(createDefaultFloor())
  selectedFloorIndex.value = scene.value.floor.length - 1
}

function selectFloor(index: number) {
  if (index >= 0 && index < scene.value.floor.length) {
    selectedFloorIndex.value = index
  }
}

function ensureGridSize(grid: Block[][], rows: number, cols: number, defaultBlock: () => Block): Block[][] {
  const next: Block[][] = []
  for (let r = 0; r < rows; r++) {
    const srcRow = grid[r]
    const row: Block[] = []
    for (let c = 0; c < cols; c++) {
      row.push(srcRow?.[c] ? {...srcRow[c]} : defaultBlock())
    }
    next.push(row)
  }
  return next
}

function onBlockGridUpdate(layer: 'floor' | 'wall', newGrid: Block[][]) {
  const f = scene.value.floor[selectedFloorIndex.value]
  if (!f) return
  const newRows = newGrid.length
  const newCols = newGrid[0]?.length ?? 0
  if (layer === 'floor') {
    f.floor = newGrid.map((row) => row.map((b) => ({...b})))
    f.wall = ensureGridSize(f.wall, newRows, newCols, () => createDefaultBlock('blank'))
  } else {
    f.wall = newGrid.map((row) => row.map((b) => ({...b})))
    f.floor = ensureGridSize(f.floor, newRows, newCols, () => createDefaultBlock('blank'))
  }
}

const blockStyle = computed(() => {
  return (block: Block, ri: number, ci: number, translateZ = 0): CSSProperties => {
    if (block.type === 'blank') {
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        width: unit + 'px',
        height: unit + 'px',
        transform: translateZ ? `translate3d(${ci * unit}px, ${ri * unit}px, ${translateZ}px)` : `translate3d(${ci * unit}px, ${ri * unit}px, 0)`,
        pointerEvents: 'none',
        visibility: 'hidden'
      }
    }
    let x = ci * unit
    let y = ri * unit
    let transform = `translate3d(${x}px, ${y}px, ${translateZ}px)`
    let transformOrigin = 'center center'

    if (block.type === 'b-wall') {
      transformOrigin = 'bottom center'
      transform += ' rotateX(-90deg)'
    } else if (block.type === 'f-wall') {
      transformOrigin = 'top center'
      transform += ' rotateX(90deg)'
    } else if (block.type === 'l-wall') {
      transformOrigin = 'right center'
      transform += ' rotateY(90deg)'
    } else if (block.type === 'r-wall') {
      transformOrigin = 'left center'
      transform += ' rotateY(-90deg)'
    }

    return {
      position: 'absolute',
      left: 0,
      top: 0,
      width: unit + 'px',
      height: unit + 'px',
      backgroundColor: DefaultColor[block.type as keyof typeof DefaultColor],
      boxSizing: 'border-box',
      border: '1px solid rgba(0,0,0,0.2)',
      transform,
      transformOrigin,
      transformStyle: 'preserve-3d'
    }
  }
})

function getFloorZ(floorIndex: number): number {
  let z = 0
  for (let i = 0; i < floorIndex; i++) {
    z += scene.value.floor[i]?.height ?? unit
  }
  return z
}

function getFloorBlockStyle(block: Block, ri: number, ci: number, floorIndex: number) {
  const z = getFloorZ(floorIndex)
  return blockStyle.value(block, ri, ci, z)
}

const sceneSize = computed(() => {
  let w = 0
  let h = 0
  let totalZ = 0
  scene.value.floor.forEach((f) => {
    const c = Math.max(f.floor[0]?.length ?? 0, f.wall[0]?.length ?? 0)
    const r = Math.max(f.floor.length, f.wall.length)
    if (c > w) w = c
    if (r > h) h = r
    totalZ += f.height
  })
  return {w: w * unit, h: h * unit, depth: totalZ}
})
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="panel-card block-editor-card">
        <div class="panel-title">选中楼层 · Block 编辑</div>
        <el-tabs v-if="currentFloor" type="border-card" class="block-tabs">
          <el-tab-pane label="地板" name="floor">
            <BlockGridEditor
                :model-value="currentFloor.floor"
                layer-type="floor"
                @update:model-value="(v) => onBlockGridUpdate('floor', v)"
            />
          </el-tab-pane>
          <el-tab-pane label="墙" name="wall">
            <BlockGridEditor
                :model-value="currentFloor.wall"
                layer-type="wall"
                @update:model-value="(v) => onBlockGridUpdate('wall', v)"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="panel-card">
        <div class="panel-title">楼层</div>
        <div class="floor-list">
          <div
              v-for="(f, i) in scene.floor"
              :key="i"
              class="floor-item"
              :class="{ active: selectedFloorIndex === i }"
              @click="selectFloor(i)"
          >
            楼层 {{ i + 1 }}
          </div>
        </div>
        <el-button type="primary" size="small" @click="addFloor">添加楼层</el-button>
      </div>
    </div>

    <div class="main-wrap">
      <div class="main-top">
        <div class="section-title">选中楼层</div>
        <div
            v-if="currentFloor"
            class="viewport viewport-single"
            :style="{
            width: cols * unit + 'px',
            height: rows * unit + 'px'
          }"
        >
          <div class="layer layer-floor">
            <template v-for="(row, ri) in currentFloor.floor" :key="'f-' + ri">
              <div
                  v-for="(block, ci) in row"
                  :key="`f-${ri}-${ci}`"
                  class="block"
                  :style="blockStyle(block, ri, ci, 0)"
              />
            </template>
          </div>
          <div class="layer layer-wall">
            <template v-for="(row, ri) in currentFloor.wall" :key="'w-' + ri">
              <div
                  v-for="(block, ci) in row"
                  :key="`w-${ri}-${ci}`"
                  class="block"
                  :style="blockStyle(block, ri, ci, 0)"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="main-bottom">
        <div class="section-title">场景整体</div>
        <div
            class="viewport viewport-scene"
            :style="{
            width: sceneSize.w + 'px',
            height: sceneSize.h + 'px'
          }"
        >
          <template v-for="(floorData, fi) in scene.floor" :key="'floor-' + fi">
            <div class="layer layer-floor">
              <template v-for="(row, ri) in floorData.floor" :key="`${fi}-f-${ri}`">
                <div
                    v-for="(block, ci) in row"
                    :key="`${fi}-f-${ri}-${ci}`"
                    class="block"
                    :style="getFloorBlockStyle(block, ri, ci, fi)"
                />
              </template>
            </div>
            <div class="layer layer-wall">
              <template v-for="(row, ri) in floorData.wall" :key="`${fi}-w-${ri}`">
                <div
                    v-for="(block, ci) in row"
                    :key="`${fi}-w-${ri}-${ci}`"
                    class="block"
                    :style="getFloorBlockStyle(block, ri, ci, fi)"
                />
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="panel-card">
        <div class="panel-title">材质选择</div>
        <div class="placeholder">暂不处理</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 400px 1fr 200px;
  min-height: 100vh;
  gap: 0;
}

.left,
.right {
  padding: 16px;
  overflow-y: auto;
  background: #f5f7fa;
}

.panel-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-weight: 600;
  margin-bottom: 12px;
}

.floor-list {
  margin-bottom: 12px;
}

.floor-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;

  &.active {
    background: #ecf5ff;
    color: #409eff;
  }
}

.placeholder {
  color: #909399;
  font-size: 12px;
}

.block-editor-card {
  margin-top: 0;
}

.block-tabs {
  margin-top: 8px;
}

.block-tabs :deep(.el-tabs__content) {
  padding: 8px 0;
  max-height: 280px;
  overflow-y: auto;
}

.main-wrap {
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px;
}

.main-top,
.main-bottom {
  margin-bottom: 24px;
}

.section-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.viewport {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(50deg) rotateZ(45deg);
  perspective: 800px;
  margin: 0 auto;
}

.viewport-single {
  margin-bottom: 0;
}

.viewport-scene {
  min-height: 120px;
}

.layer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
  pointer-events: none;
}

.layer .block {
  pointer-events: auto;
}

.layer-floor {
  z-index: 0;
}

.layer-wall {
  z-index: 1;
}

.block {
  position: absolute;
  transform-style: preserve-3d;
}
</style>
