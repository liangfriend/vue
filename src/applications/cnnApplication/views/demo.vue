<template>
  <div class="cnn-demo">
    <h1>卷积神经网络 (CNN) 学习示例</h1>
    <p class="intro">
      输入 5×5 灰度图、选择类别并加入训练集，训练后可让网络识别输入图像。
    </p>

    <el-row :gutter="24">
      <!-- 左侧：输入区域 -->
      <el-col :span="12">
        <el-card class="input-card">
          <template #header>输入 5×5 灰度图 (0~1)</template>
          <div class="grid-5x5">
            <div v-for="(row, i) in grid" :key="i" class="grid-row">
              <el-input-number
                v-for="(v, j) in row"
                :key="j"
                v-model="grid[i][j]"
                :min="0"
                :max="1"
                :step="0.1"
                :precision="2"
                size="small"
                class="grid-cell"
              />
            </div>
          </div>
          <div class="input-actions">
            <el-select v-model="selectedClass" placeholder="选择类别" class="class-select">
              <el-option label="类别 0" :value="0" />
              <el-option label="类别 1" :value="1" />
              <el-option label="类别 2" :value="2" />
            </el-select>
            <el-button type="primary" @click="addSample">加入训练集</el-button>
            <el-button @click="fillSample">填充示例</el-button>
          </div>
        </el-card>

        <el-card class="train-card">
          <template #header>训练</template>
          <div class="train-actions">
            <el-input-number v-model="epochs" :min="10" :max="1000" :step="50" />
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

      <!-- 右侧：训练集与识别 -->
      <el-col :span="12">
        <el-card class="samples-card">
          <template #header>训练集 ({{ samples.length }})</template>
          <div v-if="samples.length === 0" class="empty-tip">先添加样本到训练集</div>
          <div v-else class="sample-list">
            <div v-for="(s, idx) in samples" :key="idx" class="sample-item">
              <span>样本 {{ idx + 1 }}: 类别 {{ s.label }}</span>
              <el-button type="danger" size="small" text @click="removeSample(idx)">
                删除
              </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="predict-card">
          <template #header>识别</template>
          <el-button type="primary" :disabled="!model" @click="recognize">
            识别当前输入
          </el-button>
          <div v-if="prediction !== null" class="prediction-result">
            <p>预测类别: <strong>类别 {{ prediction.label }}</strong></p>
            <div class="prob-bars">
              <div v-for="(p, i) in prediction.probs" :key="i" class="prob-item">
                <span class="label">类别 {{ i }}:</span>
                <el-progress :percentage="p * 100" :stroke-width="16" />
                <span class="value">{{ (p * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 下方：前向传播详情 -->
    <el-card class="detail-card">
      <template #header>
        <span>前向传播详情</span>
        <el-button type="primary" size="small" @click="runForward">查看</el-button>
      </template>
      <div v-if="result" class="results">
        <el-card v-for="(step, idx) in result.steps" :key="idx" class="step-card">
          <template #header>{{ step.name }}</template>
          <div class="matrix-display">
            <template v-if="Array.isArray(step.data[0])">
              <div v-for="(row, i) in step.data" :key="i" class="matrix-row">
                <span v-for="(cell, j) in row" :key="j" class="cell">{{ formatNum(cell) }}</span>
              </div>
            </template>
            <template v-else>
              <div class="vector-display">
                <span v-for="(v, i) in step.data" :key="i" class="cell">{{ formatNum(v) }}</span>
              </div>
            </template>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { runCNN, createSampleImage, CNNTrainer } from '../cnn.js';

function createEmptyGrid() {
  return Array(5)
    .fill(0)
    .map(() => Array(5).fill(0.1));
}

export default {
  name: 'CNNDemo',
  data() {
    return {
      grid: createEmptyGrid(),
      selectedClass: 0,
      samples: [],
      model: null,
      epochs: 100,
      trainLoss: [],
      prediction: null,
      result: null
    };
  },
  methods: {
    addSample() {
      const input = this.grid.map(row => row.map(v => Number(v)));
      this.samples.push({ input, label: this.selectedClass });
    },
    removeSample(idx) {
      this.samples.splice(idx, 1);
    },
    fillSample() {
      this.grid = createSampleImage().map(row => row.map(v => v));
    },
    train() {
      this.model = new CNNTrainer(3);
      this.trainLoss = this.model.train(this.samples, this.epochs, 0.1);
    },
    recognize() {
      if (!this.model) return;
      const input = this.grid.map(row => row.map(v => Number(v)));
      this.prediction = this.model.predict(input);
    },
    runForward() {
      const input = this.grid.map(row => row.map(v => Number(v)));
      this.result = runCNN(input);
    },
    formatNum(n) {
      if (typeof n !== 'number') return n;
      return n.toFixed(3);
    }
  }
};
</script>

<style scoped lang="scss">
.cnn-demo {
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
.grid-5x5 {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}
.grid-row {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.grid-cell {
  width: 88px;
  :deep(.el-input-number) {
    width: 100%;
  }
}
.input-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.class-select {
  width: 120px;
}
.train-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.label {
  margin-left: 4px;
}
.train-loss {
  margin-top: 12px;
  color: #67c23a;
}
.sample-list {
  max-height: 200px;
  overflow-y: auto;
}
.sample-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}
.empty-tip {
  color: #999;
}
.prediction-result {
  margin-top: 16px;
}
.prob-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}
.prob-item {
  display: flex;
  align-items: center;
  gap: 12px;
  .label {
    min-width: 56px;
  }
  :deep(.el-progress) {
    flex: 1;
  }
  .value {
    min-width: 50px;
    text-align: right;
  }
}
.results {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.step-card {
  min-width: 180px;
  :deep(.el-card__header) {
    font-weight: 600;
  }
}
.matrix-display {
  font-family: 'Consolas', monospace;
  font-size: 12px;
}
.matrix-row,
.vector-display {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 2px;
}
.cell {
  display: inline-block;
  min-width: 40px;
  padding: 2px 4px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}
.detail-card {
  margin-top: 24px;
}
</style>
