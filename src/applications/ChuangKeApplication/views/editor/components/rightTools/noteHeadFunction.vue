<script setup lang="ts">

import {computed, onMounted, PropType, ref, UnwrapRef, watch} from "vue";
import {
  MusicScore,
  MusicScoreRef,
  NoteHead,
  NoteTail
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  ChronaxieEnum, MsSymbolTypeEnum,
  ReserveMsSymbolType
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {msSymbolTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
  changeBeamId,
  noteChronaxie
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";


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
  noteChronaxie(props.noteHead, chronaxie, props.musicScore)
}

function updateBeamId() {
  if (noteTail.value && beamId.value && beamId.value !== -1) {
    changeBeamId(beamId.value, props.noteHead, props.musicScore)
  }
}

watch(() => props.noteHead, () => {
  init()
})

function init() {
  noteTail.value = props.noteHead?.msSymbolArray.find((item) => {
    return item.type === MsSymbolTypeEnum.noteTail
  }) as NoteTail | null

  if (noteTail.value && noteTail.value.beamId !== -1) {
    beamId.value = noteTail.value.beamId
  } else {
    beamId.value = null
  }
}

const beamId = ref<number | null>(null)
const noteTail = ref<NoteTail | null>(null)
onMounted(() => {
  init()
})
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
  <template v-if="![ChronaxieEnum.whole,ChronaxieEnum.half,ChronaxieEnum.quarter]
  .includes(noteHead.chronaxie)">
    <div>
      连音组号
      <el-button @click="updateBeamId">更新</el-button>
    </div>
    <el-input v-model="beamId" type="number"></el-input>
  </template>

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