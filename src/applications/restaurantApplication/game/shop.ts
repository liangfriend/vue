import type { ShopItem, ShopCategory } from '../types'

export const SHOP_ITEMS: ShopItem[] = [
  // ---- 桌椅套装 ----
  { id: 'tableSingleWood', name: '单人木桌', category: 'table', price: 150, width: 1, height: 2, spriteKey: 'tableSingleWood', description: '1桌+1椅，1人位', seats: 1 },
  { id: 'tableDoubleWood', name: '双人木桌', category: 'table', price: 300, width: 2, height: 2, spriteKey: 'tableDoubleWood', description: '2桌+2椅，2人位', seats: 2 },
  { id: 'tableQuadWood', name: '四人木桌', category: 'table', price: 500, width: 2, height: 3, spriteKey: 'tableQuadWood', description: '2桌+4椅，4人位', seats: 4 },
  { id: 'tableSingleMarble', name: '单人大理石桌', category: 'table', price: 350, width: 1, height: 2, spriteKey: 'tableSingleMarble', description: '1桌+1椅，吸引文艺青年', seats: 1 },
  { id: 'tableDoubleMarble', name: '双人大理石桌', category: 'table', price: 600, width: 2, height: 2, spriteKey: 'tableDoubleMarble', description: '2桌+2椅，高级感', seats: 2 },
  { id: 'tableQuadMarble', name: '四人大理石桌', category: 'table', price: 900, width: 2, height: 3, spriteKey: 'tableQuadMarble', description: '2桌+4椅，家庭聚会', seats: 4 },

  // ---- 墙纸 (全局替换，尺寸 0x0 表示不占格) ----
  { id: 'wpWood', name: '木墙纸', category: 'wallpaper', price: 0, width: 0, height: 0, spriteKey: 'wallWood', description: '温馨的木纹墙纸（初始）' },
  { id: 'wpBrick', name: '砖墙纸', category: 'wallpaper', price: 300, width: 0, height: 0, spriteKey: 'wallBrick', description: '工业风红砖墙' },
  { id: 'wpFlower', name: '花纹墙纸', category: 'wallpaper', price: 500, width: 0, height: 0, spriteKey: 'wallFlower', description: '清新田园花纹，吸引文艺青年' },
  { id: 'wpPremium', name: '高级壁纸', category: 'wallpaper', price: 1000, width: 0, height: 0, spriteKey: 'wallPremium', description: '深色高级壁纸，提升餐厅档次' },

  // ---- 地板 (全局替换) ----
  { id: 'flMarble', name: '白色大理石', category: 'floor', price: 0, width: 0, height: 0, spriteKey: 'floorMarble', description: '干净的白色大理石地板（初始）' },
  { id: 'flWood', name: '木地板', category: 'floor', price: 400, width: 0, height: 0, spriteKey: 'floorWood', description: '温暖的木质地板' },
  { id: 'flTile', name: '瓷砖地板', category: 'floor', price: 600, width: 0, height: 0, spriteKey: 'floorTile', description: '经典方格瓷砖' },
  { id: 'flStone', name: '高级石材', category: 'floor', price: 1200, width: 0, height: 0, spriteKey: 'floorStone', description: '灰色高级石材，提升档次' },

  // ---- 装饰 ----
  { id: 'decoPlant', name: '绿植', category: 'decoration', price: 100, width: 1, height: 1, spriteKey: 'decoPlant', description: '提升氛围，让顾客心情好' },
  { id: 'decoPainting', name: '画框', category: 'decoration', price: 200, width: 1, height: 1, spriteKey: 'decoPainting', description: '吸引文艺青年' },
  { id: 'decoFishtank', name: '鱼缸', category: 'decoration', price: 300, width: 1, height: 1, spriteKey: 'decoFishtank', description: '吸引家庭客和小孩' },
  { id: 'decoSpeaker', name: '音响', category: 'decoration', price: 400, width: 1, height: 1, spriteKey: 'decoSpeaker', description: '播放背景音乐，吸引学生' },

  // ---- 功能家具 ----
  { id: 'cashRegister', name: '收银台', category: 'functional', price: 800, width: 2, height: 1, spriteKey: 'cashRegister', description: '结账必备，每店至少一个', functional: true },
  { id: 'cookStation', name: '烹饪区', category: 'functional', price: 1000, width: 2, height: 1, spriteKey: 'cookStation', description: '炉灶操作台，厨师做菜的地方', functional: true },
]

export function getItemsByCategory(cat: ShopCategory): ShopItem[] {
  return SHOP_ITEMS.filter(i => i.category === cat)
}

export function getItemById(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find(i => i.id === id)
}

export const SHOP_CATEGORIES: { key: ShopCategory; label: string }[] = [
  { key: 'table', label: '桌椅' },
  { key: 'decoration', label: '装饰' },
  { key: 'functional', label: '功能家具' },
  { key: 'wallpaper', label: '墙纸' },
  { key: 'floor', label: '地板' },
]
