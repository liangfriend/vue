<script setup lang="ts">

import {computed, PropType, ref, UnwrapRef} from "vue";
import {MusicScore, MusicScoreRef} from "@/applications/ChuangKeApplication/components/musicScore/types";
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
function changeReserveNote(chronaxie: ChronaxieEnum) {
  const note = msSymbolTemplate({type: MsSymbolTypeEnum.noteHead, chronaxie: chronaxie});
  props.msRef?.reserveMsSymbolMap?.set(ReserveMsSymbolType.note, note)
}

// 获取musicScore的预备音符时值
const curReserveNoteChronaxie = computed(() => {
  const noteHead = props.msRef?.reserveMsSymbolMap?.get(ReserveMsSymbolType.note)
  if (noteHead && 'chronaxie' in noteHead) {
    return noteHead.chronaxie
  }
  return null
})
</script>

<template>
  <div>音符
    <el-switch
        v-model="noteType"
        active-color="#13ce66"
        inactive-color="#ff4949">
    </el-switch>
    休止符
  </div>
  <div class="noteBoxContainer">
    <div :class="{activeBox:curReserveNoteChronaxie === item.chronaxie}"
         class="noteBox"
         @click="changeReserveNote(item.chronaxie)"
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