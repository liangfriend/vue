<script>
import {
  AccidentalEnum,
  midiToNoteName,
  noteNameToHelmholtz,
  noteNameToNoteString,
} from 'deciphony-core';
import {defaultCodeConfig} from '../constant';

export default {
  name: 'Piano',
  props: {
    width: {type: String, default: '180px'},
    whiteKeyHeight: {type: String, default: '40px'},
    blackKeyWidthRatio: {
      type: Number,
      default: 0.58,
    },
    blackKeyHeightRatio: {
      type: Number,
      default: 0.4,
    },
    config: {
      type: Object,
      default: () => ({
        keyboard: defaultCodeConfig,
      }),
    },
    midi: {
      type: Object,
      default: () => ({min: 48, max: 83}),
    },
    pitchNotation: {
      type: String, // Scientific Helmholtz None
      default: 'Helmholtz',
    },
  },
  data() {
    return {
      activeKeys: new Set(),
    };
  },
  computed: {
    // 解析容器高度 数值
    containerHeightNum() {
      const {value} = this.parseAndFormatDimension(this.width);
      return value;
    },
    // 容器高度单位
    containerHeightUnit() {
      const {unit} = this.parseAndFormatDimension(this.width);
      return unit;
    },
    // 白键宽度数值
    whiteKeyWidthNum() {
      const {value} = this.parseAndFormatDimension(this.whiteKeyHeight);
      return value;
    },
    // 白键/黑键尺寸单位
    keyUnit() {
      const {unit} = this.parseAndFormatDimension(this.whiteKeyHeight);
      return unit;
    },
    // 黑键宽度数值
    blackKeyHeightNum() {
      return this.whiteKeyWidthNum * this.blackKeyWidthRatio;
    },
    // 黑键高度数值
    blackKeyWidthNum() {
      return this.containerHeightNum * this.blackKeyHeightRatio;
    },
    // 原始键数组（含黑白标识）
    rawKeys() {
      const out = [];
      const midiRange = this.midi;
      for (let i = midiRange.max; i >= midiRange.min; i--) {
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
    totalHeight() {
      let whiteKeyCount = 0;
      const midiRange = this.midi;
      for (let i = midiRange.min; i <= midiRange.max; i++) {
        if (this.isWhiteKey(i)) {
          whiteKeyCount += 1;
        }
      }
      const {value, unit} = this.parseAndFormatDimension(this.whiteKeyHeight);
      return `${value * whiteKeyCount}${unit}`;
    },
    // 样式 - 外容器（竖向：宽=width，高=totalHeight）
    pianoContainerStyle() {
      return {
        width: this.width,
        height: this.totalHeight,
        position: 'relative',
        background: '#eee',
      };
    },
  },
  methods: {
    midiToNoteName(midi) {
      return midiToNoteName(midi);
    },
    noteNameToNoteString(item) {
      return noteNameToNoteString(item);
    },
    noteNameToHelmholtz(item) {
      return noteNameToHelmholtz(item);
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
    // 生成白键样式 top 值（竖向）
    topForWhiteByIndex(whiteIndex) {
      return `${whiteIndex * this.whiteKeyWidthNum}${this.keyUnit}`;
    },
    // 生成黑键 top 值（竖向，将黑键居中放在相邻两个白键之间）
    topForBlackByMidi(midi) {
      const beforeWhiteCount = this.whiteIndexBeforeMidi(midi);
      let topNum = beforeWhiteCount * this.whiteKeyWidthNum - this.blackKeyHeightNum / 2;
      // 偏移模式，为了保持黑白键的高度范围尽量一致，对黑键进行偏移
      switch (midi % 12) {
      case 1: {
        topNum -= this.blackKeyHeightNum * 0.1;
        break;
      }
      case 3: {
        topNum += this.blackKeyHeightNum * 0.25;
        break;
      }
      case 6: {
        topNum -= this.blackKeyHeightNum * 0.3;
        break;
      }
      case 8: {
        topNum += this.blackKeyHeightNum * 0.1;
        break;
      }
      case 10: {
        topNum += this.blackKeyHeightNum * 0.3;
        break;
      }
      }
      return `${topNum}${this.keyUnit}`;
    },
    // 生成白键样式 left 值（竖向时固定为 0）
    leftForWhiteByIndex() {
      return '0';
    },
    // 生成黑键 left 值（竖向时固定为 0，使其覆盖在白键上方）
    leftForBlackByMidi() {
      return '0';
    },
    emitKey(type, midi) {
      const set = this.activeKeys;
      if (!set.has(midi) && type === 'keyDown') {
        set.add(midi);
      } else if (set.has(midi) && type === 'keyUp') {
        set.delete(midi);
      }

      const keyInfo = {
        midi,
        black: this.isBlackKey(midi),
        scientificNoteName: [
          noteNameToNoteString(midiToNoteName(midi, AccidentalEnum.Sharp)),
          noteNameToNoteString(midiToNoteName(midi, AccidentalEnum.Flat)),
        ],
        helmholtzNoteName: [
          noteNameToHelmholtz(midiToNoteName(midi, AccidentalEnum.Sharp)),
          noteNameToHelmholtz(midiToNoteName(midi, AccidentalEnum.Flat)),
        ],
      };

      this.$emit(type, keyInfo);

      this.$forceUpdate();
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
    isKeyActive(midi) {
      return this.activeKeys.has(midi);
    },
  },
  mounted() {
    // 键盘事件
    document.addEventListener('keydown', (e) => {
      const set = this.activeKeys;
      this.config.keyboard.forEach((key) => {
        if (e.code === key.code && !set.has(key.midi)) {
          this.emitKey('keyDown', key.midi);
        }
      });
    });
    document.addEventListener('keyup', (e) => {
      const set = this.activeKeys;
      this.config.keyboard.forEach((key) => {
        if (e.code === key.code && set.has(key.midi)) {
          this.emitKey('keyUp', key.midi);
        }
      });
    });
  },
};
</script>

<template>
  <div :style="pianoContainerStyle" class="ds-piano-container hide-scrollbar stack">
    <div class="stackItem" comment="白键和黑键">
      <!-- 白键（绝对定位） -->
      <div
          v-for="wk in whiteKeys"
          :key="wk.midi"
          :class="{ active: isKeyActive(wk.midi) }"
          :style="{
          width: '100%',
          height: whiteKeyWidthNum + keyUnit,
          position: 'absolute',
          top: topForWhiteByIndex(wk.whiteIndex),
          left: leftForWhiteByIndex()
        }"
          class="white-key"
          @pointerdown="handlePointerDown($event, wk)"
          @pointerup="handlePointerUp($event, wk)"
      >
        <div v-if="midiToNoteName" v-show="pitchNotation !== 'None'" class="noteName">
          {{
            pitchNotation === 'Scientific'
                ? noteNameToNoteString(midiToNoteName(wk.midi, '#'))
                : noteNameToHelmholtz(midiToNoteName(wk.midi, '#'))
          }}
        </div>
      </div>
      <!-- 黑键（绝对定位） -->
      <div
          v-for="bk in blackKeys"
          :key="bk.midi"
          :class="{ active: isKeyActive(bk.midi) }"
          :style="{
          width:  blackKeyWidthNum + keyUnit,
          height: blackKeyHeightNum + keyUnit,
          top: topForBlackByMidi(bk.midi),
          left: leftForBlackByMidi(bk.midi)
        }"
          class="black-key"
          @pointerdown="handlePointerDown($event, bk)"
          @pointerup="handlePointerUp($event, bk)"
      >
        <div v-show="pitchNotation !== 'None' && false" class="noteNameSharp">
          {{ pitchNotation === 'Scientific' ? bk.scientificNoteName[0] : bk.helmholtzNoteName[0] }}
        </div>
        <div v-show="pitchNotation !== 'None' && false" class="noteNameFlat">
          {{ pitchNotation === 'Scientific' ? bk.scientificNoteName[1] : bk.helmholtzNoteName[1] }}
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ds-piano-container {
  user-select: none;


}

.white-key {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: white;
  border: 1px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;

  > div {
    margin-right: 20px;
    font-size: 14px;
    color: #bebebe;
  }
}

.white-key.active {
  background: #a8d8ff;
}

.black-key {
  position: absolute;
  background: black;
  color: white;
  cursor: pointer;
  transform: translateY(0);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.black-key.active {
  background: #3399ff;
}

.group {
  display: flex;
}

.groupName {
  display: flex;
  position: absolute;
  bottom: 0;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome */
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
