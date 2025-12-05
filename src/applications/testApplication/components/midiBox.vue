<script>
import {
  AccidentalEnum,
  midiToNoteName,
  noteNameToHelmholtz,
  noteNameToNoteString,
} from 'deciphony-core';

export default {
  name: 'Piano',
  props: {
    height: {type: String, default: '180px'},
    whiteKeyHeight: {type: String, default: '40px'},
    blackKeyHeightRatio: {
      type: Number,
      default: 0.4,
    },
    midi: {
      type: Object,
      default: () => ({min: 48, max: 83}),
    },
    measureNumber: {
      type: Number,
      default: 2,
    },
    singleBoxChronaxie: { // 最小单位时值
      type: Number,
      default: 16,
    },
    strokeWidth: { // 线宽
      type: Number,
      default: 10, // 单位：box
    },
    lyricsCharList: {
      type: Array,
      default: () => ['床', '前'],
    },
  },
  data() {
    return {
      activeBoxs: new Map(),
      mouseDown: false,
      mode: 'brush',  // brush eraser
      drawing: false, // 是否开启曲线绘制,
      pathPoints: [], // 记录点位
      showLyricsBox: false, // 展示歌词
    };
  },
  computed: {
    // 合并相邻块承载诗词
    lyricBoxs() {
      const res = [];
      const singleBoxWidth = this.singleBoxWidth();

      // 1. 按 value 排序
      const sortedEntries = Array.from(this.activeBoxs.entries()).sort((a, b) => {
        const valA = a[1]; // map value
        const valB = b[1];
        return valA - valB; // 升序
      });

      let curIndex = -2;
      let curMidi = -2;
      // 2. 遍历排序后的 key
      sortedEntries.forEach(([key, value]) => {
        const [midi, index] = key.split('-').map(Number);

        // 同一行，不相邻 或者不同行
        if ((curMidi === midi && ![index + 1, index - 1, index].includes(curIndex))
            || (curMidi !== midi)) {

          res.push({
            left: index * singleBoxWidth,
            width: singleBoxWidth,
            midi: midi,
            lyrics: '',
          });

          if (this.lyricsCharList[res.length - 1]) {
            res.at(-1).lyrics = this.lyricsCharList[res.length - 1];
          }

        } else if (curIndex === (index - 1)) {
          res.at(-1).width += singleBoxWidth;
        } else if (curIndex === (index + 1)) {
          res.at(-1).left = index * singleBoxWidth;
          res.at(-1).width += singleBoxWidth;
        }

        curIndex = index;
        curMidi = midi;
      });

      return res;
    },
    keyStyle() {
      return (midi) => {
        const midiHeight = this.getMidiHeight(midi);
        const res = {
          height: midiHeight + this.keyUnit,
          width: '100%',
          flexShrink: 0,
          backgroundColor: midi % 2 === 1 ? '#fafafa' : '#fff',
          position: 'relative',
          display: 'flex',
        };
        return res;
      };
    },

    singleBoxStyle() {
      return (midi, index) => {
        const res = {
          outline: '1px solid #e0e0e0',
          width: '100%',
          height: '100%',
        };

        if (this.isBoxActive(midi, index)) {
          res.backgroundColor = 'red';
        }
        return res;
      };
    },
    lyricsKeyStyle() {
      return (midi) => {
        const midiHeight = this.getMidiHeight(midi);
        const res = {
          height: midiHeight + this.keyUnit,
          position: 'relative',
          pointerEvents: 'none',
        };
        return res;
      };
    },
    lyricBoxStyle() {
      return (item) => {
        const res = {
          left: item.left + 'px',
          width: item.width + 'px',
          height: '100%',
          backgroundColor: 'yellow',
          position: 'absolute',
          pointEvents: 'auto',
        };
        return res;
      };
    },
    // 解析容器高度 数值
    containerHeightNum() {
      const {value} = this.parseAndFormatDimension(this.height);
      return value;
    },
    // 容器高度单位
    containerHeightUnit() {
      const {unit} = this.parseAndFormatDimension(this.height);
      return unit;
    },
    // 白键宽度数值
    whiteKeyHeightNum() {
      const {value} = this.parseAndFormatDimension(this.whiteKeyHeight);
      return value;
    },
    // 白键/黑键尺寸单位
    keyUnit() {
      const {unit} = this.parseAndFormatDimension(this.whiteKeyHeight);
      return unit;
    },
    // 黑键高度数值
    blackKeyHeightNum() {
      return this.whiteKeyHeightNum * this.blackKeyHeightRatio;
    },
    // 原始键数组（含黑白标识）
    rawKeys() {
      const out = [];
      const midiRange = this.midi;
      for (let i = midiRange.min; i <= midiRange.max; i++) {
        out.push({
          midi: i,
          black: this.isBlackKey(i),
          scientificNoteName: [
            noteNameToNoteString(midiToNoteName(i, AccidentalEnum.Sharp)),
            noteNameToNoteString(midiToNoteName(i, AccidentalEnum.Flat)),
          ],
          helmholtzNoteName: [
            noteNameToHelmholtz(midiToNoteName(i, AccidentalEnum.Sharp)),
            noteNameToHelmholtz(midiToNoteName(i, AccidentalEnum.Flat)),
          ],
        });
      }
      return out;
    },
    // 白键数组（带索引）
    whiteKeys() {
      const arr = [];
      let wi = 0;
      for (const k of this.rawKeys) {
        if (!k.black) {
          arr.push({
            whiteIndex: wi,
            ...k,
          });
          wi++;
        }
      }
      return arr;
    },
    // 黑键数组
    blackKeys() {
      return this.rawKeys.filter((k) => k.black);
    },
    // 整体高度
    // totalHeight() {
    //   let whiteKeyCount = 0;
    //   const midiRange = this.midi;
    //   for (let i = midiRange.min; i <= midiRange.max; i++) {
    //     if (this.isWhiteKey(i)) {
    //       whiteKeyCount += 1;
    //     }
    //   }
    //   const {value, unit} = this.parseAndFormatDimension(this.whiteKeyHeight);
    //   console.log('chicken');
    //   return `${value * whiteKeyCount}${unit}`;
    // },
    // 样式 - 外容器
    pianoContainerStyle() {
      return {
        width: '100%',
        height: 'calc(100% - 2px)',
        position: 'relative',
        background: '#fff',
        border: '1px solid #e0e0e0',
      };
    },

  },
  methods: {
    // 重置
    resetState() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      // 清空画布
      ctx.clearRect(0, 0, 10000, 10000);
      // 清空高亮
      this.activeBoxs.clear();
      this.pathPoints = []; // 新路径清空
      // 不显示lyricsBox
      this.showLyricsBox = false;
    },
    // 单元格宽度
    singleBoxWidth() {
      const container = this.$refs.container;
      if (!container) {
        return 0;
      }
      const rect = container.getBoundingClientRect();
      return rect.width / this.measureNumber / this.singleBoxChronaxie;
    },
    // 分离数字和单位
    parseAndFormatDimension(dimension) {
      if (typeof dimension === 'number') {
        return {value: dimension, unit: 'px'};
      }
      // 使用正则分离数值和单位
      const match = dimension.match(/^([0-9.]+)([a-zA-Z%]*)$/);

      if (match) {
        const value = match[1]; // 数字部分
        const unit = match[2] || 'px'; // 单位部分，默认是 px
        return {value: parseFloat(value), unit}; // 返回分离的值和单位
      }

      // 如果匹配失败，抛出异常
      throw new Error(`Invalid dimension format: ${dimension}`);
    },
    // 判断该 midi 是否为黑键
    isBlackKey(midi) {
      const noteIndex = midi % 12;
      return [1, 3, 6, 8, 10].includes(noteIndex);
    },

// 判断是否是白键
    isWhiteKey(midi) {
      const noteIndex = midi % 12;
      return ![1, 3, 6, 8, 10].includes(noteIndex);
    },
    // 从 midi 找到前面的白键数量（whiteIndexBefore）
    whiteIndexBeforeMidi(midi) {
      let count = 0;
      const midiRange = this.midi;
      for (let m = midiRange.min; m < midi; m++) {
        if (!this.isBlackKey(m)) {
          count++;
        }
      }
      return count;
    },
    emitKey(type, midi) {

    },
    handlePointerDown(event, key) {
      this.emitKey('keyDown', key.midi);
      const el = event.target;
      el.setPointerCapture(event.pointerId);
    },
    handlePointerUp(event, key) {
      this.emitKey('keyUp', key.midi);
      const el = event.target;
      el.releasePointerCapture(event.pointerId);
    },

    getMidiHeight(midi) {
      let height = 0;

      const blackKeyHeight = this.blackKeyHeightNum;
      switch (midi % 12) {
      case 0: {
        height = this.whiteKeyHeightNum - (blackKeyHeight) / 2 - blackKeyHeight * 0.1;
        break;
      }
      case 1: {
        height = blackKeyHeight;
        break;
      }
      case 2: {
        height = this.whiteKeyHeightNum - blackKeyHeight + blackKeyHeight * 0.35;
        break;
      }
      case 3: {
        height = blackKeyHeight;
        break;
      }
      case 4: {
        height = this.whiteKeyHeightNum - (blackKeyHeight) / 2 - blackKeyHeight * 0.25;
        break;
      }
      case 5: {
        height = this.whiteKeyHeightNum - (blackKeyHeight) / 2 - blackKeyHeight * 0.3;
        break;
      }
      case 6: {
        height = blackKeyHeight;
        break;
      }
      case 7: {
        height = this.whiteKeyHeightNum - blackKeyHeight + blackKeyHeight * 0.4;
        break;
      }
      case 8: {
        height = blackKeyHeight;
        break;
      }
      case 9: {
        height = this.whiteKeyHeightNum - blackKeyHeight + blackKeyHeight * 0.2;
        break;
      }
      case 10: {
        height = blackKeyHeight;
        break;
      }
      case 11: {
        height = this.whiteKeyHeightNum - (blackKeyHeight) / 2 - blackKeyHeight * 0.3;
        break;
      }
      }
      // 开始位置偏差
      if (midi === this.midi.min) {
        switch (midi % 12) {
        case 2: {
          height += (blackKeyHeight) / 2 - blackKeyHeight * 0.1;
          break;
        }

        case 4: {
          height += (blackKeyHeight) / 2 + blackKeyHeight * 0.25;
          break;
        }
        case 7: {
          height += (blackKeyHeight) / 2 - blackKeyHeight * 0.3;
          break;
        }

        case 9: {
          height += (blackKeyHeight) / 2 + blackKeyHeight * 0.1;
          break;
        }

        case 11: {
          height += (blackKeyHeight) / 2 + blackKeyHeight * 0.3;
          break;
        }
        }
        // 黑键开始
        // if ([1, 3, 6, 8, 10].includes(midi % 12)) {
        //   height -= (blackKeyHeight) / 2;
        // }
      }
      // 结束位置偏差
      // if (midi === this.midi.max) {
      //   switch (midi % 12) {
      //   case 0: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //
      //   case 2: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //   case 4: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //
      //   case 5: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //
      //   case 7: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //   case 9: {
      //     height += (blackKeyHeight) / 2;
      //     break;
      //   }
      //   }
      //   // 黑键结束
      //   // if ([1, 3, 6, 8, 10].includes(midi % 12)) {
      //   //   height -= (blackKeyHeight) / 2;
      //   // }
      // }

      // 对齐琴键模式
      // return height;

      // 均匀模式
      return this.whiteKeyHeightNum / 12 * 7;
    },
    isBoxActive(midi, index) {
      return this.activeBoxs.has(midi + '-' + index);
    },
    activeBox(midi, index) {
      if (index == null || midi == null) {
        console.error('activeBox方法传值不对');
        return;
      }
      if (!this.activeBoxs.has(midi + '-' + index)) {
        // 值为this.activeBoxs.size为了排序
        this.activeBoxs.set(midi + '-' + index, this.activeBoxs.size + 1);
      }
    },
    handleMousedown(e, midi, index) {
      e.preventDefault();
      const target = e.target;
      this.mouseDown = true;

    },
    handleMousemove(e) {
      e.preventDefault();
      const target = e.target;

      const index = +target.getAttribute('data-index');
      const midi = +target.getAttribute('data-midi');
      if (this.mouseDown) {
        if (this.mode === 'brush') {

          this.activeBox(midi, index);
        }
      }
    },
    handleMouseup(e, midi, index) {
      this.mouseDown = false;
    },
    /* ======================画线===============================*/
    initCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      this.ctx = ctx;
      this.resize();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },

    resize() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    },

    getPoint(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    // 点位插值，你要是画线太快，点位过于稀疏，就需要插点
    sampleSegment(a, b) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 采样间隔（可调）
      const step = 6; // 每 6px 一个点

      const count = Math.max(1, Math.floor(dist / step));
      const res = [];
      for (let i = 1; i <= count; i++) {
        const t = i / count;
        res.push({
          x: a.x + dx * t,
          y: a.y + dy * t,
        });
      }
      return res;
    },
    linePointerDown(e) {
      this.drawing = true;
      const ctx = this.ctx;
      // 清空画布
      ctx.clearRect(0, 0, 10000, 10000);
      // 清空高亮
      this.activeBoxs.clear();
      this.pathPoints = []; // 新路径清空
      this.lastPoint = this.getPoint(e);
      this.pathPoints.push(this.lastPoint);
    },

    linePointerMove(e) {
      if (!this.drawing) {
        return;
      }

      const p = this.getPoint(e);
      this.pathPoints.push(p);
      const ctx = this.ctx;

      // 美化参数
      ctx.strokeStyle = this.strokeColor || 'rgba(0, 136, 255, 0.9)';  //粉紫 rgba(255, 80, 200, 0.5)
      ctx.lineWidth = this.strokeWidth || 4;

      // 圆角连接
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 发光阴影
      ctx.shadowColor = 'rgba(0, 136, 255, 0.6)';
      // 动态颜色
      // const hue = (performance.now() * 0.05) % 360;
      // ctx.strokeStyle = `hsla(${hue}, 90%, 60%, 0.9)`;
      // ctx.shadowColor = `hsla(${hue}, 90%, 60%, 0.7)`;

      ctx.shadowBlur = 12;        // 阴影模糊
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.shadowBlur = 10;
      // 画线
      ctx.beginPath();
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      // 插值
      const samplePoints = this.sampleSegment(this.lastPoint, p);
      this.lastPoint = p;
      this.pathPoints.push(...samplePoints);
    },

    linePointerUp(e) {
      this.drawing = false;
      this.$refs.canvas.style.pointerEvents = 'none';
      // 获取点位计算需要高亮的块
      const rect = this.$refs.canvas.getBoundingClientRect();
      const keyList = new Map();
      this.pathPoints.forEach(item => {
        const dom = document.elementFromPoint(item.x + rect.left, item.y + rect.top);
        if (!dom) {
          return;
        }
        const index = +dom.getAttribute('data-index');
        const midi = +dom.getAttribute('data-midi');

        // 覆盖顺序，只要保留最后一次命中，就可以保证map的顺序
        if (keyList.has(index)) {
          keyList.delete(index);
        }
        keyList.set(index, midi);
      });

      keyList.forEach((midi, index) => {

        if (!this.activeBoxs.has(midi + '' + index)) {
          this.activeBox(midi, index);
        }
      });

      this.$refs.canvas.style.pointerEvents = 'auto';
      // 展示歌词box
      this.showLyricsBox = true;
    },

    clear() {
      const canvas = this.$refs.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

  },
  mounted() {
    this.initCanvas();
    // 键盘事件
  },
};
</script>

<template>
  <div :style="pianoContainerStyle" ref="container" class="ds-piano-container hide-scrollbar stack">
    <div class="stackItem" style="pointer-events: auto" comment="网格"
    >
      <div
          v-for="midi in Array.from({ length: midi.max - midi.min + 1 }, (_, i) => midi.max - i)"
          :key="midi"
          :style="keyStyle(midi)"
      >
        <div
            v-for="(item,index) in Array.from({length:singleBoxChronaxie * measureNumber})"
            :data-index="index"
            :data-midi="midi"
            :style="singleBoxStyle(midi,index)"></div>
      </div>
    </div>
    <div class="stackItem" comment="线" v-show="!showLyricsBox">
      <!-- 透明绘制层 -->
      <canvas
          ref="canvas"
          class="draw-layer"
          @pointerdown="linePointerDown"
          @pointermove="linePointerMove"
          @pointerup="linePointerUp"
      ></canvas>
    </div>
    <div class="stackItem" comment="合并调整层" v-show="showLyricsBox">
      <!-- 合并调整层 -->
      <div
          v-for="midi in Array.from({ length: midi.max - midi.min + 1 }, (_, i) => midi.max - i)"
          :key="midi"
          :style="lyricsKeyStyle(midi)"
      >
        <div v-for="item in lyricBoxs.filter(e=>e.midi === midi)" :style="lyricBoxStyle(item)">{{ item.lyrics }}</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.ds-piano-container {
  user-select: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome */
}

/* 透明绘制层 */
.draw-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: transparent;
  touch-action: none; /* 支持触屏 */
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.stack {
  position: relative;
  height: 100%;
  width: 100%;
}

.stackItem {
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;

  > * {
    pointer-events: auto;
  }
}
</style>
