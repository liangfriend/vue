<template>
  <liam-video class="liam-video"
              :hidden="['volume','fullscreen']"
              :video-src-list="srcList"
  />
</template>
<script setup lang="ts">
import liamVideo from '@/components/liamVideo/index.vue'

const srcList = [{
  title: '11adasddasdscsasfasgdfgdasdasdsbdzbdfbfzc11',
  url: "https://media.w3.org/2010/05/sintel/trailer.mp4"
}, {
  title: '1111',
  url: "http://vjs.zencdn.net/v/oceans.mp4"
}, {
  title: '1111',
  url: "https://media.w3.org/2010/05/sintel/trailer.mp4"
}]
</script>
<style scoped>
.liam-video {

}
</style>