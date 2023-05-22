import { Track } from "./track.js";
import { Race } from "./race.js";

export const canvas = document.getElementById("gameCanvas");
export const context = canvas.getContext("2d");
export let racing = false;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

export function getTimestamp() {
  return performance.now();
}

export const now = getTimestamp();
export const last = getTimestamp();

export const dt = 0;
export const gdt = 0;

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