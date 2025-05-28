/* 播放 单例*/
import * as Tone from "tone";

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
const player = () => {

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