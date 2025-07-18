<script setup lang="ts">

import {
  deleteMeasure, insertBarLine,
  insertClef, insertKeySignature,
  insertMeasure, insertTimeSignature
} from "@/applications/ChuangKeApplication/utils/ms-editFunction.ts";
import {PropType, ref, UnwrapRef} from "vue";
import {
  Measure,
  MusicScore,
  MusicScoreRef,
  TimeSignature
} from "@/applications/ChuangKeApplication/components/musicScore/types";
import {
  addBindingEndId,
  addBindingStartId,
  addSpanSymbol
} from "@/applications/ChuangKeApplication/components/musicScore/utils/changeStructureUtil.ts";
import {spanSymbolTemplate} from "@/applications/ChuangKeApplication/components/musicScore/utils/objectTemplateUtil.ts";
import {
  BarLineTypeEnum,
  ClefEnum, KeySignatureEnum,
  SpanSymbolTypeEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import Clef from "@/applications/ChuangKeApplication/components/musicScore/musicSymbols/clef.vue";


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
    case 'addVolta': {
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
      addSpanSymbol(volta, musicScore)
      break;
    }


  }


}

const currentClef = ref(null)
const clefList = ref([{
  clef: ClefEnum.alto,
  text: '高音谱号',
}, {
  clef: ClefEnum.bass,
  text: '低音谱号',
}])

function changeClef(clef: ClefEnum) {
  insertClef(clef, props.measure, props.musicScore)
}

const currentKeySignature = ref(null)
const keySignatureList = ref([{
  keySignature: KeySignatureEnum.C,
  text: 'C大调',
}, {
  keySignature: KeySignatureEnum.D,
  text: 'D大调',
}])

function changeKeySignature(keySignature: KeySignatureEnum) {
  insertKeySignature(keySignature, props.measure, props.musicScore)
}

function changeBarLine(barLineType: BarLineTypeEnum) {
  insertBarLine(barLineType, props.measure, props.musicScore)
}

function changeTimeSignature() {
  const timeSignature: TimeSignature = {
    beat: currentTimeSignature.value.beat,
    chronaxie: currentTimeSignature.value.chronaxie,
  }
  insertTimeSignature(timeSignature, props.measure, props.musicScore)
}

const currentTimeSignature = ref({
  beat: 1,
  chronaxie: 4
})

const currentBarLineType = ref(null)
const barLineList = ref<Array<{
  barLineType: BarLineTypeEnum,
  text: String,
}>>([{
  barLineType: BarLineTypeEnum.single,
  text: '单小节线',
}, {
  barLineType: BarLineTypeEnum.final,
  text: '结束小节线',
}, {
  barLineType: BarLineTypeEnum.reverseFinal,
  text: '前置结束小节线',
}, {
  barLineType: BarLineTypeEnum.endRepeatSign,
  text: '反复小节线',
}, {
  barLineType: BarLineTypeEnum.startRepeatSign,
  text: '前置反复小节线',
}])
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
    <div>反复</div>
    <el-button @click="handleRightToolsBtn('addVolta',measure,musicScore)"
    >
      添加volta
    </el-button>

    <div>谱号</div>
    <div class="noteBoxContainer">
      <div :class="{activeBox:currentClef === item.clef}"
           @click="changeClef(item.clef)"
           class="noteBox"
           v-for="(item,index) in clefList">
        {{ item.text }}
      </div>
    </div>
    <div>调号</div>
    <div class="noteBoxContainer">
      <div :class="{activeBox:currentKeySignature === item.keySignature}"
           @click="changeKeySignature(item.keySignature)"
           class="noteBox"
           v-for="(item,index) in keySignatureList">
        {{ item.text }}
      </div>
    </div>
    <div>拍号
      <el-button @click="changeTimeSignature">确认</el-button>
    </div>
    <div>
      <div><input type="number" v-model="currentTimeSignature.beat"></div>
      <div><input type="number" v-model="currentTimeSignature.chronaxie"></div>
    </div>
    <div>小节线</div>
    <div class="noteBoxContainer">
      <div :class="{activeBox:currentBarLineType === item.barLineType}"
           class="noteBox"
           :key="index"
           @click="changeBarLine(item.barLineType)"
           v-for="(item,index) in barLineList">
        {{ item.text }}
      </div>
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