let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let racing = false;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let getTimestamp = function () {
  return performance.now();
};

let now = getTimestamp();
let last = getTimestamp();

let dt = 0;
let gdt = 0;

let cars = []; // array of cars on the road
let player = null;
let race = new Race();
let track = new Track();

/*
let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/
