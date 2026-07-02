/**
 * 循环神经网络 (RNN) 学习示例
 * 结构：Embedding → 逐步更新隐藏状态 h_t = tanh(x_t·W_xh + h_{t-1}·W_hh + b) → 用最后 h 分类
 *
 * h_t = tanh(W_xh · x_t + W_hh · h_{t-1} + b_h)
 * y   = softmax(W_hy · h_T + b_y)
 */

const VOCAB = ['<pad>', '我', '爱', '猫', '狗', '它', '喜欢',];

const CLASS_NAMES = ['情感句', '对比句', '指代句',];

/** 预设场景：短句序列分类 */
const RNN_SCENARIOS = [
  {
    name: '情感：我 爱 猫',
    tokenIds: [1, 2, 3,],
    label: 0,
    hint: '「我 爱 猫」表达情感，RNN 从左到右读入，隐藏状态逐步积累语义。',
  },
  {
    name: '对比：猫 狗 猫',
    tokenIds: [3, 4, 3,],
    label: 1,
    hint: '首尾重复、中间对比，隐藏状态会记住前面见过的「猫」。',
  },
  {
    name: '指代：它 喜欢 猫',
    tokenIds: [5, 6, 3,],
    label: 2,
    hint: '「它」需结合后文理解，RNN 靠最终隐藏状态做整句分类。',
  },
];

const PRESET_SAMPLES = [
  {tokenIds: [1, 2, 3,], label: 0,},
  {tokenIds: [2, 1, 3,], label: 0,},
  {tokenIds: [3, 4, 3,], label: 1,},
  {tokenIds: [4, 3, 4,], label: 1,},
  {tokenIds: [5, 6, 3,], label: 2,},
  {tokenIds: [5, 3, 6,], label: 2,},
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
}

function initMatrix(rows, cols, seed) {
  const rand = seededRandom(seed);
  return Array.from({length: rows,}, () =>
    Array.from({length: cols,}, () => rand() * 0.2)
  );
}

function zeroMatrix(rows, cols) {
  return Array.from({length: rows,}, () => Array(cols).fill(0));
}

function initVector(size) {
  return Array(size).fill(0);
}

function tanh(x) {
  return Math.tanh(x);
}

function tanhDerivative(z) {
  const t = Math.tanh(z);
  return 1 - t * t;
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map((x) => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((x) => x / sum);
}

function tokenEmbedding(tokenIds, embedTable) {
  return tokenIds.map((id) => [...embedTable[id],]);
}

/**
 * 单步 RNN：h_t = tanh(x_t · W_xh + h_{t-1} · W_hh + b_h)
 */
function rnnStep(x, hPrev, Wxh, Whh, bh) {
  const hiddenSize = bh.length;
  const z = Array(hiddenSize).fill(0);
  for (let i = 0; i < hiddenSize; i++) {
    let sum = bh[i];
    for (let j = 0; j < x.length; j++) {
      sum += x[j] * Wxh[j][i];
    }
    for (let j = 0; j < hPrev.length; j++) {
      sum += hPrev[j] * Whh[j][i];
    }
    z[i] = sum;
  }
  const h = z.map(tanh);
  return {z, h,};
}

function denseFromHidden(h, Why, by) {
  return Why[0].map((_, k) => {
    let sum = by[k];
    for (let j = 0; j < h.length; j++) {
      sum += h[j] * Why[j][k];
    }
    return sum;
  });
}

/**
 * 图解：逐步展示隐藏状态如何随时间更新
 */
function runRNNWalkthrough(tokenIds, config = {}) {
  const embedDim = config.embedDim ?? 4;
  const hiddenSize = config.hiddenSize ?? 4;
  const numClasses = config.numClasses ?? 3;
  const seed = config.seed ?? 40;
  const labels = tokenIds.map((id) => VOCAB[id] ?? '?');

  const embedTable = initMatrix(VOCAB.length, embedDim, 1);
  const Wxh = initMatrix(embedDim, hiddenSize, seed);
  const Whh = initMatrix(hiddenSize, hiddenSize, seed + 1);
  const bh = initVector(hiddenSize);
  const Why = initMatrix(hiddenSize, numClasses, seed + 2);
  const by = initVector(numClasses);

  const X = tokenEmbedding(tokenIds, embedTable);
  const timesteps = [];
  let hPrev = initVector(hiddenSize);

  for (let t = 0; t < tokenIds.length; t++) {
    const {z, h,} = rnnStep(X[t], hPrev, Wxh, Whh, bh);
    timesteps.push({
      t,
      token: labels[t],
      x: X[t],
      hPrev: [...hPrev,],
      z,
      h,
    });
    hPrev = h;
  }

  const hLast = timesteps[timesteps.length - 1].h;
  const logits = denseFromHidden(hLast, Why, by);
  const probs = softmax(logits);

  const steps = [
    {
      name: '1. 输入序列 X（每个词的 embedding）',
      desc: 'RNN 按时间步从左到右读入，不像 MLP 一次性看全部输入。',
      data: X,
      labels,
    },
    ...timesteps.map((ts) => ({
      name: `2.${ts.t + 1} 时刻 t=${ts.t}：读到「${ts.token}」`,
      desc: `h_${ts.t} = tanh(x_${ts.t}·W_xh + h_${ts.t - 1}·W_hh + b)。隐藏状态携带前文信息。`,
      hPrev: ts.hPrev,
      z: ts.z,
      h: ts.h,
      token: ts.token,
      t: ts.t,
    })),
    {
      name: '3. 输出层：用最后隐藏状态 h_T 分类',
      desc: 'y = softmax(W_hy · h_T + b_y)。整句信息压缩在最终 h 里。',
      logits,
      probs,
      hLast,
    },
  ];

  return {
    X,
    timesteps,
    hLast,
    logits,
    probs,
    labels,
    tokenIds,
    steps,
    CLASS_NAMES,
  };
}

/**
 * 可训练的 Vanilla RNN 分类器
 */
class RNNTrainer {
  constructor(vocabSize = VOCAB.length, embedDim = 4, hiddenSize = 8, numClasses = 3) {
    this.embedDim = embedDim;
    this.hiddenSize = hiddenSize;
    this.numClasses = numClasses;
    this.embedTable = initMatrix(vocabSize, embedDim, 1);
    this.Wxh = initMatrix(embedDim, hiddenSize, 20);
    this.Whh = initMatrix(hiddenSize, hiddenSize, 21);
    this.bh = initVector(hiddenSize);
    this.Why = initMatrix(hiddenSize, numClasses, 22);
    this.by = initVector(numClasses);
  }

  forward(tokenIds) {
    const X = tokenEmbedding(tokenIds, this.embedTable);
    const timesteps = [];
    let hPrev = initVector(this.hiddenSize);

    for (let t = 0; t < tokenIds.length; t++) {
      const {z, h,} = rnnStep(X[t], hPrev, this.Wxh, this.Whh, this.bh);
      timesteps.push({x: X[t], z, h, hPrev: [...hPrev,],});
      hPrev = h;
    }

    const hLast = timesteps[timesteps.length - 1].h;
    const logits = denseFromHidden(hLast, this.Why, this.by);
    const probs = softmax(logits);

    return {X, timesteps, hLast, logits, probs, tokenIds,};
  }

  loss(probs, label) {
    return -Math.log(Math.max(probs[label], 1e-8));
  }

  /** BPTT：通过时间反向传播（短序列） */
  trainStep(tokenIds, label, lr = 0.05) {
    const cache = this.forward(tokenIds);
    const {timesteps, probs,} = cache;
    const T = timesteps.length;

    const y = Array(this.numClasses).fill(0);
    y[label] = 1;
    const dLogits = probs.map((p, k) => p - y[k]);

    const dWhy = zeroMatrix(this.hiddenSize, this.numClasses);
    const dBy = initVector(this.numClasses);
    const hLast = timesteps[T - 1].h;
    for (let j = 0; j < this.hiddenSize; j++) {
      for (let k = 0; k < this.numClasses; k++) {
        dWhy[j][k] += dLogits[k] * hLast[j];
      }
    }
    for (let k = 0; k < this.numClasses; k++) {
      dBy[k] += dLogits[k];
    }

    let dH = Array(this.hiddenSize).fill(0);
    for (let k = 0; k < this.numClasses; k++) {
      for (let j = 0; j < this.hiddenSize; j++) {
        dH[j] += dLogits[k] * this.Why[j][k];
      }
    }

    const dWxh = zeroMatrix(this.embedDim, this.hiddenSize);
    const dWhh = zeroMatrix(this.hiddenSize, this.hiddenSize);
    const dBh = initVector(this.hiddenSize);
    const dEmbed = zeroMatrix(VOCAB.length, this.embedDim);

    for (let t = T - 1; t >= 0; t--) {
      const {x, z, hPrev,} = timesteps[t];
      const dZ = dH.map((dh, i) => dh * tanhDerivative(z[i]));

      for (let i = 0; i < this.hiddenSize; i++) {
        dBh[i] += dZ[i];
        for (let j = 0; j < this.embedDim; j++) {
          dWxh[j][i] += dZ[i] * x[j];
        }
        for (let j = 0; j < this.hiddenSize; j++) {
          dWhh[j][i] += dZ[i] * hPrev[j];
        }
      }

      const dHPrev = initVector(this.hiddenSize);
      for (let j = 0; j < this.hiddenSize; j++) {
        for (let i = 0; i < this.hiddenSize; i++) {
          dHPrev[j] += dZ[i] * this.Whh[j][i];
        }
      }
      dH = dHPrev;

      for (let j = 0; j < this.embedDim; j++) {
        let grad = 0;
        for (let i = 0; i < this.hiddenSize; i++) {
          grad += dZ[i] * this.Wxh[j][i];
        }
        dEmbed[tokenIds[t]][j] += grad;
      }
    }

    const apply = (W, dW) => {
      for (let i = 0; i < W.length; i++) {
        for (let j = 0; j < W[0].length; j++) {
          W[i][j] -= lr * dW[i][j];
        }
      }
    };
    const applyVec = (v, dv) => {
      for (let i = 0; i < v.length; i++) {
        v[i] -= lr * dv[i];
      }
    };

    apply(this.Wxh, dWxh);
    apply(this.Whh, dWhh);
    apply(this.Why, dWhy);
    apply(this.embedTable, dEmbed);
    applyVec(this.bh, dBh);
    applyVec(this.by, dBy);

    return this.loss(probs, label);
  }

  train(samples, epochs = 200, lr = 0.05) {
    const losses = [];
    for (let e = 0; e < epochs; e++) {
      let total = 0;
      for (const s of samples) {
        total += this.trainStep(s.tokenIds, s.label, lr);
      }
      losses.push(total / samples.length);
    }
    return losses;
  }

  predict(tokenIds) {
    const {probs, hLast, timesteps,} = this.forward(tokenIds);
    return {
      probs,
      label: probs.indexOf(Math.max(...probs)),
      hLast,
      timesteps,
    };
  }
}

export {
  VOCAB,
  CLASS_NAMES,
  RNN_SCENARIOS,
  PRESET_SAMPLES,
  runRNNWalkthrough,
  RNNTrainer,
};
