export type Scene = {
    floor: Floor[]
    unit: number
}

export type Floor = {
    floor: Block[][]
    height: number
}

export type Wall = {
    texture: string,
    opacity:  number
}

export type Block = {
    walls: {
        front: Wall | null
        back: Wall | null
        left: Wall | null
        right: Wall | null
    }
}
