import { racer } from "./racer.js";

let audioCtx = null;
let noiseBuffer = null;
let audioScriptNode = null;
let audioScriptGain = null;
let audioEngineFrame = 0;
let audioTurboFrame = 0;
let audioScriptSpeed = 1;
let audioTurboSpeed = 1;

let audioEngineData = [];
let audioTurboData = [];

export function raceAudioSetTurboTime(t) {
  audioTurboSpeed = 1 + t / 10000;
}

export function raceAudioInit() {
  if (audioCtx == null) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    raceAudioCreateEngineBuffer();
    raceAudioCreateTurboBuffer();
    raceAudioCreateNoiseBuffer();

    audioScriptNode = audioCtx.createScriptProcessor(1024, 1, 1);
    audioScriptNode.onaudioprocess = function (e) {
      const channel = e.outputBuffer.getChannelData(0);
      let index;

      for (let i = 0; i < channel.length; ++i) {
        // skip more data frames on higher speed
        if (racer.player.turbo) {
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

        if (racer.player.slipstreamTime > 0) {
          channel[i] += Math.random() * 0.4;
        }
      }
      audioEngineFrame %= audioEngineData.length;
      audioTurboFrame %= audioTurboData.length;
    }
    audioScriptGain = audioCtx.createGain();
    audioScriptGain.gain.value = 0.14;
    audioScriptNode.connect(audioScriptGain);
    audioScriptGain.connect(audioCtx.destination);
  }
}

function raceAudioCreateTurboBuffer() {
  const bufferSize = 1024;
  audioTurboData = [];
  let index = 0;

  for (let i = 0; i < bufferSize; ++i) {
    for (let j = 0; j < 12; j++) {
      audioTurboData[index++] = Math.random() * 0.01;
      if (index >= bufferSize) {
        break;
      }
    }

    const v = 0.2;

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
    audioTurboData[i] += Math.random() * 0.5 - 0.05;
  }
}

function raceAudioCreateEngineBuffer() {
  const bufferSize = 1024;//2 * audioCtx.sampleRate;
  audioEngineData = [];

  let lastValue = 1;
  let nextValue, nextPosition;

  let index = 0;
  audioEngineData[index++] = 1;

  for (let i = 0.05; i < 1; i += Math.random() / 8 + 0.01) {
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
    output[i] = Math.random() * 2 - 1;
  }
}

export function raceAudioTone(freq, duration) {
  const gain = audioCtx.createGain();
  const osc = audioCtx.createOscillator();

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = "triangle";//"sawtooth";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

export function raceAudioEngineSpeed(speed) {
  audioScriptSpeed = 0.2 + speed * 2;
}

let lastCrashTime = 0;
export function raceAudioCrash() {
  const crashTime = racer.getTimestamp();
  if (crashTime - lastCrashTime < 1000) {
    return;
  }
  lastCrashTime = crashTime;

  const noteLength = 1 / 2;
  const gain = audioCtx.createGain();

  let audioSource = null;
  audioSource = audioCtx.createBufferSource();
  audioSource.connect(gain);
  gain.connect(audioCtx.destination);

  audioSource.buffer = noiseBuffer;

  gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + noteLength * 0.7);

  audioSource.playbackRate.setValueAtTime(0.035, audioCtx.currentTime);
  audioSource.playbackRate.setValueAtTime(0.002, audioCtx.currentTime + noteLength);
  audioSource.start(audioCtx.currentTime);
  audioSource.stop(audioCtx.currentTime + noteLength);
}