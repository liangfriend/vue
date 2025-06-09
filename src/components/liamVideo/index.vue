<template>
  <div class="video-player" @click="">
    <!-- 视频或封面 -->
    <video
        class="video"
        @mousedown="videoMouseDown"
        v-if="videoAvailable"
        ref="videoRef"
        :src="props.videoSrcList?.length?props.videoSrcList?.[videoSrcListIndex].url:props.videoSrc"
        @timeupdate="updateProgress"
        @loadedmetadata="updateDuration"
    />
    <div v-else class="placeholder">
      <img v-if="props.placeholderImg" :src="props.placeholderImg" alt="placeholder" class="placeholder-img"/>
      <div v-else class="placeholder-default">无视频</div>
    </div>
    <!--  顶部返回按钮  -->
    <div class="header" v-show="operationShow">
      <div class="header-mask"></div>
      <div class="back">
        <img :src="back"/>
      </div>
    </div>
    <!-- 控制条 -->
    <div class="controls" v-show="operationShow"
         :class="{ 'disabled': !videoAvailable }">
      <div class="controls-mask"></div>
      <div class="top">
        <div class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>
      <div class="middle">
        <!-- 进度条 -->
        <div class="progress-bar" @click="seek($event)">
          <img v-if="props.progressBgImg" :src="props.progressBgImg" class="progress-bg"/>
          <div v-else class="progress-bg default-bg"/>

          <div class="progress-played" :style="{ width: `${progressPercent}%` }">
            <img v-if="props.progressPlayedImg" :src="props.progressPlayedImg" class="progress-played-img"/>
            <div v-else class="progress-played-img default-played"/>
          </div>

          <img
              v-if="props.progressThumbImg"
              :src="props.progressThumbImg"
              class="thumb"
              :style="{ left: `${progressPercent}%` }"
              @mousedown.prevent="startDrag"
          />
          <div
              v-else
              class="thumb default-thumb"
              :style="{ left: `${progressPercent}%` }"
              @mousedown.prevent="startDrag"
          />
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <img :src="isPlaying ? props.pauseButtonImg : props.playButtonImg"
               class="btn play-btn"
               @click="togglePlay"
               v-if="(props.playButtonImg && !isPlaying) || (props.pauseButtonImg && isPlaying)"
          />
          <div class="play-btn default-icon" v-else @click="togglePlay"></div>
        </div>
        <div class="right">
          <!-- 其他控件 -->
          <input v-if="!hidden.includes('volume')" type="range"
                 class="volume rightButton" min="0" max="1" step="0.01"
                 v-model="volume" @input="updateVolume"
                 :disabled="!videoAvailable"/>

          <div v-if="!hidden.includes('rate')" class="rightButton" @click="selectRate">倍速</div>
          <div v-if="!hidden.includes('episode')" class="rightButton" @click="selectEpisode">选集</div>
          <div v-if="!hidden.includes('fullscreen')" class="rightButton" @click="toggleFullScreen"
               :disabled="!videoAvailable">全屏
          </div>
        </div>


      </div>
    </div>
    <!--  右侧弹窗  -->
    <div class="rightModel" v-if="videoSrcList" v-show="rightModelShow">
      <div v-if="rightModelType==='episode'" @click="changeEpisode(index)" class="item"
           v-for="(item,index) in videoSrcList"
           :class="{active: index === videoSrcListIndex}">
        {{ item.title }}
      </div>
      <div v-if="rightModelType==='rate'" @click="changeRate(index)" class="item"
           v-for="(item,index) in rateList"
           :class="{active: index === curRateIndex}">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
import playButton from './play.png'
import pauseButton from './pause.png'
import back from './back.png'

type VideoSrcListItem = {
  url: string,
  title: string,
}
const props = withDefaults(defineProps<{
  videoSrc?: string
  videoSrcList?: Array<VideoSrcListItem>,
  playButtonImg?: string
  pauseButtonImg?: string
  progressBgImg?: string
  progressPlayedImg?: string
  progressThumbImg?: string
  placeholderImg?: string // 新增：缺省封面图
  controlsHeight: string
  hidden: Array<string>,
}>(), {
  playButtonImg: playButton,
  pauseButtonImg: pauseButton,
  progressBgImg: '',
  progressPlayedImg: '',
  progressThumbImg: '',
  placeholderImg: '', // 没传时不展示
  controlsHeight: '40px',
  hideen: [],
})
const operationShow = ref(false) // 上下功能按钮区域
const rightModelShow = ref(false) // 左侧遮罩展示
const rightModelType = ref<'episode' | 'rate'>('episode')
const videoAvailable = computed(() => {
  if (props.videoSrcList?.length) {
    return true
  }
  return !!props.videoSrc
})
const rateList = ref([{
  title: '2.0X',
  value: 2
}, {
  title: '1.5X',
  value: 1.5
}, {
  title: '1.25X',
  value: 1.25
}, {
  title: '1.0X',
  value: 1
}, {
  title: '0.75X',
  value: 0.75
}, {
  title: '0.5X',
  value: 0.5
}])
const curRateIndex = ref(3)
const videoSrcListIndex = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progressPercent = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

const volume = ref(1)
const playbackRate = ref(1)

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPlaying.value = true
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

function updateProgress() {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
  }
}

function updateDuration() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

function seek(e: MouseEvent) {
  if (!videoRef.value) return
  const bar = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const clickX = e.clientX - bar.left
  const percent = clickX / bar.width
  videoRef.value.currentTime = percent * duration.value
  currentTime.value = videoRef.value.currentTime
}

function updateVolume() {
  if (videoRef.value) {
    videoRef.value.volume = volume.value
  }
}

function changeSpeed() {
  if (videoRef.value) {

  }
}

function toggleFullScreen() {
  const player = videoRef.value?.parentElement
  if (!player) return
  if (!document.fullscreenElement) {
    player.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

function selectRate() {
  rightModelType.value = 'rate'
  rightModelShow.value = true

}

function selectEpisode() {
  rightModelType.value = 'episode'
  rightModelShow.value = true
}

function changeEpisode(index: number) {
  videoSrcListIndex.value = index
  rightModelShow.value = false
  curRateIndex.value = 3
}

function changeRate(index: number) {
  if (!rateList.value[index]?.value || !videoRef.value) {
    return
  }
  videoRef.value.playbackRate = rateList.value[index].value
  curRateIndex.value = index
  rightModelShow.value = false
}

function videoMouseDown(e: MouseEvent) {
  operationShow.value = !operationShow.value
  rightModelShow.value = false
}

// 拖动进度条
let dragging = false

function startDrag(e: MouseEvent) {
  dragging = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!dragging || !videoRef.value) return
  const bar = document.querySelector('.progress-bar')!.getBoundingClientRect()
  const dragX = e.clientX - bar.left
  const percent = Math.max(0, Math.min(1, dragX / bar.width))
  videoRef.value.currentTime = percent * duration.value
  currentTime.value = videoRef.value.currentTime
}

function stopDrag() {
  dragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

onMounted(() => {
  updateVolume()
  changeSpeed()
})

onBeforeUnmount(() => {
  stopDrag()
})
</script>
<style scoped lang="scss">
$topH: 40px;
$middleH: 40px;
$bottomH: 40px;
$playBtnSize: 20px;
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
}

video { // video默认样式重置
  display: block;
  width: 100%;
  height: 100%;
}

.video {
  width: 100%;

}

.placeholder {
  width: 100%;
  background: #111;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder-default {
  color: #888;
  font-size: 18px;
}

.header {
  position: absolute;
  width: 100%;
  height: 140px;
  top: 0;

  .back {
    top: 12px;
    left: 18px;
    position: absolute;
    width: 20px;
    height: 20px;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  .header-mask {
    height: 140px;
    width: 100%;
    top: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 0;
    position: absolute;
  }
}

.controls {
  position: absolute;
  width: 100%;
  height: $bottomH + $middleH + $topH;
  bottom: 0;

  > * {
    position: relative;
    z-index: 10;
  }

  .controls-mask {
    height: $bottomH + $middleH + $topH;
    width: 100%;
    bottom: 0;
    position: absolute;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 0;
  }

  .top {
    padding-left: 18px;
    padding-right: 18px;
    height: $topH;
    display: flex;
    align-items: center;

    .time-display {
      color: white;
      font-size: 14px;
      line-height: $topH;
    }
  }

  .middle {

    padding-left: 18px;
    padding-right: 18px;
    display: flex;
    align-items: center;
    width: calc(100% - 36px);
    height: $middleH;

    .progress-bar {

      width: 100%;
      height: 4px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .progress-bg.default-bg {
      width: 100%;
      height: 100%;
      background: #444;
      position: absolute;
    }

    .progress-played {
      height: 100%;
      width: 100%;

    }

    .thumb.default-thumb {
      position: absolute;
      height: 100%;
      aspect-ratio: 1;
      background: #fff;
      border-radius: 50%;
      transform: translateX(-50%);
      border: 2px solid #0cf;
      cursor: pointer;
    }

    .progress-played-img.default-played {
      position: absolute;
      height: 100%;
      background: #0cf;
    }
  }

  .bottom {
    margin-left: 18px;
    margin-right: 18px;
    display: flex;
    justify-content: space-between;
    height: $bottomH;
    align-items: center;

    .left {
      display: flex;
      flex-shrink: 0;

      .play-btn {
        width: $playBtnSize;
        height: $playBtnSize;
        cursor: pointer;
      }

      .default-icon {
        flex-shrink: 0;
        background: #666;
        width: $playBtnSize;
        height: $playBtnSize;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .right {
      display: flex;
      flex-shrink: 0;

      .rightButton {
        flex-shrink: 0;
        width: fit-content;
        margin-left: 18px;
        font-size: 14px;
        white-space: nowrap;
        color: white;
      }
    }


  }

}

.disabled {

}

.rightModel {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.85);
  z-index: 11;
  padding: 18px;

  .item {
    color: white;
    margin-bottom: 10px;
    width: 100%;
    height: 34px;
    line-height: 34px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align-last: center;
    cursor: pointer;
  }

  .active {
    color: #FF7882;
  }
}
</style>

