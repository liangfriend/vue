<script setup lang="ts">

import {
  deleteMeasure, deleteMultipleStaves, deleteSingleStaff,
  insertMeasure, insertMultipleStaves, insertSingleStaff
} from "@/applications/ChuangKeApplication/views/editor/rightToolsFunction.ts";
import {PropType, UnwrapRef} from "vue";
import {
  Measure,
  MsType,
  MusicScore,
  MusicScoreRef
} from "@/applications/ChuangKeApplication/components/musicScore/types";


const props = defineProps({
  measure: {
    type: Object as PropType<Measure>,
    required: true
  },
  musicScore: {
    type: Object as PropType<MusicScore>,
    required: true
  },
  msRef: {
    type: Object as PropType<UnwrapRef<MusicScoreRef>>,
  },
})

function handleRightToolsBtn(key: String, measure: Measure, musicScore: MusicScore) {
  switch (key) {
    case 'insertBefore':
      insertMeasure(measure, musicScore, 'before')
      break
    case 'insertAfter':
      insertMeasure(measure, musicScore, 'after')
      break
    case 'delete':
      deleteMeasure(measure, musicScore)
      break;

  }


}
</script>

<template>
  <div>
    <el-button @click="handleRightToolsBtn('insertBefore',measure,musicScore)"
    >
      向前插入小节
    </el-button>
    <el-button @click="handleRightToolsBtn('insertAfter',measure,musicScore)"
    >
      向后插入小节
    </el-button>
    <el-button @click="handleRightToolsBtn('delete',measure,musicScore)"
    >
      删除小节
    </el-button>
  </div>
</template>

<style scoped>

</style>