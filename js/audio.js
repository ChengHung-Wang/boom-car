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

function raceAudioSetTurboTime(t) {
  audioTurboSpeed = 1 + t / 10000;
}

function raceAudioInit() {
  if (audioCtx == null) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    raceAudioCreateEngineBuffer();
    raceAudioCreateTurboBuffer();
    raceAudioCreateNoiseBuffer();

    //    drawBuffer(audioTurboData);


    audioScriptNode = audioCtx.createScriptProcessor(1024, 1, 1);
    audioScriptNode.onaudioprocess = function (e) {
      //audioEngineData = audioTurboData;

      let channel = e.outputBuffer.getChannelData(0);
      let index;

      for (let i = 0; i < channel.length; ++i) {
        // skip more data frames on higher speed

        if (player.turbo) {
          audioEngineFrame += audioScriptSpeed + Math.random();
          audioTurboFrame += audioTurboSpeed;
          index = Math.floor(audioTurboFrame) % audioTurboData.length;
          channel[i] = audioTurboData[index];// + Math.random() * 0.2;
          index = Math.floor(audioEngineFrame) % audioEngineData.length;
          channel[i] += audioEngineData[index] + Math.random() * 0.01;

        } else {
          audioEngineFrame += audioScriptSpeed + Math.random() * 1;
          index = Math.floor(audioEngineFrame) % audioEngineData.length;
          channel[i] = audioEngineData[index] + Math.random() * 0.01;
        }

        if (player.slipstreamTime > 0) {
          channel[i] += Math.random() * 0.4;
        }
        //channel[i] += audioEngineData[index] + Math.random() * 0.01;
      }
      audioEngineFrame %= audioEngineData.length;
      audioTurboFrame %= audioTurboData.length;
      //      audioScriptCurrentFrame %= audioEngineData.length;

    }
    audioScriptGain = audioCtx.createGain();
    audioScriptGain.gain.value = 0.14;
    audioScriptNode.connect(audioScriptGain);
    audioScriptGain.connect(audioCtx.destination);
  }
}

function raceAudioCreateTurboBuffer() {
  let bufferSize = 1024;//2 * audioCtx.sampleRate;
  audioTurboData = [];
  let index = 0;

  for (var i = 0; i < bufferSize; i++) {
    //    audioTurboData[i] = Math.random();
    for (let j = 0; j < 12; j++) {
      audioTurboData[index++] = Math.random() * 0.01;
      if (index >= bufferSize) {
        break;
      }
    }

    let v = 0.2;

    if (index < bufferSize) {
      for (let k = 0; k < 2; k++) {
        audioTurboData[index++] = v;

        if (index >= bufferSize) {
          break;
        }
      }
    }
  }
  for (var i = 0; i < bufferSize; i++) {
    audioTurboData[i] += Math.random() * 0.5 - 0.05;// pinkNoise[Math.floor(i/4)];
  }



}
function raceAudioCreateEngineBuffer() {
  let bufferSize = 1024;//2 * audioCtx.sampleRate;
  audioEngineData = [];

  let lastValue = 1;
  //var lastPosition = 0;
  let nextValue, nextPosition;

  let index = 0;
  audioEngineData[index++] = 1;

  for (let i = 0.05; i < 1; i += Math.random() / 8 + 0.01) {
    nextPosition = Math.floor(i * bufferSize);
    nextValue = Math.random() * 2 - 1;
    var positionDiff = nextPosition - (index - 1);
    var step = (nextValue - lastValue) / positionDiff;
    for (var j = 0; j < positionDiff; j++) {
      audioEngineData[index++] = lastValue + step * j;
    }
    lastValue = nextValue;
  }

  positionDiff = bufferSize - (index - 1);
  var step = (1 - lastValue) / positionDiff;
  for (var j = 0; j < positionDiff; j++) {
    audioEngineData[index++] = lastValue + step * j;
  }


}

function raceAudioCreateNoiseBuffer() {

  let bufferSize = 2 * audioCtx.sampleRate;
  noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  let output = noiseBuffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

}

function raceAudioTone(freq, duration) {
  let gain = audioCtx.createGain();

  let osc = audioCtx.createOscillator();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = "triangle";//"sawtooth";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

function raceAudioEngineSpeed(speed) {
  audioScriptSpeed = 0.2 + speed * 2;
}

function raceAudioEngineStop() {
}


let lastCrashTime = 0;
function raceAudioCrash() {

  let crashTime = getTimestamp();
  if (crashTime - lastCrashTime < 1000) {
    return;

  }
  lastCrashTime = crashTime;

  let noteLength = 1 / 2;
  let gain = audioCtx.createGain();

  let audioSource = null;
  audioSource = audioCtx.createBufferSource();
  audioSource.connect(gain);
  gain.connect(audioCtx.destination);

  audioSource.buffer = noiseBuffer;

  gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime);//+ 1/64);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + noteLength * 0.7);

  audioSource.playbackRate.setValueAtTime(0.035, audioCtx.currentTime);
  audioSource.playbackRate.setValueAtTime(0.002, audioCtx.currentTime + noteLength);
  audioSource.start(audioCtx.currentTime);
  audioSource.stop(audioCtx.currentTime + noteLength);
}


function drawBuffer(buffer) {

  let canvas = document.getElementById('debugCanvas');
  let context = canvas.getContext('2d');
  let mult = 200;
  context.strokeStyle = '#dddddd';
  context.beginPath();
  context.moveTo(0, 300 + buffer[0] * mult);

  for (let i = 1; i < buffer.length; i += 2) {
    context.lineTo(i, 300 + buffer[i] * mult);
  }
  context.stroke();

}
