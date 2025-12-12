<script>
import piano from '../components/piano.vue';
import midiBox from '../components/midiBox.vue';
import bgLeft from '../assets/bg-left.svg';
import {nextTick} from 'vue';
import {generateMelody} from '@/applications/testApplication/api.js';
import {playerManager} from '@jsh/note-player';
import {InstrumentEnum} from '@jsh/note-player/enum';
import DropdownSelect from '@/applications/testApplication/components/DropdownSelect.vue';
import RangeSlider from '@/applications/testApplication/components/RangeSlider.vue';

export default {
  components: {RangeSlider, DropdownSelect, piano, midiBox},
  data: () => ({
    poemInfo: {},
    curLyrics: '',
    keySignatureOptions: [
      {label: 'C大调', value: 'C'},
      {label: '#C大调', value: '#C'},
      {label: '#F大调', value: '#F'},
      {label: 'B大调', value: 'B'},
      {label: 'E大调', value: 'E'},
    ],
    moreKeySignatureOptions: [
      {label: 'A大调', value: 'A'},
      {label: 'D大调', value: 'D'},
      {label: 'G大调', value: 'G'},
      {label: 'F大调', value: 'F'},
      {label: 'bB大调', value: 'bB'},
      {label: 'bE大调', value: 'bE'},
      {label: 'bA大调', value: 'bA'},
      {label: 'bD大调', value: 'bD'},
      {label: 'bG大调', value: 'bG'},
      {label: 'bC大调', value: 'bC'},
    ],
    tempoOptions: [
      {label: '40BPM', value: 40},
      {label: '60BPM', value: 60},
      {label: '90BPM', value: 90},
      {label: '120BPM', value: 120},
      {label: '150BPM', value: 150},
    ],

    lyricsBarOptions: [
      {label: '1小节', value: 1},
      {label: '2小节', value: 2},
      {label: '3小节', value: 3},
      {label: '4小节', value: 4},
      {label: '5小节', value: 5},
    ],

    meterOptions: [
      {label: '2/4拍', value: '2/4'},
      {label: '3/4拍', value: '3/4'},
      {label: '4/4拍', value: '4/4'},
      {label: '6/8拍', value: '6/8'},
      {label: '12/8拍', value: '12/8'},
    ],
    selectedKeySignature: 'C',      // 原来 'C大调'
    selectedTempo: 90,              // 原来 '90BPM'
    selectedLyricsBars: 1,          // 原来 '8小节'
    selectedMeter: '4/4',           // 原来 '4/4拍'
    bgLeft: '',
    mode: 'brush', // brush eraser  模式
    boxList: {},
    redoStack: [],
    undoStack: [],
    playState: 'stopped', // 播放状态   playing paused stopped
    isCircle: false, // 是否为循环状态
    player: null,
    playTimer: null,
    currentPlayIndex: 0,
    currentMidi: null,
    showTempoMore: false,
    tempoMoreStyle: {},
  }),
  computed() {
  },
  async mounted() {
    this.poemInfo = this.$route.query;
    this.selectLyrics(this.poemInfo.lyrics[0]);
    this.bgLeft = bgLeft;

    this.player = await playerManager.add('player_one', [], {
      instrument: InstrumentEnum.acoustic_grand_piano, //  要播放的音色
    });
    document.addEventListener('click', this.handleClickOutsideTempo);

  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutsideTempo);
  },
  methods: {
    // 总时值计算
    totalChronaxie(selectedLyricsBars, selectedMeter) {
      const [a, b] = selectedMeter.split('/').map(Number); // a拍，b分音符为一拍
      // 分母b对应的时值表
      const durationMap = {
        1: 512,
        2: 256,
        4: 128,
        8: 64,
        16: 32,
      };
      const beatValue = durationMap[b];    // 例如 4 -> 128
      const oneBarValue = a * beatValue;   // 每小节时值
      return oneBarValue * selectedLyricsBars;
    },
    spliceString(str, start, deleteCount, insert = '') {
      return str.slice(0, start) + insert + str.slice(start + deleteCount);
    },
    async selectLyrics(lyrics) {

      const lyricsBoxs = this.$refs.midiBoxRef.exportData().lyricsBoxs;
      // 是否填充完整
      let filled = true;
      // 种子数据
      const seedMelody = this.$refs.midiBoxRef.exportMelody();
      for (let i = 0; i < this.curLyrics.length; i++) {
        const note = lyricsBoxs.find(e => {
          return this.curLyrics[i] === e.lyrics;
        });
        if (!note) {
          filled = false;
        }
      }
      // 调用melody自动补充音符
      if (!filled) {
        const startChronaxie = lyricsBoxs[0] ? ((lyricsBoxs[0].minIndex) * 32) : 0;
        const endChronaxie = lyricsBoxs.at(-1) ? ((lyricsBoxs.at(-1).maxIndex) * 32) : 0;
        // 如果剩余的空间不够了，需要适当切割lyrics长度
        const remainingBoxCount = (this.totalChronaxie(this.selectedLyricsBars, this.selectedMeter) - endChronaxie) / 32 - 1;
        let lyrics = this.curLyrics;
        if (remainingBoxCount < (lyrics.length - seedMelody.length)) {
          // 缺的格子
          const diff = (lyrics.length - seedMelody.length) - remainingBoxCount;
          lyrics = this.spliceString(lyrics, lyrics.length - diff, diff);
        }
        // 计算时值
        const res = await generateMelody({
          text: lyrics, params: {
            'style': 'classical',
            'context': 'poem',
            'mood': 'calm',
          },
          minChronaxieInterval: 32,// 最小时值间隔
          maxMidi: 83,
          minMidi: 48,
          seedMelody: seedMelody,
          totalChronaxie: this.totalChronaxie(this.selectedLyricsBars, this.selectedMeter) - startChronaxie,
        });
        // 对生成的旋律做处理，休止符的时值并入前一个音符时值
        const melody = [];
        res?.melody.forEach((item) => {
          if (!item.rest) {
            melody.push(item);
          } else {
            melody.at(-1).chronaxie += item.chronaxie;
          }
        });
        const index = lyricsBoxs[0]?.minIndex || 0;
        const newData = this.$refs.midiBoxRef.loadDataFromMelody(melody, index);
        // 保存状态
        this.boxList[this.curLyrics] = newData;
      } else {
        // 保存状态
        this.boxList[this.curLyrics] = this.$refs.midiBoxRef.exportData();
      }

      this.curLyrics = lyrics;

      nextTick(() => {
        if (this.boxList[this.curLyrics]) {// 加载状态
          this.$refs.midiBoxRef.loadData(this.boxList[this.curLyrics].activeBoxs, this.boxList[this.curLyrics].lyricsBoxs);
        } else {// 重置状态
          this.$refs.midiBoxRef.resetState();
        }
      });

    },
    handleOptionSelect(type, option) {
      this[type] = option.value;
    },
    isOptionActive(type, option) {
      return this[type] === option.value;
    },
    changeMode(curmode) {
      this.mode = curmode;
    },
    prev() {
      const index = this.poemInfo.lyrics.findIndex((e) => e === this.curLyrics);
      if (index > 0) {
        this.selectLyrics(this.poemInfo.lyrics[index - 1]);
      }
    },
    next() {
      const index = this.poemInfo.lyrics.findIndex((e) => e === this.curLyrics);
      if (index < this.poemInfo.lyrics.length - 1) {
        this.selectLyrics(this.poemInfo.lyrics[index + 1]);
      }
    },
    toggleTempoMore() {
      if (!this.$refs.tempoMoreBtn) {
        return;
      }
      if (this.showTempoMore) {
        this.showTempoMore = false;
        return;
      }
      const rect = this.$refs.tempoMoreBtn.getBoundingClientRect();
      this.tempoMoreStyle = {
        left: `${rect.left + 36 - 16}px`,
        top: `${rect.bottom + 8}px`,
        position: 'fixed',
      };
      this.showTempoMore = true;
    },
    handleClickOutsideTempo(e) {
      if (!this.showTempoMore) {
        return;
      }
      const pop = this.$refs.tempoMorePop;
      const btn = this.$refs.tempoMoreBtn;
      if ((pop && pop.contains(e.target)) || (btn && btn.contains(e.target))) {
        return;
      }
      this.showTempoMore = false;
    },
    async finish() {

      // 16分音符 = 32
    },
    // ================================================撤销/ 恢复 ====================================================
    pushHistory(newActiveBoxs, newLyricsBoxs) {
      // 将当前状态深拷贝后推入 undo 栈
      this.undoStack.push({
        activeBoxs: new Map(newActiveBoxs),
        lyricsBoxs: JSON.parse(JSON.stringify(newLyricsBoxs)),
      });

      // 清空 redo 栈（因为有新操作）
      this.redoStack.length = 0;

      // 限制 undoStack 最多 20 条，超出则删除最老的一条（从开头删）
      if (this.undoStack.length > 20) {
        this.undoStack.shift(); // 删除第一个（最旧的）
      }
    },
    // 恢复
    redo() {
      if (this.redoStack.length === 0) {
        return;
      }

      const curData = this.$refs.midiBoxRef.exportData();
      this.undoStack.push({lyricsBoxs: curData.lyricsBoxs, activeBoxs: curData.activeBoxs});
      // 载入
      const data = this.redoStack.pop();
      this.$refs.midiBoxRef.loadData(data.activeBoxs, data.lyricsBoxs);
    },
    // 撤销
    undo() {
      if (this.undoStack.length === 0) {
        return;
      }
      const curData = this.$refs.midiBoxRef.exportData();
      this.redoStack.push({lyricsBoxs: curData.lyricsBoxs, activeBoxs: curData.activeBoxs});
      // 载入
      const data = this.undoStack.pop();
      this.$refs.midiBoxRef.loadData(data.activeBoxs, data.lyricsBoxs);
    },
    // =================================播放 =====================================
    async play() {
      if (!this.player) {
        return;
      }
      const data = this.$refs.midiBoxRef.exportData().lyricsBoxs || [];
      if (data.length === 0) {
        return;
      }

      const bpm = this.selectedTempo; // 当前 bpm
      const msPerQuarter = 60000 / bpm;
      const msPerChronaxie = msPerQuarter / 128; // 128 对应四分音符

      const playSequence = data.map(item => ({
        midi: item.midi,
        lyrics: item.lyrics,
        chronaxie: (item.maxIndex - item.minIndex + 1) * 16, // 512 全音符
      }));

      const startIndex = this.playState === 'paused' ? this.currentPlayIndex : 0;
      this.stop(); // 清理旧的计时/状态
      this.playState = 'playing';
      this.currentPlayIndex = startIndex;

      const next = (idx) => {
        if (this.playState !== 'playing') {
          return;
        }
        if (idx >= playSequence.length) {
          if (this.isCircle) {
            return next(0);
          }
          return this.stop();
        }

        const note = playSequence[idx];
        const durationMs = Math.max(0, note.chronaxie * msPerChronaxie);
        const isRest = note.lyrics === '/' || !note.midi;

        this.currentPlayIndex = idx + 1; // 下一个要播放的索引

        if (!isRest) {
          this.currentMidi = note.midi;
          this.player.playMidi(note.midi, 'attack');
        } else {
          this.currentMidi = null;
        }

        this.playTimer = setTimeout(() => {
          if (!isRest && this.currentMidi != null) {
            this.player.playMidi(this.currentMidi, 'release');
          }
          if (this.playState === 'playing') {
            next(idx + 1);
          }
        }, durationMs);
      };

      next(startIndex);
    },
    pause() {
      if (this.playState !== 'playing') {
        return;
      }
      this.playState = 'paused';
      if (this.playTimer) {
        clearTimeout(this.playTimer);
        this.playTimer = null;
      }
      if (this.currentMidi != null) {
        this.player.playMidi(this.currentMidi, 'release');
        this.currentMidi = null;
      }
    },
    stop() {
      if (this.playTimer) {
        clearTimeout(this.playTimer);
        this.playTimer = null;
      }
      if (this.player && this.currentMidi != null) {
        this.player.playMidi(this.currentMidi, 'release');
      }
      this.currentMidi = null;
      this.currentPlayIndex = 0;
      this.playState = 'stopped';
    },
    // 循环模式切换
    circle() {
      this.isCircle = !this.isCircle;
    },
  },
};
</script>

<template>
  <div class="lyrics-edit-container">
    <div class="left-panel">
      <div class="left-panel__content">
        <div class="lyrics">
          <div class="title font-1">歌词列表<img src="../assets/star-superscript.svg"/></div>
          <div class="lyrics-box">
            <div class="lyrics-bg-box">
              <div class="lyrics-scroll-box">
                <div class="font-1 name">{{ poemInfo.name }}</div>
                <div class="author" style="font-size:18px;color:#28282c;font-weight:400">{{ poemInfo.author }}</div>
                <div class="lyrics-item font-3 pointer" @click="selectLyrics(item)" v-for="item in poemInfo.lyrics"
                     :class="{'lyrics-item-active':curLyrics === item}">
                  {{ item }}
                </div>
              </div>
            </div>


          </div>

        </div>
        <div class="function">
          <div class="font-1 title">基础设置</div>
          <div class="function-row">
            <div class="function-label">调号选择：</div>
            <div class="option-list">
            <span
                v-for="item in keySignatureOptions"
                :key="item"
                class="option-item pointer"
                :class="{'option-active': isOptionActive('selectedKeySignature', item)}"
                @click="handleOptionSelect('selectedKeySignature', item)"
            >
              {{ item.label }}
            </span>
              <dropdown-select :value="selectedKeySignature" @change="(e)=>selectedKeySignature=e"
                               :options="moreKeySignatureOptions"></dropdown-select>
            </div>
          </div>
          <div class="function-row">
            <div class="function-label">速度选择：</div>
            <div class="option-list">
            <span
                v-for="item in tempoOptions"
                :key="item"
                class="option-item pointer"
                :class="{'option-active': isOptionActive('selectedTempo', item)}"
                @click="handleOptionSelect('selectedTempo', item)"
            >
              {{ item.label }}
            </span>
              <span class="option-item pointer"
                    :style="{backgroundColor:showTempoMore?'#fe435b':'rgba(255,255,255,0.3)',color:showTempoMore?'#fff':'#999'}"
                    ref="tempoMoreBtn"
                    @click.stop="toggleTempoMore">更多</span>
              <div
                  v-if="showTempoMore"
                  class="tempo-more-pop"
                  :style="tempoMoreStyle"
                  ref="tempoMorePop"
                  @click.stop
              >
                <div style="position: relative;top:-4px">{{ selectedTempo }}</div>
                <range-slider
                    vertical
                    :height="100"
                    :min="40"
                    :max="208"
                    :step="1"
                    :value="selectedTempo"
                    @input="selectedTempo = $event"
                ></range-slider>
              </div>
            </div>
          </div>

          <div class="function-row">
            <div class="function-label">歌词小节：</div>
            <div class="option-list">
            <span
                v-for="item in lyricsBarOptions"
                :key="item"
                class="option-item pointer"
                :class="{'option-active': isOptionActive('selectedLyricsBars', item)}"
                @click="handleOptionSelect('selectedLyricsBars', item)"
            >
              {{ item.label }}
            </span>
            </div>
          </div>

          <div class="function-row">
            <div class="function-label">拍号选择：</div>
            <div class="option-list">
            <span
                v-for="item in meterOptions"
                :key="item.value"
                class="option-item pointer"
                :class="{'option-active': isOptionActive('selectedMeter', item)}"
                @click="handleOptionSelect('selectedMeter', item)"
            >
              {{ item.label }}
            </span>
            </div>
          </div>
          <div class="system-operation"></div>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="edit">
        <div class="title font-1">
          {{ curLyrics }}
        </div>
        <div class="bg">
          <div class="top">
            <div class="subTitle font-1">
              绘画区域<img src="../assets/star-superscript.svg"/>
            </div>
            <div class="legend">
              <div>休止符</div>
              <div
                  style="margin-top:4px;margin-left:6px;margin-right:24px;font-size:11px;width: 32px;height:14px;display: flex;justify-content: center;align-items: center;background-color: #efefef">
                /
              </div>
              <div>推荐音符：</div>
              <div
                  style="margin-top:4px;margin-left:6px;width: 32px;height:14px;display: flex;justify-content: center;align-items: center;background-color: #d8ddff">
                <img
                    src="../assets/recommedation-star.svg"/></div>
            </div>
          </div>

          <div class="worktop">
            <piano :whiteKeyHeight="1/21*100+'%'"></piano>
            <midiBox @history="pushHistory" :totalChronaxie="totalChronaxie(selectedLyricsBars, selectedMeter)"
                     ref="midiBoxRef" :mode="mode"
                     :whiteKeyHeight="1/21*100+'%'"
                     :lyricsCharList="curLyrics.split('')"></midiBox>
          </div>
          <div class="btns">
            <div class="left">
              <div class="btn-square pointer" @click="undo"
                   :style="{border:`1px solid #e8e8e8`,marginRight:'20px',opacity:undoStack.length > 0?1:0.5}">
                <img
                    src="../assets/undo.svg"/>
              </div>
              <div class="btn-square pointer" @click="redo"
                   :style="{border:`1px solid #e8e8e8`,opacity:redoStack.length > 0?1:0.5}">
                <img
                    src="../assets/redo.svg"/>
              </div>

            </div>
            <div class="center">
              <div class="btn-circle" v-show="playState === 'stopped'">
                <div class="icon pointer" @click="play"><img src="../assets/play.svg"/></div>
                <div class="text">试听</div>
              </div>
              <div class="btn-circle" v-show="playState === 'paused'">
                <div class="icon pointer" @click="play"><img src="../assets/play.svg"/></div>
                <div class="text">继续播放</div>
              </div>
              <div class="btn-circle" v-show="playState === 'playing'">
                <div class="icon pointer" @click="pause"><img src="../assets/pause.svg"/></div>
                <div class="text">暂停</div>
              </div>
              <div class="btn-circle" v-show="playState !== 'stopped'">
                <div class="icon pointer" @click="stop"><img src="../assets/stop.svg"/></div>
                <div class="text">停止</div>
              </div>
              <div class="btn-circle">
                <div class="icon pointer" @click="circle"
                     :style="{backgroundColor: isCircle?'#fe435b':'rgba(0,0,0,0.04)'}"><img
                    src="../assets/cycle.svg" v-if="!isCircle">

                  <img
                      src="../assets/cycle_active.svg" v-else>
                </div>
                <div class="text">循环</div>
              </div>


            </div>
            <div class="right">
              <div class="btn-pink pointer" :class="{'btn-pink-disabled':curLyrics ===  poemInfo.lyrics?.[0]}" @click="prev">
                上一句
              </div>
              <div class="btn-pink pointer" v-if="poemInfo.lyrics && curLyrics !==  poemInfo.lyrics.at(-1)" @click="next">
                下一句
              </div>
              <div class="btn-pink pointer" style="background:#FE435B;color:white " v-else @click="finish">完成</div>
              <div class="btn-square pointer"
                   @click="changeMode('brush')"
                   :style="{backgroundColor:mode==='brush'?'#FE435B':'rgba(254,67,91,0.1)',border:mode==='brush'?`1px solid #FFCAD`:'unset'}">
                <img v-if="mode==='brush'"
                     src="../assets/pen_active.svg"/>
                <img v-else
                     src="../assets/pen.svg"/></div>
              <div
                  @click="changeMode('eraser')"
                  class="btn-square pointer"
                  :style="{backgroundColor:mode==='eraser'?'#8595FF':'rgba(133,149,255,0.1)',border:mode==='eraser'?`1px solid #DDE1FF`:'unset'}">
                <img v-if="mode==='eraser'"
                     src="../assets/eraser_active.svg"/>
                <img v-else
                     src="../assets/eraser.svg"/></div>
            </div>
          </div>
        </div>
        <div class="operation"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lyrics-edit-container {
  height: 100%;
  display: flex;
  user-select: none;
}

.left-panel {
  position: relative;
  display: flex;
  width: 700px;
  min-height: 100vh;
  height: auto;
  flex-shrink: 0;
  flex-direction: column;
  padding: 16px 0 32px 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-size: cover;
    pointer-events: none;
    z-index: 0;
  }

  > .lyrics,
  > .function {
    position: relative;
    z-index: 1;
  }

  .left-panel__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 12px; /* 为滚动条预留内边距，让它在背景内侧 */
  }

  .lyrics {
    flex: 1;
    min-height: 0;
  }


}

.right-panel {
  position: relative;
  width: 100%;
  display: flex;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #E2E4F5 100%);
}

.lyrics {
  position: relative;
  display: flex;
  height: auto;
  flex-direction: column;
  margin-bottom: 40px;

  .title {
    height: 31px;
    margin-left: 40px;
    margin-top: 36px;
    margin-bottom: 20px;

    > img {
      position: relative;
      top: -12px;
      height: 20px;
      width: 20px
    }
  }

  .lyrics-box {
    position: relative;
    height: 100%;
    margin-left: 40px;
    margin-right: 40px;
    border-radius: 16px;
    /* 渐变边框：外层用渐变背景 + 内层白底伪元素实现 */
    background: linear-gradient(348deg, rgba(137, 255, 141, 1), rgba(255, 141, 174, 1), rgba(200, 179, 255, 1));
    overflow: hidden;

    .lyrics-bg-box {
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      display: flex;
      border-radius: 16px;
      position: relative;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      left: 3px;
      top: 3px;
      background: white;
    }

    .lyrics-scroll-box {

      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;
      width: calc(100% - 20px);
      height: calc(100% - 20px);

      overflow: auto;
      box-sizing: border-box;
      /* 滚动条样式 */
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 999px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }
    }

    .name {
      margin-top: 40px;
    }

    .author {
      margin-top: 26px;
      margin-bottom: 26px;
    }

    //&::before {
    //  content: '';
    //  position: absolute;
    //  inset: 2px; /* 边框粗细 */
    //  border-radius: inherit;
    //  background: #fff; /* 内层背景色 */
    //  z-index: 0;
    //}

    > div {
      position: relative;
      z-index: 1;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }

    > div:first-child,
    > div:nth-child(2) {
      cursor: default;
      font-weight: 600;
    }

    .lyrics-item {
      height: 69px;
      flex-shrink: 0;
      width: calc(100% - 52px);
      margin-left: 26px;
      margin-right: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .lyrics-item-active {
      background-color: rgba(254, 67, 91, 0.07);
      outline: 1px solid rgba(254, 67, 91, 0.2);
      color: #fe435b;
      border-radius: 14px;
    }
  }
}

.title {
  grid-area: title;
}

.edit {
  width: 100%;
  height: calc(100% - 80px);
  margin: 40px;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: 152px;
    background: linear-gradient(90deg, rgba(236, 242, 255, 0) 0%, #ECF2FF 100%);
    border-radius: 26px 26px 26px 26px;
    border: 1px solid rgba(133, 149, 255, 0.4);
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
  }

  .bg {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 18px 18px 18px 18px;
    border: 1px solid #EAEAEA;
    padding: 24px;

    .top {
      display: flex;
      justify-content: space-between;

      .subTitle {
        flex-shrink: 0;
        position: relative;
        margin-bottom: 32px;

        > img {
          position: relative;
          top: -12px;
          height: 20px;
          width: 20px
        }
      }

      .legend {
        display: flex;
        font-size: 16px;
        align-items: flex-start;
        color: #666666;
      }
    }


    .worktop {
      height: 100%;

      position: relative;
      display: flex;
    }

    .btns {
      margin-top: 78px;
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        flex-shrink: 0;
        width: 345px;
      }

      .center {

        gap: 32px;

        .btn-circle {
          display: flex;
          align-items: center;
          flex-direction: column;
          flex-shrink: 0;


          .icon {
            width: 52px;
            height: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.04);
            border-radius: 50%;

            > img {
              width: 32px;
              height: 32px;
            }
          }

          .text {
            margin-top: 8px;
            font-size: 16px;
            color: #333333;
          }
        }
      }

      .right {
        display: flex;
        flex-shrink: 0;
        width: 345px;

        > div {
          margin-left: 20px;
        }

      }

      .btn-square {
        box-sizing: border-box;
        height: 40px;
        width: 40px;
        border-radius: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .operation {
    height: 0px;
    flex-shrink: 0;
  }
}

.function {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 400px;
  flex-shrink: 0;

  .title {
    margin-left: 40px;
    margin-bottom: 20px;
  }

  .system-operation {
    height: 100px;
    margin: 10px;
  }
}

.lyrics-active {
  background-color: #4096ff;
  color: #fff;
}

.function-row {
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-bottom: 20px;
}

.function-label {
  width: 90px;
  font-weight: bold;
  font-size: 18px;
  color: #333333;
}

.option-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
}

.option-item {
  width: 72px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999999;
}


.option-active {
  background-color: #fe435b;
  border: unset;
  color: #fff;
}

.tempo-more-pop {
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  flex-shrink: 0;
  flex-grow: 0;
  height: 130px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.08);
  color: #9C9DA0;
  font-size: 12px;
}

.lyrics-active {
  font-size: 18px;
  color: #fe435b;
  font-weight: bold;
}

.font-0 {
  font-size: 32px;
  color: #333333;
}

.font-1 {
  font-weight: bold;
  font-size: 22px;
  color: #28282c;
}

.font-2 {
  font-weight: bold;
  font-size: 18px;
  color: #333333;
}

.font-3 {
  font-size: 18px;
  color: #666666;
}

.font-4 {
  font-size: 16px;
  color: #333333;
}

.font-5 {
  font-size: 15px;
  color: #FE435B;
}

.font-6 {
  font-size: 14px;
  color: #999999;
}

.font-7 {
  font-size: 14px;
  color: #606366;
}

.font-8 {
  font-size: 16px;
  color: #666666;
}

.font-9 {
  font-size: 12px;
  color: #ffffff;
}

.font-10 {
  font-size: 14px;
  color: #bebebe;
}

.btn-pink {
  width: 90px;
  height: 40px;
  border: 1px solid #ffcad1;
  border-radius: 9px;
  background-color: rgba(254, 67, 91, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FE435B;
}

.btn-pink-disabled {
  background: rgba(254, 67, 91, 0.1);
  opacity: 0.5;
  cursor: unset;
}

.pointer {
  cursor: pointer;
}
</style>
