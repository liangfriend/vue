/*
* 输入歌词，小节数，拍号，生成旋律
*
* */

type Melody = {
    midi: number,
    lyrics: string,
    chronaxie: '1n.',

}


const pentatonic = [0, 2, 4, 7, 9]

function isInPentatonic(m: number) {
    return pentatonic.includes(m % 12)
}

/*
* 推荐音高算法
* */
export function recommendMidiReplace(
    index: number,
    notes: { midi: number }[],
): number[] {

    const cur = notes[index]
    if (!cur) return []

    const pre = notes[index - 1]
    const next = notes[index + 1]

    const cand: number[] = []

    // 允许更丰富音程
    const pushAround = (m: number) => {
        cand.push(
            m,
            m + 2, m - 2,
            m + 3, m - 3,
            m + 4, m - 4,
            m + 5, m - 5
        )
    }

    // 1. 前后中值
    if (pre && next) {
        cand.push(Math.round((pre.midi + next.midi) / 2))
    }

    // 2. 靠近前音
    if (pre) pushAround(pre.midi)

    // 3. 靠近后音
    if (next) pushAround(next.midi)

    // 4. 加入当前音作为兜底
    cand.push(cur.midi)

    // 去重
    let unique = [...new Set(cand)]

    // 5. 五声音阶过滤（放宽）
    let pent = unique.filter(isInPentatonic)

    // 如果全部被过滤掉了，fallback 到全部候选
    if (pent.length === 0) pent = unique

    // 6. 跳跃过滤（放宽到 12 半音）
    const limitRange = 12

    const limit = (v: number) => {
        if (pre && Math.abs(v - pre.midi) > limitRange) return false
        if (next && Math.abs(v - next.midi) > limitRange) return false
        return true
    }

    let filtered = pent.filter(limit)

    // 7. 如果又被过滤完了，fallback 一个最接近 pre 或 next 的
    if (filtered.length === 0 && pent.length > 0) {
        const target = next?.midi ?? pre?.midi ?? cur.midi
        filtered = pent.slice().sort((a, b) =>
            Math.abs(a - target) - Math.abs(b - target)
        ).slice(0, 1)
    }

    // 8. 排序：综合靠近 pre/next
    filtered.sort((a, b) => {
        const score = (x: number) => {
            let s = 0
            if (next) s += Math.abs(x - next.midi)
            if (pre) s += Math.abs(x - pre.midi)
            return s
        }
        return score(a) - score(b)
    })

    // 去掉当前音（如果你不希望把原音作为推荐）
    // filtered = filtered.filter(v => v !== cur.midi)

    return filtered
}

