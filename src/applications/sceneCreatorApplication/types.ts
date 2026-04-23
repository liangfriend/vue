export type Scene = {
    floor: Floor[]
    unit: number
}

export type Floor = {
    floor: Block[][]
    height: number
}

export type Wall = {
    texture_in: string,
    texture_out: string,
    opacity: number
}

export type Block = {
    texture_in: string,
    texture_out: string,
    walls: {
        front: Wall | null
        back: Wall | null
        left: Wall | null
        right: Wall | null
    }
}
