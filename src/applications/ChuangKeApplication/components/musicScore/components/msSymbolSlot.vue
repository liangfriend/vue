<template>
  <div class="msSymbolContainer"
       :style="msSymbolContainerStyle">
    <MsSymbol :measureHeight="measureHeight" :symbol="msSymbol"></MsSymbol>
    <template v-if="msSymbol?.msSymbolArray">
      <MsSymbol :measureHeight="measureHeight" v-for="item in msSymbol.msSymbolArray" :symol="item"></MsSymbol>
    </template>
  </div>


</template>
<script setup lang="ts">
import type {
  Measure,
  MultipleStaves,
  SingleStaff,
  MsSymbol,
} from "@/applications/ChuangKeApplication/components/musicScore/types.d.ts";
import {computed, CSSProperties, onMounted, PropType} from "vue";
import {
  ClefEnum,
  MsSymbolTypeEnum,
  MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import msSymbol from "@/applications/ChuangKeApplication/components/musicScore/components/msSymbol.vue";
import {
  calculationOfStaffRegion
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";

const props = defineProps({
  msSymbol: {
    type: Object as PropType<MsSymbol>,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
  measure: {
    type: Object as PropType<Measure>,
  },
  singleStaff: {
    type: Object as PropType<SingleStaff>,
  },
  multipleStaves: {
    type: Object as PropType<MultipleStaves>,
  }
})

const bottom = computed(() => {
  if (!props.msSymbol) return 0
  switch (props.msSymbol.type) {
    case MsSymbolTypeEnum.NoteHead: {
      if (!props.msSymbol || !props.measure || !props.singleStaff) return 0
      const clef = getClef(props.measure, props.singleStaff, props.msSymbol)
      if (clef) {
        const noteRegion: MusicScoreRegionEnum = calculationOfStaffRegion(clef, msSymbol.musicalAlphabet)
        return staffRegionToBottom(noteRegion, props.measureHeight)
      }
      return 0
    }
    default: {
      return 0
    }

  }


});
const msSymbolContainerStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.measureHeight / 5}px`,
    height: `${props.measureHeight}px`,
    position: 'relative',
    bottom: `${bottom.value}px`,
  }
});

function getClef(measure: Measure, singleStaff: SingleStaff, noteHead: Extract<MsSymbol, {
  type: MsSymbolTypeEnum.NoteHead
}>): ClefEnum | null {


  let clef: ClefEnum | null = null
  // 如果音符上没有clef，就从最近的小节上找
  const measuerIndex = singleStaff.measureArray.indexOf(measure)
  let msSymbolIndex = measure.msSymbolArray.indexOf(noteHead)
  for (let i = measuerIndex; measuerIndex >= 0; i--) {
    for (let j = msSymbolIndex; msSymbolIndex >= 0; j--) {
      const curMsSymbol = singleStaff.measureArray[i].msSymbolArray[j]
      const childMsSymbolArray = singleStaff.measureArray[i].msSymbolArray[j].msSymbolArray
      if (childMsSymbolArray) {
        // 寻找最近的音符上的谱号信息
        for (let k = 0; j < childMsSymbolArray.length; j++) {
          if (childMsSymbolArray[k].type === MsSymbolTypeEnum.Clef) {
            const clefSymbol = childMsSymbolArray[k] as Extract<MsSymbol, { type: MsSymbolTypeEnum.Clef }>
            clef = clefSymbol.clef
            break;
          }
        }
      }
      // 寻找小节上的谱号信息
      if (curMsSymbol.type === MsSymbolTypeEnum.Clef) {
        clef = curMsSymbol.clef
      }
    }
    if (i > 1) {
      msSymbolIndex = singleStaff.measureArray[i - 1].msSymbolArray.length - 1
    }
  }


  return clef
}

function staffRegionToBottom(region: MusicScoreRegionEnum, measureHeight: number): number {
  switch (region) {
    case 'line_1':
      return measureHeight * 9 / 9;
    case 'space_1':
      return measureHeight * 8 / 9;
    case 'line_2':
      return measureHeight * 7 / 9;
    case 'space_2':
      return measureHeight * 6 / 9;
    case 'line_3':
      return measureHeight * 5 / 9;
    case 'space_3':
      return measureHeight * 4 / 9;
    case 'line_4':
      return measureHeight * 3 / 9;
    case 'space_4':
      return measureHeight * 2 / 9;
    case 'line_5':
      return measureHeight * 1 / 9;
    case 'upper_space_1':
      return measureHeight * 2 / 9;
    case 'upper_line_1':
      return measureHeight * 1 / 9;
    case 'upper_space_2':
      return measureHeight * 2 / 9;
    case 'upper_line_2':
      return measureHeight * 1 / 9;
    case 'upper_space_3':
      return measureHeight * 2 / 9;
    case 'upper_line_3':
      return measureHeight * 1 / 9;
    case 'upper_space_4':
      return measureHeight * 2 / 9;
    case 'upper_line_4':
      return measureHeight * 1 / 9;
    case 'upper_space_5':
      return measureHeight * 2 / 9;
    case 'upper_line_5':
      return measureHeight * 1 / 9;
    default:
      return 0;
  }


}
onMounted(() => {
  // 如果是音符头，获取到谱号

})


const mouseDownFn = () => {

};
</script>


<style scoped>

</style>