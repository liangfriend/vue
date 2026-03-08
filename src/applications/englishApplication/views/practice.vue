<template>
  <div class="english-practice">
    <h2 class="title">英语输出练习</h2>
    <el-tabs v-model="activeTab" class="tabs">
      <!-- 每日句子翻译 -->
      <el-tab-pane label="每日句子翻译" name="translation">
        <div class="section translation-section">
          <div v-if="dailyLoading" class="daily-card daily-loading">
            正在生成今日句子...
          </div>
          <div v-else class="daily-card">
            <div class="daily-header">
              <span class="daily-label">今日推荐句子</span>
              <span class="sentence-index">{{ currentIndex + 1 }} / {{ dailySentences.length }}</span>
            </div>
            <div class="sentence-zh">{{ dailySentence.zh }}</div>
            <div v-if="dailySentence.hint" class="sentence-hint">提示：{{ dailySentence.hint }}</div>
            <div class="sentence-nav">
              <el-button size="small" :disabled="currentIndex <= 0" @click="prevSentence">上一句</el-button>
              <el-button size="small" :disabled="currentIndex >= dailySentences.length - 1" @click="nextSentence">下一句</el-button>
            </div>
          </div>
          <div class="input-area">
            <el-input
              v-model="userTranslation"
              type="textarea"
              :rows="4"
              placeholder="在这里写下你的英文翻译..."
              :disabled="isChecking"
            />
            <div class="actions">
              <el-button type="primary" :loading="isChecking" @click="checkTranslation">
                检查翻译
              </el-button>
              <el-button @click="showAnswer">查看参考答案</el-button>
            </div>
          </div>
          <div v-if="translationFeedback" class="feedback">
            <div class="feedback-label">AI 反馈：</div>
            <div class="feedback-content" v-html="translationFeedback"></div>
          </div>
          <el-collapse-transition>
            <div v-if="showReference" class="reference-answer">
              <div class="reference-label">参考答案：</div>
              <div class="reference-text">{{ dailySentence.en }}</div>
            </div>
          </el-collapse-transition>
        </div>
      </el-tab-pane>

      <!-- 自由写作 -->
      <el-tab-pane label="自由写作" name="writing">
        <div class="section writing-section">
          <div class="prompt-area">
            <el-input
              v-model="writingPrompt"
              type="textarea"
              :rows="2"
              placeholder="可选：输入写作主题或提示词，如「描述你昨天做的事」「写一段关于环保的短文」..."
            />
          </div>
          <div class="input-area">
            <el-input
              v-model="userWriting"
              type="textarea"
              :rows="8"
              placeholder="在这里自由写作，完成后点击「获取反馈」让 AI 帮你检查语法、用词和表达..."
              :disabled="isCheckingWriting"
            />
            <el-button
              type="primary"
              :loading="isCheckingWriting"
              @click="checkWriting"
              class="check-btn"
            >
              获取反馈
            </el-button>
          </div>
          <div v-if="writingFeedback" class="feedback">
            <div class="feedback-label">AI 反馈：</div>
            <div class="feedback-content" v-html="writingFeedback"></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { chat } from '@/utils/ollama'
import { loadDailySentences } from '../dailySentences'

const activeTab = ref('translation')
const dailySentences = ref<{ zh: string; en: string; hint?: string }[]>([])
const currentIndex = ref(0)
const dailyLoading = ref(true)

const dailySentence = computed(() => dailySentences.value[currentIndex.value] ?? { zh: '', en: '' })
const userTranslation = ref('')
const userWriting = ref('')
const writingPrompt = ref('')
const translationFeedback = ref('')
const writingFeedback = ref('')
const isChecking = ref(false)
const isCheckingWriting = ref(false)
const showReference = ref(false)

onMounted(async () => {
  dailyLoading.value = true
  try {
    const { sentences } = await loadDailySentences()
    dailySentences.value = sentences
    currentIndex.value = 0
  } catch (e) {
    dailySentences.value = [{ zh: '加载失败，请确保 Ollama 已运行。', en: 'Load failed.' }]
  } finally {
    dailyLoading.value = false
  }
})

function prevSentence() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    userTranslation.value = ''
    translationFeedback.value = ''
    showReference.value = false
  }
}

function nextSentence() {
  if (currentIndex.value < dailySentences.value.length - 1) {
    currentIndex.value++
    userTranslation.value = ''
    translationFeedback.value = ''
    showReference.value = false
  }
}

async function checkTranslation() {
  if (!userTranslation.value.trim()) {
    ElMessage.warning('请先写下你的翻译')
    return
  }
  isChecking.value = true
  translationFeedback.value = 'AI 正在生成反馈，请稍候...'
  try {
    const result = await chat([
      {
        role: 'system',
        content: `你是英语老师，负责检查学生的翻译。给定中文句子和学生的英文翻译，请：
1. 指出语法、用词错误
2. 给出修改建议
3. 如果翻译正确，给予肯定
回答简洁，用中文，分点说明。`
      },
      {
        role: 'user',
        content: `中文：${dailySentence.value.zh}\n\n学生翻译：${userTranslation.value}\n\n请检查并反馈。`
      }
    ], { max_tokens: 600 })
    translationFeedback.value = formatFeedback(result)
  } catch (e) {
    translationFeedback.value = `检查失败，请确保 Ollama 已运行且模型已加载。错误：${(e as Error).message}`
  } finally {
    isChecking.value = false
  }
}

async function checkWriting() {
  if (!userWriting.value.trim()) {
    ElMessage.warning('请先写下你的内容')
    return
  }
  isCheckingWriting.value = true
  writingFeedback.value = 'AI 正在生成反馈，请稍候...'
  try {
    const promptPart = writingPrompt.value.trim()
      ? `写作主题/提示：${writingPrompt.value}\n\n`
      : ''
    const result = await chat([
      {
        role: 'system',
        content: `你是英语写作教练。请对学生的英文写作进行反馈：
1. 语法错误及修改建议
2. 用词是否地道，有无更好表达
3. 结构是否清晰
4. 总体评价与改进建议
回答用中文，分点说明，语气友善鼓励。`
      },
      {
        role: 'user',
        content: `${promptPart}学生写作：\n${userWriting.value}\n\n请给出反馈。`
      }
    ], { max_tokens: 800 })
    writingFeedback.value = formatFeedback(result)
  } catch (e) {
    writingFeedback.value = `检查失败：${(e as Error).message}`
  } finally {
    isCheckingWriting.value = false
  }
}

function formatFeedback(text: string): string {
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function showAnswer() {
  showReference.value = !showReference.value
}
</script>

<style scoped>
.english-practice {
  padding: 20px;
  max-width: 720px;
}

.title {
  margin: 0 0 16px;
  font-size: 1.25rem;
  color: #303133;
}

.tabs {
  margin-top: 8px;
}

.section {
  padding: 16px 0;
}

.daily-card {
  background: linear-gradient(135deg, #f6f8fc 0%, #eef2f7 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
}

.daily-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.daily-label {
  font-size: 12px;
  color: #909399;
}

.sentence-index {
  font-size: 12px;
  color: #909399;
}

.sentence-nav {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.daily-loading {
  text-align: center;
  color: #606266;
}

.sentence-zh {
  font-size: 1.2rem;
  color: #303133;
  font-weight: 500;
}

.sentence-hint {
  margin-top: 8px;
  font-size: 13px;
  color: #606266;
}

.input-area {
  margin-bottom: 20px;
}

.input-area :deep(.el-textarea__inner) {
  font-size: 15px;
  line-height: 1.6;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}

.check-btn {
  margin-top: 12px;
}

.feedback {
  background: #f0f9ff;
  border: 1px solid #b3e0ff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.feedback-label {
  font-weight: 600;
  color: #409eff;
  margin-bottom: 8px;
}

.feedback-content {
  color: #303133;
  line-height: 1.7;
  font-size: 14px;
}

.reference-answer {
  margin-top: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  border-left: 4px solid #67c23a;
}

.reference-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 6px;
}

.reference-text {
  font-size: 1rem;
  color: #303133;
}

.prompt-area {
  margin-bottom: 12px;
}
</style>
