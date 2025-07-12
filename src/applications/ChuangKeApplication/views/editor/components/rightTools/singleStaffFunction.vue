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
  MusicScoreRef,
  SingleStaff
} from "@/applications/ChuangKeApplication/components/musicScore/types";


const props = defineProps({
  singleStaff: {
    type: Object as PropType<SingleStaff>,
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

function handleRightToolsBtn(key: String, singleStaff: SingleStaff, musicScore: MusicScore) {
  switch (key) {
    case 'insertBefore':
      insertSingleStaff(singleStaff, musicScore, 'before')
      break
    case 'insertAfter':
      insertSingleStaff(singleStaff, musicScore, 'after')
      break
    case 'delete':
      deleteSingleStaff(singleStaff, musicScore)
      break;

  }


}
</script>

<template>
  <div>
    <el-button @click="handleRightToolsBtn('insertBefore',singleStaff,musicScore)"
    >
      向前插入单谱表
    </el-button>
    <el-button @click="handleRightToolsBtn('insertAfter',singleStaff,musicScore)"
    >
      向后插入单谱表
    </el-button>
    <el-button @click="handleRightToolsBtn('delete',singleStaff,musicScore)"
    >
      删除单谱表
    </el-button>
  </div>
</template>

<style scoped>

</style>