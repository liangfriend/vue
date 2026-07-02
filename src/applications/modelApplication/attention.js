/**
 * Scaled Dot-Product Attention 学习示例
 * Attention(Q,K,V) = softmax(QK^T / √d_k) · V
 */

const VOCAB = ['<pad>', '我', '爱', '猫', '狗', '它', '喜欢',];

/** 预设场景：固定种子权重，便于观察注意力分布 */
const ATTENTION_SCENARIOS = [
  {
    name: '代词指代：它 喜欢 猫',
    tokenIds: [5, 6, 3,],
    hint: '「它」通常需要关注后文名词「猫」，观察第 1 行对第 3 列的权重是否偏高。',
    queryHighlight: 0,
  },
  {
    name: '情感：我 爱 猫',
    tokenIds: [1, 2, 3,],
    hint: '三个词两两相关，注意力矩阵应较均匀或「爱」连接「我」与「猫」。',
    queryHighlight: 1,
  },
  {
    name: '对比：猫 狗 猫',
    tokenIds: [3, 4, 3,],
    hint: '首尾相同词「猫」，位置 0 与 2 的向量相同，自注意力常出现对称模式。',
    queryHighlight: 0,
  },
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

function vecMat(x, W) {
  return Array.from({length: W[0].length,}, (_, j) =>
    W.reduce((s, row, i) => s + x[i] * row[j], 0)
  );
}

// 求a,b点积
function matMul(A, B) {
  const out = Array.from({length: A.length,}, () => Array(B[0].length).fill(0));
  for (let i = 0; i < A.length; i++) {
    for (let k = 0; k < B.length; k++) {
      for (let j = 0; j < B[0].length; j++) {
        out[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return out;
}

// 颠倒数组
function transpose(A) {
  return A[0].map((_, j) => A.map((row) => row[j]));
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map((x) => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((x) => x / sum);
}

function softmaxBackward(dOut, probs) {
  const dot = dOut.reduce((s, v, i) => s + v * probs[i], 0);
  return dOut.map((v, i) => probs[i] * (v - dot));
}

function vecMatBackward(x, W, dY) {
  const dW = zeroMatrix(W.length, W[0].length);
  const dX = Array(x.length).fill(0);
  for (let i = 0; i < W.length; i++) {
    for (let j = 0; j < W[0].length; j++) {
      dW[i][j] += dY[j] * x[i];
      dX[i] += dY[j] * W[i][j];
    }
  }
  return {dX, dW,};
}

function tokenEmbedding(tokenIds, embedTable) {
  return tokenIds.map((id) => [...embedTable[id],]);
}

/**
 * 缩放点积注意力，返回逐步中间结果
 */
function scaledDotProductAttentionDetailed(Q, K, V, dK, labels) {
  const rawScores = matMul(Q, transpose(K));
  const scores = rawScores.map((row) => row.map((v) => v / Math.sqrt(dK)));
  const weights = scores.map((row) => softmax(row));
  const output = matMul(weights, V);

  const steps = [
    {
      name: '1. 输入 X（每个词的向量）',
      desc: '自注意力中 Q、K、V 都由同一个 X 线性投影得到。',
      shape: `${labels.length} × ${Q[0].length}（seq × d）`,
      data: null,
      labels,
    },
    {
      name: '2. 线性投影 Q = X·Wq',
      desc: 'Query：当前词「想要查什么信息」。',
      shape: `${Q.length} × ${Q[0].length}`,
      data: Q,
      labels,
    },
    {
      name: '3. 线性投影 K = X·Wk',
      desc: 'Key：每个词「能被怎样匹配」的索引。',
      shape: `${K.length} × ${K[0].length}`,
      data: K,
      labels,
    },
    {
      name: '4. 线性投影 V = X·Wv',
      desc: 'Value：每个词实际要传递出去的内容。',
      shape: `${V.length} × ${V[0].length}`,
      data: V,
      labels,
    },
    {
      name: '5. 注意力分数 S = Q·K^T / √d_k',
      desc: '分数越高表示两词越「相关」。除以 √d_k 防止点积过大。',
      shape: `${scores.length} × ${scores[0].length}（seq × seq）`,
      data: scores,
      labels: labels.map((l) => `Q:${l}`),
      colLabels: labels,
      isMatrix: true,
    },
    {
      name: '6. 注意力权重 A = softmax(S)',
      desc: '每行归一化为概率，行 i 表示「词 i 从各词取信息的占比」。',
      shape: `${weights.length} × ${weights[0].length}`,
      data: weights,
      labels: labels.map((l) => `Q:${l}`),
      colLabels: labels,
      isMatrix: true,
      isAttention: true,
    },
    {
      name: '7. 输出 O = A · V',
      desc: '每个词的新表示 = 所有词 Value 的加权和，权重由注意力决定。',
      shape: `${output.length} × ${output[0].length}`,
      data: output,
      labels,
    },
  ];

  return {Q, K, V, scores, weights, output, steps, rawScores,};
}

/** 图解：固定权重走一遍注意力 */
function runAttentionWalkthrough(tokenIds, config = {}) {
  const dModel = config.dModel ?? 4;
  const seed = config.seed ?? 50;
  const labels = tokenIds.map((id) => VOCAB[id] ?? '?');

  const embedTable = initMatrix(VOCAB.length, dModel, 1);
  const X = tokenEmbedding(tokenIds, embedTable);
  const Wq = initMatrix(dModel, dModel, seed);
  const Wk = initMatrix(dModel, dModel, seed + 1);
  const Wv = initMatrix(dModel, dModel, seed + 2);

  const Q = X.map((x) => vecMat(x, Wq));
  const K = X.map((x) => vecMat(x, Wk));
  const V = X.map((x) => vecMat(x, Wv));

  const result = scaledDotProductAttentionDetailed(Q, K, V, dModel, labels);
  result.steps[0].data = X;
  result.X = X;
  result.labels = labels;
  result.tokenIds = tokenIds;

  return result;
}

/**
 * 训练实验：让 query 位置的词学会「关注」用户指定的目标词
 * 损失 = -log( attention[queryPos][targetPos] )
 */
class AttentionFocusTrainer {
  constructor(vocabSize = VOCAB.length, dModel = 4) {
    this.dModel = dModel;
    // 相当于字典，initMatrix随赋值随机数
    this.embedTable = initMatrix(vocabSize, dModel, 1);
    this.Wq = initMatrix(dModel, dModel, 10);
    this.Wk = initMatrix(dModel, dModel, 11);
    this.Wv = initMatrix(dModel, dModel, 12);
  }

  forward(tokenIds) {
    // 从字典拿取输入信息的词信息，查询，键，值信息
    const X = tokenEmbedding(tokenIds, this.embedTable);
    // 查询信息  当前词「想找什么信息」  你在图书馆的检索词
    const Q = X.map((x) => vecMat(x, this.Wq));
    // 键信息  每个词「能被怎样匹配」  每本书的索引/标签
    const K = X.map((x) => vecMat(x, this.Wk));
    // 值信息  每个词「实际要传递的内容」 书的正文内容
    const V = X.map((x) => vecMat(x, this.Wv));
    // 求Q和K的点积，点积越大说明两个向量方向越接近， sqrt压低分数
    const scores = matMul(Q, transpose(K)).map((row) =>
      row.map((v) => v / Math.sqrt(this.dModel))
    );
    const weights = scores.map((row) => softmax(row));
    const output = matMul(weights, V);
    return {X, Q, K, V, scores, weights, output, tokenIds,};
  }

  trainStep(tokenIds, queryPos, targetPos, lr = 1.0) {
    const cache = this.forward(tokenIds);
    const {weights, Q, K, V, X,} = cache;
    const w = Math.max(weights[queryPos][targetPos], 1e-8);
    const loss = -Math.log(w);

    // dLoss/d(weights[queryPos][targetPos]) = -1/w
    const dWeights = weights.map((row) => row.map(() => 0));
    dWeights[queryPos][targetPos] = -1 / w;

    const dScores = weights.map((row, i) => softmaxBackward(dWeights[i], row));

    const dScoresScaled = dScores.map((row) => row.map((v) => v / Math.sqrt(this.dModel)));

    const dQ = matMul(dScoresScaled, K);
    const dK = matMul(transpose(dScoresScaled), Q);

    const dWq = zeroMatrix(this.dModel, this.dModel);
    const dWk = zeroMatrix(this.dModel, this.dModel);
    const dWv = zeroMatrix(this.dModel, this.dModel);
    const dEmbed = zeroMatrix(VOCAB.length, this.dModel);

    for (let i = 0; i < tokenIds.length; i++) {
      const bq = vecMatBackward(X[i], this.Wq, dQ[i]);
      const bk = vecMatBackward(X[i], this.Wk, dK[i]);
      for (let r = 0; r < this.dModel; r++) {
        for (let c = 0; c < this.dModel; c++) {
          dWq[r][c] += bq.dW[r][c];
          dWk[r][c] += bk.dW[r][c];
        }
        dEmbed[tokenIds[i]][r] += bq.dX[r] + bk.dX[r];
      }
    }

    const apply = (W, dW) => {
      for (let i = 0; i < W.length; i++) {
        for (let j = 0; j < W[0].length; j++) {
          W[i][j] -= lr * dW[i][j];
        }
      }
    };
    apply(this.Wq, dWq);
    apply(this.Wk, dWk);
    apply(this.embedTable, dEmbed);

    return {loss, weights: cache.weights,};
  }

  train(samples, epochs = 80, lr = 1.0) {
    const losses = [];
    for (let e = 0; e < epochs; e++) {
      let total = 0;
      for (const s of samples) {
        total += this.trainStep(s.tokenIds, s.queryPos, s.targetPos, lr).loss;
      }
      losses.push(total / samples.length);
    }
    return losses;
  }

  predict(tokenIds, queryPos) {
    const {weights,} = this.forward(tokenIds);
    const row = weights[queryPos];
    return {
      weights,
      focusPos: row.indexOf(Math.max(...row)),
      focusProbs: row,
    };
  }
}

export {
  VOCAB,
  ATTENTION_SCENARIOS,
  runAttentionWalkthrough,
  AttentionFocusTrainer,
  scaledDotProductAttentionDetailed,
};
