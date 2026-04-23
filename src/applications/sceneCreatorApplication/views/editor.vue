<script setup lang="ts">
import {ref, computed, CSSProperties, onMounted, onUnmounted} from 'vue'
import type {Block, Floor, Scene} from '@/applications/sceneCreatorApplication/types'
import {DefaultColor, MaterialList} from '@/applications/sceneCreatorApplication/constant'

const textureModules = import.meta.glob<string>(
    '@/applications/sceneCreatorApplication/assets/textures/**/*.svg',
    {query: '?url', import: 'default', eager: true}
)

function getTextureUrl(relPath: string): string {
  const key = Object.keys(textureModules).find((k) => k.endsWith(relPath))
  return key ? (textureModules[key] as string) : ''
}

import BlockGridEditor from '@/applications/sceneCreatorApplication/components/BlockGridEditor.vue'

const unit = 10

function createDefaultBlock(): Block {
  return {
    texture_in: '',
    texture_out: '',
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
      [{
        texture_in: '',
        texture_out: '',
        walls: {
          front: null,
          back: null,
          left: null,
          right: null
        }
      }, createDefaultBlock(), createDefaultBlock()],
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
const selectedMaterialId = ref<string>('')
const painting = ref(false)

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

type FaceType =
    'floor_in'
    | 'floor_out'
    | `wall_${'front' | 'back' | 'left' | 'right'}_in`
    | `wall_${'front' | 'back' | 'left' | 'right'}_out`

function applyMaterialToBlock(fi: number, ri: number, ci: number, face: FaceType) {
  if (!selectedMaterialId.value) return
  const f = scene.value.floor[fi]
  if (!f) return
  const row = f.floor[ri]
  if (!row?.[ci]) return
  const b = row[ci]
  const mat = selectedMaterialId.value

  if (face === 'floor_in') {
    b.texture_in = mat
  } else if (face === 'floor_out') {
    b.texture_out = mat
  } else if (face.startsWith('wall_')) {
    const [, side, which] = face.split('_') as [string, 'front' | 'back' | 'left' | 'right', 'in' | 'out']
    let w = b.walls[side]
    if (!w) w = b.walls[side] = {texture_in: '', texture_out: '', opacity: 1}
    if (which === 'in') w.texture_in = mat
    else w.texture_out = mat
  }
}

function getBlockFromEvent(e: MouseEvent): { fi: number; ri: number; ci: number; face: FaceType } | null {
  const el = (e.target as Element)?.closest?.('[data-block]')
  if (!el) return null
  const d = (el as HTMLElement).dataset
  const fi = d.fi !== undefined ? Number(d.fi) : selectedFloorIndex.value
  const ri = Number(d.ri)
  const ci = Number(d.ci)
  const face = d.face as FaceType | undefined
  if (isNaN(ri) || isNaN(ci) || fi < 0 || !face) return null
  return {fi, ri, ci, face}
}

function onPaintStart(e: MouseEvent) {
  if (e.button !== 0 || !selectedMaterialId.value) return
  const pos = getBlockFromEvent(e)
  if (pos) {
    painting.value = true
    applyMaterialToBlock(pos.fi, pos.ri, pos.ci, pos.face)
  }
}

function onPaintMove(e: MouseEvent) {
  if (!painting.value || !selectedMaterialId.value) return
  const pos = getBlockFromEvent(e)
  if (pos) applyMaterialToBlock(pos.fi, pos.ri, pos.ci, pos.face)
}

function onPaintEnd() {
  painting.value = false
}

function resolveTextureStyle(texture: string, defaultColor: string): {
  backgroundColor?: string;
  backgroundImage?: string
} {
  if (!texture) return {backgroundColor: defaultColor}
  if (/^#[0-9a-fA-F]{3,8}$/.test(texture) || texture.startsWith('rgb')) return {backgroundColor: texture}
  const m = MaterialList.find((x) => x.id === texture)
  const url = m ? getTextureUrl(m.path) : ''
  if (url) return {backgroundImage: `url(${url})`, backgroundColor: defaultColor}
  return {backgroundColor: defaultColor}
}

type BlockFace = { style: CSSProperties; face: FaceType }

const blockStyle = computed(() => {
  return (block: Block, ri: number, ci: number, translateZ = 0, dimmed = false): BlockFace[] => {
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

    const result: BlockFace[] = []
    const dimmedOpacity = dimmed ? 0.2 : 1

    // 地板：正反两个 div 重叠。正面=朝上(texture_in)，反面=朝下(texture_out)
    const floorBase = {
      ...base,
      backgroundSize: 'cover' as const,
      boxSizing: 'border-box' as const,
      border: '1px solid rgba(0,0,0,0.2)',
      opacity: dimmedOpacity
    }
    result.push({
      face: 'floor_in',
      style: {
        ...floorBase,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        transformOrigin: 'center center',
        ...resolveTextureStyle(block.texture_in ?? '', DefaultColor.floor)
      }
    })
    result.push({
      face: 'floor_out',
      style: {
        ...floorBase,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(180deg)`,
        transformOrigin: 'center center',
        ...resolveTextureStyle(block.texture_out ?? '', DefaultColor.floor)
      }
    })

    const wallFace = (wall: NonNullable<Block['walls']['front']>, which: 'in' | 'out', color: string) => {
      const tex = which === 'in' ? wall.texture_in : wall.texture_out
      return {
        opacity: (wall.opacity ?? 1) * dimmedOpacity,
        ...resolveTextureStyle(tex ?? '', color),
        backgroundSize: 'cover',
        boxSizing: 'border-box' as const,
        border: '1px solid rgba(0,0,0,0.2)'
      }
    }

    // 墙壁：每个墙正反两个 div，用贴地边为锚点立起，不混入 rotateZ（否则会绕边旋转导致位置错乱）
    const eps = 0.02
    type WallSpec = { rot: string; origin: string }
    const wallSpecs: Record<'front' | 'back' | 'left' | 'right', WallSpec> = {
      front: {rot: 'rotateX(-90deg)', origin: 'bottom center'},
      back: {rot: 'rotateX(90deg)', origin: 'top center'},
      left: {rot: 'rotateY(-90deg)', origin: 'left center'},
      right: {rot: 'rotateY(90deg)', origin: 'right center'}
    }
    const wallPair = (side: 'front' | 'back' | 'left' | 'right', wall: NonNullable<Block['walls']['front']>, color: string) => {
      const spec = wallSpecs[side]
      const baseT = `translate3d(${x}px, ${y}px, ${z}px)`
      result.push({
        face: `wall_${side}_out`,
        style: {
          ...base,
          transform: `${baseT} ${spec.rot} translateZ(${eps}px)`,
          transformOrigin: spec.origin, ...wallFace(wall, 'out', color)
        }
      })
      result.push({
        face: `wall_${side}_in`,
        style: {
          ...base,
          transform: `${baseT} ${spec.rot} translateZ(-${eps}px)`,
          transformOrigin: spec.origin, ...wallFace(wall, 'in', color)
        }
      })
    }

    if (block.walls.front) wallPair('front', block.walls.front, DefaultColor.front)
    if (block.walls.back) wallPair('back', block.walls.back, DefaultColor.back)
    if (block.walls.left) wallPair('left', block.walls.left, DefaultColor.left)
    if (block.walls.right) wallPair('right', block.walls.right, DefaultColor.right)

    return result
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

// 选中楼层视口：旋转、缩放
const singleRotX = ref(50)
const singleRotZ = ref(45)
const singleScale = ref(1)
const singleDragging = ref(false)
const singleLast = ref({x: 0, y: 0})

function onSingleWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  singleScale.value = Math.max(0.2, Math.min(5, singleScale.value + delta))
}

function onSingleMouseDown(e: MouseEvent) {
  if (e.button === 1) {
    e.preventDefault()
    singleDragging.value = true
    singleLast.value = {x: e.clientX, y: e.clientY}
  } else if (e.button === 0) {
    onPaintStart(e)
  }
}

function onSingleMouseMove(e: MouseEvent) {
  if (singleDragging.value) {
    singleRotZ.value += (e.clientX - singleLast.value.x) * 0.5
    singleRotX.value = Math.max(-90, Math.min(90, singleRotX.value + (e.clientY - singleLast.value.y) * 0.5))
    singleLast.value = {x: e.clientX, y: e.clientY}
  }
}

function onSingleMouseUp(e: MouseEvent) {
  if (e.button === 1) singleDragging.value = false
}

// 场景整体视口：旋转、缩放
const sceneRotX = ref(50)
const sceneRotZ = ref(45)
const sceneScale = ref(1)
const sceneDragging = ref(false)
const sceneLast = ref({x: 0, y: 0})

function onSceneWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  sceneScale.value = Math.max(0.2, Math.min(5, sceneScale.value + delta))
}

function onSceneMouseDown(e: MouseEvent) {
  if (e.button === 1) {
    e.preventDefault()
    sceneDragging.value = true
    sceneLast.value = {x: e.clientX, y: e.clientY}
  } else if (e.button === 0) {
    onPaintStart(e)
  }
}

function onSceneMouseMove(e: MouseEvent) {
  if (sceneDragging.value) {
    sceneRotZ.value += (e.clientX - sceneLast.value.x) * 0.5
    sceneRotX.value = Math.max(-90, Math.min(90, sceneRotX.value + (e.clientY - sceneLast.value.y) * 0.5))
    sceneLast.value = {x: e.clientX, y: e.clientY}
  }
}

function onSceneMouseUp(e: MouseEvent) {
  if (e.button === 1) sceneDragging.value = false
}

// 全局 mouseup/mousemove 以处理在视口外释放
function onGlobalMouseUp() {
  singleDragging.value = false
  sceneDragging.value = false
  onPaintEnd()
}

function onGlobalMouseMove(e: MouseEvent) {
  onSingleMouseMove(e)
  onSceneMouseMove(e)
  onPaintMove(e)
}

onMounted(() => {
  window.addEventListener('mouseup', onGlobalMouseUp)
  window.addEventListener('mousemove', onGlobalMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mouseup', onGlobalMouseUp)
  window.removeEventListener('mousemove', onGlobalMouseMove)
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
            class="viewport-wrap"
            @wheel.prevent="onSingleWheel"
            @mousedown.capture="onSingleMouseDown"
            @mouseup.capture="onSingleMouseUp"
            @contextmenu.prevent
        >
          <div
              class="viewport-stage"
              :style="{
                width: (currentFloor ? cols * unit : 100) + 'px',
                height: (currentFloor ? rows * unit : 100) + 'px',
                transform: `translate(-50%, -50%) scale(${singleScale}) rotateX(${singleRotX}deg) rotateZ(${singleRotZ}deg)`
              }"
          >
            <div v-if="currentFloor" class="viewport viewport-single">
              <div class="layer">
                <template v-for="(row, ri) in currentFloor.floor" :key="'f-' + ri">
                  <template v-for="(block, ci) in row" :key="`f-${ri}-${ci}`">
                    <div
                        v-for="(s, idx) in blockStyle(block, ri, ci, 0)"
                        :key="`f-${ri}-${ci}-${idx}`"
                        class="block"
                        data-block
                        :data-fi="selectedFloorIndex"
                        :data-ri="ri"
                        :data-ci="ci"
                        :data-face="s.face"
                        :style="s.style"
                    />
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-bottom">
        <div class="section-title">场景整体</div>
        <div
            class="viewport-wrap"
            @wheel.prevent="onSceneWheel"
            @mousedown.capture="onSceneMouseDown"
            @mouseup.capture="onSceneMouseUp"
            @contextmenu.prevent
        >
          <div
              class="viewport-stage"
              :style="{
                width: sceneSize.w + 'px',
                height: sceneSize.h + 'px',
                transform: `translate(-50%, -50%) scale(${sceneScale}) rotateX(${sceneRotX}deg) rotateZ(${sceneRotZ}deg)`
              }"
          >
            <div class="viewport viewport-scene">
              <template v-for="(floorData, fi) in scene.floor" :key="'floor-' + fi">
                <div class="layer layer-floor-wrap">
                  <template v-for="(row, ri) in floorData.floor" :key="`${fi}-${ri}`">
                    <template v-for="(block, ci) in row" :key="`${fi}-${ri}-${ci}`">
                      <div
                          v-for="(s, idx) in blockStyle(block, ri, ci, getFloorZ(fi), selectedFloorIndex >= 0 && fi !== selectedFloorIndex)"
                          :key="`${fi}-${ri}-${ci}-${idx}`"
                          class="block"
                          data-block
                          :data-fi="fi"
                          :data-ri="ri"
                          :data-ci="ci"
                          :data-face="s.face"
                          :style="s.style"
                      />
                    </template>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="panel-card">
        <div class="panel-title">材质选择</div>
        <div class="material-list">
          <div
              v-for="m in MaterialList"
              :key="m.id"
              class="material-item"
              :class="{ active: selectedMaterialId === m.id }"
              @click="selectedMaterialId = m.id"
          >
            <div class="material-preview" :style="{ backgroundImage: `url(${getTextureUrl(m.path)})` }"/>
            <span class="material-name">{{ m.name }}</span>
            <span class="material-id">{{ m.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 400px 1fr 200px;
  grid-template-rows: 1fr;
  height: 100vh;
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

.material-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.material-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    background: #ecf5ff;
    border: 1px solid #409eff;
  }
}

.material-preview {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  border: 1px solid #e0e0e0;
}

.material-name {
  font-size: 13px;
  flex: 1;
}

.material-id {
  font-size: 11px;
  color: #909399;
}

.block-editor-card {
  margin-top: 0;
}

.main-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 16px;
}

.main-top,
.main-bottom {
  flex: 0 0 50%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.main-top {
  padding-bottom: 8px;
  overflow: auto;
}

.main-bottom {
  overflow: auto;
}

.section-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.viewport-wrap {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  cursor: grab;
  user-select: none;
}

.viewport-wrap:active {
  cursor: grabbing;
}

.viewport-stage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  transform-style: preserve-3d;
}

.viewport {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 800px;
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
