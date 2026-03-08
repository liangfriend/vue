/**
 * 每日推荐翻译句子 - AI 生成，按日期缓存到 localStorage
 */
import { chat } from '@/utils/ollama'

export interface DailySentence {
  zh: string
  en: string
  hint?: string
}

const STORAGE_KEY = 'english_daily_sentences'
const DATE_KEY = 'english_daily_sentences_date'
const SENTENCE_COUNT = 20

function getTodayDateKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function parseAIResponse(text: string): DailySentence[] {
  const sentences: DailySentence[] = []
  // 尝试解析 JSON 数组
  const jsonMatch = text.match(/\[[\s\S]*\]/)
  if (jsonMatch) {
    try {
      const arr = JSON.parse(jsonMatch[0])
      for (const item of arr) {
        if (item.zh && item.en) {
          sentences.push({ zh: item.zh, en: item.en, hint: item.hint })
        }
      }
    } catch {
      // 解析失败，尝试按行解析
    }
  }
  if (sentences.length === 0) {
    // 备用：按行解析 "中文|英文" 或 "中文\n英文"
    const lines = text.split('\n').filter(Boolean)
    for (const line of lines) {
      const pipe = line.indexOf('|')
      if (pipe > 0) {
        sentences.push({ zh: line.slice(0, pipe).trim(), en: line.slice(pipe + 1).trim() })
      }
    }
  }
  return sentences
}

export async function loadDailySentences(): Promise<{
  sentences: DailySentence[]
  fromCache: boolean
}> {
  const today = getTodayDateKey()
  const storedDate = localStorage.getItem(DATE_KEY)
  const stored = localStorage.getItem(STORAGE_KEY)

  if (storedDate === today && stored) {
    try {
      const parsed = JSON.parse(stored) as DailySentence[]
      if (Array.isArray(parsed) && parsed.length >= SENTENCE_COUNT) {
        return { sentences: parsed, fromCache: true }
      }
    } catch {
      // 缓存损坏，重新生成
    }
  }

  const result = await chat(
    [
      {
        role: 'system',
        content: `你是英语学习助手。请生成适合练习中译英的句子，每句包含中文和英文。严格按以下 JSON 数组格式输出，不要其他说明文字：
[{"zh":"中文句子","en":"对应英文翻译"}, ...]

要求：
- 生成恰好 ${SENTENCE_COUNT} 句
- 难度适中，适合日常学习
- 类型多样：谚语、日常表达、职场、生活场景等
- zh 和 en 必填`
      },
      {
        role: 'user',
        content: `请生成今日的 ${SENTENCE_COUNT} 句中英对照翻译练习句子，直接输出 JSON 数组。`
      }
    ],
    { max_tokens: 4000, temperature: 0.8 }
  )

  const sentences = parseAIResponse(result)
  if (sentences.length >= 10) {
    const toSave = sentences.slice(0, SENTENCE_COUNT)
    localStorage.setItem(DATE_KEY, today)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    return { sentences: toSave, fromCache: false }
  }

  // AI 返回格式异常，使用兜底句子
  const fallback: DailySentence[] = [
    { zh: '熟能生巧。', en: 'Practice makes perfect.' },
    { zh: '时间就是金钱。', en: 'Time is money.' },
    { zh: '有志者事竟成。', en: 'Where there is a will, there is a way.' }
  ]
  return { sentences: fallback, fromCache: false }
}
