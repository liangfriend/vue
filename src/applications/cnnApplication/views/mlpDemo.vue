<template>
  <div class="mlp-demo">
    <h1>全连接神经网络 (MLP) 学习示例</h1>
    <p class="intro">
      根据坐标 (x, y) 判断象限。已知四点 (1,1)、(-1,1)、(-1,-1)、(1,-1) 分别属于 I、II、III、IV 象限，训练后让网络识别任意坐标的象限。
    </p>

    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="input-card">
          <template #header>输入坐标 (x, y)</template>
          <div class="coord-inputs">
            <div class="coord-item">
              <span class="label">x:</span>
              <el-input-number v-model="x" :min="-10" :max="10" :step="0.5" :precision="2" />
            </div>
            <div class="coord-item">
              <span class="label">y:</span>
              <el-input-number v-model="y" :min="-10" :max="10" :step="0.5" :precision="2" />
            </div>
          </div>
          <div class="input-actions">
            <el-select v-model="selectedClass" placeholder="选择象限" class="class-select">
              <el-option
                v-for="(name, idx) in QUADRANT_NAMES"
                :key="idx"
                :label="name"
                :value="idx"
              />
            </el-select>
            <el-button type="primary" @click="addSample">加入训练集</el-button>
            <el-button @click="addFourPoints">添加四个已知点</el-button>
          </div>
        </el-card>

        <el-card class="train-card">
          <template #header>训练</template>
          <div class="train-actions">
            <el-input-number v-model="epochs" :min="50" :max="2000" :step="100" />
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
        <el-card class="samples-card">
          <template #header>训练集 ({{ samples.length }})</template>
          <div v-if="samples.length === 0" class="empty-tip">先添加样本</div>
          <div v-else class="sample-list">
            <div v-for="(s, idx) in samples" :key="idx" class="sample-item">
              <span>({{ s.input[0] }}, {{ s.input[1] }}) → {{ QUADRANT_NAMES[s.label] }}</span>
              <el-button type="danger" size="small" text @click="removeSample(idx)">
                删除
              </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="predict-card">
          <template #header>识别</template>
          <el-button type="primary" :disabled="!model" @click="recognize">
            识别当前坐标
          </el-button>
          <div v-if="prediction !== null" class="prediction-result">
            <p>
              预测象限:
              <strong>{{ QUADRANT_NAMES[prediction.label] }}</strong>
            </p>
            <div class="prob-bars">
              <div
                v-for="(p, i) in prediction.probs"
                :key="i"
                class="prob-item"
              >
                <span class="label">{{ QUADRANT_NAMES[i] }}:</span>
                <el-progress :percentage="p * 100" :stroke-width="16" />
                <span class="value">{{ (p * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MLPTrainer, QUADRANT_NAMES } from '../mlp.js';

export default {
  name: 'MLPDemo',
  data() {
    return {
      x: 2,
      y: 2,
      selectedClass: 0,
      samples: [],
      model: null,
      epochs: 500,
      trainLoss: [],
      prediction: null,
      QUADRANT_NAMES
    };
  },
  methods: {
    addSample() {
      this.samples.push({
        input: [Number(this.x), Number(this.y)],
        label: this.selectedClass
      });
    },
    removeSample(idx) {
      this.samples.splice(idx, 1);
    },
    addFourPoints() {
      const four = [
        { input: [1, 1], label: 0 },
        { input: [-1, 1], label: 1 },
        { input: [-1, -1], label: 2 },
        { input: [1, -1], label: 3 }
      ];
      this.samples.push(...four);
    },
    train() {
      this.model = new MLPTrainer(2, 50, 4);
      this.trainLoss = this.model.train(this.samples, this.epochs, 0.1);
    },
    recognize() {
      if (!this.model) return;
      this.prediction = this.model.predict([Number(this.x), Number(this.y)]);
    }
  }
};
</script>

<style scoped lang="scss">
.mlp-demo {
  padding: 24px;
  max-width: 1000px;
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
.coord-inputs {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}
.coord-item {
  display: flex;
  align-items: center;
  gap: 8px;
  .label {
    min-width: 24px;
  }
}
.input-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.class-select {
  width: 180px;
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
  max-height: 220px;
  overflow-y: auto;
}
.sample-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-family: 'Consolas', monospace;
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
    min-width: 130px;
    font-size: 12px;
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
