export type Scene = {
    floor: Floor[]
    unit: number, // 每一地板砖雕像素值
}

export type Floor = {
  floor: Block[][]
  wall: Block[][]
  height: number
}
export type Block = {
    type: 'floor' | 'r-wall' | 'l-wall' | 'b-wall' | 'f-wall' | 'blank'
    texture: string
    anchor: boolean // 用于楼层连接的锚点。一般来讲，一层应该只有一块砖是锚点
}
