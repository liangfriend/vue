<script setup lang="ts">
import { computed } from 'vue'
import type { Block } from '@/applications/sceneCreatorApplication/types'

const props = defineProps<{
  modelValue: Block[][]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Block[][]]
}>()

const wallKeys = ['front', 'back', 'left', 'right'] as const
const wallLabels: Record<(typeof wallKeys)[number], string> = {
  front: '前',
  back: '后',
  left: '左',
  right: '右'
}

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

const rows = computed(() => props.modelValue.length)
const cols = computed(() => props.modelValue[0]?.length ?? 0)

function updateBlockAt(ri: number, ci: number, updater: (b: Block) => Block) {
  const grid = props.modelValue.map((row, r) =>
    row.map((b, c) => (r === ri && c === ci ? updater(b) : { ...b }))
  )
  emit('update:modelValue', grid)
}

function updateWallAt(ri: number, ci: number, updater: (w: Block['walls']) => Block['walls']) {
  updateBlockAt(ri, ci, (b) => ({ ...b, walls: updater(b.walls) }))
}

function setBlockTextureIn(ri: number, ci: number, v: string) {
  updateBlockAt(ri, ci, (b) => ({ ...b, texture_in: v }))
}
function setBlockTextureOut(ri: number, ci: number, v: string) {
  updateBlockAt(ri, ci, (b) => ({ ...b, texture_out: v }))
}

function addWall(ri: number, ci: number, side: keyof Block['walls']) {
  updateWallAt(ri, ci, (w) => ({ ...w, [side]: { texture_in: '', texture_out: '', opacity: 1 } }))
}

function removeWall(ri: number, ci: number, side: keyof Block['walls']) {
  updateWallAt(ri, ci, (w) => ({ ...w, [side]: null }))
}

function setWallTextureIn(ri: number, ci: number, side: keyof Block['walls'], v: string) {
  updateWallAt(ri, ci, (w) => {
    const cur = w[side]
    return { ...w, [side]: cur ? { ...cur, texture_in: v } : { texture_in: v, texture_out: '', opacity: 1 } }
  })
}
function setWallTextureOut(ri: number, ci: number, side: keyof Block['walls'], v: string) {
  updateWallAt(ri, ci, (w) => {
    const cur = w[side]
    return { ...w, [side]: cur ? { ...cur, texture_out: v } : { texture_in: '', texture_out: v, opacity: 1 } }
  })
}

function insertRowBefore(ri: number) {
  const grid = props.modelValue.map((row) => row.map((b) => ({ ...b })))
  const newRow = Array.from({ length: cols.value }, () => createDefaultBlock())
  grid.splice(ri, 0, newRow)
  emit('update:modelValue', grid)
}

function insertRowAfter(ri: number) {
  insertRowBefore(ri + 1)
}

function addFirstRow() {
  emit('update:modelValue', [[createDefaultBlock()]])
}

function insertColBefore(ci: number) {
  const grid = props.modelValue.map((row) => {
    const newRow = [...row.map((b) => ({ ...b }))]
    newRow.splice(ci, 0, createDefaultBlock())
    return newRow
  })
  emit('update:modelValue', grid)
}

function insertColAfter(ci: number) {
  insertColBefore(ci + 1)
}
</script>

<template>
  <div class="block-grid-editor">
    <template v-if="!modelValue.length">
      <div class="row-insert">
        <el-button type="primary" size="small" text @click="addFirstRow">
          + 添加第一行
        </el-button>
      </div>
    </template>
    <template v-else>
      <div class="grid-scroll">
        <template v-for="(row, ri) in modelValue" :key="'r-' + ri">
          <div class="row-insert row-insert-above">
            <el-button type="primary" size="small" text @click="insertRowBefore(ri)">
              + 插入行(上)
            </el-button>
          </div>
          <div class="data-row">
            <template v-for="(block, ci) in row" :key="'c-' + ci">
              <div class="col-insert">
                <el-button type="primary" size="small" text @click="insertColBefore(ci)">
                  + 列
                </el-button>
              </div>
              <div class="block-cell">
                <div class="floor-row">
                  <el-input size="small" placeholder="地板内" :model-value="block.texture_in" @update:model-value="(v: string) => setBlockTextureIn(ri, ci, v ?? '')" />
                  <el-input size="small" placeholder="地板外" :model-value="block.texture_out" @update:model-value="(v: string) => setBlockTextureOut(ri, ci, v ?? '')" />
                </div>
                <div class="walls-grid">
                  <div v-for="side in wallKeys" :key="side" class="wall-slot">
                    <template v-if="block.walls[side]">
                      <el-input size="small" placeholder="内" :model-value="block.walls[side]!.texture_in" @update:model-value="(v: string) => setWallTextureIn(ri, ci, side, v ?? '')" />
                      <el-input size="small" placeholder="外" :model-value="block.walls[side]!.texture_out" @update:model-value="(v: string) => setWallTextureOut(ri, ci, side, v ?? '')" />
                      <el-button type="danger" size="small" text title="删除墙" @click="removeWall(ri, ci, side)">删</el-button>
                    </template>
                    <el-button v-else type="primary" size="small" text @click="addWall(ri, ci, side)">
                      + {{ wallLabels[side] }}
                    </el-button>
                  </div>
                </div>
              </div>
            </template>
            <div class="col-insert">
              <el-button type="primary" size="small" text @click="insertColAfter(cols - 1)">
                + 列
              </el-button>
            </div>
          </div>
        </template>
      </div>
      <div class="row-insert row-insert-below">
        <el-button type="primary" size="small" text @click="insertRowAfter(rows - 1)">
          + 插入行(下)
        </el-button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.block-grid-editor {
  --cell-min: 56px;
  --cell-max: 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grid-scroll {
  max-height: 280px;
  overflow: auto;
  min-width: 0;
}

.row-insert {
  display: flex;
  justify-content: center;
  padding: 2px 0;
}

.data-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  align-items: center;
  min-width: min-content;
}

.col-insert {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  min-width: var(--cell-min);
}

.block-cell {
  flex: 0 0 auto;
  min-width: var(--cell-min);
  max-width: var(--cell-max);
  white-space: nowrap;
  overflow: hidden;
}

.floor-row {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}
.floor-row .el-input {
  flex: 1;
  min-width: 0;
}

.walls-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.wall-slot {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}
.wall-slot .el-input {
  flex: 1;
  min-width: 0;
}
.wall-slot :deep(.el-input__wrapper) {
  padding: 0 6px;
}
.wall-slot :deep(.el-input__inner) {
  font-size: 11px;
}
</style>
