import { utilPercentRemaining, utilInterpolate, utilIncrease } from "./util.js";
import { racer } from "./racer.js";
import { Track, laneWidth } from './track.js';
import { outlineOnly, width, height, renderSegment } from './render.js';
import { constants } from './constants.js';
import { cntx } from "./canvasFunctions.js";

// the title screen

export class TitleScreen {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.init();
  }

  init() {
    racer.camera.reset();
    racer.track.buildTrack0();
  }

  keyDown() {
  }

  keyUp() {
  }

  renderRoad() {
    outlineOnly.outlineOnly = true;

    let maxy = height;
    racer.camera.y = 400;
    racer.camera.depth = 0.83909963117728;
    racer.camera.x = 0;

    const baseSegment = racer.track.findSegment(racer.camera.z);
    const cameraPercent = utilPercentRemaining(racer.camera.z, Track.segmentLength);

    racer.camera.y = 500 + utilInterpolate(baseSegment.p1.world.y,
      baseSegment.p3.world.y,
      cameraPercent);

    // const dx = 0;
    for (let n = 0; n < racer.camera.drawDistance; n++) {
      const segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());
      segment.looped = segment.index < baseSegment.index;
      segment.clip = maxy;
      segment.clip = 0;

      racer.camera.project(segment.p1, 0, segment.looped, width, height, laneWidth);
      racer.camera.project(segment.p2, 0, segment.looped, width, height, laneWidth);
      racer.camera.project(segment.p3, 0, segment.looped, width, height, laneWidth);
      racer.camera.project(segment.p4, 0, segment.looped, width, height, laneWidth);



      if ((segment.p1.camera.z <= racer.camera.depth) || // behind us
        (segment.p3.screen.y >= segment.p1.screen.y) || // back face cull
        (segment.p3.screen.y >= maxy))                  // clip by (already rendered) hill
        continue;

      renderSegment(segment);
      maxy = segment.p1.screen.y;
    }

  }

  render(dt) {
    cntx.cntx = this.context;
    // const t = getTimestamp();

    cntx.cntxFillStyle(constants.DARKGREY);
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
    // console.log(racer.camera.z, dt*120, racer.track.getLength());
    racer.camera.z = utilIncrease(racer.camera.z, dt * 120, racer.track.getLength());
    this.renderRoad();
  }
}