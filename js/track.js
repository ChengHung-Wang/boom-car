import { context, canvas, cars } from "./racer.js";
import * as mathFunc from "./mathFunctions.js";
import * as cntx from "./canvasFunctions.js";
import * as constants from "./constants.js";
import * as graphics from "./graphics.js";

// define the tracks in the game
export const COLORS_KERBLIGHT = "#a02222";
export const COLORS_KERBDARK = "#BBBBBB";
export let COLORS_LANDLIGHT = "#000000";
export let COLORS_LANDDARK = "#000000";
export let COLORS_ROAD = "#000000";

export const laneWidth = 1200;

export class Track {
  constructor() {
    this.trackLength = 0;
    this.currentAngle = 0;

    this.segments = [];
    this.map = null;
  }

  static segmentLength = 300;

  buildTrack0() {
    constants.COLORS_FOG = 0;

    this.segments = [];
    this.addStraight(200);
    this.calculateLength();
  }

  createStreetLights() {
    const segmentCount = this.getSegmentCount();

    for (let i = 0; i < segmentCount; i++) {
      const segment = this.segments[i];

      if (i % 20 == 0) {
        let x = segment.p1.world.x;
        segment.sprites.push({
          source: graphics.SPRITES_STREETLIGHTLEFT,
          s: 12,
          x: x - 12 * graphics.SPRITES_STREETLIGHTLEFT.w + 700,
        });

        x = segment.p2.world.x;
        segment.sprites.push({
          source: graphics.SPRITES_STREETLIGHTRIGHT,
          s: 12,
          x: x - 700,
        });
      }
    }
  }

  createRoadsideObjects(objs, prob, scale, offset, turnSigns) {
    const segmentCount = this.getSegmentCount();
    let turnSegment = 0;
    for (let i = 0; i < segmentCount; i++) {
      const segment = this.segments[i];
      const r = mathFunc.mathRand();
      if (segment.curve != 0 && turnSigns) {
        if (turnSegment % 20 == 0) {
          if (segment.curve > 0) {
            const x = segment.p1.world.x;
            segment.sprites.push({
              source: graphics.SPRITES_TURNRIGHT,
              s: 3,
              x: x - 3 * graphics.SPRITES_TURNRIGHT.w - 400,
            });
          } else {
            const x = segment.p2.world.x;
            segment.sprites.push({
              source: graphics.SPRITES_TURNLEFT,
              s: 3,
              x: x + 400,
            });
          }
        }
        turnSegment++;
      } else {
        turnSegment = 0;
        //      if(segment.curve == 0 || !turnSigns) {
        const obj = objs[mathFunc.mathRandInt(objs.length)];
        if (r > prob) {
          let x = segment.p1.world.x;

          segment.sprites.push({
            source: obj,
            s: scale,
            x: x - (scale * obj.w) / 2 - offset,
          });

          x = segment.p2.world.x;
          segment.sprites.push({
            source: obj,
            s: scale,
            x: x - (scale * obj.w) / 2 + offset,
          });
        }
      }
    }
  }

  buildTrack1() {
    COLORS_ROAD = "#3a3a3a";

    COLORS_LANDLIGHT = "#047804";
    COLORS_LANDDARK = "#006A00";

    constants.COLORS_LANEMARKER = constants.MEDIUMGREY;
    constants.COLORS_FOG = 0;

    graphics.resetGraphics();
    graphics.createTurnArrows();
    graphics.createTrees();
    graphics.createBackgroundTrees();
    graphics.createBackgroundMountains();
    graphics.createCars();

    this.addStraight(50); // len, height
    this.addEasyCurve90(1, 0);
    this.addRoad(50, 50, 39, 0, 40, 0);

    this.addEasyCurve90(1, 0);

    this.addStraight(25);

    this.addEasyCurve30(-1, 0);
    this.addEasyCurve30(1, 0);

    this.addHill(50, 40);

    this.addEasyCurve90(1, 0);

    this.addEasyCurve30(-1, 0);
    this.addEasyCurve30(1, 0);

    this.addEasyCurve90(1, -40);

    this.addStraight(50, -40);
    this.addStraight(55, 0);

    this.calculateLength();
    this.drawMap();

    this.createRoadsideObjects(graphics.SPRITES_TREES, 0.9, 10, 900, true);
  }

  buildTrack2() {
    COLORS_ROAD = "#3a3a3a";

    COLORS_LANDLIGHT = "#047804";
    COLORS_LANDDARK = "#006A00";
    constants.COLORS_LANEMARKER = constants.MEDIUMGREY;
    constants.COLORS_FOG = 0;

    graphics.resetGraphics();
    graphics.createCars();
    graphics.createTurnArrows();
    graphics.createTrees();
    graphics.createBackgroundTrees();
    graphics.createBackgroundMountains();
    graphics.createFlowers();

    this.addStraight(20);
    this.addStraight(46, 0);
    this.addEasyCurve90(1, 30);

    this.addStraight(90, 0);
    this.addMediumCurve90(1, 0);

    this.addStraight(25, 0);
    this.addMediumCurve90(1, 50);
    this.addStraight(25, 0);

    this.addMediumCurve90(-1, 0);
    this.addStraight(68, -50);

    this.addMediumCurve90(-1, 0);
    this.addMediumCurve90(1, 0);
    this.addMediumCurve90(1, 0);
    this.addStraight(48, 0);

    this.addEasyCurve90(1, -30);
    this.addStraight(38, 0);

    this.addEasyCurve30(-1, 0);
    this.addEasyCurve30(1, 0);

    this.calculateLength();
    this.drawMap();

    this.createRoadsideObjects([graphics.SPRITES_FLOWERS], 0.3, 6, 1300, true);
  }

  buildTrack3() {
    COLORS_ROAD = "#3a3a3a";

    COLORS_LANDLIGHT = "#5a5a5a";
    COLORS_LANDDARK = "#626262";

    constants.COLORS_LANEMARKER = constants.MEDIUMGREY;
    constants.COLORS_FOG = 0; //'#eeeeee';

    graphics.resetGraphics();
    graphics.createCars();
    graphics.createBuildings(false);
    graphics.createStreetlights(false);
    graphics.createBackgroundBuildings(false);
    graphics.createNightSky();

    this.addStraight(100);
    this.addMediumCurve90(1, 0);
    this.addStraight(151, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(30, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(80, 0);
    this.addMediumCurve90(-1, 0);
    this.addMediumCurve90(-1, 0);

    this.addStraight(20, 0);
    this.addMediumCurve90(1, 0);
    this.addStraight(10, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(50, 0);
    this.addMediumCurve90(-1, 0);
    this.addMediumCurve90(1, 0);
    this.addMediumCurve90(1, 0);
    this.addStraight(62, 0);

    this.calculateLength();
    this.drawMap();
    this.createRoadsideObjects(graphics.SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    this.createStreetLights();
  }

  buildTrack4() {
    COLORS_ROAD = "#111111";
    constants.COLORS_LANEMARKER = "#555555";
    constants.COLORS_FOG = "#000000";
    COLORS_LANDLIGHT = "#090909";
    COLORS_LANDDARK = "#030303";

    graphics.resetGraphics();
    graphics.createCars();
    graphics.createBuildings(true);
    // createTurnArrows();
    graphics.createStreetlights(true);
    graphics.createBackgroundBuildings(true);
    // createBackgroundMountains();
    graphics.createNightSky();

    this.addStraight(100);
    this.addHardCurve180(1, 0);
    this.addHardCurve90(-1, 0);
    this.addStraight(40, 0);
    this.addHardCurve90(1, 0);
    this.addHardCurve90(-1, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(50, 0);
    this.addMediumCurve90(-1, 0);
    this.addStraight(20, 0);
    this.addMediumCurve90(1, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(60, 0);
    this.addMediumCurve90(-1, 0);
    this.addMediumCurve90(1, 0);
    this.addStraight(51, 0);
    this.addHardCurve90(1, 0);
    this.addStraight(110, 0);
    this.calculateLength();
    this.drawMap();

    this.createRoadsideObjects(graphics.SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    this.createStreetLights();
  }

  lastY() {
    return this.segments.length == 0
      ? 0
      : this.segments[this.segments.length - 1].p3.world.y;
  }

  getSegment(index) {
    return this.segments[index];
  }

  getSegmentCount() {
    return this.segments.length;
  }

  getLength() {
    return this.trackLength;
  }

  calculateLength() {
    this.trackLength = this.segments.length * Track.segmentLength;
  }

  addSegment(curve, y) {
    const n = this.segments.length;

    const yFront = this.lastY();
    const yBack = y;
    const zFront = n * Track.segmentLength;
    const zBack = (n + 1) * Track.segmentLength;
    const xLeft = -laneWidth;
    const xRight = laneWidth;

    let kerbWidth = 0;
    if (curve != 0) {
      kerbWidth = curve * 40;
      if (kerbWidth < 0) {
        kerbWidth = -kerbWidth;
      }
      kerbWidth += 60;
    }
    this.segments.push({
      index: n,
      p1: { world: { x: xLeft, y: yFront, z: zFront }, camera: {}, screen: {} },
      p2: {
        world: { x: xRight, y: yFront, z: zFront },
        camera: {},
        screen: {},
      },
      p3: { world: { x: xRight, y: yBack, z: zBack }, camera: {}, screen: {} },
      p4: { world: { x: xLeft, y: yBack, z: zBack }, camera: {}, screen: {} },
      curve: curve,
      kerbWidth: kerbWidth,
      sprites: [],
      cars: [],
    });
  }

  easeIn(a, b, percent) {
    return a + (b - a) * Math.pow(percent, 2);
  }

  easeOut(a, b, percent) {
    return a + (b - a) * (1 - Math.pow(1 - percent, 2));
  }

  easeInOut(a, b, percent) {
    return a + (b - a) * (-Math.cos(percent * Math.PI) / 2 + 0.5);
  }

  addRoad(enter, hold, leave, curve, y, curveAngle) {
    curveAngle = curveAngle || 0;
    const exitAngle = this.currentAngle + curveAngle;

    const startY = this.lastY();
    const endY = startY + Math.floor(y) * Track.segmentLength;
    const total = enter + hold + leave;
    let segmentCurve = 0;
    let totalCurve = 0;
    const firstSegment = this.segments.length;
    for (let n = 0; n < enter; n++) {
      segmentCurve = this.easeIn(0, curve, n / enter);
      totalCurve += segmentCurve;
      this.addSegment(segmentCurve, this.easeInOut(startY, endY, n / total));
    }
    for (let n = 0; n < hold; n++) {
      segmentCurve = curve;
      totalCurve += segmentCurve;
      this.addSegment(curve, this.easeInOut(startY, endY, (enter + n) / total));
    }
    for (let n = 0; n < leave; n++) {
      segmentCurve = this.easeInOut(curve, 0, n / leave);
      totalCurve += segmentCurve;
      this.addSegment(
        segmentCurve,
        this.easeInOut(startY, endY, (enter + hold + n) / total)
      );
    }

    let anglePerCurve = 0;
    if (totalCurve != 0) {
      anglePerCurve = (exitAngle - this.currentAngle) / totalCurve;
    }

    // fix the angles
    for (let i = firstSegment; i < this.segments.length; i++) {
      this.currentAngle += this.segments[i].curve * anglePerCurve;
      this.segments[i].angle = this.currentAngle;
    }

    this.currentAngle = exitAngle;
    this.segments[this.segments.length - 1].angle = exitAngle;
  }

  addStraight(len, height) {
    height = height || 0;
    this.addRoad(len, len, len, 0, height, 0);
  }

  addBumps() {
    this.addRoad(10, 10, 10, 0, 5);
    this.addRoad(10, 10, 10, 0, -2);
    this.addRoad(10, 10, 10, 0, -5);
    this.addRoad(10, 10, 10, 0, 8);
    this.addRoad(10, 10, 10, 0, 5);
    this.addRoad(10, 10, 10, 0, -7);
    this.addRoad(10, 10, 10, 0, 5);
    this.addRoad(10, 10, 10, 0, -2);
  }

  addEasyCurve90(direction, height) {
    this.addRoad(25, 100 * 1.4, 25, direction * 4.25, height, direction * 90);
  }

  addEasyCurve30(direction, height) {
    this.addRoad(25, 50, 25, direction * 4.25, height, direction * 30);
  }

  addMediumCurve90(direction, height) {
    this.addRoad(
      25,
      50 * 1.5,
      25,
      direction * 6 * 0.96,
      height,
      direction * 90
    );
  }

  addHardCurve90(direction) {
    //7.5
    this.addRoad(18, 50 * 0.8, 18, direction * 8, 0, direction * 90);
  }

  addHardCurve180() {
    this.addRoad(50, 50, 50, 7.5, 0, 180);
  }

  addHill(num, height) {
    this.addRoad(num, num, num, 0, height, 0);
  }

  addRoadsideObject(n, sprite, offset) {
    const segment = this.segments[n];
    let x = 0;
    if (offset < 0) {
      x = segment.p1.world.x - 600;
    } else {
      x = segment.p2.world.x + 600;
    }
    segment.sprites.push({ source: sprite, x: x });
  }

  findSegment(z) {
    return this.segments[
      Math.floor(z / Track.segmentLength) % this.segments.length
    ];
  }

  drawMap() {
    if (this.map == null) {
      this.map = document.createElement("canvas");
    }
    this.map.width = 600;
    this.map.height = 600;
    cntx.cntx = this.map.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    //    context.fillStyle = '#222222';
    //    context.fillRect(0, 0, width, height);
    cntx.cntxClearRect(600, 600);
    cntx.cntxStrokeStyle("#666666");
    cntx.cntx.lineWidth = 5;

    let angle = 0;
    let x = 300;
    let y = 30;

    cntx.cntxBeginPath();
    let segmentDrawLength = 0.5;
    cntx.cntxMoveTo(x, y);
    for (let i = 0; i < this.segments.length; i++) {
      angle = (this.segments[i].angle / 180) * mathFunc.PI;
      x += segmentDrawLength * mathFunc.cos(angle);
      y += segmentDrawLength * mathFunc.sin(angle);
      cntx.cntxLineTo(x, y);
      // in 2d overhead view
      this.segments[i].x = x;
      this.segments[i].y = y;
    }

    cntx.cntxStroke();

    cntx.cntxStrokeStyle(constants.LIGHTGREY);
    cntx.cntx.lineWidth = 4;
    cntx.cntxStroke();

    // draw the start line
    segmentDrawLength = 4;
    context.lineWidth = 3;
    cntx.cntxStrokeStyle(constants.LIGHTGREY);
    cntx.cntxBeginPath();
    angle = ((this.segments[0].angle + 90) / 180) * mathFunc.PI;
    x -= segmentDrawLength * mathFunc.cos(angle);
    y -= segmentDrawLength * mathFunc.sin(angle);
    cntx.cntxMoveTo(x, y);
    x += 2 * segmentDrawLength * mathFunc.cos(angle);
    y += 2 * segmentDrawLength * mathFunc.sin(angle);
    cntx.cntxLineTo(x, y);

    cntx.cntxStroke();
  }

  drawOverheadTrack() {
    //let canvas = document.getElementById('trackCanvas');
    cntx.cntx = graphics.overheadTrack.x; //canvas.getContext('2d');
    this.overheadMap = graphics.overheadTrack.c;

    cntx.cntxClearRect(600, 600);
    cntx.cntxDrawImage(this.map, 0, 0, 600, 600, 0, 0, 600, 600);

    // opponents
    for (let i = 0; i < cars.length; i++) {
      const carPosition = cars[i].z;
      const segment = this.findSegment(carPosition);

      cntx.cntxBeginPath();

      cntx.cntxArc(segment.x, segment.y, 5, 0, 2 * mathFunc.PI, false);
      cntx.cntxFillStyle(constants.DARKGREY);
      cntx.cntxFill();
      cntx.cntx.lineWidth = 2;
      cntx.cntxStrokeStyle("#999999");
      cntx.cntxStroke();
    }

    // camera z position plus player z position from camera
    //小地圖紅點
    const playerPosition = cars[PlayerIndex].z;
    const playerSegment = this.findSegment(playerPosition);

    cntx.cntxBeginPath();
    cntx.cntxArc(playerSegment.x, playerSegment.y, 5, 0, 2 * mathFunc.PI, false);
    cntx.cntxFillStyle("#ff0000");
    cntx.cntxFill();

    context.lineWidth = 2;
    cntx.cntxStrokeStyle(constants.MEDIUMGREY);
    cntx.cntxStroke();
  }
}