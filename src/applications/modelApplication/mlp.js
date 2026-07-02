/**
 * 全连接神经网络 (MLP) 学习示例
 * 象限分类：输入坐标 (x,y)，输出属于第 I/II/III/IV 象限
 * 结构：输入(2) -> 隐藏层(50) [ReLU] -> 输出(4) [Softmax]
 */

function relu(x) {
  return Math.max(0, x);
}

function reluDerivative(x) {
  return x > 0 ? 1 : 0;
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map((x) => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((x) => x / sum);
}

/**
 * 初始化权重：小型随机值
 */
function initWeights(rows, cols) {
  return Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0).map(() => (Math.random() - 0.5) * 0.1));
}

function initBias(size) {
  return Array(size).fill(0);
}

/**
 * MLP 训练器：输入(2) -> 隐藏(50) -> 输出(4)
 */
class MLPTrainer {
  constructor(inputSize = 2, hiddenSize = 50, numClasses = 4) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.numClasses = numClasses;

    // W1: (inputSize, hiddenSize), b1: (hiddenSize)
    this.W1 = initWeights(inputSize, hiddenSize);
    this.b1 = initBias(hiddenSize);

    // W2: (hiddenSize, numClasses), b2: (numClasses)
    this.W2 = initWeights(hiddenSize, numClasses);
    this.b2 = initBias(numClasses);
  }

  /**
   * 前向传播
   * @param {number[]} x - 输入 [x, y]
   * @returns {{ probs: number[], h: number[], z: number[] }} 输出概率、隐藏层激活、隐藏层线性
   */
  forward(x) {
    const [xi, yi,] = x;

    // H = X * W1 + b1
    const z = Array(this.hiddenSize).fill(0);
    for (let j = 0; j < this.hiddenSize; j++) {
      z[j] = xi * this.W1[0][j] + yi * this.W1[1][j] + this.b1[j];
    }

    // ReLU
    const h = z.map(relu);

    // Y = H * W2 + b2
    const logits = Array(this.numClasses).fill(0);
    for (let k = 0; k < this.numClasses; k++) {
      for (let j = 0; j < this.hiddenSize; j++) {
        logits[k] += h[j] * this.W2[j][k];
      }
      logits[k] += this.b2[k];
    }

    const probs = softmax(logits);
    return {probs, h, z,};
  }

  /**
   * 训练一步：反向传播 + 梯度下降
   */
  trainStep(input, label, lr = 0.1) {
    const {probs, h, z,} = this.forward(input);
    const x = input;

    // one-hot
    const y = Array(this.numClasses).fill(0);
    y[label] = 1;

    // 输出层梯度: dL/dlogits = probs - y
    const dLogits = probs.map((p, k) => p - y[k]);

    // 隐藏层梯度: dL/dh = dLogits * W2^T, 再乘 ReLU 导数
    const dH = Array(this.hiddenSize).fill(0);
    for (let j = 0; j < this.hiddenSize; j++) {
      for (let k = 0; k < this.numClasses; k++) {
        dH[j] += dLogits[k] * this.W2[j][k];
      }
      dH[j] *= reluDerivative(z[j]);
    }

    // 更新 W2, b2
    for (let j = 0; j < this.hiddenSize; j++) {
      for (let k = 0; k < this.numClasses; k++) {
        this.W2[j][k] -= lr * dLogits[k] * h[j];
      }
    }
    for (let k = 0; k < this.numClasses; k++) {
      this.b2[k] -= lr * dLogits[k];
    }

    // 更新 W1, b1
    for (let i = 0; i < this.inputSize; i++) {
      for (let j = 0; j < this.hiddenSize; j++) {
        this.W1[i][j] -= lr * dH[j] * x[i];
      }
    }
    for (let j = 0; j < this.hiddenSize; j++) {
      this.b1[j] -= lr * dH[j];
    }

    // 交叉熵损失
    return -Math.log(Math.max(probs[label], 1e-8));
  }

  /**
   * 批量训练
   */
  train(samples, epochs = 500, lr = 0.1) {
    const losses = [];
    for (let e = 0; e < epochs; e++) {
      let totalLoss = 0;
      for (const {input, label,} of samples) {
        totalLoss += this.trainStep(input, label, lr);
      }
      losses.push(totalLoss / samples.length);
    }
    return losses;
  }

  /**
   * 预测
   */
  predict(input) {
    const {probs,} = this.forward(input);
    return {
      probs,
      label: probs.indexOf(Math.max(...probs)),
    };
  }
}

/** 象限名称 */
const QUADRANT_NAMES = ['I (x>0, y>0)', 'II (x<0, y>0)', 'III (x<0, y<0)', 'IV (x>0, y<0)',];

export {MLPTrainer, QUADRANT_NAMES,};
