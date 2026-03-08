import type { PixelArtData, PixelRGBA } from '@/applications/pixelCreatorApplicaton/types'

type C = [number, number, number, number]
const T: C = [0, 0, 0, 0]

function fromPalette(w: number, h: number, map: string[], palette: Record<string, C>): PixelArtData {
  const content: PixelRGBA[][] = []
  for (let y = 0; y < h; y++) {
    const row: PixelRGBA[] = []
    const line = map[y] ?? ''
    for (let x = 0; x < w; x++) {
      const ch = line[x] ?? ' '
      const c = palette[ch] ?? T
      row.push({ r: c[0], g: c[1], b: c[2], a: c[3] })
    }
    content.push(row)
  }
  return { width: w, height: h, content }
}

function solid(w: number, h: number, r: number, g: number, b: number, a = 255): PixelArtData {
  return {
    width: w, height: h,
    content: Array.from({ length: h }, () =>
      Array.from({ length: w }, () => ({ r, g, b, a }))
    )
  }
}

const _ = ' '

// ====================== 墙纸 ======================
// 木墙纸 (初始)
const wallWoodP: Record<string, C> = {
  'A': [170, 120, 60, 255], 'B': [150, 105, 50, 255],
  'C': [140, 95, 45, 255], 'L': [130, 85, 40, 255], [_]: T,
}
const wallWoodMap = [
  'AABBCCAABBCCAABB',
  'AABBCCAABBCCAABB',
  'LLLLLLLLLLLLLLLL',
  'CCAABBCCAABBCCAA',
  'CCAABBCCAABBCCAA',
  'LLLLLLLLLLLLLLLL',
  'AABBCCAABBCCAABB',
  'AABBCCAABBCCAABB',
  'LLLLLLLLLLLLLLLL',
  'CCAABBCCAABBCCAA',
  'CCAABBCCAABBCCAA',
  'LLLLLLLLLLLLLLLL',
  'AABBCCAABBCCAABB',
  'AABBCCAABBCCAABB',
  'LLLLLLLLLLLLLLLL',
  'CCAABBCCAABBCCAA',
]

// 砖墙纸
const wallBrickP: Record<string, C> = {
  'B': [180, 120, 80, 255], 'M': [160, 105, 70, 255],
  'G': [140, 100, 65, 255], [_]: T,
}
const wallBrickMap = [
  'BBBGMMMMGBBBGMMM',
  'BBBGMMMMGBBBGMMM',
  'GGGGGGGGGGGGGGGG',
  'MGBBBBGMMMMGBBBB',
  'MGBBBBGMMMMGBBBB',
  'GGGGGGGGGGGGGGGG',
  'BBBGMMMMGBBBGMMM',
  'BBBGMMMMGBBBGMMM',
  'GGGGGGGGGGGGGGGG',
  'MGBBBBGMMMMGBBBB',
  'MGBBBBGMMMMGBBBB',
  'GGGGGGGGGGGGGGGG',
  'BBBGMMMMGBBBGMMM',
  'BBBGMMMMGBBBGMMM',
  'GGGGGGGGGGGGGGGG',
  'MGBBBBGMMMMGBBBB',
]

// 花纹墙纸
const wallFlowerP: Record<string, C> = {
  'B': [240, 230, 210, 255], 'F': [200, 160, 160, 255],
  'L': [180, 220, 180, 255], 'G': [230, 220, 200, 255], [_]: T,
}
const wallFlowerMap = [
  'BBBBBBBBBBBBBBBB',
  'BBBBFBBBBBBBFBBB',
  'BBBFLFBBBBBBFLFB',
  'BBBBFBBBBBBBFBBB',
  'BBBBGBBBBBBBGBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBFBBBBBBFBBBBB',
  'BBFLFBBBBBFLFBBB',
  'BBBFBBBBBBFBBBBB',
  'BBBGBBBBBBGBBBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBB',
]

// 高级壁纸
const wallPremP: Record<string, C> = {
  'A': [60, 50, 80, 255], 'B': [70, 60, 90, 255],
  'G': [180, 160, 100, 255], 'L': [50, 40, 70, 255], [_]: T,
}
const wallPremMap = [
  'AABBAALLAABBAA',
  'AABBAALLAABBAA',
  'BBAAGGBBAAGGBB',
  'BBAAGGBBAAGGBB',
  'AABBAALLAABBAA',
  'AABBAALLAABBAA',
  'LLGGBBLLGGBBLL',
  'LLGGBBLLGGBBLL',
  'AABBAALLAABBAA',
  'AABBAALLAABBAA',
  'BBAAGGBBAAGGBB',
  'BBAAGGBBAAGGBB',
  'AABBAALLAABBAA',
  'AABBAALLAABBAA',
  'LLGGBBLLGGBBLL',
  'LLGGBBLLGGBBLL',
]

// ====================== 地板 ======================
// 白色大理石 (初始)
const floorMarbleP: Record<string, C> = {
  'W': [245, 245, 248, 255], 'G': [230, 230, 235, 255],
  'L': [220, 222, 228, 255], [_]: T,
}
const floorMarbleMap = [
  'WWWWWWWGLWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWLWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'GGGGGGGGGGGGGGGG',
  'WWWWWWWWWWWWWWWW',
  'WWWLWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWGWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWW',
  'GGGGGGGGGGGGGGGG',
]

// 木地板
const floorWoodP: Record<string, C> = {
  'A': [200, 160, 100, 255], 'B': [185, 145, 90, 255],
  'L': [170, 130, 80, 255], [_]: T,
}
const floorWoodMap = [
  'AAAAAALLAAAABALL',
  'AAAAAALLAAAABALL',
  'AAAAAALLAAAABALL',
  'AAAAAALLAAAABALL',
  'LLLLLLLLLLLLLLLL',
  'BBAAAALLAALLAAAA',
  'BBAAAALLAALLAAAA',
  'BBAAAALLAALLAAAA',
  'BBAAAALLAALLAAAA',
  'LLLLLLLLLLLLLLLL',
  'AALLBBAAAALLAAAA',
  'AALLBBAAAALLAAAA',
  'AALLBBAAAALLAAAA',
  'AALLBBAAAALLAAAA',
  'LLLLLLLLLLLLLLLL',
  'AAAAAALLAAAABALL',
]

// 瓷砖地板
const floorTileP: Record<string, C> = {
  'A': [235, 215, 185, 255], 'B': [225, 200, 170, 255],
  'L': [210, 190, 160, 255], [_]: T,
}
const floorTileMap = [
  'LLAAAAAAALBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAABBBBBBBB',
  'AAAAAAAALLBBBBBB',
  'LLBBBBBBBBAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBAAAAAAAA',
  'BBBBBBBBLLAAAALL',
]

// 高级石材
const floorStoneP: Record<string, C> = {
  'A': [180, 180, 190, 255], 'B': [170, 170, 180, 255],
  'G': [160, 160, 172, 255], 'L': [150, 150, 162, 255], [_]: T,
}
const floorStoneMap = [
  'AABBGGAABBGGAABB',
  'AABBGGAABBGGAABB',
  'LLLLLLLLLLLLLLLL',
  'GGAABBGGAABBGGAA',
  'GGAABBGGAABBGGAA',
  'LLLLLLLLLLLLLLLL',
  'AABBGGAABBGGAABB',
  'AABBGGAABBGGAABB',
  'LLLLLLLLLLLLLLLL',
  'GGAABBGGAABBGGAA',
  'GGAABBGGAABBGGAA',
  'LLLLLLLLLLLLLLLL',
  'AABBGGAABBGGAABB',
  'AABBGGAABBGGAABB',
  'LLLLLLLLLLLLLLLL',
  'GGAABBGGAABBGGAA',
]

// ====================== 草地 ======================
const grassP: Record<string, C> = {
  'A': [80, 160, 60, 255], 'B': [60, 140, 50, 255],
  'C': [70, 150, 55, 255], 'D': [55, 130, 48, 255], [_]: T,
}
const grassMap = [
  'AABBCDAABBCDAABB',
  'BBAACDBBAACDBBAA',
  'CDAABBCCDDAABBCC',
  'AABBCCDDAABBCCDD',
  'BBCCDDAABBCCDDAA',
  'CCDDAABBCCDDAABB',
  'DDAABBCCDDAABBCC',
  'AABBCCDDAABBCCDD',
  'BBCCDDAABBCCDDAA',
  'CCDDAABBCCDDAABB',
  'DDAABBCCDDAABBCC',
  'AABBCCDDAABBCCDD',
  'BBCCDDAABBCCDDAA',
  'CCDDAABBCCDDAABB',
  'DDAABBCCDDAABBCC',
  'AABBCCDDAABBCCDD',
]

// ====================== 马路 ======================
const roadP: Record<string, C> = {
  'A': [70, 70, 72, 255], 'B': [60, 60, 62, 255],
  'L': [55, 55, 57, 255], 'W': [255, 255, 200, 255], [_]: T,
}
const roadMap = [
  'AAAAAAAAAAAAAAAA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBWBBBBABA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBWBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBWBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ABBBBBBBBBBBBBBA',
  'ALLLLLLLLLLLLLLA',
  'AAAAAAAAAAAAAAAA',
  'AAAAAAAAAAAAAAAA',
]

// ====================== 门 ======================
const doorP: Record<string, C> = {
  'G': [60, 40, 15, 255], 'D': [120, 70, 30, 255],
  'H': [90, 50, 20, 255], 'K': [200, 180, 50, 255],
  '.': [40, 30, 15, 255], [_]: T,
}
const doorMap = [
  'GDDDDDDDDDDDDGG',
  'GDDDDDDDDDDDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDDDDDDKDDDDDG',
  'GDDDDDDDKDDDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDD......DDDDG',
  'GDDDDDDDDDDDDDG',
  'GDDDDDDDDDDDDDG',
  'GHHHHHHHHHHHHHHG',
  'GGGGGGGGGGGGGGGG',
]

// ====================== 桌椅（纯顶视图，无桌腿）======================
// 单人桌 16x32 (1桌格+1椅格)
const tableSingleWoodP: Record<string, C> = {
  'E': [140, 95, 45, 255], 'W': [180, 130, 70, 255], 'D': [160, 110, 55, 255],
  'F': [120, 80, 40, 255], 'S': [170, 120, 70, 255], [_]: T,
}
const tableSingleWoodMap = [
  'EEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWDWWE',
  'EWWWWWWWWWWWWWWE',
  'EWWWWDWWWWWDWWWE',
  'EWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEE',
  '    FFFFFFFF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FFFFFFFF    ',
  '                ',
  '                ',
  'EEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWDWWE',
  'EWWWWWWWWWWWWWWE',
  'EWWWWDWWWWWDWWWE',
  'EWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEE',
  '    FFFFFFFF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FSSSSSSF    ',
  '    FFFFFFFF    ',
  '                ',
  '                ',
]

// 双人桌 32x32 (2桌格+2椅格)
const tableDoubleWoodMap = [
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWWWWWWWWWWWWWWDWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWDWWWWWWWWWDWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  '                                ',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWWWWWWWWWWWWWWDWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWDWWWWWWWWWDWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  '                                ',
]

// 四人桌 32x48
const tableQuadWoodMap = [
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWWWWWWWWWWWWWWDWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWDWWWWWWWWWDWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  '                                ',
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWDWWWWWWWWWWWWWWWWWWWWWDWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWDWWWWWWWWWDWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWE',
  'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  '    FFFFFFFF        FFFFFFFF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FSSSSSSF        FSSSSSSF    ',
  '    FFFFFFFF        FFFFFFFF    ',
  '                                ',
  '                                ',
  '                                ',
]

// 大理石款（同布局）
const tableSingleMarbleP: Record<string, C> = {
  'E': [160, 160, 170, 255], 'W': [240, 240, 248, 255], 'D': [220, 220, 230, 255],
  'F': [80, 80, 90, 255], 'S': [120, 100, 90, 255], [_]: T,
}

// 包厢桌 (保留兼容，用双人桌布局)
const tableBoothP: Record<string, C> = {
  'W': [120, 40, 40, 255], 'S': [160, 60, 60, 255],
  'T': [180, 130, 70, 255], 'D': [160, 110, 55, 255],
  'L': [140, 95, 45, 255], [_]: T,
}
const tableBoothMap = [
  ' SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S   DTTTTTTTTTTTTTTTTTTTTTTD   S',
  'S    DLLLLLLLLLLLLLLLLLLLD     S',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  'SWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS',
  ' SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ',
]

// ====================== 椅子 ======================
const chairWoodP: Record<string, C> = {
  'B': [139, 90, 43, 255], 'S': [170, 120, 70, 255], [_]: T,
}
const chairWoodMap = [
  '   BBBBBBBB     ',
  '   BBBBBBBB     ',
  '   B      B     ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BSSSSSSSSB    ',
  '  BBBBBBBBBB    ',
  '  B        B    ',
  '  B        B    ',
  '  B        B    ',
  '  BB      BB    ',
  '  BB      BB    ',
]

const chairLeatherP: Record<string, C> = {
  'B': [60, 60, 60, 255], 'S': [40, 40, 40, 255],
  'P': [80, 30, 30, 255], [_]: T,
}
const chairLeatherMap = [
  '   BBBBBBBB     ',
  '   BPPPPPPB     ',
  '   BPPPPPPB     ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BPPPPPPPPB    ',
  '  BSSSSSSSSSB   ',
  '  B         B   ',
  '  B         B   ',
  '  B         B   ',
  '  BB       BB   ',
  '  BB       BB   ',
]

// ====================== 功能家具 ======================
// 收银台 32x16
const cashP: Record<string, C> = {
  'C': [120, 95, 65, 255], 'T': [140, 110, 80, 255],
  'S': [180, 180, 185, 255], 'G': [60, 200, 80, 255],
  'K': [50, 50, 55, 255], [_]: T,
}
const cashMap = [
  'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
  'CTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTC',
  'CTTTTTSSSSSSSSSSSSSSSSSSSTTTTTTC',
  'CTTTTTSSGGGGGGGGGGGGGGSSTTTTTTC',
  'CTTTTTSSSSSSSSSSSSSSSSSSSTTTTTTC',
  'CTTTTTKKKKKKKKKKKKKKKKKSTTTTTTC',
  'CTTTTTKKKKKKKKKKKKKKKKKSTTTTTTC',
  'CTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTC',
  'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
]

// 烹饪区 32x16
const cookP: Record<string, C> = {
  'S': [170, 170, 180, 255], 'B': [90, 90, 100, 255],
  'R': [220, 70, 40, 255], 'G': [100, 100, 110, 255],
  'F': [255, 150, 50, 255], [_]: T,
}
const cookMap = [
  'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
  'SBBBBBBBBBBBBBBBBBBBBBBBBBBBBBS',
  'SB   RRRR    BB    RRRR    B   BS',
  'SB  RFFFR    BB   RFFFR    B   BS',
  'SB  RFFFR    BB   RFFFR    B   BS',
  'SB   RRRR    BB    RRRR    B   BS',
  'SBBBBBBBBBBBBBBBBBBBBBBBBBBBBBS',
  'SGGGGGGGGGGGGGGGGGGGGGGGGGGGGGS',
  'SGGGGGGGGGGGGGGGGGGGGGGGGGGGGGS',
  'SGGGGGGGGGGGGGGGGGGGGGGGGGGGGGS',
  'SGGGGGGGGGGGGGGGGGGGGGGGGGGGGGS',
  'SGGGGGGGGGGGGGGGGGGGGGGGGGGGGGS',
  'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
]

// ====================== 装饰 ======================
// 绿植 16x16
const decoPlantP: Record<string, C> = {
  'G': [60, 160, 60, 255], 'D': [40, 120, 40, 255],
  'B': [139, 90, 43, 255], 'P': [100, 60, 30, 255], [_]: T,
}
const decoPlantMap = [
  '      GG        ',
  '     GGGG       ',
  '    GDDGGG      ',
  '   GGGGDDGG     ',
  '  GDDGGGGGGG    ',
  ' GGGGGGGDDGGG   ',
  '  GGDDGGGGGG    ',
  '   GGGGGDGG     ',
  '    GGGGGG      ',
  '     GGGG       ',
  '      PP        ',
  '      PP        ',
  '     BBBB       ',
  '    BBBBB       ',
  '    BBBBBB      ',
  '     BBBB       ',
]

// 画框 16x16
const decoPaintP: Record<string, C> = {
  'F': [180, 150, 100, 255], 'B': [60, 100, 160, 255],
  'S': [200, 180, 120, 255], 'W': [255, 255, 220, 255], [_]: T,
}
const decoPaintMap = [
  '                ',
  ' FFFFFFFFFFFF   ',
  ' FSSSSSSSSSSF   ',
  ' FSBBBBBBBWSF   ',
  ' FSBBBBBBWWSF   ',
  ' FSBBBBBWWBSF   ',
  ' FSBBBBWWBBSF   ',
  ' FSBBBWWBBBSF   ',
  ' FSBBWWBBBBSF   ',
  ' FSBWWBBBBBSF   ',
  ' FSWWBBBBBBSF   ',
  ' FSSSSSSSSSSF   ',
  ' FFFFFFFFFFFF   ',
  '                ',
  '                ',
  '                ',
]

// 鱼缸 16x16
const decoFishP: Record<string, C> = {
  'G': [180, 220, 240, 255], 'W': [100, 180, 220, 255],
  'F': [255, 140, 50, 255], 'S': [160, 160, 170, 255],
  'P': [80, 180, 80, 255], [_]: T,
}
const decoFishMap = [
  '  SSSSSSSSSS    ',
  ' SWWWWWWWWWWS   ',
  ' SWWWWWWWWWWS   ',
  ' SWWWFWWWWWWS   ',
  ' SWWFFWWWWWWS   ',
  ' SWWWFWWWWWWS   ',
  ' SWWWWWWFWWWS   ',
  ' SWWWWWFFWWWS   ',
  ' SWWWWWFWWWWS   ',
  ' SWWWWWWWWPWS   ',
  ' SWWWWWPPPPWS   ',
  ' SWGGGGGGGGGWS  ',
  ' SGGGGGGGGGGS   ',
  '  SSSSSSSSSS    ',
  '   SS    SS     ',
  '   SS    SS     ',
]

// 音响 16x16
const decoSpeakerP: Record<string, C> = {
  'B': [40, 40, 40, 255], 'S': [60, 60, 60, 255],
  'C': [30, 30, 30, 255], 'G': [80, 80, 80, 255], [_]: T,
}
const decoSpeakerMap = [
  '  BBBBBBBBBB    ',
  ' BSSSSSSSSSSB   ',
  ' BS  CCCC  SB   ',
  ' BS CCCCCC SB   ',
  ' BSCC    CCSB   ',
  ' BSC      CSB   ',
  ' BSC      CSB   ',
  ' BSCC    CCSB   ',
  ' BS CCCCCC SB   ',
  ' BS  CCCC  SB   ',
  ' BSGGGGGGGGB    ',
  ' BS CCCC  SB    ',
  ' BSCC  CCSB     ',
  ' BS CCCC SB     ',
  ' BSSSSSSSSSB    ',
  '  BBBBBBBBBB    ',
]

// ====================== 角色精灵 ======================
const charP: Record<string, C> = { [_]: T }
function charPalette(hair: C, skin: C, top: C, arm: C, pant: C, shoe: C): Record<string, C> {
  return { 'H': hair, 'F': skin, 'T': top, 'A': arm, 'P': pant, 'S': shoe, [_]: T }
}

const personShape = [
  '    HHHHHH      ',
  '   HHHHHHHH     ',
  '   HHHHHHHH     ',
  '    FFFFFF      ',
  '    FFFFFF      ',
  '    FFFFFF      ',
  '     FF         ',
  '   TTTTTTTT     ',
  '  TTTTTTTTTT    ',
  '  AATTTTTTAA    ',
  '  AATTTTTTAA    ',
  '   TTTTTTTT     ',
  '    AA  AA      ',
  '   PPPPPPPP     ',
  '   PP    PP     ',
  '   SS    SS     ',
]

const chefPal = charPalette(
  [255,255,255,255],[240,200,160,255],[255,255,255,255],[220,180,140,255],[50,50,120,255],[80,60,40,255]
)
const waiterPal = charPalette(
  [40,30,20,255],[240,200,160,255],[30,30,30,255],[220,180,140,255],[30,30,30,255],[60,40,20,255]
)
const studentPal = charPalette(
  [40,30,20,255],[240,200,160,255],[60,160,60,255],[220,180,140,255],[50,80,160,255],[255,255,255,255]
)
const workerPal = charPalette(
  [30,20,15,255],[230,190,150,255],[80,80,80,255],[210,170,130,255],[60,60,60,255],[40,30,20,255]
)

export const sprites: Record<string, PixelArtData> = {
  // 墙纸
  wallWood: fromPalette(16, 16, wallWoodMap, wallWoodP),
  wallBrick: fromPalette(16, 16, wallBrickMap, wallBrickP),
  wallFlower: fromPalette(16, 16, wallFlowerMap, wallFlowerP),
  wallPremium: fromPalette(16, 16, wallPremMap, wallPremP),
  // 地板
  floorMarble: fromPalette(16, 16, floorMarbleMap, floorMarbleP),
  floorWood: fromPalette(16, 16, floorWoodMap, floorWoodP),
  floorTile: fromPalette(16, 16, floorTileMap, floorTileP),
  floorStone: fromPalette(16, 16, floorStoneMap, floorStoneP),
  // 户外
  grass: fromPalette(16, 16, grassMap, grassP),
  road: fromPalette(16, 16, roadMap, roadP),
  // 门
  door: fromPalette(16, 16, doorMap, doorP),
  // 桌椅（纯顶视图）
  tableSingleWood: fromPalette(16, 32, tableSingleWoodMap, tableSingleWoodP),
  tableDoubleWood: fromPalette(32, 32, tableDoubleWoodMap, tableSingleWoodP),
  tableQuadWood: fromPalette(32, 48, tableQuadWoodMap, tableSingleWoodP),
  tableSingleMarble: fromPalette(16, 32, tableSingleWoodMap, tableSingleMarbleP),
  tableDoubleMarble: fromPalette(32, 32, tableDoubleWoodMap, tableSingleMarbleP),
  tableQuadMarble: fromPalette(32, 48, tableQuadWoodMap, tableSingleMarbleP),
  // 功能 (2格宽)
  cashRegister: fromPalette(32, 16, cashMap, cashP),
  cookStation: fromPalette(32, 16, cookMap, cookP),
  // 装饰
  decoPlant: fromPalette(16, 16, decoPlantMap, decoPlantP),
  decoPainting: fromPalette(16, 16, decoPaintMap, decoPaintP),
  decoFishtank: fromPalette(16, 16, decoFishMap, decoFishP),
  decoSpeaker: fromPalette(16, 16, decoSpeakerMap, decoSpeakerP),
  // 角色
  chef: fromPalette(16, 16, personShape, chefPal),
  waiter: fromPalette(16, 16, personShape, waiterPal),
  customerStudent: fromPalette(16, 16, personShape, studentPal),
  customerWorker: fromPalette(16, 16, personShape, workerPal),
  // 菜品（每道菜不同外观）
  dish: solid(12, 12, 245, 245, 220),
  dishEggRice: solid(12, 12, 255, 220, 140),
  dishTomatoEgg: solid(12, 12, 255, 120, 80),
  dishBraisedPork: solid(12, 12, 160, 80, 50),
  dishPotato: solid(12, 12, 255, 200, 120),
  dishPepperPork: solid(12, 12, 100, 180, 80),
  coin: solid(8, 8, 255, 215, 0),
}
