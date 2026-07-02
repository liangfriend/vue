/**
 * 卷积神经网络 (CNN) 学习示例
 * 纯 JavaScript 实现，用于理解 CNN 各层的工作原理
 */

/**
 * 2D 卷积操作
 * @param {number[][]} input - 输入矩阵 (高 x 宽)
 * @param {number[][]} kernel - 卷积核 (滤波器)
 * @param {number} stride - 步长
 * @returns {number[][]} 卷积后的特征图
 */
function conv2d(input, kernel, stride = 1) {
  const inH = input.length;
  const inW = input[0].length;
  const kH = kernel.length;
  const kW = kernel[0].length;
  const outH = Math.floor((inH - kH) / stride) + 1;
  const outW = Math.floor((inW - kW) / stride) + 1;
  const output = Array(outH).fill(0).map(() => Array(outW).fill(0));

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      let sum = 0;
      for (let ky = 0; ky < kH; ky++) {
        for (let kx = 0; kx < kW; kx++) {
          sum += input[y * stride + ky][x * stride + kx] * kernel[ky][kx];
        }
      }
      output[y][x] = sum;
    }
  }
  return output;
}

/**
 * ReLU 激活函数: max(0, x)
 */
function relu(matrix) {
  return matrix.map(row => row.map(v => Math.max(0, v)));
}

/**
 * 最大池化 (Max Pooling)
 * @param {number[][]} input - 输入
 * @param {number} poolSize - 池化窗口大小
 * @param {number} stride - 步长
 */
function maxPooling(input, poolSize = 2, stride = 1) {
  const inH = input.length;
  const inW = input[0].length;
  const outH = Math.floor((inH - poolSize) / stride) + 1;

  const outW = Math.floor((inW - poolSize) / stride) + 1;
  const output = Array(outH).fill(0).map(() => Array(outW).fill(0));

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      let maxVal = -Infinity;
      for (let py = 0; py < poolSize; py++) {
        for (let px = 0; px < poolSize; px++) {
          const val = input[y * stride + py][x * stride + px];
          maxVal = Math.max(maxVal, val);
        }
      }
      output[y][x] = maxVal;
    }
  }
  return output;
}

/**
 * 展平：将二维数组转为一维
 */
function flatten(matrix) {
  return matrix.flat();
}

/**
 * 全连接层 (矩阵乘法 + 偏置)
 */
function dense(input, weights, bias) {
  return weights.map((w, i) => {
    const sum = input.reduce((acc, x, j) => acc + x * w[j], 0);
    return sum + (bias[i] ?? 0);
  });
}

/**
 * Softmax：将输出转为概率分布
 */
function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map(x => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(x => x / sum);
}

/**
 * 完整的简单 CNN 前向传播示例
 * 输入: 5x5 灰度图 -> 卷积 -> ReLU -> 池化 -> 全连接 -> Softmax
 */
function runCNN(inputImage) {
  const results = {steps: [], output: [],};

  // 1. 卷积层：使用 3x3 边缘检测核
  const edgeKernel = [
    [-1, -1, -1,],
    [-1, 8, -1,],
    [-1, -1, -1,],
  ];
  const convOut = conv2d(inputImage, edgeKernel);
  results.steps.push({name: '卷积 (3x3 边缘检测)', data: convOut,});

  // 2. ReLU 激活
  const reluOut = relu(convOut);
  results.steps.push({name: 'ReLU 激活', data: reluOut,});

  // 3. 最大池化 2x2 stride 1 (3x3 -> 2x2)
  const poolOut = maxPooling(reluOut, 2, 1);
  results.steps.push({name: '最大池化 (2x2)', data: poolOut,});

  // 4. 展平
  const flat = flatten(poolOut);
  results.steps.push({name: '展平', data: flat,});

  // 5. 全连接层：简化为 3 类输出
  const numClasses = 3;
  const weights = Array(numClasses).fill(0).map(() =>
    flat.map(() => (Math.random() - 0.5) * 0.1)
  );
  const bias = Array(numClasses).fill(0);
  const fcOut = dense(flat, weights, bias);
  results.steps.push({name: '全连接层', data: fcOut,});

  // 6. Softmax
  const probs = softmax(fcOut);
  results.steps.push({name: 'Softmax 概率', data: probs,});
  results.output = probs;

  return results;
}

/**
 * 生成示例输入图像 (5x5)
 */
function createSampleImage() {
  return [
    [0.1, 0.2, 0.3, 0.2, 0.1,],
    [0.2, 0.5, 0.8, 0.5, 0.2,],
    [0.3, 0.8, 1.0, 0.8, 0.3,],
    [0.2, 0.5, 0.8, 0.5, 0.2,],
    [0.1, 0.2, 0.3, 0.2, 0.1,],
  ];
}

/**
 * 可训练的 CNN 模型
 * 固定 conv+relu+pool，训练全连接层
 */
class CNNTrainer {
  constructor(numClasses = 3) {
    this.numClasses = numClasses;
    this.edgeKernel = [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1]
    ];
    // 3x3 -> pool 2x2 stride 1 -> 2x2 -> flatten = 4
    this.flatSize = 4;
    this.weights = Array(numClasses).fill(0).map(() =>
      Array(this.flatSize).fill(0).map(() => (Math.random() - 0.5) * 0.1)
    );
    this.bias = Array(numClasses).fill(0);
  }

  /** 前向传播，提取特征并得到概率 */
  forward(input) {
    const convOut = conv2d(input, this.edgeKernel);
    const reluOut = relu(convOut);
    const poolOut = maxPooling(reluOut, 2, 1);
    const flat = flatten(poolOut);
    this._lastFlat = flat;
    const logits = dense(flat, this.weights, this.bias);
    const probs = softmax(logits);
    this._lastProbs = probs;
    return probs;
  }

  /** 计算交叉熵损失 */
  loss(probs, label) {
    return -Math.log(Math.max(probs[label], 1e-8));
  }

  /** 训练一步：反向传播 + 梯度下降 */
  trainStep(input, label, lr = 0.1) {
    const probs = this.forward(input);
    const flat = this._lastFlat;

    // softmax + 交叉熵 的梯度: dL/dz = probs - y
    const y = Array(this.numClasses).fill(0);
    y[label] = 1;
    const dLogits = probs.map((p, i) => p - y[i]);

    // dense 层梯度: dL/dW = dLogits * flat^T, dL/db = dLogits
    for (let i = 0; i < this.numClasses; i++) {
      for (let j = 0; j < this.flatSize; j++) {
        this.weights[i][j] -= lr * dLogits[i] * flat[j];
      }
      this.bias[i] -= lr * dLogits[i];
    }

    return this.loss(probs, label);
  }

  /** 批量训练 */
  train(samples, epochs = 100, lr = 0.1) {
    const losses = [];
    for (let e = 0; e < epochs; e++) {
      let totalLoss = 0;
      for (const { input, label } of samples) {
        totalLoss += this.trainStep(input, label, lr);
      }
      losses.push(totalLoss / samples.length);
    }
    return losses;
  }

  /** 预测类别 */
  predict(input) {
    const probs = this.forward(input);
    return {
      probs,
      label: probs.indexOf(Math.max(...probs))
    };
  }
}

export { conv2d, relu, maxPooling, flatten, dense, softmax, runCNN, createSampleImage, CNNTrainer };
