<template>
  <div class="attention-demo">
    <h1>Attention（注意力）学习示例</h1>
    <p class="intro">
      单独拆解 <strong>Scaled Dot-Product Attention</strong>，不混入 FFN / LayerNorm。
      公式：<code>Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>) · V</code>
    </p>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="逐步图解" name="walk">
        <el-alert :closable="false" type="info" class="hint-box">
          从输入 X 出发，依次看 Q/K/V 投影、分数矩阵、Softmax 权重、加权求和输出。
        </el-alert>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-card>
              <template #header>选择场景</template>
              <el-select v-model="scenarioIdx" class="full-width" @change="runWalk">
                <el-option
                    v-for="(s, i) in ATTENTION_SCENARIOS"
                    :key="i"
                    :label="s.name"
                    :value="i"
                />
              </el-select>
              <div class="token-row">
                <el-tag v-for="(t, i) in currentLabels" :key="i">{{ t }}</el-tag>
              </div>
              <p class="hint">{{ currentScenario.hint }}</p>
              <div class="query-select">
                <span>高亮查询词：</span>
                <el-radio-group v-model="highlightQuery" size="small">
                  <el-radio-button
                      v-for="(t, i) in currentLabels"
                      :key="i"
                      :value="i"
                  >{{ t }}
                  </el-radio-button>
                </el-radio-group>
              </div>
              <el-button type="primary" @click="runWalk">重新计算</el-button>
            </el-card>
          </el-col>

          <el-col :span="14">
            <el-card>
              <template #header>注意力权重（核心）</template>
              <p class="hint">
                第 <strong>{{ currentLabels[highlightQuery] }}</strong> 行：
                它从各词「借」多少信息（行和 = 100%）
              </p>
              <table v-if="walkResult" class="attn-table">
                <thead>
                <tr>
                  <th>Q \ K</th>
                  <th v-for="t in currentLabels" :key="t">{{ t }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, i) in walkResult.weights" :key="i"
                    :class="{ 'highlight-row': i === highlightQuery }">
                  <th>{{ currentLabels[i] }}</th>
                  <td
                      v-for="(w, j) in row"
                      :key="j"
                      :style="cellStyle(w, i === highlightQuery)"
                  >
                    {{ (w * 100).toFixed(1) }}%
                  </td>
                </tr>
                </tbody>
              </table>
            </el-card>
          </el-col>
        </el-row>

        <el-card v-if="walkResult" class="steps-card">
          <template #header>七步计算过程</template>
          <el-collapse v-model="openSteps">
            <el-collapse-item
                v-for="(step, idx) in walkResult.steps"
                :key="idx"
                :title="step.name"
                :name="idx"
            >
              <p class="step-desc">{{ step.desc }}</p>
              <p v-if="step.shape" class="step-shape">形状 <code>{{ step.shape }}</code></p>

              <table v-if="step.isMatrix" class="attn-table">
                <thead>
                <tr>
                  <th></th>
                  <th v-for="t in (step.colLabels || currentLabels)" :key="t">{{ t }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, i) in step.data" :key="i">
                  <th>{{ step.labels[i] }}</th>
                  <td v-for="(v, j) in row" :key="j">{{ formatNum(v) }}</td>
                </tr>
                </tbody>
              </table>

              <div v-else class="matrix-block">
                <div v-for="(row, i) in step.data" :key="i" class="matrix-row">
                  <span class="row-label">{{ step.labels[i] }}</span>
                  <span v-for="(v, j) in row" :key="j" class="cell">{{ formatNum(v) }}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="训练：学会关注" name="train">
        <el-alert :closable="false" type="success" class="hint-box">
          任务：让<strong>查询词</strong>的注意力行，对<strong>目标词</strong>列的权重尽量大。
          损失 <code>-log A[query][target]</code>，只更新 Embedding、Wq、Wk。
        </el-alert>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <template #header>添加样本</template>
              <el-select v-model="trainScenarioIdx" class="full-width">
                <el-option
                    v-for="(s, i) in ATTENTION_SCENARIOS"
                    :key="i"
                    :label="s.name"
                    :value="i"
                />
              </el-select>
              <div class="token-row">
                <el-tag v-for="(t, i) in trainLabels" :key="i">{{ i }}:{{ t }}</el-tag>
              </div>
              <div class="pick-row">
                <span>查询词：</span>
                <el-select v-model="queryPos" style="width:100px">
                  <el-option v-for="(t, i) in trainLabels" :key="i" :label="t" :value="i"/>
                </el-select>
                <span>应关注：</span>
                <el-select v-model="targetPos" style="width:100px">
                  <el-option v-for="(t, i) in trainLabels" :key="i" :label="t" :value="i"/>
                </el-select>
              </div>
              <el-button type="primary" @click="addSample">加入训练集</el-button>
              <el-button @click="addPreset">添加代词指代样本</el-button>
            </el-card>

            <el-card class="mt">
              <template #header>训练</template>
              <div class="train-actions">
                <el-input-number v-model="epochs" :min="20" :max="300" :step="20"/>
                <span>epochs</span>
                <el-input-number v-model="lr" :min="0.1" :max="3" :step="0.1" :precision="1"/>
                <span>lr</span>
                <el-button type="success" :disabled="samples.length < 1" @click="train">
                  开始训练
                </el-button>
              </div>
              <p class="hint">微型模型梯度较小，建议 lr=1.0 左右</p>
              <div v-if="trainLoss.length" class="train-result">
                损失 {{ trainLoss[0].toFixed(4) }} → {{ trainLoss.at(-1).toFixed(4) }}
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>训练集 ({{ samples.length }})</template>
              <div v-if="!samples.length" class="empty">添加样本后开始训练</div>
              <div v-for="(s, i) in samples" :key="i" class="sample-line">
                {{ formatSample(s) }}
                <el-button text type="danger" size="small" @click="samples.splice(i,1)">删</el-button>
              </div>
            </el-card>

            <el-card class="mt">
              <template #header>测试关注效果</template>
              <el-button type="primary" :disabled="!model" @click="testFocus">测试</el-button>
              <div v-if="testResult" class="test-result">
                <p>
                  「{{ trainLabels[queryPos] }}」最关注：
                  <strong>{{ trainLabels[testResult.focusPos] }}</strong>
                  ({{ (testResult.focusProbs[testResult.focusPos] * 100).toFixed(1) }}%)
                </p>
                <table class="attn-table mini">
                  <tr v-for="(w, j) in testResult.focusProbs" :key="j">
                    <th>{{ trainLabels[j] }}</th>
                    <td :style="cellStyle(w, true)">{{ (w * 100).toFixed(1) }}%</td>
                  </tr>
                </table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-card class="compare-card">
      <template #header>Self-Attention vs Cross-Attention</template>
      <el-row :gutter="16">
        <el-col :span="12">
          <h4>Self-Attention（本示例）</h4>
          <p>Q、K、V 来自<strong>同一序列</strong>。每个词看句子里所有词（包括自己）。</p>
        </el-col>
        <el-col :span="12">
          <h4>Cross-Attention</h4>
          <p>Q 来自解码器，K/V 来自编码器。用于翻译：生成「I」时去看源句「我」等词。</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  VOCAB,
  ATTENTION_SCENARIOS,
  runAttentionWalkthrough,
  AttentionFocusTrainer,
} from '../../attention.js';

export default {
  name: 'AttentionDemo',
  data() {
    return {
      VOCAB,
      ATTENTION_SCENARIOS,
      activeTab: 'walk',
      scenarioIdx: 0,
      highlightQuery: 0,
      walkResult: null,
      openSteps: [0, 4, 5, 6],
      trainScenarioIdx: 0,
      queryPos: 0,
      targetPos: 2,
      samples: [],
      model: null,
      epochs: 120,
      lr: 1.0,
      trainLoss: [],
      testResult: null,
    };
  },
  computed: {
    currentScenario() {
      return ATTENTION_SCENARIOS[this.scenarioIdx];
    },
    currentLabels() {
      return this.currentScenario.tokenIds.map((id) => VOCAB[id]);
    },
    trainLabels() {
      return ATTENTION_SCENARIOS[this.trainScenarioIdx].tokenIds.map((id) => VOCAB[id]);
    },
  },
  mounted() {
    this.highlightQuery = ATTENTION_SCENARIOS[0].queryHighlight ?? 0;
    this.runWalk();
  },
  methods: {
    runWalk() {
      const sc = ATTENTION_SCENARIOS[this.scenarioIdx];
      this.highlightQuery = sc.queryHighlight ?? 0;
      this.walkResult = runAttentionWalkthrough(sc.tokenIds);
      this.openSteps = this.walkResult.steps.map((_, i) => i);
    },
    addSample() {
      const ids = [...ATTENTION_SCENARIOS[this.trainScenarioIdx].tokenIds];
      this.samples.push({tokenIds: ids, queryPos: this.queryPos, targetPos: this.targetPos});
    },
    addPreset() {
      this.samples = [{
        tokenIds: [5, 6, 3],
        queryPos: 0,
        targetPos: 2,
      }];
      this.trainScenarioIdx = 0;
      this.queryPos = 0;
      this.targetPos = 2;
    },
    formatSample(s) {
      const words = s.tokenIds.map((id) => VOCAB[id]).join(' ');
      return `${words}：「${VOCAB[s.tokenIds[s.queryPos]]}」→「${VOCAB[s.tokenIds[s.targetPos]]}」`;
    },
    train() {
      this.model = new AttentionFocusTrainer();
      this.trainLoss = this.model.train(this.samples, this.epochs, this.lr);
      this.testResult = null;
    },
    testFocus() {
      const ids = ATTENTION_SCENARIOS[this.trainScenarioIdx].tokenIds;
      this.testResult = this.model.predict(ids, this.queryPos);
    },
    formatNum(v) {
      return typeof v === 'number' ? v.toFixed(3) : v;
    },
    cellStyle(w, emphasize) {
      const alpha = Math.min(1, w * (emphasize ? 1.5 : 1.2) + 0.06);
      return {
        backgroundColor: `rgba(103, 194, 58, ${alpha})`,
        color: alpha > 0.5 ? '#fff' : '#303133',
        fontWeight: emphasize ? '600' : 'normal',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.attention-demo {
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
  line-height: 1.6;
  margin-bottom: 16px;

  code {
    background: #f5f7fa;
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.hint-box {
  margin-bottom: 16px;
}

.full-width {
  width: 100%;
  margin-bottom: 12px;
}

.token-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.hint {
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
}

.query-select {
  margin: 12px 0;
  font-size: 13px;
}

.attn-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;

  th, td {
    border: 1px solid #ebeef5;
    padding: 6px 8px;
    text-align: center;
  }

  th {
    background: #f5f7fa;
  }

  .highlight-row th {
    background: #e1f3d8;
  }

  &.mini th {
    width: 60px;
  }
}

.steps-card {
  margin-top: 20px;
}

.step-desc, .step-shape {
  font-size: 13px;
  color: #606266;
}

.matrix-block {
  font-family: Consolas, monospace;
  font-size: 12px;
}

.matrix-row {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.row-label {
  min-width: 56px;
  color: #67c23a;
  font-weight: 600;
}

.cell {
  min-width: 48px;
  padding: 2px 4px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.pick-row, .train-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 12px 0;
}

.mt {
  margin-top: 16px;
}

.sample-line {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.train-result {
  margin-top: 10px;
  color: #67c23a;
  font-size: 13px;
}

.test-result {
  margin-top: 12px;
  font-size: 13px;
}

.empty {
  color: #999;
  font-size: 13px;
}

.compare-card {
  margin-top: 24px;

  h4 {
    margin: 0 0 8px;
    color: #409eff;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #606266;
    line-height: 1.6;
  }
}
</style>
