import { utilPercentRemaining, utilInterpolate, utilIncrease } from "./util.js";
import { racer } from "./racer.js";
import { Track, laneWidth } from './track.js';
import { outlineOnly, width, height, renderSegment } from './render.js';
import { cntx } from "./canvasFunctions.js";
import { DARKGREY } from "./graphics.js";

// the title screen

export class TitleScreen {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
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

    let segment;
    for (let n = 0; n < racer.camera.drawDistance; ++n) {
      segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());
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

    cntx.cntxFillStyle(DARKGREY);
    cntx.cntxFillRect(0, 0, this.canvas.width, this.canvas.height);

    racer.camera.z = utilIncrease(racer.camera.z, dt * 120, racer.track.getLength());
    this.renderRoad();
  }
}