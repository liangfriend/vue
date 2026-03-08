/**
 * Ollama 本地大模型 API，复用 deepseek.vue 的调用方式
 */
const OLLAMA_URL = 'http://localhost:11434/api/chat'
const DEFAULT_MODEL = 'deepseek-r1:14b'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface OllamaOptions {
  model?: string
  temperature?: number
  max_tokens?: number
}

/**
 * 流式调用 Ollama，逐块返回内容
 */
export async function* streamChat(
  messages: ChatMessage[],
  options: OllamaOptions = {}
): AsyncGenerator<string> {
  const { model = DEFAULT_MODEL, temperature = 0.7, max_tokens = 2000 } = options
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      options: { temperature, max_tokens }
    })
  })
  if (!response.body) throw new Error('No response body')
  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const parsed = JSON.parse(line)
        const content = parsed.message?.content
        if (content) yield content
      } catch {
        // 忽略解析失败的行
      }
    }
  }
}

/**
 * 非流式调用，等待完整响应
 */
export async function chat(
  messages: ChatMessage[],
  options: OllamaOptions = {}
): Promise<string> {
  let result = ''
  for await (const chunk of streamChat(messages, options)) {
    result += chunk
  }
  return result
}
