<template>
  <div class="restaurant-game">
    <header class="game-header">
      <div class="stat">
        <PixelSprite :data="sprites.coin" :scale="2" />
        <span>{{ state.money }} 元</span>
      </div>
      <div class="stat">第 {{ state.day }} 天</div>
      <div class="stat">名声 {{ Math.round(state.reputation) }}</div>
      <div class="actions">
        <el-button size="small" type="primary" :disabled="running" @click="runSimulate">
          {{ running ? '经营中...' : '开始经营' }}
        </el-button>
        <el-button size="small" :disabled="!running" @click="stopSimulate">暂停</el-button>
        <el-button size="small" @click="doNextDay">下一天</el-button>
        <el-button size="small" :disabled="state.money < 500 || state.staff.length >= 5" @click="doHire">
          招募员工 (500元)
        </el-button>
        <el-button size="small" :type="shopOpen ? 'warning' : 'success'" @click="shopOpen = !shopOpen">
          {{ shopOpen ? '关闭商店' : '家具城' }}
        </el-button>
      </div>
    </header>

    <div class="game-body">
      <!-- 左侧面板 -->
      <aside class="side-panel">
        <h3>员工 ({{ state.staff.length }})</h3>
        <div v-for="s in state.staff" :key="s.id" class="staff-card">
          <PixelSprite :data="s.sprite" :scale="2" />
          <div class="staff-info">
            <div>{{ s.name }}</div>
            <div class="small">厨{{ s.stats.cooking }} 速{{ s.stats.speed }} ¥{{ s.salary }}/天</div>
          </div>
        </div>
        <h3>菜谱</h3>
        <div v-for="r in state.recipes" :key="r.id" class="recipe-row">
          <PixelSprite :data="r.sprite" :scale="1" />
          <span>{{ r.name }} ¥{{ r.basePrice }}</span>
        </div>
      </aside>

      <!-- 餐厅主画面 -->
      <main
        class="restaurant-floor"
        :style="floorContainerStyle"
        @click="onFloorClick"
        @mousemove="onFloorMouseMove"
        @mouseleave="hoverCell = null"
      >
        <!-- 地面层 -->
        <div class="tile-layer" :style="layerStyle">
          <template v-for="(row, ry) in state.map.tiles" :key="ry">
            <div
              v-for="(tile, cx) in row"
              :key="`t-${ry}-${cx}`"
              class="tile"
              :style="tilePos(cx, ry, 1, 1)"
            >
              <PixelSprite
                v-if="tile.type === 'wall'"
                :data="wallSprite"
                :scale="SCALE"
              />
              <PixelSprite
                v-else-if="tile.type === 'door'"
                :data="sprites.door"
                :scale="SCALE"
              />
              <PixelSprite
                v-else-if="tile.type === 'grass'"
                :data="sprites.grass"
                :scale="SCALE"
              />
              <PixelSprite
                v-else-if="tile.type === 'road'"
                :data="sprites.road"
                :scale="SCALE"
              />
              <PixelSprite
                v-else
                :data="floorSprite"
                :scale="SCALE"
              />
            </div>
          </template>
        </div>

        <!-- 家具层 -->
        <div class="furniture-layer" :style="layerStyle">
          <div
            v-for="f in state.furniture"
            :key="f.uid"
            class="furniture-item"
            :style="tilePos(f.col, f.row, f.width, f.height)"
            @click.stop="onFurnitureClick(f)"
          >
            <PixelSprite
              v-if="sprites[furnitureSprite(f)]"
              :data="sprites[furnitureSprite(f)]"
              :scale="SCALE"
            />
          </div>
        </div>

        <!-- 放置预览 -->
        <div
          v-if="placingItem && hoverCell"
          class="place-preview"
          :class="{ invalid: !canPlaceHere }"
          :style="tilePos(hoverCell.col, hoverCell.row, placingItem.width, placingItem.height)"
        />

        <!-- 菜品层：烹饪区待取 + 桌上已上 -->
        <div class="dish-layer" :style="layerStyle">
          <div
            v-for="(o, i) in ordersAtCook"
            :key="'cook-' + o.id"
            class="dish-on-cook"
            :style="dishAtCookStyle(i)"
          >
            <PixelSprite
              v-if="dishSprite(o.recipeId)"
              :data="dishSprite(o.recipeId)!"
              :scale="2"
            />
          </div>
          <div
            v-for="o in ordersOnTable"
            :key="'table-' + o.id"
            class="dish-on-table"
            :style="dishOnTableStyle(o)"
          >
            <PixelSprite
              v-if="dishSprite(o.recipeId)"
              :data="dishSprite(o.recipeId)!"
              :scale="2"
            />
          </div>
        </div>

        <!-- 行人层（街上） -->
        <div class="npc-layer" :style="layerStyle">
          <div
            v-for="p in state.pedestrians"
            :key="'p' + p.id"
            class="npc pedestrian"
            :style="pedestrianPos(p)"
          >
            <PixelSprite v-if="p.sprite" :data="p.sprite" :scale="SCALE" />
          </div>
          <div
            v-for="(s, i) in state.staff"
            :key="'s' + s.id"
            class="npc"
            :style="staffPos(i)"
          >
            <PixelSprite :data="s.sprite" :scale="SCALE" />
          </div>
          <div
            v-for="(c, i) in state.customers.slice(0, 8)"
            :key="'c' + c.id"
            class="npc"
            :style="customerPos(c, i)"
          >
            <PixelSprite :data="c.sprite" :scale="SCALE" />
            <div class="patience-bar">
              <div class="patience-fill" :style="{ width: c.patience + '%' }" />
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧商店面板 -->
      <aside v-if="shopOpen" class="shop-panel">
        <h3>家具城</h3>
        <div class="shop-tabs">
          <el-button
            v-for="cat in SHOP_CATEGORIES"
            :key="cat.key"
            :type="shopCat === cat.key ? 'primary' : 'default'"
            size="small"
            @click="shopCat = cat.key"
          >{{ cat.label }}</el-button>
        </div>
        <div class="shop-list">
          <div
            v-for="item in currentShopItems"
            :key="item.id"
            class="shop-item"
            :class="{ selected: placingItem?.id === item.id }"
            @click="selectShopItem(item)"
          >
            <PixelSprite
              v-if="sprites[item.spriteKey]"
              :data="sprites[item.spriteKey]"
              :scale="1"
            />
            <div class="shop-item-info">
              <div class="shop-item-name">{{ item.name }}</div>
              <div class="shop-item-price">¥{{ item.price }}</div>
              <div class="shop-item-desc">{{ item.description }}</div>
              <div v-if="item.width > 0" class="shop-item-size">{{ item.width }}×{{ item.height }} 格</div>
            </div>
          </div>
        </div>
        <div v-if="placingItem" class="shop-hint">
          <template v-if="placingItem.width > 0">
            点击餐厅地板放置 <b>{{ placingItem.name }}</b>
            <el-button size="small" text @click="placingItem = null">取消</el-button>
          </template>
        </div>
      </aside>
    </div>

    <div class="tip">
      <a href="#/pixel/editor">像素画创建器</a> 制作角色/家具，导出 JSON 可导入替换精灵
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import PixelSprite from '../components/PixelSprite.vue'
import { sprites } from '../assets/sprites'
import type { GameState, ShopItem, ShopCategory, PlacedFurniture, Pedestrian, Order } from '../types'
import {
  createInitialState, simulateMinute, nextDay, hireStaff, buyAndPlace, removeFurniture
} from '../game/state'
import { getFloorPositions, getTableFurniture, getDoorPositions, canPlace, getCookStation, getTableByUid } from '../game/restaurantMap'
import { getItemsByCategory, getItemById, SHOP_CATEGORIES } from '../game/shop'

const TILE = 16
const SCALE = 3
const CELL = TILE * SCALE

const state = ref<GameState>(createInitialState())
const running = ref(false)
const shopOpen = ref(false)
const shopCat = ref<ShopCategory>('table')
const placingItem = ref<ShopItem | null>(null)
const hoverCell = ref<{ col: number; row: number } | null>(null)
let timer: number | null = null

const wallSprite = computed(() => sprites[state.value.wallpaperStyle] ?? sprites.wallWood)
const floorSprite = computed(() => sprites[state.value.floorStyle] ?? sprites.floorMarble)

const currentShopItems = computed(() => getItemsByCategory(shopCat.value))

const DISH_KEYS: Record<string, string> = {
  'recipe-0': 'dishEggRice',
  'recipe-1': 'dishTomatoEgg',
  'recipe-2': 'dishBraisedPork',
  'recipe-3': 'dishPotato',
  'recipe-4': 'dishPepperPork',
}
const ordersAtCook = computed(() =>
  state.value.orders.filter(o => o.phase === 'cooking' || o.phase === 'ready')
)
const ordersOnTable = computed(() =>
  state.value.orders.filter(o => o.phase === 'served')
)
function dishSprite(recipeId: string) {
  const key = DISH_KEYS[recipeId] ?? 'dish'
  return sprites[key as keyof typeof sprites]
}
function dishAtCookStyle(index: number) {
  const cook = getCookStation(state.value.furniture)
  if (!cook) return {}
  const offset = index * 8
  return {
    position: 'absolute' as const,
    left: `${cook.col * CELL + 24 + offset}px`,
    top: `${cook.row * CELL + 12}px`,
    zIndex: 20,
  }
}
function dishOnTableStyle(o: Order) {
  const t = getTableByUid(state.value.furniture, o.tableUid)
  if (!t) return {}
  return {
    position: 'absolute' as const,
    left: `${t.col * CELL + 16}px`,
    top: `${t.row * CELL + 8}px`,
    zIndex: t.row + 12,
  }
}

const canPlaceHere = computed(() => {
  if (!placingItem.value || !hoverCell.value) return false
  const item = placingItem.value
  if (item.width === 0) return true
  return canPlace(hoverCell.value.col, hoverCell.value.row, item.width, item.height, state.value.map, state.value.furniture)
})

const floorContainerStyle = computed(() => ({
  width: `${state.value.map.cols * CELL}px`,
  height: `${state.value.map.rows * CELL}px`,
}))

const layerStyle = computed(() => ({
  width: `${state.value.map.cols * CELL}px`,
  height: `${state.value.map.rows * CELL}px`,
}))

function tilePos(col: number, row: number, w: number, h: number) {
  return {
    position: 'absolute' as const,
    left: `${col * CELL}px`,
    top: `${row * CELL}px`,
    width: `${Math.max(w, 1) * CELL}px`,
    height: `${Math.max(h, 1) * CELL}px`,
  }
}

function furnitureSprite(f: PlacedFurniture): string {
  const item = getItemById(f.itemId)
  return item?.spriteKey ?? 'tableDoubleWood'
}

function pedestrianPos(p: { col: number; row: number; direction: number }) {
  return {
    position: 'absolute' as const,
    left: `${p.col * CELL}px`,
    top: `${p.row * CELL}px`,
    zIndex: p.row + 5,
    transform: p.direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
  }
}

function staffPos(index: number) {
  const floors = getFloorPositions(state.value.map, state.value.furniture)
  const pos = floors[index % Math.max(floors.length, 1)] ?? { col: 1, row: 1 }
  return { position: 'absolute' as const, left: `${pos.col * CELL}px`, top: `${pos.row * CELL}px`, zIndex: pos.row + 10 }
}

function customerPos(c: { tableUid?: string; id?: string }, index: number) {
  const doors = getDoorPositions(state.value.map)
  if (c.tableUid) {
    const t = getTableByUid(state.value.furniture, c.tableUid)
    if (t) {
      const atTable = state.value.customers.filter(x => x.tableUid === c.tableUid)
      const slot = atTable.findIndex(x => x.id === c.id)
      const dx = (slot % 2) * 0.4
      const dy = slot >= 2 ? 0.3 : 0
      return {
        position: 'absolute' as const,
        left: `${(t.col + dx) * CELL}px`,
        top: `${(t.row - 0.6 + dy) * CELL}px`,
        zIndex: t.row + 15
      }
    }
  }
  const d = doors[0] ?? { col: 6, row: 8 }
  return { position: 'absolute' as const, left: `${d.col * CELL}px`, top: `${(d.row - 1) * CELL}px`, zIndex: d.row + 15 }
}

function selectShopItem(item: ShopItem) {
  if (item.category === 'wallpaper' || item.category === 'floor') {
    if (state.value.money < item.price) {
      ElMessage.warning('金钱不足')
      return
    }
    const next = buyAndPlace(state.value, item.id, 0, 0)
    if (next) {
      state.value = next
      ElMessage.success(`已更换：${item.name}`)
    }
    return
  }
  placingItem.value = item
}

function onFloorMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const col = Math.floor((e.clientX - rect.left) / CELL)
  const row = Math.floor((e.clientY - rect.top) / CELL)
  hoverCell.value = { col, row }
}

function onFloorClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const col = Math.floor((e.clientX - rect.left) / CELL)
  const row = Math.floor((e.clientY - rect.top) / CELL)

  if (!placingItem.value) return
  const item = placingItem.value

  if (state.value.money < item.price) {
    ElMessage.warning('金钱不足')
    return
  }

  const next = buyAndPlace(state.value, item.id, col, row)
  if (next) {
    state.value = next
    ElMessage.success(`已放置：${item.name}`)
  } else {
    ElMessage.warning('无法放置在此位置')
  }
}

function onFurnitureClick(f: PlacedFurniture) {
  if (placingItem.value) return
  if (!shopOpen.value) return
  const item = getItemById(f.itemId)
  const refund = Math.floor((item?.price ?? 0) * 0.5)
  state.value = removeFurniture(state.value, f.uid)
  state.value = { ...state.value, money: state.value.money + refund }
  ElMessage.info(`已移除${item?.name ?? '家具'}，回收 ¥${refund}`)
}

function runSimulate() {
  if (running.value) return
  running.value = true
  timer = window.setInterval(() => { state.value = simulateMinute(state.value) }, 400)
}

function stopSimulate() {
  if (timer) { clearInterval(timer); timer = null }
  running.value = false
}

function doNextDay() {
  stopSimulate()
  state.value = nextDay(state.value)
}

function doHire() { state.value = hireStaff(state.value) }

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.restaurant-game { min-height: 100vh; padding: 16px; color: #e0e0e0; }

.game-header {
  display: flex; align-items: center; gap: 20px; margin-bottom: 16px;
  padding: 10px 16px; background: #3d3d3d; border-radius: 8px; flex-wrap: wrap;
}
.stat { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.actions { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; }

.game-body { display: flex; gap: 12px; }

/* 左侧 */
.side-panel {
  width: 180px; flex-shrink: 0; padding: 10px;
  background: #3d3d3d; border-radius: 8px; overflow-y: auto; max-height: 80vh;
}
.side-panel h3 { font-size: 13px; margin: 10px 0 4px; padding-bottom: 4px; border-bottom: 1px solid #555; color: #aaa; }
.side-panel h3:first-child { margin-top: 0; }
.staff-card { display: flex; gap: 6px; align-items: center; padding: 5px; margin-bottom: 4px; background: #2d2d2d; border-radius: 4px; }
.staff-info .small { font-size: 10px; color: #888; }
.recipe-row { display: flex; align-items: center; gap: 6px; padding: 2px 0; font-size: 12px; }

/* 餐厅 */
.restaurant-floor {
  position: relative; border-radius: 8px; overflow: hidden; flex-shrink: 0; cursor: pointer;
  box-shadow: 0 0 0 3px #4a3728, 0 4px 16px rgba(0,0,0,0.4);
}
.tile-layer, .furniture-layer, .dish-layer, .npc-layer { position: absolute; top: 0; left: 0; pointer-events: none; }
.furniture-layer { pointer-events: auto; }
.tile { overflow: hidden; }
.furniture-item { display: flex; align-items: center; justify-content: center; cursor: pointer; }
.furniture-item:hover { outline: 2px solid rgba(255,200,50,0.6); border-radius: 2px; }

.place-preview {
  position: absolute; background: rgba(100, 200, 100, 0.35); border: 2px dashed #67c23a;
  pointer-events: none; z-index: 50; border-radius: 4px;
}
.place-preview.invalid { background: rgba(200, 60, 60, 0.35); border-color: #f56c6c; }

.npc { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; transition: left 0.3s, top 0.3s; }
.patience-bar { width: 32px; height: 3px; background: #555; border-radius: 2px; margin-top: 2px; overflow: hidden; }
.patience-fill { height: 100%; background: #67c23a; transition: width 0.3s; }

/* 商店 */
.shop-panel {
  width: 240px; flex-shrink: 0; padding: 10px;
  background: #3d3d3d; border-radius: 8px; overflow-y: auto; max-height: 80vh;
}
.shop-panel h3 { font-size: 14px; margin: 0 0 8px; color: #e0e0e0; }
.shop-tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
.shop-list { display: flex; flex-direction: column; gap: 6px; }
.shop-item {
  display: flex; gap: 8px; padding: 8px; background: #2d2d2d; border-radius: 6px;
  cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s;
}
.shop-item:hover { border-color: #555; }
.shop-item.selected { border-color: #409eff; }
.shop-item-info { flex: 1; min-width: 0; }
.shop-item-name { font-size: 13px; font-weight: 600; }
.shop-item-price { font-size: 12px; color: #e6a23c; }
.shop-item-desc { font-size: 11px; color: #888; margin-top: 2px; }
.shop-item-size { font-size: 10px; color: #666; }
.shop-hint { margin-top: 8px; font-size: 12px; color: #aaa; padding: 6px; background: #2d2d2d; border-radius: 4px; }

.tip { margin-top: 16px; font-size: 12px; color: #666; }
.tip a { color: #409eff; }
</style>
