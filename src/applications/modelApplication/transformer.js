/**
 * Transformer Encoder 学习示例
 * - runTransformerEncoder：固定权重，逐步展示前向传播（图解用）
 * - TransformerClassifier：可训练，含完整前向 + 反向传播（实验用）
 */

const VOCAB = ['<pad>', '我', '爱', '学习', 'AI', 'Transformer', '模型',];

const DEMO_SEQUENCES = [
  {name: '我爱学习 AI', ids: [1, 2, 3, 4,],},
  {name: 'Transformer 模型', ids: [5, 6,],},
  {name: '我爱 Transformer', ids: [1, 2, 5,],},
];

const CLASS_NAMES = ['类别 A', '类别 B', '类别 C',];

const MAX_SEQ_LEN = 8;

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

function cloneMatrix(M) {
  return M.map((row) => [...row,]);
}

function zeroMatrix(rows, cols) {
  return Array.from({length: rows,}, () => Array(cols).fill(0));
}

function vecMat(x, W) {
  const cols = W[0].length;
  return Array.from({length: cols,}, (_, j) =>
    W.reduce((s, row, i) => s + x[i] * row[j], 0)
  );
}

function matMul(A, B) {
  const rows = A.length;
  const cols = B[0].length;
  const inner = B.length;
  const out = Array.from({length: rows,}, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < inner; k++) {
      for (let j = 0; j < cols; j++) {
        out[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return out;
}

function transpose(A) {
  return A[0].map((_, j) => A.map((row) => row[j]));
}

function addVec(a, b) {
  return a.map((v, i) => v + b[i]);
}

function addMat(A, B) {
  return A.map((row, i) => row.map((v, j) => v + B[i][j]));
}

function scaleMat(A, s) {
  return A.map((row) => row.map((v) => v * s));
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

function layerNorm(vec, eps = 1e-5) {
  const mean = vec.reduce((a, b) => a + b, 0) / vec.length;
  const variance = vec.reduce((a, b) => a + (b - mean) ** 2, 0) / vec.length;
  const std = Math.sqrt(variance + eps);
  return vec.map((v) => (v - mean) / std);
}

function layerNormForward(vec, eps = 1e-5) {
  const mean = vec.reduce((a, b) => a + b, 0) / vec.length;
  const variance = vec.reduce((a, b) => a + (b - mean) ** 2, 0) / vec.length;
  const std = Math.sqrt(variance + eps);
  const out = vec.map((v) => (v - mean) / std);
  return {out, mean, std, input: vec, eps,};
}

function layerNormBackward(dOut, cache) {
  const {mean, std, input, eps,} = cache;
  const n = input.length;
  const dNorm = dOut.map((d, i) => d / std);
  const dVar = input.reduce((s, x, i) => s + dNorm[i] * (x - mean), 0) * (-1 / (std * std));
  const dMean = dNorm.reduce((s, d) => s - d, 0) / n
        + dVar * input.reduce((s, x) => s + (-2 * (x - mean) / n), 0);
  return dNorm.map((d, i) => {
    const dX = d / n + dVar * (2 * (input[i] - mean)) / n + dMean / n;
    return dX;
  });
}

function gelu(x) {
  return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));
}

function geluDerivative(x) {
  const u = Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3);
  const t = Math.tanh(u);
  const sech2 = 1 - t * t;
  const du = Math.sqrt(2 / Math.PI) * (1 + 3 * 0.044715 * x ** 2);
  return 0.5 * (1 + t) + 0.5 * x * sech2 * du;
}

function positionalEncoding(seqLen, dModel) {
  const pe = Array.from({length: seqLen,}, () => Array(dModel).fill(0));
  for (let pos = 0; pos < seqLen; pos++) {
    for (let i = 0; i < dModel; i++) {
      const div = Math.pow(10000, (2 * Math.floor(i / 2)) / dModel);
      pe[pos][i] = i % 2 === 0 ? Math.sin(pos / div) : Math.cos(pos / div);
    }
  }
  return pe;
}

function tokenEmbedding(tokenIds, embedTable) {
  return tokenIds.map((id) => [...embedTable[id],]);
}

function scaledDotProductAttention(Q, K, V, dK) {
  const scores = matMul(Q, transpose(K)).map((row) => scaleMat([row,], 1 / Math.sqrt(dK))[0]);
  const weights = scores.map((row) => softmax(row));
  const output = matMul(weights, V);
  return {scores, weights, output,};
}

function selfAttentionHead(X, Wq, Wk, Wv, dK) {
  const Q = X.map((x) => vecMat(x, Wq));
  const K = X.map((x) => vecMat(x, Wk));
  const V = X.map((x) => vecMat(x, Wv));
  const attn = scaledDotProductAttention(Q, K, V, dK);
  return {Q, K, V, ...attn,};
}

function multiHeadSelfAttention(X, config) {
  const {numHeads, dModel,} = config;
  const dHead = dModel / numHeads;
  const heads = [];
  let seed = 42;

  for (let h = 0; h < numHeads; h++) {
    const Wq = initMatrix(dModel, dHead, seed++);
    const Wk = initMatrix(dModel, dHead, seed++);
    const Wv = initMatrix(dModel, dHead, seed++);
    heads.push({headIndex: h, ...selfAttentionHead(X, Wq, Wk, Wv, dHead),});
  }

  const concat = heads[0].output.map((_, i) => heads.flatMap((head) => head.output[i]));
  const Wo = initMatrix(dModel, dModel, seed++);
  const output = concat.map((row) => vecMat(row, Wo));
  const avgWeights = heads[0].weights.map((row, i) =>
    row.map((_, j) => heads.reduce((s, h) => s + h.weights[i][j], 0) / numHeads)
  );

  return {heads, concat, output, avgWeights,};
}

function feedForward(X, dFf, seed = 200) {
  const dModel = X[0].length;
  const W1 = initMatrix(dModel, dFf, seed);
  const b1 = Array(dFf).fill(0);
  const W2 = initMatrix(dFf, dModel, seed + 1);
  const b2 = Array(dModel).fill(0);
  const hidden = X.map((x) => {
    const h = addVec(vecMat(x, W1), b1);
    return h.map(gelu);
  });
  const output = hidden.map((h) => addVec(vecMat(h, W2), b2));
  return {hidden, output, W1, W2,};
}

function encoderLayer(X, config, layerIndex) {
  const seed = 100 + layerIndex * 50;
  const mha = multiHeadSelfAttention(X, {...config, seedBase: seed,});
  const attnResidual = X.map((x, i) => layerNorm(addVec(x, mha.output[i])));
  const ffn = feedForward(attnResidual, config.dFf, seed + 20);
  const output = attnResidual.map((x, i) => layerNorm(addVec(x, ffn.output[i])));
  return {input: X, multiHeadAttention: mha, afterAttentionNorm: attnResidual, feedForward: ffn, output,};
}

/** 图解用：固定随机权重 + 正弦位置编码，逐步记录前向结果 */
function runTransformerEncoder(tokenIds, config = {}) {
  const dModel = config.dModel ?? 8;
  const numHeads = config.numHeads ?? 2;
  const dFf = config.dFf ?? 16;
  const numLayers = config.numLayers ?? 1;
  const seqLen = tokenIds.length;
  const tokens = tokenIds.map((id) => VOCAB[id] ?? '?');

  const embedTable = initMatrix(VOCAB.length, dModel, 1);
  const tokenEmb = tokenEmbedding(tokenIds, embedTable);
  const posEnc = positionalEncoding(seqLen, dModel);
  let X = addMat(tokenEmb, posEnc);

  const steps = [
    {
      name: '1. Token Embedding',
      desc: '查 embedTable：每个 token id 取一行向量。权重在真实模型里会训练，这里用固定随机数演示形状与流程。',
      shape: `${seqLen} × ${dModel}（序列长度 × 词向量维）`,
      data: tokenEmb,
      labels: tokens,
    },
    {
      name: '2. Positional Encoding',
      desc: '正弦/余弦公式生成，不训练。与词向量逐元素相加后，模型既知道「是什么词」也知道「在第几位」。',
      shape: `${seqLen} × ${dModel}`,
      data: posEnc,
      labels: tokens.map((_, i) => `pos ${i}`),
    },
    {
      name: '3. 输入表示 X = Embedding + PE',
      desc: 'Encoder 的输入。后续所有层都在这个 seqLen×dModel 矩阵上运算。',
      shape: `${seqLen} × ${dModel}`,
      data: X,
      labels: tokens,
    },
  ];

  const layers = [];
  for (let l = 0; l < numLayers; l++) {
    const layer = encoderLayer(X, {dModel, numHeads, dFf,}, l);
    layers.push(layer);

    steps.push({
      name: `4.${l + 1} 多头自注意力`,
      desc: 'Q/K/V 投影 → softmax(QK^T/√d)·V → 多头拼接。注意力矩阵为 seqLen×seqLen。',
      shape: `${seqLen} × ${dModel}，注意力权重 ${seqLen} × ${seqLen}`,
      data: layer.multiHeadAttention.output,
      labels: tokens,
      attention: layer.multiHeadAttention.avgWeights,
      subSteps: layer.multiHeadAttention.heads.map((h) => ({
        head: h.headIndex,
        weights: h.weights,
      })),
    });
    steps.push({
      name: `5.${l + 1} Add & Norm（注意力后）`,
      desc: 'LayerNorm(X + Attention(X))，残差让梯度更好传，Norm 稳定数值。',
      shape: `${seqLen} × ${dModel}`,
      data: layer.afterAttentionNorm,
      labels: tokens,
    });
    steps.push({
      name: `6.${l + 1} 前馈网络 FFN`,
      desc: `每个 token 独立做 MLP：${dModel}→${dFf}→${dModel}，增加非线性。`,
      shape: `${seqLen} × ${dModel}`,
      data: layer.feedForward.output,
      labels: tokens,
    });
    steps.push({
      name: `7.${l + 1} Add & Norm（FFN 后）`,
      desc: 'LayerNorm(X + FFN(X))，该层最终输出。',
      shape: `${seqLen} × ${dModel}`,
      data: layer.output,
      labels: tokens,
    });
    X = layer.output;
  }

  return {
    tokens,
    tokenIds,
    config: {dModel, numHeads, dFf, numLayers,},
    steps,
    layers,
    output: X,
    architecture: [
      {block: 'Input', detail: 'Token Embedding（可训练）+ Position Encoding（正弦固定 或 可学习）',},
      {block: 'Encoder Layer ×N', detail: 'Self-Attention → Add&Norm → FFN → Add&Norm',},
      {block: 'Pool + 分类头', detail: '训练实验：对序列做平均池化 → 线性层 → Softmax',},
      {block: 'Loss + 反向传播', detail: '交叉熵损失，梯度回传到 Embedding / Attention / FFN 全部权重',},
    ],
  };
}

// ─── 可训练分类器：单头 Encoder + 平均池化 + 线性分类 ───

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

function attentionForward(X, Wq, Wk, Wv, Wo) {
  const dK = Wq[0].length;
  const Q = X.map((x) => vecMat(x, Wq));
  const K = X.map((x) => vecMat(x, Wk));
  const V = X.map((x) => vecMat(x, Wv));
  const scale = 1 / Math.sqrt(dK);
  const scores = matMul(Q, transpose(K)).map((row) => row.map((v) => v * scale));
  const weights = scores.map((row) => softmax(row));
  const context = matMul(weights, V);
  const output = context.map((row) => vecMat(row, Wo));
  return {Q, K, V, scores, weights, context, output, scale,};
}

function attentionBackward(X, Wq, Wk, Wv, Wo, dOut, cache) {
  const {Q, K, V, scores, weights, context,} = cache;
  const seqLen = X.length;
  const dWq = zeroMatrix(Wq.length, Wq[0].length);
  const dWk = zeroMatrix(Wk.length, Wk[0].length);
  const dWv = zeroMatrix(Wv.length, Wv[0].length);
  const dWo = zeroMatrix(Wo.length, Wo[0].length);
  const dX = X.map(() => Array(X[0].length).fill(0));

  const dContext = [];
  for (let i = 0; i < seqLen; i++) {
    const {dX: dCtxRow, dW,} = vecMatBackward(context[i], Wo, dOut[i]);
    dContext.push(dCtxRow);
    for (let r = 0; r < Wo.length; r++) {
      for (let c = 0; c < Wo[0].length; c++) {
        dWo[r][c] += dW[r][c];
      }
    }
  }

  const dWeights = matMul(dContext, transpose(V));
  const dV = matMul(transpose(weights), dContext);

  const dScores = weights.map((row, i) => softmaxBackward(dWeights[i], row));
  const dScoresScaled = dScores.map((row) => row.map((v) => v * cache.scale));

  const dQ = matMul(dScoresScaled, K);
  const dK = matMul(transpose(dScoresScaled), Q);

  for (let i = 0; i < seqLen; i++) {
    const bq = vecMatBackward(X[i], Wq, dQ[i]);
    const bk = vecMatBackward(X[i], Wk, dK[i]);
    const bv = vecMatBackward(X[i], Wv, dV[i]);
    for (let j = 0; j < dX[i].length; j++) {
      dX[i][j] += bq.dX[j] + bk.dX[j] + bv.dX[j];
    }
    for (let r = 0; r < Wq.length; r++) {
      for (let c = 0; c < Wq[0].length; c++) {
        dWq[r][c] += bq.dW[r][c];
        dWk[r][c] += bk.dW[r][c];
        dWv[r][c] += bv.dW[r][c];
      }
    }
  }

  return {dX, dWq, dWk, dWv, dWo,};
}

function ffnForward(x, W1, b1, W2, b2) {
  const z1 = addVec(vecMat(x, W1), b1);
  const h = z1.map(gelu);
  const out = addVec(vecMat(h, W2), b2);
  return {z1, h, out,};
}

function ffnBackward(x, W1, b1, W2, b2, dOut, cache) {
  const {z1, h,} = cache;
  const {dX: dh, dW: dW2,} = vecMatBackward(h, W2, dOut);
  const db2 = [...dOut,];
  const dz1 = dh.map((v, i) => v * geluDerivative(z1[i]));
  const {dX, dW: dW1,} = vecMatBackward(x, W1, dz1);
  const db1 = [...dz1,];
  return {dX, dW1, db1, dW2, db2,};
}

function meanPool(X) {
  const d = X[0].length;
  const out = Array(d).fill(0);
  for (const row of X) {
    for (let j = 0; j < d; j++) {out[j] += row[j];}
  }
  return out.map((v) => v / X.length);
}

function meanPoolBackward(dPooled, seqLen, dModel) {
  const scale = 1 / seqLen;
  return Array.from({length: seqLen,}, () => dPooled.map((v) => v * scale));
}

/**
 * 可训练的微型 Transformer 分类器
 * 任务：整句分类（与 MLP/CNN demo 相同的「加样本 → 训练 → 预测」流程）
 */
class TransformerClassifier {
  constructor(vocabSize = VOCAB.length, numClasses = 3, dModel = 8, dFf = 16) {
    this.vocabSize = vocabSize;
    this.numClasses = numClasses;
    this.dModel = dModel;
    this.dFf = dFf;

    this.embedTable = initMatrix(vocabSize, dModel, 1);
    this.posEmbed = initMatrix(MAX_SEQ_LEN, dModel, 2);
    this.Wq = initMatrix(dModel, dModel, 10);
    this.Wk = initMatrix(dModel, dModel, 11);
    this.Wv = initMatrix(dModel, dModel, 12);
    this.Wo = initMatrix(dModel, dModel, 13);
    this.W1 = initMatrix(dModel, dFf, 14);
    this.b1 = Array(dFf).fill(0);
    this.W2 = initMatrix(dFf, dModel, 15);
    this.b2 = Array(dModel).fill(0);
    this.Wcls = initMatrix(dModel, numClasses, 16);
    this.bcls = Array(numClasses).fill(0);
  }

  forward(tokenIds) {
    const seqLen = tokenIds.length;
    const X0 = tokenIds.map((id, pos) =>
      addVec([...this.embedTable[id],], this.posEmbed[pos])
    );

    const attnCache = attentionForward(X0, this.Wq, this.Wk, this.Wv, this.Wo);
    const X1pre = X0.map((x, i) => addVec(x, attnCache.output[i]));
    const ln1 = X1pre.map((x) => layerNormForward(x));
    const X1 = ln1.map((c) => c.out);

    const ffnCache = X1.map((x) => ffnForward(x, this.W1, this.b1, this.W2, this.b2));
    const X2pre = X1.map((x, i) => addVec(x, ffnCache[i].out));
    const ln2 = X2pre.map((x) => layerNormForward(x));
    const X2 = ln2.map((c) => c.out);

    const pooled = meanPool(X2);
    const logits = addVec(vecMat(pooled, this.Wcls), this.bcls);
    const probs = softmax(logits);

    return {
      probs,
      logits,
      cache: {tokenIds, seqLen, X0, attnCache, X1pre, ln1, X1, ffnCache, X2pre, ln2, X2, pooled,},
    };
  }

  backward(label, forwardResult) {
    const {probs, cache,} = forwardResult;
    const {tokenIds, seqLen, X0, attnCache, X1pre, ln1, X1, ffnCache, X2pre, ln2, X2, pooled,} = cache;

    const dLogits = probs.map((p, i) => p - (i === label ? 1 : 0));
    const {dX: dPooled, dW: dWcls,} = vecMatBackward(pooled, this.Wcls, dLogits);
    const dbcls = [...dLogits,];

    let dX2 = meanPoolBackward(dPooled, seqLen, this.dModel);

    const dX2pre = ln2.map((c, i) => layerNormBackward(dX2[i], c));
    const dFfnOut = [...dX2pre,];
    const dX1ffn = X1.map(() => Array(this.dModel).fill(0));

    for (let i = 0; i < seqLen; i++) {
      const fb = ffnBackward(X1[i], this.W1, this.b1, this.W2, this.b2, dFfnOut[i], ffnCache[i]);
      for (let j = 0; j < this.dModel; j++) {
        dX1ffn[i][j] += fb.dX[j];
      }
      this._accFFNGrad(fb);
    }

    const dX1total = X1.map((_, i) => addVec(dX2pre[i], dX1ffn[i]));
    const dX1pre = ln1.map((c, i) => layerNormBackward(dX1total[i], c));
    const dAttnOut = [...dX1pre,];

    const attnGrad = attentionBackward(X0, this.Wq, this.Wk, this.Wv, this.Wo, dAttnOut, attnCache);
    const dX0 = X0.map((_, i) => addVec(dX1pre[i], attnGrad.dX[i]));

    this._accAttnGrad(attnGrad);
    this._accEmbedGrad(tokenIds, dX0);
    this._accClsGrad(dWcls, dbcls);

    return dLogits;
  }

  _accFFNGrad(fb) {
    if (!this._dW1) {
      this._dW1 = zeroMatrix(this.W1.length, this.W1[0].length);
      this._db1 = Array(this.b1.length).fill(0);
      this._dW2 = zeroMatrix(this.W2.length, this.W2[0].length);
      this._db2 = Array(this.b2.length).fill(0);
    }
    for (let i = 0; i < this.W1.length; i++) {
      for (let j = 0; j < this.W1[0].length; j++) {this._dW1[i][j] += fb.dW1[i][j];}
    }
    for (let i = 0; i < this.b1.length; i++) {this._db1[i] += fb.db1[i];}
    for (let i = 0; i < this.W2.length; i++) {
      for (let j = 0; j < this.W2[0].length; j++) {this._dW2[i][j] += fb.dW2[i][j];}
    }
    for (let i = 0; i < this.b2.length; i++) {this._db2[i] += fb.db2[i];}
  }

  _accAttnGrad(g) {
    if (!this._dWq) {
      this._dWq = zeroMatrix(this.Wq.length, this.Wq[0].length);
      this._dWk = zeroMatrix(this.Wk.length, this.Wk[0].length);
      this._dWv = zeroMatrix(this.Wv.length, this.Wv[0].length);
      this._dWo = zeroMatrix(this.Wo.length, this.Wo[0].length);
    }
    for (const key of ['dWq', 'dWk', 'dWv', 'dWo',]) {
      const src = g[key];
      const dst = this[`_${key}`];
      for (let i = 0; i < src.length; i++) {
        for (let j = 0; j < src[0].length; j++) {dst[i][j] += src[i][j];}
      }
    }
  }

  _accEmbedGrad(tokenIds, dX0) {
    if (!this._dEmbed) {
      this._dEmbed = zeroMatrix(this.vocabSize, this.dModel);
      this._dPos = zeroMatrix(MAX_SEQ_LEN, this.dModel);
    }
    tokenIds.forEach((id, pos) => {
      for (let j = 0; j < this.dModel; j++) {
        this._dEmbed[id][j] += dX0[pos][j];
        this._dPos[pos][j] += dX0[pos][j];
      }
    });
  }

  _accClsGrad(dWcls, dbcls) {
    if (!this._dWcls) {
      this._dWcls = zeroMatrix(this.Wcls.length, this.Wcls[0].length);
      this._dbcls = Array(this.bcls.length).fill(0);
    }
    for (let i = 0; i < dWcls.length; i++) {
      for (let j = 0; j < dWcls[0].length; j++) {this._dWcls[i][j] += dWcls[i][j];}
    }
    for (let i = 0; i < dbcls.length; i++) {this._dbcls[i] += dbcls[i];}
  }

  _applyGrads(lr) {
    const apply = (W, dW) => {
      for (let i = 0; i < W.length; i++) {
        for (let j = 0; j < W[0].length; j++) {W[i][j] -= lr * dW[i][j];}
      }
    };
    const applyB = (b, db) => b.forEach((_, i) => { b[i] -= lr * db[i]; });

    apply(this.embedTable, this._dEmbed);
    apply(this.posEmbed, this._dPos);
    apply(this.Wq, this._dWq);
    apply(this.Wk, this._dWk);
    apply(this.Wv, this._dWv);
    apply(this.Wo, this._dWo);
    apply(this.W1, this._dW1);
    applyB(this.b1, this._db1);
    apply(this.W2, this._dW2);
    applyB(this.b2, this._db2);
    apply(this.Wcls, this._dWcls);
    applyB(this.bcls, this._dbcls);

    this._dEmbed = null;
    this._dPos = null;
    this._dWq = null;
  }

  trainStep(tokenIds, label, lr = 0.05) {
    const result = this.forward(tokenIds);
    const loss = -Math.log(Math.max(result.probs[label], 1e-8));
    this.backward(label, result);
    this._applyGrads(lr);
    return {loss, probs: result.probs,};
  }

  train(samples, epochs = 80, lr = 0.05) {
    const losses = [];
    for (let e = 0; e < epochs; e++) {
      let total = 0;
      for (const {tokenIds, label,} of samples) {
        total += this.trainStep(tokenIds, label, lr).loss;
      }
      losses.push(total / samples.length);
    }
    return losses;
  }

  predict(tokenIds) {
    const {probs,} = this.forward(tokenIds);
    return {probs, label: probs.indexOf(Math.max(...probs)),};
  }
}

function formatMatrix(matrix, digits = 3) {
  return matrix.map((row) => row.map((v) => Number(v.toFixed(digits))));
}

export {
  VOCAB,
  DEMO_SEQUENCES,
  CLASS_NAMES,
  runTransformerEncoder,
  TransformerClassifier,
  formatMatrix,
  scaledDotProductAttention,
  positionalEncoding,
};
