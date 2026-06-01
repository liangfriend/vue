<template>
  <MusicScoreVue :data="musicScoreData" :slot-config="{'g-r':{w:50},'g-l':{w:50}}"
                 skin-name="default"/>
</template>
<script setup lang="ts">
import MusicScoreVue, {MusicScoreTypeEnum, MusicScore, NoteSymbolTypeEnum, BeamTypeEnum} from 'deciphony-renderer';
import data from 'data.ts'

const musicScoreData: MusicScore = {
  id: crypto.randomUUID(),
  type: MusicScoreTypeEnum.StandardStaff,
  topSpaceHeight: 0,
  bpm: 120,
  title: '哈哈哈',
  width: 800,
  height: 100,
  grandStaffs: [{
    id: crypto.randomUUID(),
    staves: [{
      id: crypto.randomUUID(),
      measures: [{
        id: crypto.randomUUID(),
        notes: [{
          id: crypto.randomUUID(),
          type: NoteSymbolTypeEnum.Note,
          notesInfo: [{
            id: crypto.randomUUID(),
            direction: 'up',
            region: 0,
            chronaxie: 64,
            beamType: BeamTypeEnum.None,
            affiliatedSymbols: [],
          }],
          /** 时值 */
          chronaxie: 64,
          widthRatio: 1,
          widthRatioForMeasure: 1,
        }],
        widthRatioForMeasure: 1,
        affiliatedSymbols: [],
      }],
      uSpaceO: 0,
      uSpaceI: 0,
      dSpaceI: 0,
      dSpaceO: 0,
    }],
    uSpace: 0,
    dSpace: 0,
  }],
};

</script>
<style scoped>
.container {
  width: 800px;
  height: 1000px;
}
</style>