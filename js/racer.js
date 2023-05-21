// entry point, set up main loop

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let racing = false;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let getTimestamp = function () {
  return performance.now();
};

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

let now = getTimestamp();
let last = getTimestamp();

let dt = 0;
let gdt = 0;

let cars = []; // array of cars on the road
let player = null;
let camera = new Camera();
let race = new Race();
let track = new Track();
let titleScreen = new TitleScreen(canvas, context);

function startGame(trackNumber) {
  raceAudioInit();
  speak("Start");
  racing = true;
  camera.reset();
  race.start(trackNumber);
}

titleScreen.init();

/*
let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/

function frame() {
  //  stats.begin();
  now = getTimestamp();
  dt = Math.min(1, (now - last) / 1000);
  gdt = gdt + dt;

  if (!racing) {
    titleScreen.render(dt);
    gdt = 0;
  } else {
    outlineOnly = false;

    let step = 1 / 180;
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
