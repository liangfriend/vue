export const DefaultColor = {
  floor: '#cccccc',
  front: '#ff0000',
  back: '#00ff00',
  left: '#ccff00',
  right: '#0000ff'
}

export type MaterialItem = {
  id: string
  name: string
  category: 'floor' | 'wall'
  path: string
}

export const MaterialList: MaterialItem[] = [
  { id: 'floor/wood', name: '木地板', category: 'floor', path: 'floor/wood.svg' },
  { id: 'floor/tile', name: '瓷砖', category: 'floor', path: 'floor/tile.svg' },
  { id: 'floor/marble', name: '大理石', category: 'floor', path: 'floor/marble.svg' },
  { id: 'wall/brick', name: '砖墙', category: 'wall', path: 'wall/brick.svg' },
  { id: 'wall/stone', name: '石墙', category: 'wall', path: 'wall/stone.svg' }
]
