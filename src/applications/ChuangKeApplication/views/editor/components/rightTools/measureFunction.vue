<script setup lang="ts">

import {deleteMeasure, insertMeasure} from "@/applications/ChuangKeApplication/views/editor/rightToolsFunction.ts";
import {PropType, UnwrapRef} from "vue";
import {Measure, MusicScore, MusicScoreRef} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  addBindingEndId,
  addBindingStartId,
  addSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {spanSymbolTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {SpanSymbolTypeEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";


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
    case 'addVolta':
      const startTargetId = measure.id
      const endTargetId = measure.id
      const volta = spanSymbolTemplate({
        type: SpanSymbolTypeEnum.volta
        , endTargetId: endTargetId, startTargetId: startTargetId
      })
      if (!volta) return console.error('获取volta数据模版错误，spanSymbol添加失败')

      measure.bindingStartId.push(volta.id)
      addBindingStartId(measure, volta.id)
      addBindingEndId(measure, volta.id)
      addSpanSymbol(musicScore, volta)
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
    反复
    <el-button @click="handleRightToolsBtn('addVolta',measure,musicScore)"
    >
      添加volta
    </el-button>
  </div>
</template>

<style scoped>

</style>