<template>
  <div class="rnn-demo">
    <h1>循环神经网络 (RNN) 学习示例</h1>
    <p class="intro">
      RNN 按时间步<strong>从左到右</strong>读入序列，每步用隐藏状态 <code>h_t</code> 记住前文。
      公式：<code>h_t = tanh(x_t·W_xh + h_{t-1}·W_hh + b)</code>，最后用 <code>h_T</code> 做分类。
    </p>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="逐步图解" name="walk">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-card>
              <template #header>选择场景</template>
              <el-select v-model="scenarioIdx" class="full-width" @change="runWalk">
                <el-option
                  v-for="(s, i) in RNN_SCENARIOS"
                  :key="i"
                  :label="s.name"
                  :value="i"
                />
              </el-select>
              <div class="token-row">
                <el-tag v-for="(t, i) in currentLabels" :key="i">{{ t }}</el-tag>
              </div>
              <p class="hint">{{ currentScenario.hint }}</p>
              <el-button type="primary" @click="runWalk">重新计算</el-button>
            </el-card>
          </el-col>

          <el-col :span="14">
            <el-card v-if="walkResult">
              <template #header>隐藏状态演化</template>
              <div class="hidden-flow">
                <div
                  v-for="(ts, i) in walkResult.timesteps"
                  :key="i"
                  class="hidden-step"
                >
                  <div class="step-head">
                    t={{ ts.t }} 读到「{{ ts.token }}」
                  </div>
                  <div class="vec-row">
                    <span class="vec-label">h_{{ ts.t - 1 }}</span>
                    <span
                      v-for="(v, j) in ts.hPrev"
                      :key="'p' + j"
                      class="cell"
                    >{{ formatNum(v) }}</span>
                  </div>
                  <div class="arrow">↓ tanh</div>
                  <div class="vec-row highlight">
                    <span class="vec-label">h_{{ ts.t }}</span>
                    <span v-for="(v, j) in ts.h" :key="'h' + j" class="cell">{{ formatNum(v) }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-card v-if="walkResult" class="output-card">
          <template #header>最终分类（基于 h_T）</template>
          <div class="prob-bars">
            <div v-for="(p, i) in walkResult.probs" :key="i" class="prob-item">
              <span class="label">{{ CLASS_NAMES[i] }}:</span>
              <el-progress :percentage="p * 100" :stroke-width="16" />
              <span class="value">{{ (p * 100).toFixed(1) }}%</span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="训练：序列分类" name="train">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-card>
              <template #header>构建训练样本</template>
              <p class="hint">选词组成短句，指定句子类型，加入训练集。</p>
              <div class="token-picker">
                <el-select
                  v-for="(id, i) in draftTokens"
                  :key="i"
                  v-model="draftTokens[i]"
                  class="token-select"
                >
                  <el-option
                    v-for="opt in vocabOptions"
                    :key="opt.id"
                    :label="opt.word"
                    :value="opt.id"
                  />
                </el-select>
              </div>
              <div class="input-actions">
                <el-select v-model="draftLabel" placeholder="句子类型">
                  <el-option
                    v-for="(name, idx) in CLASS_NAMES"
                    :key="idx"
                    :label="name"
                    :value="idx"
                  />
                </el-select>
                <el-button type="primary" @click="addSample">加入训练集</el-button>
                <el-button @click="addPresets">添加预设样本</el-button>
              </div>
            </el-card>

            <el-card class="train-card">
              <template #header>训练</template>
              <div class="train-actions">
                <el-input-number v-model="epochs" :min="50" :max="1000" :step="50" />
                <span class="label"> epochs</span>
                <el-button type="success" :disabled="samples.length < 2" @click="train">
                  开始训练
                </el-button>
              </div>
              <div v-if="trainLoss.length" class="train-loss">
                最终损失: {{ trainLoss[trainLoss.length - 1].toFixed(4) }}
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>训练集 ({{ samples.length }})</template>
              <div v-if="samples.length === 0" class="empty-tip">先添加样本</div>
              <div v-else class="sample-list">
                <div v-for="(s, idx) in samples" :key="idx" class="sample-item">
                  <span>{{ formatSample(s) }}</span>
                  <el-button type="danger" size="small" text @click="removeSample(idx)">
                    删除
                  </el-button>
                </div>
              </div>
            </el-card>

            <el-card class="predict-card">
              <template #header>预测当前句子</template>
              <div class="token-row">
                <el-tag v-for="(id, i) in draftTokens" :key="i">{{ VOCAB[id] }}</el-tag>
              </div>
              <el-button type="primary" :disabled="!model" @click="predict">
                识别句子类型
              </el-button>
              <div v-if="prediction" class="prediction-result">
                <p>
                  预测:
                  <strong>{{ CLASS_NAMES[prediction.label] }}</strong>
                </p>
                <div class="prob-bars">
                  <div v-for="(p, i) in prediction.probs" :key="i" class="prob-item">
                    <span class="label">{{ CLASS_NAMES[i] }}:</span>
                    <el-progress :percentage="p * 100" :stroke-width="16" />
                    <span class="value">{{ (p * 100).toFixed(1) }}%</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  VOCAB,
  CLASS_NAMES,
  RNN_SCENARIOS,
  PRESET_SAMPLES,
  runRNNWalkthrough,
  RNNTrainer,
} from '../../rnn.js';

export default {
  name: 'RNNDemo',
  data() {
    return {
      activeTab: 'walk',
      scenarioIdx: 0,
      walkResult: null,
      samples: [],
      model: null,
      epochs: 200,
      trainLoss: [],
      prediction: null,
      draftTokens: [1, 2, 3,],
      draftLabel: 0,
      VOCAB,
      CLASS_NAMES,
      RNN_SCENARIOS,
    };
  },
  computed: {
    currentScenario() {
      return RNN_SCENARIOS[this.scenarioIdx];
    },
    currentLabels() {
      return this.currentScenario.tokenIds.map((id) => VOCAB[id] ?? '?');
    },
    vocabOptions() {
      return VOCAB
        .map((word, id) => ({word, id,}))
        .filter((o) => o.word !== '<pad>');
    },
  },
  mounted() {
    this.runWalk();
  },
  methods: {
    runWalk() {
      this.walkResult = runRNNWalkthrough(this.currentScenario.tokenIds);
    },
    formatNum(n) {
      return typeof n === 'number' ? n.toFixed(3) : n;
    },
    formatSample(s) {
      const words = s.tokenIds.map((id) => VOCAB[id]).join(' ');
      return `${words} → ${CLASS_NAMES[s.label]}`;
    },
    addSample() {
      this.samples.push({
        tokenIds: [...this.draftTokens,],
        label: this.draftLabel,
      });
    },
    removeSample(idx) {
      this.samples.splice(idx, 1);
    },
    addPresets() {
      this.samples.push(...PRESET_SAMPLES.map((s) => ({
        tokenIds: [...s.tokenIds,],
        label: s.label,
      })));
    },
    train() {
      this.model = new RNNTrainer();
      this.trainLoss = this.model.train(this.samples, this.epochs, 0.05);
      this.prediction = null;
    },
    predict() {
      if (!this.model) return;
      this.prediction = this.model.predict([...this.draftTokens,]);
    },
  },
};
</script>

<style scoped lang="scss">
.rnn-demo {
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
}
h1 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}
.intro {
  color: #666;
  margin-bottom: 24px;
}
.hint {
  color: #888;
  font-size: 13px;
  margin: 12px 0;
}
.full-width {
  width: 100%;
}
.token-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 12px 0;
}
.hidden-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hidden-step {
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
}
.step-head {
  font-weight: 600;
  margin-bottom: 8px;
}
.vec-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  &.highlight .cell {
    background: #e1f3d8;
  }
}
.vec-label {
  min-width: 36px;
  color: #666;
}
.cell {
  display: inline-block;
  min-width: 48px;
  padding: 2px 6px;
  background: #f0f2f5;
  border-radius: 4px;
  text-align: center;
}
.arrow {
  text-align: center;
  color: #909399;
  margin: 4px 0;
}
.output-card {
  margin-top: 20px;
}
.token-picker {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.token-select {
  width: 90px;
}
.input-actions,
.train-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.train-card {
  margin-top: 16px;
}
.train-loss {
  margin-top: 12px;
  color: #67c23a;
}
.sample-list {
  max-height: 220px;
  overflow-y: auto;
}
.sample-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-family: 'Consolas', monospace;
  font-size: 13px;
}
.empty-tip {
  color: #999;
}
.predict-card {
  margin-top: 16px;
}
.prediction-result {
  margin-top: 16px;
}
.prob-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prob-item {
  display: flex;
  align-items: center;
  gap: 12px;
  .label {
    min-width: 72px;
    font-size: 13px;
  }
  :deep(.el-progress) {
    flex: 1;
  }
  .value {
    min-width: 50px;
    text-align: right;
  }
}
</style>
