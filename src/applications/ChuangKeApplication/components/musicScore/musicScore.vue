<template>
  <div class="musicScore stack" :style="musicScoreStyle">
    <div class="stackItem lineLayer" :style="{width:width+'px',height:height+'px'}" comment="谱线层">
      <div v-for="(MultipleStaves,MultipleStavesIndex) in data.multipleStavesArray"
           :key="'MultipleStaves'+MultipleStavesIndex"
           :style="MultipleStavesStyle(MultipleStaves)"
           class="MultipleStaves">
        <div v-for="(singleStaff,singleStaffIndex) in MultipleStaves.singleStaffArray"
             :key="'singleStaff'+singleStaffIndex"
             :style="singleStaffStyle(singleStaff,MultipleStaves)"
             class="singleStaff">
          <measure v-for="(measure,measureIndex) in singleStaff.measureArray"

                   :key="'measure'+measureIndex"
                   :strokeWidth="strokeWidth"
                   :x="measureIndex * measureWidth(measure, singleStaff, MultipleStaves)"
                   :height="measureHeight"
                   :width="measureWidth(measure, singleStaff, MultipleStaves)"></measure>

        </div>
      </div>
    </div>
    <div class="stackItem symbolLayer" :style="{width:width+'px',height:height+'px'}" comment="符号层">
      <div v-for="(MultipleStaves,MultipleStavesIndex) in data.multipleStavesArray"
           :key="'MultipleStaves-symbol'+MultipleStavesIndex"
           :style="MultipleStavesStyle(MultipleStaves)"
           class="MultipleStaves">
        <div v-for="(singleStaff,singleStaffIndex) in MultipleStaves.singleStaffArray"
             :key="'singleStaff-symbol'+singleStaffIndex"
             :style="singleStaffStyle(singleStaff,MultipleStaves)"
             class="singleStaff">
          <div v-for="(measure,measureIndex) in singleStaff.measureArray"
               :style="measureStyle(measure, singleStaff, MultipleStaves)"
               class="measure"
               :key="'measure-symbol'+measureIndex">
            <note
                v-for="(note,noteIndex) in measure.noteArray"
                :key="'note-symbol'+noteIndex"
                :measureHeight="measureHeight"
                :noteTop="noteTop(note)"
                :note="note"></note>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import measure from './measure.vue';
import mockData from './mock.ts';
import {computed, onMounted, onUnmounted, ref} from 'vue';
import note from './note.vue';
import {
  ClefEnum, KeySignatureEnum,
  TimeSignatureEnum
} from './musicScoreEnum.ts';
import {calculateNotePosition} from './utils/musicScoreUtils.ts';
import * as Tone from 'tone';

const props = defineProps({
  width: {
    type: Number,
    default: 1000,
  },
  height: {
    type: Number,
    default: 800,
  },
  //小节高度， 此属性会控制音符，休止符，谱号，拍号等符号大小
  measureHeight: {
    type: Number,
    default: 60
  },
  //单谱表的上下内边距
  singleStaffPadding: {
    type: Number,
    default: 60
  },
  //复谱表的上下内边距
  MultipleStavesPadding: {
    type: Number,
    default: 60
  },
  //小节的线条宽度
  strokeWidth: {
    type: Number,
    default: 1
  },
});
//动态style
//获取一个小节的宽度占比常数
const getMeasureWidthRatioIndex = (measure: Measure) => {
  let fr = 0;
  measure.noteArray.forEach((_note: Note) => {
    fr += 1;
  });
  return fr;
};
//获取一个单谱表下宽度占比常数
const getSingleStaffWidthRatioIndex = (singleStaffStyle: SingleStaff) => {
  let fr = 0;
  const distribution = [];
  singleStaffStyle.measureArray.forEach((measure: Measure) => {
    fr += getMeasureWidthRatioIndex(measure);
    distribution.push(measure);
  });
  return fr;
};

const musicScoreStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    overflow: 'hidden',
  };
});
const MultipleStavesStyle = computed(() => (MultipleStaves: MultipleStaves) => {
  return {
    'grid-template-rows': `repeat(${MultipleStaves.singleStaffArray.length},1fr)`,
    'padding-top': props.MultipleStavesPadding + 'px',
    'padding-bottom': props.MultipleStavesPadding + 'px',
  };
});
const singleStaffStyle = computed(() => (singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  return {
    'grid-template-columns': `repeat(${singleStaff.measureArray.length},1fr)`,
    'padding-top': props.singleStaffPadding + 'px',
    'padding-bottom': props.singleStaffPadding + 'px',
  };
});
const measureWidth = computed(() => (measure: Measure, singleStaff: SingleStaff, _multipleStaves: MultipleStaves) => {
  const totalFr = getSingleStaffWidthRatioIndex(singleStaff);
  const selfFr = getMeasureWidthRatioIndex(measure);
  return props.width * selfFr / totalFr;
});
const measureStyle = computed(() => (measure: Measure, singleStaff: SingleStaff, multipleStaves: MultipleStaves) => {
  let style: any = {};
  style.height = props.measureHeight + 'px';
  style['justify-content'] = 'space-evenly';
  style['grid-auto-flow'] = 'column';
  style.width = measureWidth.value(measure, singleStaff, multipleStaves) + 'px';
  return style;
});

const data = ref(mockData);

// 和selected指令配合，让目标元素高亮
const documentClickHandler = (e: Event) => {
  const el = window.musicScore.selected;
  if (el && !el.contains(e.target)) {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
const keyUpHandler = (e: KeyboardEvent) => {
  const el = window.musicScore.selected;
  if (el && e.key === 'Escape') {
    el.style.outline = ''; // 移除高亮边框
    window.musicScore.selected = null;
  }
};
const positionCalculation = () => {
  let clef: ClefEnum = ClefEnum.g;
  let timeSignature: TimeSignatureEnum = TimeSignatureEnum['4/4'];
  let keySignature: KeySignatureEnum = KeySignatureEnum.c;
  data.value.multipleStavesArray.map((multipleStaves: MultipleStaves) => {
    multipleStaves.singleStaffArray.map((singleStaff: SingleStaff) => {
      singleStaff.measureArray.map((measure: Measure) => {
        measure.timeSignature && (timeSignature = measure.timeSignature);
        measure.keySignature && (keySignature = measure.keySignature);
        measure.noteArray.map(note => {
          note.clef && (clef = note.clef);
          const res = calculateNotePosition(clef, keySignature, note.musicalAlphabet);
          note.position = res[0].position;
        });
      });
    });
  });
};
//noteTop
const noteTop = computed(() => (_note: Note) => {
  // calculateNotePosition();
  //通过measureHeight，谱号，调号，note信息计算出高度
  return 20;
});

const flatNotes = () => {
  const res: Note[] = [];
  data.value.multipleStavesArray.forEach((multipleStaves) => {
    multipleStaves.singleStaffArray.forEach((singleStaff) => {
      singleStaff.measureArray.forEach((measure) => {
        measure.noteArray.forEach((note) => {
          res.push(note);
        });
      });
    });
  });
  return res;
};
let notes = [
  {time: '0', note: 'C4', duration: '1n'},
  {time: '1n', note: 'D4', duration: '1n'},
  // ...其他音符
];
let isPlaying = false;
let startPosition = 0; // 记录开始位置
let scheduledPart: Tone.Part | null = null; // 用于管理动态调度的事件
const synth = new Tone.Synth().toDestination();

//创建序列
function createScheduledPart(startTime = 0) {

  // 清除现有的事件
  if (scheduledPart) {
    scheduledPart.dispose();
  }

  // 创建新的Part实例
  scheduledPart = new Tone.Part((time, value) => {
    synth.triggerAttackRelease(value.note, value.duration, time);
  }, notes);

  // 设置循环（如果需要）
  scheduledPart.loop = false;
  scheduledPart.start(0);
}

//播放功能
const play = () => {

  if (!isPlaying) {
    // 第一次播放
    if (startPosition === 0) {
      createScheduledPart();
    }

    Tone.getTransport().start(0.1, 0);
    isPlaying = true;
  }

};
const pause = () => {
  if (isPlaying) {
    // 立即停止所有音符
    synth.triggerRelease();
    // 记录当前播放位置
    startPosition = Tone.getTransport().seconds;
    // 停止Transport
    Tone.getTransport().pause();
    isPlaying = false;
    if (!scheduledPart) return
    // 清除后续事件
    scheduledPart.cancel(Tone.getTransport().seconds);
  }
};
const resume = () => {

};
const stop = () => {
  synth.triggerRelease();
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  startPosition = 0;
  isPlaying = false;

  // 重置事件
  createScheduledPart();
};
onMounted(() => {
  if (!window.musicScore) {
    window.musicScore = {
      selected: null
    };
  }
  Tone.getTransport().bpm.value = 120;
  positionCalculation();  //计算音符所在五线谱的位置区
  // 通过位置计算高度
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keyup', keyUpHandler);
});
onUnmounted(() => {
  document.removeEventListener('click', documentClickHandler);
  document.removeEventListener('keyup', keyUpHandler);
});
defineExpose({
  play, pause, stop

});
</script>
<style scoped lang="scss" comment="布局">
.stack {
  position: relative;

  > .stackItem {
    position: absolute;
    display: grid;
  }
}
</style>
<style scoped lang="scss">
.lineLayer {
  align-items: start;
}

.symbolLayer {
  align-items: start;
  pointer-events: none;
}

.singleStaff {
  display: grid;
  grid-template-rows: 1fr;
}

.measure {
  display: grid;
}
</style>