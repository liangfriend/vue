/**
 * 单像素 RGBA 数据，r/g/b 0-255，a 0-255
 */
export interface PixelRGBA {
  r: number
  g: number
  b: number
  a: number
}

/**
 * 像素画 JSON 格式
 * content[y][x] 行优先
 */
export interface PixelArtData {
  width: number
  height: number
  content: PixelRGBA[][]
}

export function createEmptyPixel(r = 255, g = 255, b = 255, a = 255): PixelRGBA {
  return { r, g, b, a }
}

export function createEmptyGrid(width: number, height: number, fill?: PixelRGBA): PixelRGBA[][] {
  const defaultFill = fill ?? createEmptyPixel(255, 255, 255, 255)
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ ...defaultFill }))
  )
}
