<script setup lang="ts">
import { computed } from 'vue'
import type { Block } from '@/applications/sceneCreatorApplication/types'

const props = defineProps<{
  modelValue: Block[][]
  layerType: 'floor' | 'wall'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Block[][]]
}>()

const FLOOR_LAYER_TYPES: Block['type'][] = ['blank', 'floor']
const WALL_LAYER_TYPES: Block['type'][] = ['blank', 'b-wall', 'f-wall', 'l-wall', 'r-wall']

function createDefaultBlock(type: Block['type']): Block {
  return { type, texture: '', anchor: false }
}

const typeOptions = computed(() =>
  props.layerType === 'floor' ? FLOOR_LAYER_TYPES : WALL_LAYER_TYPES
)

const defaultBlockType = (): Block['type'] =>
  props.layerType === 'floor' ? 'blank' : 'blank'

const rows = computed(() => props.modelValue.length)
const cols = computed(() => props.modelValue[0]?.length ?? 0)

function setBlockType(ri: number, ci: number, type: Block['type']) {
  const grid = props.modelValue.map((row) => row.map((b) => ({ ...b })))
  const row = grid[ri]
  if (!row || row[ci] == null) return
  row[ci] = { ...row[ci], type }
  emit('update:modelValue', grid)
}

function insertRowBefore(ri: number) {
  const grid = props.modelValue.map((row) => row.map((b) => ({ ...b })))
  const newRow = Array.from({ length: cols.value }, () =>
    createDefaultBlock(defaultBlockType())
  )
  grid.splice(ri, 0, newRow)
  emit('update:modelValue', grid)
}

function insertRowAfter(ri: number) {
  insertRowBefore(ri + 1)
}

function addFirstRow() {
  emit('update:modelValue', [[createDefaultBlock(defaultBlockType())]])
}

function insertColBefore(ci: number) {
  const grid = props.modelValue.map((row) => {
    const newRow = [...row.map((b) => ({ ...b }))]
    newRow.splice(ci, 0, createDefaultBlock(defaultBlockType()))
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
      <!-- 行上插入 -->
      <div class="row-insert row-insert-above">
        <el-button type="primary" size="small" text @click="insertRowBefore(ri)">
          + 插入行(上)
        </el-button>
      </div>
      <!-- 数据行：列左/块/列右，固定最小宽度避免横向挤在一起 -->
      <div class="data-row">
        <template v-for="(block, ci) in row" :key="'c-' + ci">
          <div class="col-insert">
            <el-button
              type="primary"
              size="small"
              text
              @click="insertColBefore(ci)"
            >
              + 列
            </el-button>
          </div>
          <div class="block-cell">
            <el-select
              :model-value="block.type"
              size="small"
              @update:model-value="(v: Block['type']) => setBlockType(ri, ci, v)"
            >
              <el-option
                v-for="t in typeOptions"
                :key="t"
                :label="t"
                :value="t"
              />
            </el-select>
          </div>
        </template>
        <div class="col-insert">
          <el-button
            type="primary"
            size="small"
            text
            @click="insertColAfter(cols - 1)"
          >
            + 列
          </el-button>
        </div>
      </div>
      </template>
      </div>
      <!-- 最后一行下方插入 -->
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
  --cell-min: 56px; /* 每格最小宽度 */
  --cell-max: 88px; /* 选择器最大宽度，避免过宽 */
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
  flex-wrap: nowrap; /* 强制单行，不换行 */
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
  width: var(--cell-max);
  white-space: nowrap;
  overflow: hidden;
}

.block-cell .el-select {
  width: 100%;
  min-width: 0;
  max-width: var(--cell-max);
}

/* 选择器整条链不换行：Element Plus .select-trigger > .el-input > .el-input__wrapper > .el-input__inner */
.block-cell :deep(.el-select),
.block-cell :deep(.select-trigger),
.block-cell :deep(.el-input),
.block-cell :deep(.el-input__wrapper),
.block-cell :deep(.el-input__inner) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
.block-cell :deep(.el-input__inner) {
  text-overflow: ellipsis;
}
</style>
