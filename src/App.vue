<script setup lang="ts">
// import * as Tone from "tone";
//
// async function testPlay() {
//   console.log('chicken', 'testPlay')
//   await Tone.start();
//   const synth = new Tone.Synth().toDestination();
//   const part = new Tone.Part((time) => {
//     synth.triggerAttackRelease("C4", "8n", time);
//   }, [{time: 0}]);
//   part.start(0);
//
//   Tone.getTransport().stop();
//   Tone.getTransport().start();
// }
</script>

<template>
  <!--  <button @click="testPlay">测试</button>-->
  <RouterView></RouterView>
</template>

<style scoped></style>
