import type { RestaurantMap, Tile, TileType, PlacedFurniture } from '../types'

/**
 * 街道场景 14x12
 * G=草地 W=墙 . =地板 D=门 R=马路
 *
 *   G G W W W W W W W W W W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W . . . . . . . . W G G
 *   G G W W W W D D W W W W G G
 *   G G G G G G G G G G G G G G
 *   R R R R R R R R R R R R R R
 *   R R R R R R R R R R R R R R
 */

type MapChar = 'W' | '.' | 'D' | 'G' | 'R'

const MAP_TEMPLATE: MapChar[][] = [
  ['G','G','W','W','W','W','W','W','W','W','W','W','G','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','.','.','.','.','.','.','.','.','.','W','G'],
  ['G','G','W','W','W','W','D','D','W','W','W','W','G','G'],
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
  ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
]

function charToTile(ch: MapChar): Tile {
  const mapping: Record<MapChar, TileType> = {
    'W': 'wall',
    '.': 'floor',
    'D': 'door',
    'G': 'grass',
    'R': 'road',
  }
  return { type: mapping[ch] }
}

export function createInitialMap(): RestaurantMap {
  const rows = MAP_TEMPLATE.length
  const cols = MAP_TEMPLATE[0].length
  const tiles = MAP_TEMPLATE.map(row => row.map(charToTile))
  return { cols, rows, tiles }
}

let _uid = 0
function uid() { return `furn_${++_uid}_${Date.now()}` }

export function createInitialFurniture(): PlacedFurniture[] {
  return [
    { uid: uid(), itemId: 'tableDoubleWood', col: 3, row: 1, width: 2, height: 2 },
    { uid: uid(), itemId: 'tableDoubleWood', col: 7, row: 1, width: 2, height: 2 },
    { uid: uid(), itemId: 'cookStation', col: 4, row: 4, width: 2, height: 1 },
    { uid: uid(), itemId: 'cashRegister', col: 8, row: 6, width: 2, height: 1 },
  ]
}

export function getDoorPositions(map: RestaurantMap): { col: number; row: number }[] {
  const positions: { col: number; row: number }[] = []
  for (let r = 0; r < map.rows; r++)
    for (let c = 0; c < map.cols; c++)
      if (map.tiles[r][c].type === 'door') positions.push({ col: c, row: r })
  return positions
}

/** 马路上可走格子（行人行走区域） */
export function getRoadPositions(map: RestaurantMap): { col: number; row: number }[] {
  const positions: { col: number; row: number }[] = []
  for (let r = 0; r < map.rows; r++)
    for (let c = 0; c < map.cols; c++)
      if (map.tiles[r][c].type === 'road') positions.push({ col: c, row: r })
  return positions
}

/** 门前区域：门在 cols 6-7，草地 row 9，马路 rows 10-11 */
export function isNearDoor(col: number, row: number): boolean {
  return row >= 9 && row <= 11 && col >= 5 && col <= 8
}

export function getFloorPositions(map: RestaurantMap, furniture: PlacedFurniture[]): { col: number; row: number }[] {
  const occupied = new Set<string>()
  for (const f of furniture)
    for (let dy = 0; dy < f.height; dy++)
      for (let dx = 0; dx < f.width; dx++)
        occupied.add(`${f.col + dx},${f.row + dy}`)

  const positions: { col: number; row: number }[] = []
  for (let r = 0; r < map.rows; r++)
    for (let c = 0; c < map.cols; c++)
      if (map.tiles[r][c].type === 'floor' && !occupied.has(`${c},${r}`))
        positions.push({ col: c, row: r })
  return positions
}

export function isCellOccupied(col: number, row: number, furniture: PlacedFurniture[]): boolean {
  return furniture.some(f =>
    col >= f.col && col < f.col + f.width &&
    row >= f.row && row < f.row + f.height
  )
}

export function canPlace(col: number, row: number, w: number, h: number, map: RestaurantMap, furniture: PlacedFurniture[]): boolean {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const c = col + dx
      const r = row + dy
      if (c < 0 || c >= map.cols || r < 0 || r >= map.rows) return false
      if (map.tiles[r][c].type !== 'floor') return false
      if (isCellOccupied(c, r, furniture)) return false
    }
  }
  return true
}

const DINING_SET_IDS = new Set([
  'tableSingleWood', 'tableDoubleWood', 'tableQuadWood',
  'tableSingleMarble', 'tableDoubleMarble', 'tableQuadMarble'
])

export function getTableFurniture(furniture: PlacedFurniture[]): PlacedFurniture[] {
  return furniture.filter(f => DINING_SET_IDS.has(f.itemId))
}

export function getSeatsForFurniture(f: PlacedFurniture): number {
  const seatsMap: Record<string, number> = {
    tableSingleWood: 1, tableSingleMarble: 1,
    tableDoubleWood: 2, tableDoubleMarble: 2,
    tableQuadWood: 4, tableQuadMarble: 4,
  }
  return seatsMap[f.itemId] ?? 0
}

export function getCookStation(furniture: PlacedFurniture[]): PlacedFurniture | undefined {
  return furniture.find(f => f.itemId === 'cookStation')
}

export function getTableByUid(furniture: PlacedFurniture[], uid: string): PlacedFurniture | undefined {
  return furniture.find(f => f.uid === uid)
}
