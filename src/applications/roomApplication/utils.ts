import type { CellType } from './types';

/** 将布局字符串解析为二维字符数组 */
export function parseLayoutString(str: string): string[][] {
  const lines = str.trim().split('\n').map(s => s.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const cols = Math.max(...lines.map(l => l.length));
  return lines.map(line => {
    const row = line.split('');
    while (row.length < cols) row.push('.');
    return row;
  });
}

/** 校验字符是否为有效的单元格类型 */
export function isValidCellType(c: string): c is CellType {
  return 'bflrd.'.includes(c.toLowerCase());
}

/** 将布局转为材质 JSON */
export function layoutToMaterialJson(
  layout: string[][],
  materials: (Record<string, unknown>)[][]
): (Record<string, unknown>)[][] {
  return layout.map((row, i) =>
    row.map((cell, j) => {
      if (cell === '.') return { type: 'null' };
      const mat = materials[i]?.[j];
      if (mat && 'texture' in mat && mat.texture) return { texture: mat.texture };
      return { type: 'null' } as Record<string, unknown>;
    })
  );
}
