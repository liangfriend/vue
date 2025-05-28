const synth = window.speechSynthesis;

let voices: SpeechSynthesisVoice[] = [];

voices = synth.getVoices();

interface SpeechOption {
    text: string,
    rate?: number,
    pitch?: number
}

let utterThis: SpeechSynthesisUtterance | null = null

function initSpeaker(option: SpeechOption, lang = 'zh-CN') {
    utterThis = new SpeechSynthesisUtterance(option.text);
    const voice = voices.find(voice => voice.lang === lang)
    if (voice) {
        utterThis.voice = voice
    }
    if (option.pitch) {
        utterThis.pitch = option.pitch;

    }
    if (option.rate) {
        utterThis.rate = option.rate;

    }

}

function speak() {
    console.log(1)
    if (utterThis) {
        console.log(2)
        synth.speak(utterThis);
    } else {
        console.error('SpeechSynthesisUtterance没有初始化')
    }
}

function stop() {
    console.log("被执行了")
    if (utterThis) {
        synth.cancel()
    } else {
        console.log('speaker没有在说话')
    }
}

interface Speaker {
    speak: () => void,
    stop: () => void,
    initSpeaker: (option: SpeechOption, lang?: string) => void
}

const speaker: Speaker = {
    speak,
    stop,
    initSpeaker
}

export {speaker}