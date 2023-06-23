import {racer} from "./racer.js";
import {ref} from "vue";
import {useGameStore} from "@/stores/game";

let audioCtx = null;
let noiseBuffer = null;
let audioScriptNode = null;
let audioScriptGain = null;
let audioScriptFxGain = null;
let audioEngineFrame = 0;
let audioTurboFrame = 0;
let audioScriptSpeed = 1;
let audioTurboSpeed = 1;

let audioEngineData = [];
let audioTurboData = [];

const musicList = ref([
    new URL("@/assets/Audio/0-energetic-indie-rock-jump.mp3", import.meta.url),
    new URL("@/assets/Audio/1-music-rock-it.mp3", import.meta.url),
    new URL("@/assets/Audio/2-energetic-rock-trailer.mp3", import.meta.url),
    new URL("@/assets/Audio/3-into-battle.mp3", import.meta.url),
    new URL("@/assets/Audio/4-powerful-dubstep-rocks.mp3", import.meta.url),
    new URL("@/assets/Audio/5-stylish-rock-beat-trailer.mp3", import.meta.url),
    new URL("@/assets/Audio/6-twisted.mp3", import.meta.url)
])

export function raceAudioSetTurboTime(t) {
    audioTurboSpeed = 1 + t / 10000;
}

export function raceAudioInit() {
    if (audioCtx == null) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioScriptGain = audioCtx.createGain();
        audioScriptFxGain = audioCtx.createGain();
        audioScriptGain.gain.value = 0.1;
        audioScriptFxGain.gain.value = 0.01;
        audioScriptGain.connect(audioCtx.destination);
        audioScriptFxGain.connect(audioCtx.destination);

        raceAudioCreateEngineBuffer();
        raceAudioCreateTurboBuffer();
        raceAudioCreateNoiseBuffer();

        audioScriptNode = audioCtx.createScriptProcessor(1024, 1, 1);
        audioScriptNode.onaudioprocess = function (e) {
            const channel = e.outputBuffer.getChannelData(0);
            let index;

            for (let i = 0; i < channel.length; ++i) {
                // skip more data frames on higher speed
                if (racer.player && racer.player.turbo) {
                    audioEngineFrame += audioScriptSpeed + Math.random();
                    audioTurboFrame += audioTurboSpeed;
                    index = Math.floor(audioTurboFrame) % audioTurboData.length;
                    channel[i] = audioTurboData[index];
                    index = Math.floor(audioEngineFrame) % audioEngineData.length;
                    channel[i] += audioEngineData[index] + Math.random() * 0.01;
                } else {
                    audioEngineFrame += audioScriptSpeed + Math.random() * 1;
                    index = Math.floor(audioEngineFrame) % audioEngineData.length;
                    channel[i] = audioEngineData[index] + Math.random() * 0.01;
                }

                if (racer.player && racer.player.slipstreamTime > 0) {
                    channel[i] += Math.random() * 0.4;
                }
            }
            audioEngineFrame %= audioEngineData.length;
            audioTurboFrame %= audioTurboData.length;
        }
        audioScriptNode.connect(audioScriptFxGain);
    }
    document.onmousedown = clickSoundFx;
}

export async function clickSoundFx(e) {
    const targetElement = String(e.target.nodeName).toLowerCase();
    console.log(targetElement);
    if (targetElement !== "button" && targetElement !== "input") return;
    const url = new URL("@/assets/Audio/button-click.mp3", import.meta.url);
    const audio = new Audio(url);
    await audio.play();
}

export async function backgroundMusic(start, lobby = false) {
    const store = useGameStore();
    let url;
    if (lobby) {
        url = musicList.value[0];
    } else {
        url = musicList.value[Math.floor(Math.random() * 5 + 1)];
    }
    store.bgmPlayer.setAttribute("src", url.toString());
    store.bgmPlayer.volume = 0.03;

    if (start) {
        await (useGameStore()).bgmPlayer.play();
    } else {
        (useGameStore()).bgmPlayer.pause();
        (useGameStore()).bgmPlayer.currentTime = 0;
    }

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'boom car',
            artist: '王正宏、楊芷安、吳丰荏、許誠恩、廖宣瑜、簡呈翰、李哲宇',
            album: '花錢的凱子一條龍',
            artwork: [
                {
                  src: new URL("@/assets/picture/an.png", import.meta.url),
                  sizes: '640x640',
                  type: 'image/png'
                },
            ]
        });
    }
}

function raceAudioCreateTurboBuffer() {
    const bufferSize = 1024;
    audioTurboData = [];
    let index = 0;

    for (let i = 0; i < bufferSize; ++i) {
        for (let j = 0; j < 12; j++) {
            audioTurboData[index++] = Math.random() * 0.002;
            if (index >= bufferSize) {
                break;
            }
        }

        const v = 0.01;

        if (index < bufferSize) {
            for (let k = 0; k < 2; ++k) {
                audioTurboData[index++] = v;
                if (index >= bufferSize) {
                    break;
                }
            }
        }
    }

    for (let i = 0; i < bufferSize; ++i) {
        audioTurboData[i] += Math.random() * 0.1 - 0.05;
    }
}

function raceAudioCreateEngineBuffer() {
    const bufferSize = 1024;
    audioEngineData = [];

    let lastValue = 0.5;
    let nextValue, nextPosition;

    let index = 0;
    audioEngineData[index++] = 0.5;

    for (let i = 0.05; i < 0.1; i += Math.random() / 8 + 0.01) {
        nextPosition = Math.floor(i * bufferSize);
        nextValue = Math.random() * 2 - 1;
        const positionDiff = nextPosition - (index - 1);
        const step = (nextValue - lastValue) / positionDiff;
        for (let j = 0; j < positionDiff; ++j) {
            audioEngineData[index++] = lastValue + step * j;
        }
        lastValue = nextValue;
    }

    const positionDiff = bufferSize - (index - 1);
    const step = (1 - lastValue) / positionDiff;
    for (let j = 0; j < positionDiff; ++j) {
        audioEngineData[index++] = lastValue + step * j;
    }
}

function raceAudioCreateNoiseBuffer() {
    const bufferSize = 2 * audioCtx.sampleRate;
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; ++i) {
        output[i] = Math.random() * 1.2 - 1;
    }
}

export function raceAudioTone(freq, duration) {
    const osc = audioCtx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    osc.connect(audioScriptFxGain);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
}

export function raceAudioEngineSpeed(speed) {
    audioScriptSpeed = 0.2 + speed * 1.1;
}

let lastCrashTime = 0;

export function raceAudioCrash() {
    const crashTime = racer.getTimestamp();
    if (crashTime - lastCrashTime < 1000) {
        return;
    }
    lastCrashTime = crashTime;

    const noteLength = 1 / 2;

    let audioSource = audioCtx.createBufferSource();
    audioSource.connect(audioScriptFxGain);
    audioScriptFxGain.connect(audioCtx.destination);

    audioSource.buffer = noiseBuffer;

    audioScriptFxGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime);
    audioScriptFxGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + noteLength * 0.7);

    audioSource.playbackRate.setValueAtTime(0.035, audioCtx.currentTime);
    audioSource.playbackRate.setValueAtTime(0.002, audioCtx.currentTime + noteLength);
    audioSource.start(audioCtx.currentTime);
    audioSource.stop(audioCtx.currentTime + noteLength);
}