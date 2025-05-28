const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "zh-CN";
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

type Callback = (spoken: string) => void
let cb: Callback | null | undefined = null

async function start(callback?: Callback) {
    console.log('获取权限')
    navigator.mediaDevices.getUserMedia({audio: true})

    recognition.start();
    if (callback) {
        cb = callback
    }
}

recognition.onresult = (event: any) => {

    const spoken = event.results[0][0].transcript.trim();
    console.log('识别结果', spoken)
    if (cb) {
        cb(spoken)
    }
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onerror = (event: any) => {
    console.log('识别出错了', event.error)
};

recognition.onnomatch = () => {
    console.log('没听清')
};

interface Listener {
    start: (callback?: Callback) => void

}

const listener: Listener = {
    start
}
export {listener}