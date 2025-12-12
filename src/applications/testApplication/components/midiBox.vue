<script>
import {
  AccidentalEnum,
  midiToNoteName,
  noteNameToHelmholtz,
  noteNameToNoteString,
} from 'deciphony-core';
import {recommendMidiReplace} from '@/applications/testApplication/algorithm.js';

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
    totalChronaxie: {
      type: Number,
      default: 512,
    },
    singleBoxChronaxie: { // 最小单位时值 32=16分音符
      type: Number,
      default: 32,
    },
    strokeWidth: { // 线宽
      type: Number,
      default: 10, // 单位：box
    },
    lyricsCharList: {
      type: Array,
      default: () => ['床', '前'],
    },
    mode: {
      type: String,
      default: 'brush',
    },
  },
  data() {
    return {
      activeBoxs: new Map(),
      mouseDown: false,
      drawing: false, // 是否开启曲线绘制,
      pathPoints: [], // 记录点位
      showLyricsBox: false, // 展示歌词
      highLightBoxId: null, // 高亮块id
      lyricsBoxs: [],
      linePointerId: null,
      boxGenerateMode: 'smart-1', // 高亮块算法，normal普通模式， smart-1 智能1档
      melody: [
        {
          'midi': 65,
          'chronaxie': 96,
          'lyrics': '处',
          'rest': false,
        },
        {
          'midi': 69,
          'chronaxie': 96,
          'lyrics': '处',
          'rest': false,
        },
        {
          'midi': 67,
          'chronaxie': 96,
          'lyrics': '闻',
          'rest': false,
        },
        {
          'midi': 69,
          'chronaxie': 96,
          'lyrics': '啼',
          'rest': false,
        },
        {
          'midi': 67,
          'chronaxie': 96,
          'lyrics': '鸟',
          'rest': false,
        },
        {
          'midi': 0,
          'chronaxie': 32,
          'rest': true,
        },
      ],
    };
  },
  watch: {
    mode: function (newVal) {
      console.log('chicken', newVal);
      if (newVal === 'eraser') {
        this.highLightBoxId = null;
      }
    },
    totalChronaxie: function (newVal) { // 需要更新lyricsBox的left和width
      const singleBoxWidth = this.singleBoxWidth();
      this.lyricsBoxs.forEach(item => {
        item.width = (item.maxIndex - item.minIndex + 1) * singleBoxWidth;
        item.left = singleBoxWidth * item.minIndex;
      });
    },
  },
  computed: {
    highLightBox() {
      return this.lyricsBoxs.find(e => e.id === this.highLightBoxId);
    },
    recommendMidiList() {
      if (!this.highLightBox) {
        return [];
      }
      const index = this.lyricsBoxs.indexOf(this.highLightBox);
      return recommendMidiReplace(index, this.lyricsBoxs);
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
          res.backgroundColor = 'transparent';
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
    lyricsBoxStyle() {
      return (item) => {
        const res = {
          left: item.left + 'px',
          width: item.width + 'px',
          height: '100%',
          color: '#fff',
          backgroundColor: item.lyrics !== '/' ? '#FE435B' : '#EFEFEF',
          position: 'absolute',
          pointerEvents: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        };
        return res;
      };
    },
    // 推荐音符样式
    recommendMidiStyle() {
      return (isRecommend, isRest) => {
        let bgColor = 'transparent';
        if (isRecommend) {
          bgColor = '#D8DDFF';
        }
        if (isRest) {
          bgColor = 'transparent';
        }
        const res = {
          left: this.highLightBox.left + 'px',
          width: this.highLightBox.width + 'px',
          height: '100%',
          backgroundColor: bgColor,
          position: 'absolute',
          pointerEvents: 'auto',

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
    // 导出状态
    exportData() {
      return {
        lyricsBoxs: JSON.parse(JSON.stringify(this.lyricsBoxs)),
        activeBoxs: new Map(this.activeBoxs),
      };
    },
    // 导出melody
    exportMelody() {
      const melody = [];
      this.lyricsBoxs.forEach(item => {
        melody.push({
          midi: item.midi,
          chronaxie: (item.maxIndex - item.minIndex + 1) * 32,
        });
      });
      return melody;
    },
    //加载状态
    loadData(newActiveBoxs, newLyricsBoxs) {
      this.activeBoxs = newActiveBoxs;
      this.lyricsBoxs = newLyricsBoxs;
      // this.generateLyricsBoxs(); 这个会导致同行合并歌词
      this.showLyricsBox = true;
    },
    loadDataFromMelody(melody, i) {
      const lyrics = [];
      let index = i;
      const singleBoxWidth = this.singleBoxWidth();
      melody.forEach(item => {
        const res = {
          midi: item.midi,
          minIndex: index,
          left: index * singleBoxWidth,
          width: singleBoxWidth * (item.chronaxie / 32),
          lyrics: item.rest ? '/' : item.lyrics,
          id: Math.random(),
          maxIndex: item.chronaxie / 32 + index - 1,
        };
        index += item.chronaxie / 32;
        lyrics.push(res);
      });
      this.activeBoxs = new Map();
      lyrics.forEach(item => {
        for (let i = item.minIndex; i <= item.maxIndex; i++) {
          this.activeBoxs.set(item.midi + '-' + i, this.activeBoxs.size);
        }
      });
      return {lyricsBoxs: lyrics, activeBoxs: new Map(this.activeBoxs)};
    },
    // 合并相邻块承载诗词
    generateLyricsBoxs() {
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
            minIndex: index,
            maxIndex: index,
            lyrics: '',
            id: Math.random(),
          });

          if (this.lyricsCharList[res.length - 1]) {
            res.at(-1).lyrics = this.lyricsCharList[res.length - 1];
          } else {
            res.at(-1).lyrics = '/';
          }

        } else if (curIndex === (index - 1)) {
          res.at(-1).width += singleBoxWidth;
          res.at(-1).minIndex = Math.min(res.at(-1).minIndex, index);
          res.at(-1).maxIndex = Math.max(res.at(-1).maxIndex, index);
        } else if (curIndex === (index + 1)) {
          res.at(-1).left = index * singleBoxWidth;
          res.at(-1).width += singleBoxWidth;
          res.at(-1).minIndex = Math.min(res.at(-1).minIndex, index);
          res.at(-1).maxIndex = Math.max(res.at(-1).maxIndex, index);
        }

        curIndex = index;
        curMidi = midi;
      });
      this.lyricsBoxs = res;
    },
    // 接收二维activeBoxs数组承载歌词
    generateLyricsBoxsBySplitMelodyLine(splitActiveBoxs) {
      const singleBoxWidth = this.singleBoxWidth();

      splitActiveBoxs.forEach((activeBoxs) => {
        const sortedEntries = activeBoxs.sort((a, b) => {
          return a.size - b.size; // 升序
        });
        let curIndex = -2;
        let curMidi = -2;
        // 2. 遍历排序后的 key
        sortedEntries.forEach((key) => {
          const {
            midi, index,
          } = key;

          // 同一行，不相邻 或者不同行
          if ((curMidi === midi && ![index + 1, index - 1, index].includes(curIndex))
              || (curMidi !== midi)) {
            this.lyricsBoxs.push({
              left: index * singleBoxWidth,
              width: singleBoxWidth,
              midi: midi,
              minIndex: index,
              maxIndex: index,
              lyrics: '',
              id: Math.random(),
            });

            if (this.lyricsCharList[this.lyricsBoxs.length - 1]) {
              this.lyricsBoxs.at(-1).lyrics = this.lyricsCharList[this.lyricsBoxs.length - 1];
            } else {
              console.log(this.lyricsBoxs.length - 1);
              this.lyricsBoxs.at(-1).lyrics = '/';
            }

          } else if (curIndex === (index - 1)) {
            this.lyricsBoxs.at(-1).width += singleBoxWidth;
            this.lyricsBoxs.at(-1).minIndex = Math.min(this.lyricsBoxs.at(-1).minIndex, index);
            this.lyricsBoxs.at(-1).maxIndex = Math.max(this.lyricsBoxs.at(-1).maxIndex, index);
          } else if (curIndex === (index + 1)) {
            this.lyricsBoxs.at(-1).left = index * singleBoxWidth;
            this.lyricsBoxs.at(-1).width += singleBoxWidth;
            this.lyricsBoxs.at(-1).minIndex = Math.min(this.lyricsBoxs.at(-1).minIndex, index);
            this.lyricsBoxs.at(-1).maxIndex = Math.max(this.lyricsBoxs.at(-1).maxIndex, index);
          }

          curIndex = index;
          curMidi = midi;
        });
      });

    },
    // 更新lyricsBox布局但不更改诗词承载
    layoutLyricsBoxs() {
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
            left: index * (singleBoxWidth),
            width: singleBoxWidth,
            midi: midi,
            minIndex: index,
            maxIndex: index,
            lyrics: '',
            id: Math.random(),
          });

          if (this.lyricsCharList[res.length - 1]) {
            res.at(-1).lyrics = this.lyricsCharList[res.length - 1];
          }

        } else if (curIndex === (index - 1)) {
          res.at(-1).width += singleBoxWidth;
          res.at(-1).minIndex = Math.min(res.at(-1).minIndex, index);
          res.at(-1).maxIndex = Math.max(res.at(-1).maxIndex, index);
        } else if (curIndex === (index + 1)) {
          res.at(-1).left = index * singleBoxWidth;
          res.at(-1).width += singleBoxWidth;
          res.at(-1).minIndex = Math.min(res.at(-1).minIndex, index);
          res.at(-1).maxIndex = Math.max(res.at(-1).maxIndex, index);
        }

        curIndex = index;
        curMidi = midi;
      });
    },
    // 重置
    resetState() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      // 清空画布
      ctx.clearRect(0, 0, 10000, 10000);
      // 清空高亮
      this.activeBoxs.clear();
      this.lyricsBoxs = [];
      this.pathPoints = []; // 新路径清空
      // 不显示lyricsBox
      this.showLyricsBox = false;
      this.highLightBoxId = null;
    },
    // 单元格宽度
    singleBoxWidth() {
      const container = this.$refs.container;
      if (!container) {
        return 0;
      }
      const rect = container.getBoundingClientRect();
      // 浏览器似乎会向下去整到一位小数
      return Math.floor(rect.width / (this.totalChronaxie / this.singleBoxChronaxie) * 10) / 10;
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
      if (this.mode !== 'brush') {
        return;
      }
      if (this.highLightBoxId) {
        this.highLightBoxId = null;
        return;
      }
      this.linePointerId = e.pointerId;
      e.target.setPointerCapture(this.linePointerId);
      this.drawing = true;
      const ctx = this.ctx;
      // 清空画布
      ctx.clearRect(0, 0, 10000, 10000);
      // 清空高亮
      this.activeBoxs.clear();
      this.pathPoints = []; // 新路径清空
      this.lastPoint = this.getPoint(e);
      this.pathPoints.push(this.lastPoint);
      // 推入历史记录
      this.$emit('history', this.activeBoxs, this.lyricsBoxs);
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

    async linePointerUp(e) {

      try {
        e.target.releasePointerCapture(this.linePointerId);
      } catch (err) {
        // 防止非法 release 报错
        console.warn('Failed to release pointer capture', err);
      } finally {
        this.linePointerId = null; // 重置
      }
      this.linPointerId = null;
      if (!this.drawing) {
        return;
      }
      // 清空高亮块
      this.lyricsBoxs = [];
      this.drawing = false;
      this.$refs.canvas.style.pointerEvents = 'none';
      // 获取点位计算需要高亮的块
      const rect = this.$refs.canvas.getBoundingClientRect();

      /*
      * 划线生成高亮块算法
      * */
      if (this.boxGenerateMode === 'normal') {
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
        this.generateLyricsBoxs();
      } else if (this.boxGenerateMode === 'smart-1') { // 智能模式一档
        const keyList = new Map();
        const lyricsPath = this.splitMelodyByLyrics(this.pathPoints, this.lyricsCharList.length);
        const splitActiveBoxs = [];

        // 等一帧先把之前的高亮块清除，否则elementFromPoint无法正常工作
        await new Promise((resolve) => {
          setTimeout(resolve);
        });
        lyricsPath.forEach((path, i) => {
          splitActiveBoxs[i] = [];
          path.forEach(item => {
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
            keyList.set(index, {midi, i});
          });
        });

        keyList.forEach((item, index) => {
          const {midi, i} = item;
          if (!this.activeBoxs.has(midi + '' + index)) {
            this.activeBox(midi, index);
            splitActiveBoxs[i].push({midi, index, size: this.activeBoxs.size});
          }
        });
        this.generateLyricsBoxsBySplitMelodyLine(splitActiveBoxs);
      }

      this.$refs.canvas.style.pointerEvents = 'auto';
      // 展示歌词box
      this.showLyricsBox = true;
      const ctx = this.ctx;
      // 清空画布
      ctx.clearRect(0, 0, 10000, 10000);

    },

    clear() {
      const canvas = this.$refs.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    selectLyricBox(e, item) {

      if (this.mode === 'brush') {
        this.highLightBoxId = item.id;
      } else { // 删除音高
        // 推入历史记录
        this.$emit('history', this.activeBoxs, this.lyricsBoxs);
        // 删除
        for (let i = item.minIndex; i <= item.maxIndex; i++) {
          this.activeBoxs.delete(item.midi + '-' + i);
        }
        // 后面的前移
        const indexList = new Set();
        this.lyricsBoxs.forEach((box, key) => {
          if (item.maxIndex < box.minIndex) {
            for (let i = box.minIndex; i <= box.maxIndex; i++) {
              indexList.add({index: i, midi: box.midi});
            }
          }
        });
        indexList.forEach((info) => {
          this.activeBoxs.delete(info.midi + '-' + info.index);
          this.activeBoxs.set(info.midi + '-' + (info.index - item.maxIndex + item.minIndex - 1));
        });
        this.generateLyricsBoxs();
      }

    },
    // ============================== 拖拽 ==================================
    dragBox(e, item, direction) {
      const target = e.target;
      target.setPointerCapture(e.pointerId);
      const rect = this.$refs.canvas.getBoundingClientRect();
      let startX = e.clientX;
      const singleBoxWidth = this.singleBoxWidth();
      const minKey = item.midi + '-' + item.minIndex;
      const maxKey = item.midi + '-' + item.maxIndex;
      // 记录拖拽前的状态
      const prevData = {activeBoxs: new Map(this.activeBoxs), lyricsBoxs: JSON.parse(JSON.stringify(this.lyricsBoxs))};
      const dragBoxMove = (event) => {
        const offsetX = event.clientX - startX;
        const d = offsetX / singleBoxWidth;
        if (direction === 'left') {
          if (d < -1) {
            this.activeBoxs.set(item.midi + '-' + (item.minIndex - 1), 1);
            item.left -= singleBoxWidth;
            item.width += singleBoxWidth;
            item.minIndex -= 1;
            startX = event.clientX;
          } else if (d > 1) {
            this.activeBoxs.delete(item.midi + '-' + (item.minIndex), 1);
            item.left += singleBoxWidth;
            item.width -= singleBoxWidth;
            item.minIndex += 1;
            startX = event.clientX;
            // 删除该高亮块
            if (item.minIndex > item.maxIndex) {
              this.highLightBoxId = null;
              this.lyricsBoxs = this.lyricsBoxs.filter(e => e !== item);
              // 移除监听器
              this.$refs.lyricsBoxLayer.removeEventListener('pointermove', dragBoxMove);
              this.$refs.lyricsBoxLayer.removeEventListener('pointerup', dragBoxUp);
            }
          }
        } else {// right
          if (d < -1) {
            // 如果只剩下最后一块了，禁止继续缩小
            if (item.minIndex === item.maxIndex) {
              return;
            }
            this.activeBoxs.delete(item.midi + '-' + (item.maxIndex), 1);
            item.width -= singleBoxWidth;
            item.maxIndex -= 1;
            startX = event.clientX;
            // 删除该高亮块
            if (item.minIndex > item.maxIndex) {
              this.highLightBoxId = null;
              this.lyricsBoxs = this.lyricsBoxs.filter(e => e !== item);
              // 移除监听器
              this.$refs.lyricsBoxLayer.removeEventListener('pointermove', dragBoxMove);
              this.$refs.lyricsBoxLayer.removeEventListener('pointerup', dragBoxUp);
            }
            // 后面的前移
            const indexList = [];
            this.lyricsBoxs.forEach((box, key) => {
              if (item.maxIndex < box.minIndex) {
                indexList.push({minIndex: box.minIndex, maxIndex: box.maxIndex, midi: box.midi});
                box.minIndex -= 1;
                box.maxIndex -= 1;
                box.left -= singleBoxWidth;
              }
            });
            indexList.forEach((info) => {
              this.activeBoxs.set(info.midi + '-' + (info.minIndex - 1), 1);
              this.activeBoxs.delete(info.midi + '-' + (info.maxIndex));
            });
          } else if (d > 1) {
            this.activeBoxs.set(item.midi + '-' + (item.maxIndex + 1), 1);
            item.width += singleBoxWidth;
            item.maxIndex += 1;
            startX = event.clientX;
            // 后面的后移
            const indexList = [];
            this.lyricsBoxs.forEach((box, key) => {
              if ((item.maxIndex - 1) < box.minIndex) {
                indexList.push({minIndex: box.minIndex, maxIndex: box.maxIndex, midi: box.midi});
                box.minIndex += 1;
                box.maxIndex += 1;
                box.left += singleBoxWidth;
              }
            });
            indexList.forEach((info) => {
              this.activeBoxs.set(info.midi + '-' + (info.maxIndex + 1), 1);
              this.activeBoxs.delete(info.midi + '-' + (info.minIndex));
            });
          }
        }

      };
      const dragBoxUp = (event) => {
        event.target.releasePointerCapture(e.pointerId);
        // 如果数据变化了，推入历史记录
        const changed = this.lyricsBoxs.some((item, index) => {
          const prevItem = prevData.lyricsBoxs[index];
          return item.maxIndex !== prevItem.maxIndex || item.minIndex !== prevItem.minIndex;
        });
        if (changed) {
          // 推入历史记录
          this.$emit('history', prevData.activeBoxs, prevData.lyricsBoxs);
        }
        // 移除监听器
        this.$refs.lyricsBoxLayer.removeEventListener('pointermove', dragBoxMove);
        this.$refs.lyricsBoxLayer.removeEventListener('pointerup', dragBoxUp);
      };
      this.$refs.lyricsBoxLayer.addEventListener('pointermove', dragBoxMove);

      this.$refs.lyricsBoxLayer.addEventListener('pointerup', dragBoxUp);
    },
    dragBoxMove(event) {

    },
    // 切换音高
    changeBoxMidi(midi) {
      // 推入历史记录
      this.$emit('history', this.activeBoxs, this.lyricsBoxs);
      const oldMidi = this.highLightBox.midi;
      this.lyricsBoxs.find(e => e.id === this.highLightBoxId).midi = midi;
      // 同步更新activeBoxs
      for (let i = this.highLightBox.minIndex; i <= this.highLightBox.maxIndex; i++) {
        const value = this.activeBoxs.get(oldMidi + '-' + i);
        this.activeBoxs.delete(oldMidi + '-' + i);
        this.activeBoxs.set(midi + '-' + i, value);
      }

      // this.generateLyricsBoxs();// 这个注释打开，会合并同midi相邻块
      this.highLightBoxId = null;
    },
    //
    /*
    * 智能画线算法：按歌词拆分并在最小宽度约束下拉平旋律线
    * 一整个都是ai写的，太复杂了我也没去看，总之不要动就好了
    * */
    splitMelodyByLyrics(points, length) {
      const targetLength = Math.max(0, length);
      if (!Array.isArray(points) || points.length === 0 || targetLength === 0) {
        return [];
      }

      const minWidth = Math.max(this.singleBoxWidth(), 1);
      if (targetLength === 1 || points.length === 1) {
        const avgY = points.reduce((sum, p) => sum + p.y, 0) / (points.length || 1);
        return [points.map(p => ({x: p.x, y: avgY}))];
      }

      const segmentWidth = (seg) => {
        let minX = seg[0].x;
        let maxX = seg[0].x;
        for (const p of seg) {
          if (p.x < minX) {
            minX = p.x;
          }
          if (p.x > maxX) {
            maxX = p.x;
          }
        }
        return maxX - minX;
      };

      const suffixMinX = Array(points.length).fill(0);
      const suffixMaxX = Array(points.length).fill(0);
      suffixMinX[points.length - 1] = points[points.length - 1].x;
      suffixMaxX[points.length - 1] = points[points.length - 1].x;
      for (let i = points.length - 2; i >= 0; i--) {
        const x = points[i].x;
        suffixMinX[i] = Math.min(x, suffixMinX[i + 1]);
        suffixMaxX[i] = Math.max(x, suffixMaxX[i + 1]);
      }

      const overallWidth = suffixMaxX[0] - suffixMinX[0];
      const maxByWidth = Math.max(1, Math.floor(overallWidth / minWidth));
      const maxByPoints = Math.floor(points.length / 2);
      const targetSegCount = Math.max(1, Math.min(targetLength, maxByWidth, maxByPoints));

      if (targetSegCount === 1) {
        const avgY = points.reduce((sum, p) => sum + p.y, 0) / (points.length || 1);
        return [points.map(p => ({x: p.x, y: avgY}))];
      }

      const slopes = [];
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const s = Math.abs(dy) / Math.max(Math.abs(dx), 1);
        slopes.push(s);
      }
      const slopeMean = slopes.reduce((a, b) => a + b, 0) / slopes.length;
      const slopeStd = Math.sqrt(
          slopes.map(s => (s - slopeMean) ** 2).reduce((a, b) => a + b, 0) /
          slopes.length,
      );
      const splitThreshold = slopeMean + slopeStd;

      const avgPointsPerSeg = points.length / targetSegCount;
      const avgWidthPerSeg = overallWidth / targetSegCount || minWidth;

      let segments = [];
      let start = 0;
      let curMinX = points[0].x;
      let curMaxX = points[0].x;

      for (let i = 1; i < points.length; i++) {
        const x = points[i].x;
        curMinX = Math.min(curMinX, x);
        curMaxX = Math.max(curMaxX, x);
        const width = curMaxX - curMinX;
        const count = i - start + 1;

        const slope = slopes[i - 1];
        const prevSlope = slopes[i - 2] ?? slope;
        const dSlope = Math.abs(slope - prevSlope);

        const remainingSegments = targetSegCount - segments.length - 1;
        const remainingWidth = remainingSegments > 0 ? suffixMaxX[i] - suffixMinX[i] : 0;
        const remainingPoints = points.length - (i + 1);
        const enoughRoom =
            remainingSegments <= 0 ||
            (remainingWidth >= remainingSegments * minWidth && remainingPoints >= remainingSegments * 2);

        const shouldSplit =
            segments.length < targetSegCount - 1 &&
            width >= minWidth &&
            enoughRoom &&
            (
                (slope + dSlope > splitThreshold && count >= avgPointsPerSeg * 0.6) ||
                width >= avgWidthPerSeg * 1.8 ||
                count >= avgPointsPerSeg * 1.8
            );

        if (shouldSplit) {
          segments.push(points.slice(start, i + 1));
          start = i;
          curMinX = x;
          curMaxX = x;
        }
      }
      segments.push(points.slice(start));

      const blocked = new WeakSet();
      const findSegmentToSplit = () => {
        let bestIdx = -1;
        let bestWidth = 0;
        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          if (blocked.has(seg)) {
            continue;
          }
          const w = segmentWidth(seg);
          if (seg.length >= 4 && w >= minWidth * 2 && w > bestWidth) {
            bestIdx = i;
            bestWidth = w;
          }
        }
        return bestIdx;
      };

      const findBestCutIndex = (seg) => {
        if (seg.length < 4) {
          return -1;
        }
        const localSlopes = [];
        for (let i = 1; i < seg.length; i++) {
          const dx = seg[i].x - seg[i - 1].x;
          const dy = seg[i].y - seg[i - 1].y;
          localSlopes.push(Math.abs(dy) / Math.max(Math.abs(dx), 1));
        }
        const mean = localSlopes.reduce((a, b) => a + b, 0) / localSlopes.length;
        const std = Math.sqrt(
            localSlopes.map(s => (s - mean) ** 2).reduce((a, b) => a + b, 0) /
            localSlopes.length,
        );
        const threshold = mean + std;

        let bestIdx = -1;
        let bestScore = -Infinity;
        for (let i = 1; i < seg.length - 1; i++) {
          const left = seg.slice(0, i + 1);
          const right = seg.slice(i + 1);
          if (left.length < 2 || right.length < 2) {
            continue;
          }
          const leftW = segmentWidth(left);
          const rightW = segmentWidth(right);
          if (leftW < minWidth || rightW < minWidth) {
            continue;
          }

          const s = localSlopes[i - 1];
          const ps = localSlopes[i - 2] ?? s;
          const ns = localSlopes[i] ?? s;
          const changeScore = Math.abs(s - ps) + Math.abs(ns - s);
          const balance = 1 - Math.abs(leftW - rightW) / Math.max(leftW + rightW, 1);
          const score = s + changeScore * 1.5 + balance;

          if ((s > threshold || changeScore > threshold) && score > bestScore) {
            bestScore = score;
            bestIdx = i;
          }
        }

        if (bestIdx === -1) {
          const midCut = Math.max(1, Math.min(seg.length - 2, Math.floor(seg.length / 2)));
          const left = seg.slice(0, midCut + 1);
          const right = seg.slice(midCut + 1);
          if (
              left.length >= 2 &&
              right.length >= 2 &&
              segmentWidth(left) >= minWidth &&
              segmentWidth(right) >= minWidth
          ) {
            return midCut;
          }
        }
        return bestIdx;
      };

      const tryGrowSegments = () => {
        let guard = 0;
        while (segments.length < targetSegCount && guard < targetSegCount * 4) {
          guard++;
          const idx = findSegmentToSplit();
          if (idx === -1) {
            break;
          }
          const seg = segments[idx];
          const cutIdx = findBestCutIndex(seg);
          if (cutIdx === -1) {
            blocked.add(seg);
            continue;
          }
          const left = seg.slice(0, cutIdx + 1);
          const right = seg.slice(cutIdx + 1);
          segments.splice(idx, 1, left, right);
        }
      };

      const mergeTooSmall = () => {
        if (segments.length === 0) {
          return;
        }
        const merged = [segments[0]];
        for (let i = 1; i < segments.length; i++) {
          const seg = segments[i];
          const tooSmall = seg.length < 2 || segmentWidth(seg) < minWidth;
          if (tooSmall) {
            merged[merged.length - 1] = merged[merged.length - 1].concat(seg);
          } else {
            merged.push(seg);
          }
        }
        segments = merged;
      };

      tryGrowSegments();
      mergeTooSmall();
      tryGrowSegments();

      const flattened = segments.map(seg => {
        const avgY = seg.reduce((sum, p) => sum + p.y, 0) / (seg.length || 1);
        return seg.map(p => ({x: p.x, y: avgY}));
      });

      return flattened;
    },

  },
  mounted() {
    this.initCanvas();
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
            v-for="(item,index) in Array.from({length: totalChronaxie/singleBoxChronaxie})"
            :data-index="index"
            :data-midi="midi"
            :style="singleBoxStyle(midi,index)"></div>
      </div>
    </div>
    <div class="stackItem" comment="线">
      <!-- 透明绘制层 -->
      <canvas
          ref="canvas"
          class="draw-layer"
          @pointerdown="linePointerDown"
          @pointermove="linePointerMove"
          @pointerup="linePointerUp"
      ></canvas>
    </div>
    <div class="stackItem lyrics-box-layer" comment="合并调整层" v-show="showLyricsBox" ref="lyricsBoxLayer">
      <!-- 合并调整层 -->
      <div
          v-for="midi in Array.from({ length: midi.max - midi.min + 1 }, (_, i) => midi.max - i)"
          :key="midi"

          :style="lyricsKeyStyle(midi)"
      >
        <div @pointerdown.stop="selectLyricBox($event,item)" :key="item.id"
             v-for="item in lyricsBoxs.filter(e=>e.midi === midi)"
             :style="lyricsBoxStyle(item)">{{ item.lyrics }}
          <img draggable="false" v-show="highLightBoxId === item.id && false"
               @pointerdown="dragBox($event,item,'left')"
               class="box-drag-left"
               src="../assets/box-drag.svg"/>
          <img draggable="false" v-show="highLightBoxId === item.id" @pointerdown="dragBox($event,item,'right')"
               class="box-drag-right"
               src="../assets/box-drag.svg"/>
        </div>
        <div comment="推荐音高" v-if="recommendMidiList.length>0" v-show="midi!==highLightBox.midi">
          <div
              :style="recommendMidiStyle(recommendMidiList.some(e=>e=== midi),highLightBox.lyrics === '/')"
              @click="changeBoxMidi(midi)"
          >
            <div style="width:100%;height:100%;display:flex;justify-content: center;align-items: center;">
              <img v-if="recommendMidiList.some(e=>e=== midi) && highLightBox.lyrics !== '/'"
                   src="../assets/recommedation-star.svg"/>
            </div>


          </div>
        </div>
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
  background: transparent;
  touch-action: none; /* 支持触屏 */
  width: 100%;
  height: 100%;
}

.lyrics-box-layer {
  overflow: hidden;
}

.box-drag-left {
  position: absolute;
  height: 100%;
  left: 0px;
  transform: rotate(180deg) translateX(50%);
  cursor: grab;
}

.box-drag-right {
  position: absolute;
  height: 100%;
  right: 0px;
  transform: translateX(50%);
  cursor: grab;
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
