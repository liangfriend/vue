<template>
  <div class="transformer-demo">
    <h1>Transformer 架构学习示例</h1>
    <p class="intro">
      分两部分：<strong>前向图解</strong>（固定权重，逐步看矩阵怎么算）和
      <strong>训练实验</strong>（完整前向 + 反向传播，看损失下降）。
    </p>

    <el-tabs v-model="activeTab" class="main-tabs">
      <!-- ── 前向图解 ── -->
      <el-tab-pane label="前向图解" name="forward">
        <el-alert type="info" :closable="false" class="mode-hint">
          本模式用<strong>固定随机权重 + 正弦位置编码</strong>，只演示前向计算，不训练。
          目的是理解每一步的张量形状和数值变化。
        </el-alert>

        <el-card class="arch-card">
          <template #header>整体架构（Encoder）</template>
          <div class="arch-flow">
            <div v-for="(item, idx) in architecture" :key="idx" class="arch-block">
              <div class="arch-title">{{ item.block }}</div>
              <div class="arch-detail">{{ item.detail }}</div>
              <div v-if="idx < architecture.length - 1" class="arch-arrow">↓</div>
            </div>
          </div>
        </el-card>

        <el-row :gutter="24" class="control-row">
          <el-col :span="12">
            <el-card>
              <template #header>输入序列</template>
              <el-select v-model="selectedSeqIdx" class="seq-select">
                <el-option
                    v-for="(seq, idx) in DEMO_SEQUENCES"
                    :key="idx"
                    :label="seq.name"
                    :value="idx"
                />
              </el-select>
              <div class="token-row">
                <span class="label">Token：</span>
                <el-tag v-for="(t, i) in currentTokens" :key="i">{{ t }}</el-tag>
              </div>
              <el-button type="primary" @click="runForward">运行前向传播</el-button>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <template #header>注意力热力图</template>
              <p class="hint">行 = 查询词，列 = 被关注的词</p>
              <div v-if="attentionWeights.length" class="attn-wrap">
                <table class="attn-table">
                  <thead>
                  <tr>
                    <th></th>
                    <th v-for="t in currentTokens" :key="'h-' + t">{{ t }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(row, i) in attentionWeights" :key="i">
                    <th>{{ currentTokens[i] }}</th>
                    <td v-for="(w, j) in row" :key="j" :style="cellStyle(w)">
                      {{ (w * 100).toFixed(0) }}%
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="empty-tip">运行前向传播后显示</div>
            </el-card>
          </el-col>
        </el-row>

        <el-card v-if="result" class="steps-card">
          <template #header>逐步计算详情</template>
          <el-collapse v-model="activeSteps">
            <el-collapse-item
                v-for="(step, idx) in result.steps"
                :key="idx"
                :title="step.name"
                :name="idx"
            >
              <p class="step-desc">{{ step.desc }}</p>
              <p v-if="step.shape" class="step-shape">张量形状：<code>{{ step.shape }}</code></p>
              <div class="matrix-block">
                <div v-for="(row, i) in step.data" :key="i" class="matrix-row">
                  <span class="row-label">{{ step.labels[i] }}</span>
                  <span v-for="(v, j) in row" :key="j" class="cell">{{ formatNum(v) }}</span>
                </div>
              </div>
              <div v-if="step.subSteps" class="heads-block">
                <div v-for="sub in step.subSteps" :key="sub.head" class="head-item">
                  <h4>Head {{ sub.head + 1 }}</h4>
                  <table class="attn-table mini">
                    <tbody>
                    <tr v-for="(row, i) in sub.weights" :key="i">
                      <td v-for="(w, j) in row" :key="j" :style="cellStyle(w)">
                        {{ (w * 100).toFixed(0) }}%
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-tab-pane>

      <!-- ── 训练实验 ── -->
      <el-tab-pane label="训练实验" name="train">
        <el-alert type="success" :closable="false" class="mode-hint">
          本模式包含<strong>完整训练流程</strong>：前向 → 交叉熵损失 → 反向传播 → 梯度更新。
          位置编码为<strong>可学习</strong>矩阵（与图解模式的正弦公式不同，更接近 BERT/GPT 的做法）。
        </el-alert>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-card>
              <template #header>添加训练样本</template>
              <el-select v-model="trainSeqIdx" class="seq-select">
                <el-option
                    v-for="(seq, idx) in DEMO_SEQUENCES"
                    :key="idx"
                    :label="seq.name"
                    :value="idx"
                />
              </el-select>
              <div class="token-row">
                <el-tag v-for="(t, i) in trainTokens" :key="i">{{ t }}</el-tag>
              </div>
              <div class="input-actions">
                <el-select v-model="selectedClass" placeholder="选择类别" class="class-select">
                  <el-option
                      v-for="(name, idx) in CLASS_NAMES"
                      :key="idx"
                      :label="name"
                      :value="idx"
                  />
                </el-select>
                <el-button type="primary" @click="addSample">加入训练集</el-button>
                <el-button @click="addPresetSamples">添加三个预设样本</el-button>
              </div>
            </el-card>

            <el-card class="train-card">
              <template #header>训练（反向传播）</template>
              <div class="train-actions">
                <el-input-number v-model="epochs" :min="20" :max="500" :step="20"/>
                <span class="label">epochs</span>
                <el-input-number v-model="lr" :min="0.001" :max="0.1" :step="0.005" :precision="3"/>
                <span class="label">lr</span>
                <el-button type="success" :disabled="samples.length < 2" @click="train">
                  开始训练
                </el-button>
              </div>
              <p class="hint">流程：Softmax 分类 → 交叉熵 Loss → 梯度回传 Embedding / Attention / FFN</p>
              <div v-if="trainLoss.length" class="train-loss">
                初始损失 {{ trainLoss[0].toFixed(4) }} → 最终 {{ trainLoss[trainLoss.length - 1].toFixed(4) }}
              </div>
              <div v-if="trainLoss.length" class="loss-chart">
                <div
                    v-for="(v, i) in trainLoss"
                    :key="i"
                    class="loss-bar"
                    :style="{ height: barHeight(v) + 'px' }"
                    :title="'epoch ' + (i + 1) + ': ' + v.toFixed(4)"
                />
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>训练集 ({{ samples.length }})</template>
              <div v-if="!samples.length" class="empty-tip">至少添加 2 条样本才能训练</div>
              <div v-else class="sample-list">
                <div v-for="(s, idx) in samples" :key="idx" class="sample-item">
                  <span>{{ formatSample(s) }}</span>
                  <el-button type="danger" size="small" text @click="removeSample(idx)">删除</el-button>
                </div>
              </div>
            </el-card>

            <el-card class="predict-card">
              <template #header>预测</template>
              <el-button type="primary" :disabled="!model" @click="recognize">预测当前句子</el-button>
              <div v-if="prediction" class="prediction-result">
                <p>预测：<strong>{{ CLASS_NAMES[prediction.label] }}</strong></p>
                <div v-for="(p, i) in prediction.probs" :key="i" class="prob-item">
                  <span>{{ CLASS_NAMES[i] }}:</span>
                  <el-progress :percentage="p * 100" :stroke-width="14"/>
                  <span>{{ (p * 100).toFixed(1) }}%</span>
                </div>
              </div>
            </el-card>

            <el-card class="bp-card">
              <template #header>反向传播更新哪些参数？</template>
              <ul class="bp-list">
                <li><code>embedTable</code> — 词嵌入（随机初始化 → 训练后学成）</li>
                <li><code>posEmbed</code> — 可学习位置编码（随机初始化 → 训练后学成）</li>
                <li><code>Wq, Wk, Wv, Wo</code> — 自注意力投影矩阵</li>
                <li><code>W1, W2</code> — 前馈网络权重</li>
                <li><code>Wcls</code> — 分类头（池化后的线性层）</li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-card class="formula-card">
      <template #header>核心公式速查</template>
      <ul class="formula-list">
        <li><code>Attention(Q,K,V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) · V</code></li>
        <li><code>Loss = -log(p<sub>正确类</sub>)</code>，反向传播更新全部权重</li>
        <li><code>参数<sub>新</sub> = 参数<sub>旧</sub> - lr × ∂Loss/∂参数</code></li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {
  VOCAB,
  DEMO_SEQUENCES,
  CLASS_NAMES,
  runTransformerEncoder,
  TransformerClassifier,
} from '../../transformer.js';

export default {
  name: 'TransformerDemo',
  data() {
    return {
      VOCAB,
      DEMO_SEQUENCES,
      CLASS_NAMES,
      activeTab: 'forward',
      selectedSeqIdx: 0,
      trainSeqIdx: 0,
      selectedClass: 0,
      config: {dModel: 8, numHeads: 2, dFf: 16, numLayers: 1},
      result: null,
      architecture: [],
      attentionWeights: [],
      activeSteps: [0, 1, 2],
      samples: [],
      model: null,
      epochs: 120,
      lr: 0.01,
      trainLoss: [],
      prediction: null,
    };
  },
  computed: {
    currentTokens() {
      return this.idsToTokens(DEMO_SEQUENCES[this.selectedSeqIdx].ids);
    },
    trainTokens() {
      return this.idsToTokens(DEMO_SEQUENCES[this.trainSeqIdx].ids);
    },
  },
  mounted() {
    this.runForward();
  },
  methods: {
    idsToTokens(ids) {
      return ids.map((id) => VOCAB[id] ?? '?');
    },
    runForward() {
      const seq = DEMO_SEQUENCES[this.selectedSeqIdx];
      this.result = runTransformerEncoder(seq.ids, this.config);
      this.architecture = this.result.architecture;
      const attnStep = this.result.steps.find((s) => s.attention);
      this.attentionWeights = attnStep?.attention ?? [];
      this.activeSteps = this.result.steps.map((_, i) => i);
    },
    addSample() {
      const ids = [...DEMO_SEQUENCES[this.trainSeqIdx].ids];
      this.samples.push({tokenIds: ids, label: this.selectedClass});
    },
    addPresetSamples() {
      this.samples = DEMO_SEQUENCES.map((seq, i) => ({
        tokenIds: [...seq.ids],
        label: i % CLASS_NAMES.length,
      }));
    },
    removeSample(idx) {
      this.samples.splice(idx, 1);
    },
    formatSample(s) {
      const words = s.tokenIds.map((id) => VOCAB[id]).join(' ');
      return `${words} → ${CLASS_NAMES[s.label]}`;
    },
    train() {
      this.model = new TransformerClassifier();
      this.trainLoss = this.model.train(this.samples, this.epochs, this.lr);
      this.prediction = null;
    },
    recognize() {
      if (!this.model) return;
      const ids = DEMO_SEQUENCES[this.trainSeqIdx].ids;
      this.prediction = this.model.predict(ids);
    },
    barHeight(v) {
      const max = Math.max(...this.trainLoss, 0.01);
      return Math.max(2, (v / max) * 80);
    },
    formatNum(n) {
      return typeof n === 'number' ? n.toFixed(3) : n;
    },
    cellStyle(w) {
      const alpha = Math.min(1, w * 1.2 + 0.08);
      return {
        backgroundColor: `rgba(64, 158, 255, ${alpha})`,
        color: alpha > 0.55 ? '#fff' : '#303133',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.transformer-demo {
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
  margin-bottom: 16px;
  line-height: 1.6;
}

.main-tabs {
  margin-bottom: 24px;
}

.mode-hint {
  margin-bottom: 16px;
}

.arch-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.arch-block {
  text-align: center;
  width: 100%;
  max-width: 520px;
}

.arch-title {
  font-weight: 600;
  color: #409eff;
  padding: 8px 16px;
  background: #ecf5ff;
  border-radius: 6px;
}

.arch-detail {
  font-size: 13px;
  color: #606266;
  margin-top: 4px;
}

.arch-arrow {
  color: #909399;
  font-size: 18px;
}

.control-row, .arch-card {
  margin-bottom: 24px;
}

.seq-select {
  width: 100%;
  margin-bottom: 12px;
}

.token-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.input-actions, .train-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.class-select {
  width: 130px;
}

.train-card, .predict-card, .bp-card {
  margin-top: 16px;
}

.train-loss {
  margin-top: 10px;
  color: #67c23a;
  font-size: 13px;
}

.loss-chart {
  display: flex;
  align-items: flex-end;
  gap: 1px;
  height: 80px;
  margin-top: 8px;
  border-bottom: 1px solid #ebeef5;
}

.loss-bar {
  flex: 1;
  min-width: 2px;
  background: #409eff;
  border-radius: 1px 1px 0 0;
}

.hint, .step-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
}

.step-shape {
  font-size: 12px;
  color: #909399;
  margin: 0 0 10px;

  code {
    background: #f5f7fa;
    padding: 1px 6px;
    border-radius: 4px;
  }
}

.attn-table {
  border-collapse: collapse;
  font-size: 12px;
  width: 100%;

  th, td {
    border: 1px solid #ebeef5;
    padding: 6px 8px;
    text-align: center;
  }

  th {
    background: #f5f7fa;
  }
}

.sample-list {
  max-height: 180px;
  overflow-y: auto;
}

.sample-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}

.prediction-result {
  margin-top: 12px;
}

.prob-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;

  :deep(.el-progress) {
    flex: 1;
  }
}

.bp-list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.9;
  color: #606266;

  code {
    background: #f5f7fa;
    padding: 1px 4px;
    border-radius: 3px;
  }
}

.matrix-block {
  font-family: Consolas, monospace;
  font-size: 12px;
  overflow-x: auto;
}

.matrix-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.row-label {
  min-width: 72px;
  color: #409eff;
  font-weight: 600;
}

.cell {
  min-width: 52px;
  padding: 2px 4px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.heads-block {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.empty-tip {
  color: #999;
  font-size: 13px;
}

.formula-list {
  margin: 0;
  padding-left: 20px;
  line-height: 2;
  color: #606266;

  code {
    background: #f5f7fa;
    padding: 2px 6px;
    border-radius: 4px;
  }
}
</style>
