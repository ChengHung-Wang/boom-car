import { Track } from "./track.js";
import { Race } from "./race.js";
import { Camera } from "./camera.js";
import { TitleScreen } from "./titleScreen.js";
import { raceAudioInit } from "./audio.js";
import { speak } from "./speech.js";
import { outlineOnly } from "./render.js";

export const canvas = document.getElementById("gameCanvas");
export const context = canvas.getContext("2d");
export let racing = false;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

export function getTimestamp() {
  return performance.now();
}

export let now = getTimestamp();
export let last = getTimestamp();

export let dt = 0;
export let gdt = 0;

export const cars = []; // array of cars on the road
export const player = null;
export const race = new Race();
export const track = new Track();

/*
let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/

export const camera = new Camera();

export const titleScreen = new TitleScreen(canvas, context);

export function startGame(trackNumber) {
  raceAudioInit();
  speak("Start");
  racing = true;
  camera.reset();
  race.start(trackNumber);
}

document.addEventListener("keydown", function (e) {
  if (racing) {
    race.keyDown(e);
  } else {
    titleScreen.keyDown(e);
  }
});

document.addEventListener("keyup", function (e) {
  if (racing) {
    race.keyUp(e);
  } else {
    titleScreen.keyUp(e);
  }
});

function frame() {
  //  stats.begin();
  now = getTimestamp();
  dt = Math.min(1, (now - last) / 1000);
  gdt = gdt + dt;
  //
  if (!racing) {
    titleScreen.render(dt);
    gdt = 0;
  }
  else {
    outlineOnly = false;

    const step = 1 / 180;
    while (gdt > step) {
      gdt = gdt - step;
      race.update(step);
    }

    track.drawOverheadTrack();
    race.render();

    last = now;
  }
  requestAnimationFrame(frame);
  //  stats.end();
}

frame();