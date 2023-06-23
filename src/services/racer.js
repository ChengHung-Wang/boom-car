import {ref} from "vue";
import * as helperPkg from "@/helper/helper"
import {Track} from "./track.js";
import {Race} from "./race.js";
import {Camera} from "./camera.js";
import {TitleScreen} from "./titleScreen.js";
import {raceAudioInit} from "./audio.js";
import {speak} from "./speech.js";
import {outlineOnly} from "./render.js";
import {useGameStore} from "@/stores/game";

// 帶有 ref(<T>) 或 Ref<T> 的東西要取 value 的話就 variable.value 就可以拿到值
export const helper = helperPkg;

export function init() {
    // TODO: 開始渲染遊戲畫面（這個時候 canvas, context 才有東西）
    racer.camera = new Camera();
    racer.race = new Race();
    racer.track = new Track();
    racer.titleScreen = new TitleScreen(racer.canvas.value, racer.context.value);
    racer.titleScreen.init();
    disableScale();
    frame();
}

export function end() {
    racer.track = new Track();
    racer.titleScreen = new TitleScreen(racer.canvas.value, racer.context.value);
    racer.titleScreen.init();
    frame();
}

export const racer = {};

racer.canvas = ref(null);
racer.context = ref(null);
racer.racing = false;

racer.getTimestamp = function () {
    return performance.now();
}

racer.now = racer.getTimestamp();
racer.last = racer.getTimestamp();

racer.dt = 0;
racer.gdt = 0;

racer.cars = ref([]);
racer.player = null;
racer.audioInited = false;

function countDown() {
    (useGameStore()).countdownNumber--
    if ((useGameStore()).countdownNumber === 0) {
        (useGameStore()).showCountdown = false
        return;
    }
    setTimeout(() => {
        countDown()
    }, 1000)
}

racer.startGame = function (trackNumber) {
    speak("Start");
    racer.racing = true;
    racer.camera.reset();
    racer.race.start(trackNumber);

    (useGameStore()).showCountdown = true;
    (useGameStore()).countdownNumber = 6;
    countDown();
}

document.addEventListener("keydown", function (e) {
    if (racer.racing) {
        racer.race.keyDown(e);
    } else {
        // racer.titleScreen.keyDown(e);
    }
});

document.addEventListener("keyup", function (e) {
    if (racer.racing) {
        racer.race.keyUp(e);
    } else {
        // racer.titleScreen.keyUp(e);
    }
});

document.onmousedown = () => {
    raceAudioInit();
    racer.audioInited = true;
}

function frame() {
    racer.now = racer.getTimestamp();
    racer.dt = Math.min(1, (racer.now - racer.last) / 1000);
    racer.gdt = racer.gdt + racer.dt;

    if (!racer.racing) {
        racer.titleScreen.render(racer.dt);
        racer.gdt = 0;
    } else {
        outlineOnly.outlineOnly = false;

        const step = 1 / 180;
        while (racer.gdt > step) {
            racer.gdt = racer.gdt - step;
            racer.race.update(step);
        }

        racer.track.drawOverheadTrack();
        racer.race.render();

        racer.last = racer.now;
    }
    requestAnimationFrame(frame);
}

function disableScale() {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    });
}