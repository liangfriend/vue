<script setup lang="ts">
import {ref, computed, CSSProperties} from 'vue'
import type {Block, Floor, Scene} from '@/applications/sceneCreatorApplication/types'
import {DefaultColor} from '@/applications/sceneCreatorApplication/constant'
import BlockGridEditor from '@/applications/sceneCreatorApplication/components/BlockGridEditor.vue'

const unit = 10

function createDefaultBlock(): Block {
  return {
    walls: {
      front: null,
      back: null,
      left: null,
      right: null
    }
  }
}

function createDefaultFloor(): Floor {
  return {
    floor: [
      [createDefaultBlock(), createDefaultBlock(), createDefaultBlock()],
      [createDefaultBlock(), createDefaultBlock(), createDefaultBlock(), createDefaultBlock(), createDefaultBlock()],
      [createDefaultBlock(), createDefaultBlock(), createDefaultBlock()]
    ],
    height: unit
  }
}

const scene = ref<Scene>({
  floor: [createDefaultFloor()],
  unit
})

const selectedFloorIndex = ref(0)

const currentFloor = computed(() =>
    selectedFloorIndex.value >= 0 ? scene.value.floor[selectedFloorIndex.value] : undefined
)

const rows = computed(() => currentFloor.value?.floor.length ?? 0)
const cols = computed(() => currentFloor.value?.floor[0]?.length ?? 0)

function addFloor() {
  scene.value.floor.push(createDefaultFloor())
  selectedFloorIndex.value = scene.value.floor.length - 1
}

function selectFloor(index: number) {
  if (index >= 0 && index < scene.value.floor.length) {
    selectedFloorIndex.value = selectedFloorIndex.value === index ? -1 : index
  }
}

function onBlockGridUpdate(newGrid: Block[][]) {
  if (selectedFloorIndex.value < 0) return
  const f = scene.value.floor[selectedFloorIndex.value]
  if (!f) return
  f.floor = newGrid.map((row) => row.map((b) => ({...b})))
}

function resolveColor(texture: string, defaultColor: string): string {
  if (!texture) return defaultColor
  if (/^#[0-9a-fA-F]{3,8}$/.test(texture) || texture.startsWith('rgb')) return texture
  return defaultColor
}

const blockStyle = computed(() => {
  return (block: Block, ri: number, ci: number, translateZ = 0, dimmed = false): CSSProperties[] => {
    const base = {
      position: 'absolute' as const,
      left: 0,
      top: 0,
      width: unit + 'px',
      height: unit + 'px',
      transformStyle: 'preserve-3d' as const,
    }
    const x = ci * unit
    const y = ri * unit
    const z = translateZ

    const styles: CSSProperties[] = []
    const dimmedOpacity = dimmed ? 0.2 : 1

    // 地板面 (水平)
    styles.push({
      ...base,
      transform: `translate3d(${x}px, ${y}px, ${z}px)`,
      backgroundColor: DefaultColor.floor,
      boxSizing: 'border-box',
      border: '1px solid rgba(0,0,0,0.2)',
      transformOrigin: 'center center',
      opacity: dimmedOpacity
    })
    const wallStyle = (wall: NonNullable<Block['walls']['front']>, color: string) => ({
      opacity: (wall.opacity ?? 1) * dimmedOpacity,
      backgroundColor: resolveColor(wall.texture, color),
      boxSizing: 'border-box' as const,
      border: '1px solid rgba(0,0,0,0.2)'
    })
    // front (朝向 +y)
    if (block.walls.front) {
      styles.push({
        ...base,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(-90deg)`,
        transformOrigin: 'bottom center',
        ...wallStyle(block.walls.front, DefaultColor.front)
      })
    }
    // back (朝向 -y)
    if (block.walls.back) {
      styles.push({
        ...base,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(90deg)`,
        transformOrigin: 'top center',
        ...wallStyle(block.walls.back, DefaultColor.back)
      })
    }
    // left (朝向 -x)
    if (block.walls.left) {
      styles.push({
        ...base,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(-90deg)`,
        transformOrigin: 'left center',
        ...wallStyle(block.walls.left, DefaultColor.left)
      })
    }
    // right (朝向 +x)
    if (block.walls.right) {
      styles.push({
        ...base,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(90deg)`,
        transformOrigin: 'right center',
        ...wallStyle(block.walls.right, DefaultColor.right)
      })
    }

    return styles
  }
})

function getFloorZ(floorIndex: number): number {
  let z = 0
  for (let i = 0; i < floorIndex; i++) {
    z += scene.value.floor[i]?.height ?? unit
  }
  return z
}

const sceneSize = computed(() => {
  let w = 0
  let h = 0
  scene.value.floor.forEach((f) => {
    const c = f.floor[0]?.length ?? 0
    const r = f.floor.length
    if (c > w) w = c
    if (r > h) h = r
  })
  return {w: w * unit, h: h * unit}
})
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="panel-card block-editor-card">
        <div class="panel-title">选中楼层 · Block 编辑</div>
        <BlockGridEditor
            v-if="currentFloor"
            :model-value="currentFloor.floor"
            @update:model-value="onBlockGridUpdate"
        />
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
        <div class="floor-actions">
          <el-button
              v-if="selectedFloorIndex >= 0"
              size="small"
              @click="selectedFloorIndex = -1"
          >
            取消选中
          </el-button>
          <el-button type="primary" size="small" @click="addFloor">添加楼层</el-button>
        </div>
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
          <div class="layer">
            <template v-for="(row, ri) in currentFloor.floor" :key="'f-' + ri">
              <template v-for="(block, ci) in row" :key="`f-${ri}-${ci}`">
                <div
                    v-for="(s, idx) in blockStyle(block, ri, ci, 0)"
                    :key="`f-${ri}-${ci}-${idx}`"
                    class="block"
                    :style="s"
                />
              </template>
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
            <div class="layer layer-floor-wrap">
              <template v-for="(row, ri) in floorData.floor" :key="`${fi}-${ri}`">
                <template v-for="(block, ci) in row" :key="`${fi}-${ri}-${ci}`">
                  <div
                      v-for="(s, idx) in blockStyle(block, ri, ci, getFloorZ(fi), selectedFloorIndex >= 0 && fi !== selectedFloorIndex)"
                      :key="`${fi}-${ri}-${ci}-${idx}`"
                      class="block"
                      :style="s"
                  />
                </template>
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

.floor-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
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

.block {
  position: absolute;
  transform-style: preserve-3d;
}
</style>
