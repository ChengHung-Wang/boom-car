import { utilPercentRemaining, utilInterpolate } from "./util.js";
import { track, cars } from "./racer.js";
import { Track } from "./track.js";

export class Camera {
  constructor() {
    this.fieldOfView = 100;
    this.playern = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.drawDistance = 300;
    this.depth = 0;
    this.fogDensity = 25;
    this.yOffset = 740;
    this.zOffset = 700;
  }

  reset() {
    this.depth = 1 / Math.tan(((this.fieldOfView / 2) * Math.PI) / 180);
    this.yOffset = 1740;
    this.zOffset = 1500;
  }

  project(p, cameraXOffset, looped, width, height) {
    let cameraZ = this.z;
    if (looped) {
      cameraZ -= track.getLength();
    }
    const cameraX = this.x + cameraXOffset;

    p.camera.x = (p.world.x || 0) - cameraX;
    p.camera.y = (p.world.y || 0) - this.y;
    p.camera.z = (p.world.z || 0) - cameraZ; //this.z;
    p.screen.scale = this.depth / p.camera.z;

    p.screen.x = Math.round(
      width / 2 + (p.screen.scale * p.camera.x * width) / 2
    );
    p.screen.y = Math.round(
      height / 2 - (p.screen.scale * p.camera.y * height) / 2
    );
  }

  update() {
    this.z = cars[this.playern].z - this.zOffset;
    if (this.z < 0) {
      this.z += track.getLength();
    }

    this.x = cars[this.playern].x + cars[this.playern].width / 2;

    const playerSegment = track.findSegment(cars[this.playern].z);
    const playerPercent = utilPercentRemaining(cars[this.playern].z, Track.segmentLength);

    this.y =
      this.yOffset +
      utilInterpolate(
        playerSegment.p1.world.y,
        playerSegment.p3.world.y,
        playerPercent
      );
  }

  adjust(y, z) {
    this.yOffset = y;
    this.zOffset = z;
  }

  //觀戰視角
  WatchPlayer(n) {
    this.playern = n;
  }
}