import { camera } from './racer2.js'
import { utilPercentRemaining, utilInterpolate, utilIncrease } from "./util.js";
import { getTimestamp, track } from "./racer.js";
import { Track, laneWidth } from './track.js';
import { outlineOnly, width, height, renderSegment } from './render.js';
import { DARKGREY } from './constants.js';
import * as cntx from './canvasFunctions.js'

// the title screen

export class TitleScreen {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.init();
  }

  init() {
    camera.reset();
    track.buildTrack0();
  }

  keyDown(e) {
    // if(e.keyCode === 88) {
    //   startGame();
    // }
  }

  keyUp(e) {

  }

  renderRoad() {
    outlineOnly = true;
    let maxy = height;
    camera.y = 400;
    camera.depth = 0.83909963117728;
    camera.x = 0;

    const baseSegment = track.findSegment(camera.z);
    const cameraPercent = utilPercentRemaining(camera.z, Track.segmentLength);

    camera.y = 500 + utilInterpolate(baseSegment.p1.world.y,
      baseSegment.p3.world.y,
      cameraPercent);

    let n, i, segment, car, spriteX, spriteY;
    // var sprite, spriteScale;
    const dx = 0;
    for (n = 0; n < camera.drawDistance; n++) {
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount());
      segment.looped = segment.index < baseSegment.index;
      segment.clip = maxy;
      segment.clip = 0;

      camera.project(segment.p1, 0, segment.looped, width, height, laneWidth);
      camera.project(segment.p2, 0, segment.looped, width, height, laneWidth);
      camera.project(segment.p3, 0, segment.looped, width, height, laneWidth);
      camera.project(segment.p4, 0, segment.looped, width, height, laneWidth);



      if ((segment.p1.camera.z <= camera.depth) || // behind us
        (segment.p3.screen.y >= segment.p1.screen.y) || // back face cull
        (segment.p3.screen.y >= maxy))                  // clip by (already rendered) hill
        continue;

      renderSegment(segment);
      maxy = segment.p1.screen.y;
    }

  }

  render(dt) {
    cntx.cntx = this.context;
    const t = getTimestamp();

    cntx.cntxFillStyle(DARKGREY);
    cntx.cntxFillRect(0, 0, this.canvas.width, this.canvas.height);
    // for(var i = 0; i < 30; i++) {
    //   var fontSize = 100 + i * 10;
    //   context.font = 'italic ' + fontSize + 'px ' + helvetica;
    //   context.fontStyle = 'italic';
    //   var col = 80 + (i * 4);
    //   col = (col + t / 6) % 200;
    //
    //   if(i == 29) {
    //     col = 255;
    //   }
    //
    //   cntxFillStyle('rgb(' + col + ',' + col + ',' + col + ')');
    //   cntxFillText("racer", (document.documentElement.clientWidth / 2) - i * 11, 300- i);
    // }

    // context.font = '44px ' + helvetica;
    // cntxFillText("Arrow keys to drive, x for Turbo, z for Handbrake", 38, 570);
    // cntxFillText("x To Start", 423, 460);
    // console.log(camera.z, dt*120, track.getLength());
    camera.z = utilIncrease(camera.z, dt * 120, track.getLength());
    this.renderRoad();
  }
}