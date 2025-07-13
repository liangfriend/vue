<script setup lang="ts">

import {computed, PropType, ref, UnwrapRef} from "vue";
import {MusicScore, MusicScoreRef, NoteHead} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  ChronaxieEnum, MsSymbolTypeEnum,
  ReserveMsSymbolType
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {msSymbolTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";


const props = defineProps({

  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true
  },
  msRef: {
    type: Object as PropType<UnwrapRef<MusicScoreRef>>,
    required: true
  },
  noteHead: {
    type: Object as PropType<NoteHead>,
    required: true
  }
})

function handleRightToolsBtn(key: String, musicScore: MusicScore) {
  switch (key) {
    case 'selectNote':
      break
  }
}

const noteList = ref([{
  text: '全音符',
  chronaxie: ChronaxieEnum.whole,
}, {
  text: '二分音符',
  chronaxie: ChronaxieEnum.half,
}, {
  text: '四分音符',
  chronaxie: ChronaxieEnum.quarter,
}, {
  text: '八分音符',
  chronaxie: ChronaxieEnum.eighth,
}, {
  text: '十六分音符',
  chronaxie: ChronaxieEnum.sixteenth,
},])
const noteType = ref(false)

// 改变预备音符
function changeNoteHeadChronaxie(chronaxie: ChronaxieEnum) {

}


</script>

<template>

  <div class="noteBoxContainer">
    <div :class="{activeBox:noteHead.chronaxie === item.chronaxie}"
         class="noteBox"
         @click="changeNoteHeadChronaxie(item.chronaxie)"
         v-for="(item,index) in noteList">
      {{ item.text }}
    </div>
  </div>
</template>

<style scoped>
.noteBoxContainer {
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
}

.noteBox {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 12px;
}

.activeBox {
  background-color: #FF7882;
}
</style>