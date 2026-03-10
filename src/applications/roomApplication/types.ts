/** 单元格类型：b=后墙 f=前墙 l=左墙 r=右墙 d=地板 .=空 */
export type CellType = 'b' | 'f' | 'l' | 'r' | 'd' | '.';

/** 材质：纹理URL或空 */
export interface MaterialCell {
    texture?: string;
    type?: 'null';
}

/** 默认颜色：无材质时使用 */
export const DEFAULT_COLORS: Record<Exclude<CellType, '.'>, string> = {
    b: '#9b59b6',
    f: '#f1c40f',
    l: '#4caf50',
    r: '#a12f1d',
    d: '#3498db'
};
