<script setup lang="ts">

import {
  deleteMeasure, deleteMultipleStaves, deleteSingleStaff,
  insertMeasure, insertMultipleStaves, insertSingleStaff
} from "@/applications/ChuangKeApplication/views/editor/rightToolsFunction.ts";
import {PropType, UnwrapRef} from "vue";
import {
  Measure,
  MsSymbol,
  MsType,
  MusicScore, MusicScoreRef,
  NoteHead
} from "@/applications/ChuangKeApplication/components/musicScore/types";


const props = defineProps({
  noteHead: {
    type: Object as PropType<NoteHead>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true
  },
  msRef: {
    type: Object as PropType<UnwrapRef<MusicScoreRef>>,
    required: true
  },
})

function handleRightToolsBtn(key: String, noteHead: NoteHead, musicScore: MusicScore) {
  switch (key) {

  }


}
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>