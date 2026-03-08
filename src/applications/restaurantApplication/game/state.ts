import type { Staff, Customer, GameState, PlacedFurniture, Order } from '../types'
import { sprites } from '../assets/sprites'
import type { Pedestrian } from '../types'
import {
  createInitialMap,
  createInitialFurniture,
  canPlace,
  getTableFurniture,
  getSeatsForFurniture,
  getRoadPositions,
  isNearDoor,
} from './restaurantMap'
import { getItemById } from './shop'

const STAFF_NAMES = ['老王', '小李', '大张', '小刘', '阿芳']
const RECIPE_NAMES = ['蛋炒饭', '番茄鸡蛋', '红烧肉', '酸辣土豆丝', '青椒肉丝']
const DISH_SPRITE_KEYS = ['dishEggRice', 'dishTomatoEgg', 'dishBraisedPork', 'dishPotato', 'dishPepperPork']

function uuid() { return Math.random().toString(36).slice(2, 11) }

export function createInitialState(): GameState {
  return {
    day: 1,
    money: 5000,
    reputation: 20,
    staff: [{
      id: uuid(), name: '小王',
      stats: { speed: 3, cooking: 4, clean: 2, charm: 3 },
      proficiency: { speed: 0, cooking: 0, clean: 0, charm: 0 },
      salary: 80, mood: 80, sprite: sprites.chef
    }],
    recipes: RECIPE_NAMES.map((name, i) => ({
      id: `recipe-${i}`, name,
      ingredients: [{ id: 'rice', amount: 1 }, { id: 'egg', amount: 1 }],
      basePrice: 12 + i * 5, stars: 1, cookTime: 12 + i * 6,
      sprite: sprites[DISH_SPRITE_KEYS[i] as keyof typeof sprites] ?? sprites.dish
    })),
    ingredients: { rice: 50, egg: 100, pork: 30, veg: 50 },
    customers: [],
    orders: [],
    pedestrians: [],
    furniture: createInitialFurniture(),
    wallpaperStyle: 'wallWood',
    floorStyle: 'floorMarble',
    map: createInitialMap()
  }
}

function createCustomerFromPedestrian(_p: Pedestrian): Customer {
  const types = ['student', 'worker', 'artist', 'family', 'elder'] as const
  const type = types[Math.floor(Math.random() * types.length)]
  const sp = type === 'worker' || type === 'family' ? sprites.customerWorker : sprites.customerStudent
  return {
    id: uuid(), type,
    patience: 80 + Math.random() * 20,
    mood: 100, sprite: sp
  }
}

/** 吸引概率：名声×兴趣×基础系数 */
function shouldEnterRestaurant(reputation: number, interest: number): boolean {
  const baseRate = 0.8
  const p = Math.min(0.95, (reputation / 100) * interest * baseRate + 0.1)
  return Math.random() < p
}

export function simulateMinute(state: GameState): GameState {
  const map = state.map
  const roadCells = getRoadPositions(map)
  if (roadCells.length === 0) return state

  let next: GameState = {
    ...state,
    customers: [...state.customers],
    orders: state.orders.map(o => ({ ...o })),
    pedestrians: [] as Pedestrian[],
  }

  // 1. 刷新行人：移动 + 吸引进店
  for (const p of state.pedestrians) {
    let nc = p.col + p.direction
    let dir = p.direction
    if (nc < 0 || nc >= map.cols) {
      nc = p.col
      dir = (dir * -1) as -1 | 1
    }
    const newRow = p.row
    const tile = map.tiles[newRow]?.[nc]
    if (tile?.type !== 'road') {
      nc = p.col
      dir = (dir * -1) as -1 | 1
    }
    const atDoor = isNearDoor(nc, newRow)
    if (atDoor && shouldEnterRestaurant(state.reputation, p.interest)) {
      next.customers = [...next.customers, createCustomerFromPedestrian(p)]
      continue
    }
    next.pedestrians.push({ ...p, col: nc, row: newRow, direction: dir })
  }

  // 2. 刷新人
  if (Math.random() < 0.35) {
    const left = roadCells.filter(c => c.col <= 2)
    const right = roadCells.filter(c => c.col >= map.cols - 3)
    const spawnSide = left.length && (!right.length || Math.random() < 0.5) ? left : right
    const cell = spawnSide[Math.floor(Math.random() * spawnSide.length)]
    if (cell) {
      const dir = cell.col <= 2 ? 1 : -1
      next.pedestrians.push({
        id: uuid(), col: cell.col, row: cell.row, direction: dir,
        interest: 0.3 + Math.random() * 0.7,
        sprite: Math.random() < 0.5 ? sprites.customerStudent : sprites.customerWorker,
      })
    }
  }

  const tables = getTableFurniture(next.furniture)
  const maxSeats = tables.reduce((s, t) => s + getSeatsForFurniture(t), 0)
  const chef = next.staff[0]
  const waiterCount = Math.max(1, next.staff.length - 1)

  // 3. 分配顾客到桌子（每桌按座位数分配）
  const seatsUsed = new Map<string, number>()
  for (const c of next.customers) {
    if (c.tableUid) seatsUsed.set(c.tableUid, (seatsUsed.get(c.tableUid) ?? 0) + 1)
  }
  for (const c of next.customers) {
    if (c.tableUid) continue
    for (const t of tables) {
      const used = seatsUsed.get(t.uid) ?? 0
      const cap = getSeatsForFurniture(t)
      if (used < cap) {
        next.customers = next.customers.map(x =>
          x.id === c.id ? { ...x, tableUid: t.uid } : x
        )
        seatsUsed.set(t.uid, used + 1)
        break
      }
    }
  }

  // 4. 点单：无订单的顾客随机点菜
  for (const c of next.customers) {
    if (!c.tableUid || c.orderRecipeId) continue
    const recipe = next.recipes[Math.floor(Math.random() * next.recipes.length)]
    if (!recipe) continue
    const order: Order = {
      id: uuid(),
      customerId: c.id,
      recipeId: recipe.id,
      tableUid: c.tableUid,
      phase: 'ordered',
      progress: 0,
      cookTime: recipe.cookTime,
    }
    next.orders = [...next.orders, order]
    next.customers = next.customers.map(x =>
      x.id === c.id ? { ...x, orderRecipeId: recipe.id } : x
    )
  }

  // 5. 厨师接单并烹饪
  const ordered = next.orders.filter(o => o.phase === 'ordered')
  const cooking = next.orders.filter(o => o.phase === 'cooking')
  if (chef && ordered.length > 0 && cooking.length < 1) {
    const pick = ordered[0]
    next.orders = next.orders.map(o =>
      o.id === pick.id ? { ...o, phase: 'cooking' as const } : o
    )
  }
  next.orders = next.orders.map(o => {
    if (o.phase !== 'cooking') return o
    const prog = o.progress + (chef?.stats.cooking ?? 2)
    return { ...o, progress: prog, phase: prog >= o.cookTime ? 'ready' : 'cooking' }
  })

  // 6. 服务员端菜
  const ready = next.orders.filter(o => o.phase === 'ready')
  if (waiterCount > 0 && ready.length > 0) {
    const pick = ready[0]
    next.orders = next.orders.map(o =>
      o.id === pick.id ? { ...o, phase: 'served' as const } : o
    )
  }

  // 7. 上菜完成：收钱、移除顾客和订单
  const servedOrders = next.orders.filter(o => o.phase === 'served')
  let revenue = 0
  const servedCustomerIds = new Set(servedOrders.map(o => o.customerId))
  for (const o of servedOrders) {
    const r = next.recipes.find(x => x.id === o.recipeId)
    revenue += r?.basePrice ?? 25
  }
  next.orders = next.orders.filter(o => o.phase !== 'served')
  next.customers = next.customers.filter(c => !servedCustomerIds.has(c.id))
  next = { ...next, money: next.money + revenue, reputation: Math.min(100, next.reputation + servedOrders.length * 0.5) }

  next.customers = next.customers.map(c => ({
    ...c,
    patience: Math.max(0, c.patience - 2),
    mood: c.patience < 30 ? Math.max(0, c.mood - 5) : c.mood
  }))
  next.customers = next.customers.filter(c => c.patience > 0)
  return next
}

export function nextDay(state: GameState): GameState {
  const staffCost = state.staff.reduce((sum, s) => sum + s.salary, 0)
  return { ...state, day: state.day + 1, money: state.money - staffCost }
}

export function hireStaff(state: GameState): GameState {
  const cost = 500
  if (state.money < cost || state.staff.length >= 5) return state
  const name = STAFF_NAMES[state.staff.length % STAFF_NAMES.length]
  const staff: Staff = {
    id: uuid(), name,
    stats: { speed: 2, cooking: 2, clean: 2, charm: 2 },
    proficiency: { speed: 0, cooking: 0, clean: 0, charm: 0 },
    salary: 60, mood: 100, sprite: sprites.waiter
  }
  return { ...state, money: state.money - cost, staff: [...state.staff, staff] }
}

export function buyAndPlace(
  state: GameState, itemId: string, col: number, row: number
): GameState | null {
  const item = getItemById(itemId)
  if (!item) return null

  if (item.category === 'wallpaper') {
    if (state.money < item.price) return null
    return { ...state, money: state.money - item.price, wallpaperStyle: item.spriteKey }
  }
  if (item.category === 'floor') {
    if (state.money < item.price) return null
    return { ...state, money: state.money - item.price, floorStyle: item.spriteKey }
  }

  if (state.money < item.price) return null
  if (!canPlace(col, row, item.width, item.height, state.map, state.furniture)) return null

  const placed: PlacedFurniture = {
    uid: `furn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    itemId: item.id,
    col, row,
    width: item.width,
    height: item.height,
  }
  return {
    ...state,
    money: state.money - item.price,
    furniture: [...state.furniture, placed],
  }
}

export function removeFurniture(state: GameState, uid: string): GameState {
  return { ...state, furniture: state.furniture.filter(f => f.uid !== uid) }
}
