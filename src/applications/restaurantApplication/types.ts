import type { PixelArtData } from '@/applications/pixelCreatorApplicaton/types'

export interface StaffStats {
  speed: number
  cooking: number
  clean: number
  charm: number
}

export interface StaffProficiency {
  speed: number
  cooking: number
  clean: number
  charm: number
}

export interface Staff {
  id: string
  name: string
  stats: StaffStats
  proficiency: StaffProficiency
  salary: number
  mood: number
  sprite?: PixelArtData
}

export type DishQuality = 'perfect' | 'normal' | 'undercooked' | 'burnt'

export interface Recipe {
  id: string
  name: string
  ingredients: { id: string; amount: number }[]
  basePrice: number
  stars: number
  cookTime: number
  sprite?: PixelArtData
}

export interface Ingredient {
  id: string
  name: string
  basePrice: number
  currentPrice: number
}

export type CustomerType = 'student' | 'worker' | 'artist' | 'family' | 'elder'

export interface Customer {
  id: string
  type: CustomerType
  patience: number
  mood: number
  order?: string
  /** 坐下的桌子的 uid */
  tableUid?: string
  /** 已点的菜谱 id */
  orderRecipeId?: string
  sprite?: PixelArtData
}

/** 订单状态 */
export type OrderPhase = 'ordered' | 'cooking' | 'ready' | 'served'

/** 订单（点单→烹饪→上菜） */
export interface Order {
  id: string
  customerId: string
  recipeId: string
  tableUid: string
  phase: OrderPhase
  /** 烹饪进度 0..cookTime */
  progress: number
  cookTime: number
}

export type TileType = 'wall' | 'floor' | 'door' | 'grass' | 'road'

export interface Tile {
  type: TileType
}

/** 街上的行人（未进店） */
export interface Pedestrian {
  id: string
  col: number
  row: number
  direction: -1 | 1  // -1=左, 1=右
  interest: number   // 0-1，进店兴趣
  sprite?: PixelArtData
}

/** 已放置家具 */
export interface PlacedFurniture {
  uid: string
  itemId: string
  col: number
  row: number
  width: number
  height: number
}

/** 商店家具分类 */
export type ShopCategory = 'table' | 'wallpaper' | 'floor' | 'decoration' | 'functional'

/** 商店商品 */
export interface ShopItem {
  id: string
  name: string
  category: ShopCategory
  price: number
  width: number
  height: number
  spriteKey: string
  description: string
  functional?: boolean
  /** 桌椅套装座位数 */
  seats?: number
}

export interface RestaurantMap {
  cols: number
  rows: number
  tiles: Tile[][]
}

export interface GameState {
  day: number
  money: number
  reputation: number
  staff: Staff[]
  recipes: Recipe[]
  ingredients: Record<string, number>
  customers: Customer[]
  orders: Order[]
  pedestrians: Pedestrian[]
  furniture: PlacedFurniture[]
  wallpaperStyle: string
  floorStyle: string
  map: RestaurantMap
}
