<script>
import piano from '../components/piano.vue';
import midiBox from '../components/midiBox.vue';
import bgLeft from '../assets/bg-left.svg';

export default {
  components: {piano, midiBox},
  data: () => ({
    poemInfo: {},
    curLyrics: '',
    keySignatureOptions: ['C大调', '#C大调', '#F大调', 'B大调', 'E大调', '更多'],
    scaleOptions: ['大调', '小调', '五声音阶', '和声小调', '旋律小调'],
    tempoOptions: ['30BPM', '60BPM', '90BPM', '120BPM', '150BPM', '更多'],
    lyricsBarOptions: ['4小节', '8小节', '12小节', '16小节', '32小节'],
    meterOptions: ['2/4拍', '3/4拍', '4/4拍', '6/8拍', '12/8拍'],
    selectedKeySignature: 'C大调',
    selectedScale: '大调',
    selectedTempo: '90BPM',
    selectedLyricsBars: '8小节',
    selectedMeter: '4/4拍',
    bgLeft: '',
  }),
  mounted() {
    this.poemInfo = this.$route.query;
    this.selectLyrics(this.poemInfo.lyrics[0]);
    this.bgLeft = bgLeft;
  },
  methods: {
    selectLyrics(lyrics) {
      this.curLyrics = lyrics;
      this.$refs.midiBox.resetState();
    },
    handleOptionSelect(type, option) {
      this[type] = option;
    },
    isOptionActive(type, option) {
      return this[type] === option;
    },
  },
};
</script>

<template>
  <div class="lyrics-edit-container">
    <div class="left-panel">
      <div class="lyrics">
        <div class="title font-1">歌词列表</div>
        <div class="lyrics-box">
          <div class="font-1 name">{{ poemInfo.name }}</div>
          <div class="author" style="font-size:18px;color:#28282c;font-weight:400">{{ poemInfo.author }}</div>
          <div class="lyrics-item font-3" @click="selectLyrics(item)" v-for="item in poemInfo.lyrics"
               :class="{'lyrics-item-active':curLyrics === item}">
            {{ item }}
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
                class="option-item"
                :class="{'option-active': isOptionActive('selectedKeySignature', item)}"
                @click="handleOptionSelect('selectedKeySignature', item)"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="function-row">
          <div class="function-label">音阶选择：</div>
          <div class="option-list">
            <span
                v-for="item in scaleOptions"
                :key="item"
                class="option-item"
                :class="{'option-active': isOptionActive('selectedScale', item)}"
                @click="handleOptionSelect('selectedScale', item)"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="function-row">
          <div class="function-label">速度选择：</div>
          <div class="option-list">
            <span
                v-for="item in tempoOptions"
                :key="item"
                class="option-item"
                :class="{'option-active': isOptionActive('selectedTempo', item)}"
                @click="handleOptionSelect('selectedTempo', item)"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="function-row">
          <div class="function-label">歌词小节：</div>
          <div class="option-list">
            <span
                v-for="item in lyricsBarOptions"
                :key="item"
                class="option-item"
                :class="{'option-active': isOptionActive('selectedLyricsBars', item)}"
                @click="handleOptionSelect('selectedLyricsBars', item)"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="function-row">
          <div class="function-label">拍号选择：</div>
          <div class="option-list">
            <span
                v-for="item in meterOptions"
                :key="item"
                class="option-item"
                :class="{'option-active': isOptionActive('selectedMeter', item)}"
                @click="handleOptionSelect('selectedMeter', item)"
            >
              {{ item }}
            </span>
          </div>
        </div>
        <div class="system-operation"></div>
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
            <midiBox :whiteKeyHeight="1/21*100+'%'" ref="midiBox" :lyricsCharList="curLyrics.split('')"></midiBox>
          </div>
          <div class="btns">
            <div class="left">
              <div class="btn-square" :style="{border:`1px solid #e8e8e8`,marginRight:'20px'}">
                <img
                    src="../assets/undo.svg"/>
              </div>
              <div class="btn-square" :style="{border:`1px solid #e8e8e8`}">
                <img
                    src="../assets/redo.svg"/>
              </div>

            </div>
            <div class="right">
              <div class="btn-pink">上一句</div>
              <div class="btn-pink">下一句</div>
              <div class="btn-pink">完成</div>
              <div class="btn-square"
                   :style="{backgroundColor:'rgba(254,67,91,0.1)',border:`1px solid rgba(254,67,91,1)`}"><img
                  src="../assets/pen.svg"/></div>
              <div class="btn-square" :style="{backgroundColor:'rgba(133,149,255,0.1)',border:`1px solid #DDE1FF`}"><img
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
}

.left-panel {
  position: relative;
  display: flex;
  width: 600px;
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
  flex-direction: column;
  margin-bottom: 40px;

  .title {
    height: 31px;
    margin-left: 40px;

    margin-top: 36px;
    margin-bottom: 20px;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    .name {
      margin-top: 40px;
    }

    .author {
      margin-top: 26px;
      margin-bottom: 26px;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 2px; /* 边框粗细 */
      border-radius: inherit;
      background: #fff; /* 内层背景色 */
      z-index: 0;
    }

    > div {
      position: relative;
      z-index: 1;
      padding: 4px 6px;
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
      width: calc(100% - 52px);
      margin-left: 26px;
      margin-right: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .lyrics-item-active {
      background-color: rgba(254, 67, 91, 0.07);
      outline: 1px solid rgba(254, 67, 91, 0.2);
      color: #fe435b;
    }
  }
}

.title {
  grid-area: title;
}

.edit {
  width: 100%;
  height: 100%;
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
          position: absolute;
          top: -6px;
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
      }

      .right {
        display: flex;

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
    height: 152px;
    flex-shrink: 0;
  }
}

.function {
  display: flex;
  flex-direction: column;
  gap: 12px;

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
}

.option-item {
  width: 64px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: flex;
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
</style>
