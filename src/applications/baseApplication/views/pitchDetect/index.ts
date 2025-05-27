// pitch-detect.ts

// ========== 类型定义 ==========
interface DetectRes {
    pitch: string,
    frequency: number
}

type DetectCallback = (res: DetectRes) => void

// ========== 全局变量 ==========
let curFrequent = 0

let audioContext: AudioContext  // 音频上下文
let analyser: AnalyserNode  // 音频分析器
let dataArray: Float32Array  // 音频数据
let source: MediaStreamAudioSourceNode  // 音频源
let animationFrameId: number
let detectCallback: DetectCallback

// ========== 自动相关法计算频率 ==========
function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    const SIZE = buffer.length
    let rms = 0

    for (let i = 0; i < SIZE; i++) {
        rms += buffer[i] * buffer[i]
    }
    rms = Math.sqrt(rms / SIZE)
    if (rms < 0.01) return -1 // 静音判定

    // 去掉前后无声音的数据
    let r1 = 0, r2 = SIZE - 1, threshold = 0.2
    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i
            break
        }
    }
    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i
            break
        }
    }
    // 计算自相关函数：对波形与自身的延迟版本进行点乘。某个延迟值 i（即 T）使得值最大时，说明信号有周期性，i 就是一个周期。
    buffer = buffer.slice(r1, r2)
    const newSize = buffer.length
    const c = new Array(newSize).fill(0)
    for (let i = 0; i < newSize; i++) {
        for (let j = 0; j < newSize - i; j++) {
            c[i] += buffer[j] * buffer[j + i]
        }
    }

    //  获取周期样本数
    let d = 0
    while (c[d] > c[d + 1]) d++
    let maxval = -1, maxpos = -1
    for (let i = d; i < newSize; i++) {
        if (c[i] > maxval) {
            maxval = c[i]
            maxpos = i
        }
    }

    if (maxpos === -1) return -1

    const T0 = maxpos
    return sampleRate / T0 //  频率 = 采样率 / 周期样本数
}

// ========== 频率转音名 ==========
function frequencyToNote(frequency: number): string {
    if (frequency < 20 || frequency > 5000) return ''

    const A4 = 440
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const noteNumber = Math.round(12 * Math.log2(frequency / A4)) + 69
    const noteIndex = noteNumber % 12
    const octave = Math.floor(noteNumber / 12) - 1
    return `${noteNames[noteIndex]}${octave}`
}

// ========== 音高检测主循环 ==========
function detectPitch() {
    analyser.getFloatTimeDomainData(dataArray)
    const frequency = autoCorrelate(dataArray, audioContext.sampleRate)
    if (frequency !== -1) {
        curFrequent = frequency
    }

    const result: DetectRes = {
        pitch: frequencyToNote(curFrequent),
        frequency: curFrequent
    }

    detectCallback?.(result)
    animationFrameId = requestAnimationFrame(detectPitch)
}

// ========== 开始检测 ==========
async function startDetect(cb: DetectCallback) {
    detectCallback = cb
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        audioContext = new AudioContext()
        analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048

        const bufferLength = analyser.fftSize
        dataArray = new Float32Array(bufferLength)

        source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        detectPitch()
    } catch (e) {
        console.error('获取麦克风失败:', e)
    }
}

// ========== 停止检测 ==========
function dispose() {
    cancelAnimationFrame(animationFrameId)
    audioContext?.close()
}

const pitchDetect = {startDetect, dispose, frequencyToNote, autoCorrelate}

export default pitchDetect