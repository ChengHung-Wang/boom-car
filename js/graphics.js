import { cntx } from "./canvasFunctions.js"
import * as mathFunc from "./mathFunctions.js";

// constants
const SCRATCHWIDTH = 600;
const SCRATCHHEIGHT = 600;
const SPRITESWIDTH = 2400;
const SPRITESHEIGHT = 2400;
const BACKGROUNDLAYERWIDTH = 600;
const BACKGROUNDLAYERHEIGHT = 600;
const OVERHEADTRACKWIDTH = 600;
const OVERHEADTRACKHEIGHT = 600;
const scratchCanvas = createCanvas(SCRATCHWIDTH, SCRATCHHEIGHT);
const sprites = createCanvas(SPRITESWIDTH, SPRITESHEIGHT);
export const spritesCanvas = sprites.c;
const spritesContext = sprites.x;
export const backgroundLayer3 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
export const backgroundLayer2 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
export const backgroundLayer1 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
export const overheadTrack = createCanvas(OVERHEADTRACKWIDTH, OVERHEADTRACKHEIGHT);
export let SPRITES_STREETLIGHTLEFT = 0;
export let SPRITES_STREETLIGHTRIGHT = 0;
export let SPRITES_CARLEFT = 0;
export let SPRITES_CARRIGHT = 0;
export let SPRITES_CARSTRAIGHT = 0;
export let SPRITES_TURNLEFT = 0;
export let SPRITES_TURNRIGHT = 0;
export let SPRITES_FLOWERS = 0;
let SPRITES_BUILDINGS = [];

export const COLORS_FOG = {};
COLORS_FOG.COLORS_FOG = 0;

export const DARKGREY = "#333333";
export const MEDIUMGREY = "cccccc";
export const LIGHTGREY = "e5e5e5";

function eraseScratch() {
  scratchCanvas.x.clearRect(0, 0, SCRATCHWIDTH, SCRATCHHEIGHT);
}

function createCanvas(width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const x = c.getContext("2d");
  return { c: c, x: x };
}

let spriteDstX = 0;
let spriteDstY = 0;
let spriteMaxRowHeight = 0;

export function resetGraphics() {
  spriteDstX = 0;
  spriteDstY = 0;
  spriteMaxRowHeight = 0;

  spritesContext.clearRect(0, 0, SPRITESWIDTH, SPRITESHEIGHT);

  backgroundLayer1.x.clearRect(
    0,
    0,
    BACKGROUNDLAYERWIDTH,
    BACKGROUNDLAYERHEIGHT
  );
  backgroundLayer2.x.clearRect(
    0,
    0,
    BACKGROUNDLAYERWIDTH,
    BACKGROUNDLAYERHEIGHT
  );
  backgroundLayer3.x.clearRect(
    0,
    0,
    BACKGROUNDLAYERWIDTH,
    BACKGROUNDLAYERHEIGHT
  );
}


export function drawFuzzyCircle(x, y, r, c) {
  let angle = 0;
  cntx.cntxFillStyle(c);
  let radius = r + r * mathFunc.mathRand();
  cntx.cntxBeginPath();
  cntx.cntxMoveTo(x + radius * mathFunc.cos(angle), y + radius * mathFunc.sin(angle));
  for (let i = 1; i < 30; ++i) {
    angle = i * mathFunc.PI * 2 / 30;
    radius = r + r * mathFunc.mathRand();
    cntx.cntxLineTo(x + radius * mathFunc.cos(angle), y + radius * mathFunc.sin(angle));
  }
  cntx.cntxClosePath();
  cntx.cntxFill();
}

function getScratchSpriteBounds() {
  // get the bounds
  const data = scratchCanvas.x.getImageData(
    0,
    0,
    scratchCanvas.c.width,
    scratchCanvas.c.height
  );
  // get image data for canvas
  const buffer32 = new Uint32Array(data.data.buffer); // get a 32-bit representation

  const w = scratchCanvas.c.width;
  const h = scratchCanvas.c.height;
  let x1 = w;
  let y1 = h;
  let x2 = 0;
  let y2 = 0;
  // get left edge

  for (let testY = 0; testY < h; ++testY) {
    // line by line
    for (let testX = 0; testX < w; ++testX) {
      // 0 to width
      if (buffer32[testX + testY * w] > 0) {
        // non-transparent pixel?
        if (testX < x1) {
          x1 = testX;
        }
        if (testX > x2) {
          x2 = testX;
        }
        if (testY < y1) {
          y1 = testY;
        }
        if (testY > y2) {
          y2 = testY;
        }
      }
    }
  }

  // work out collision box for bottom 100 pixels.
  let collisionYStart = y2 - 50;
  if (collisionYStart < 0) {
    collisionYStart = 0;
  }
  let cx1 = w,
    cx2 = 0;
  for (let testY = collisionYStart; testY < y2; ++testY) {
    for (let testX = 0; testX < w; ++testX) {
      if (buffer32[testX + testY * w] > 0) {
        // non-transparent pixel?
        if (testX < cx1) {
          cx1 = testX;
        }
        if (testX > cx2) {
          cx2 = testX;
        }
      }
    }
  }

  return {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    cx: cx1 - x1,
    cw: cx2 - cx1,
  };
}

// create a sprite from the scratch canvas, put into new sprites
function newSprite(flipH) {
  const fh = flipH || 0;

  // get the bounds
  const bounds = getScratchSpriteBounds();

  if (spriteDstX + bounds.w > SPRITESWIDTH) {
    // need to go to next line
    spriteDstX = 0;
    spriteDstY += spriteMaxRowHeight;
    spriteMaxRowHeight = 0;
  }
  if (bounds.h > spriteMaxRowHeight) {
    spriteMaxRowHeight = bounds.h;
  }

  spritesContext.save();
  let dstX = spriteDstX;

  if (fh) {
    spritesContext.scale(-1, 1);
    dstX = -spriteDstX - bounds.w;
    bounds.cx = bounds.w - bounds.cx - bounds.cw;
  }

  spritesContext.drawImage(
    scratchCanvas.c,
    bounds.x,
    bounds.y,
    bounds.w,
    bounds.h,
    dstX,
    spriteDstY,
    bounds.w,
    bounds.h
  );
  spritesContext.restore();

  const result = {
    x: spriteDstX,
    y: spriteDstY,
    w: bounds.w,
    h: bounds.h,
    cx: bounds.cx,
    cw: bounds.cw,
  };
  spriteDstX += bounds.w + 5;

  return result;
}

// ***************** TURN ARROWS ******************** //
export function createTurnArrows() {
  cntx.cntx = scratchCanvas.x;
  eraseScratch();

  cntx.cntxFillStyle("#996644");
  cntx.cntxFillRect(0, 0, 200, 200);

  cntx.cntxFillStyle("#996644");
  cntx.cntxFillRect(10, 200, 10, 10);

  cntx.cntxFillStyle("#996644");
  cntx.cntxFillRect(180, 200, 10, 10);

  cntx.cntxFillStyle(MEDIUMGREY);
  cntx.cntxFillRect(10, 10, 180, 180);
  cntx.cntxBeginPath();
  cntx.cntxMoveTo(20, 100);
  cntx.cntxLineTo(160, 30);
  cntx.cntxLineTo(160, 170);
  cntx.cntxLineTo(20, 100);
  cntx.cntxFillStyle("#cc2211");
  cntx.cntxFill();

  cntx.cntxFillStyle(MEDIUMGREY);
  cntx.cntxFillRect(10, 10, 20, 180);

  SPRITES_TURNLEFT = newSprite();
  SPRITES_TURNRIGHT = newSprite(1);
}

// ***************** BACKGROUND TREES ******************** //
function smallTree(width, slope) {
  const points = [];
  let y = 0;
  let index = 1;
  points[index++] = 0;
  for (let i = 0; i < width; ++i) {
    y = y + mathFunc.mathRand() * slope;
    points[index++] = y;
  }

  while (y > 0) {
    y = y - mathFunc.mathRand() * slope;
    points[index++] = y;
  }

  return points;
}

export function createBackgroundTrees() {
  cntx.cntx = backgroundLayer1.x;

  // draw the points
  let colours = ["#114433", "#114e33", "#115433", "#113433", "#114433"];

  let sx = 0;
  for (let j = 0; j < 4; ++j) {
    let x = sx;
    const width = 10 + 40 * mathFunc.mathRand();

    for (let i = 0; i < width; i++) {
      const terPoints = smallTree(8, 7);
      const colour = mathFunc.mathRandInt(colours.length);
      cntx.cntxFillStyle(colours[colour]);
      cntx.cntxBeginPath();
      cntx.cntxMoveTo(x, 240 - terPoints[0]);
      for (let t = 1; t < terPoints.length; ++t) {
        cntx.cntxLineTo(x + t, 240 - terPoints[t]);
      }
      // finish creating the rect so we can fill it
      cntx.cntxClosePath();
      cntx.cntxFill();

      x += 2 + mathFunc.mathRand() * 4;
    }

    colours = ["#226639", "#115e33", "#316433", "#215433", "#114433"];

    x = sx;
    for (let i = 0; i < width; i++) {
      // get the points
      const terPoints = smallTree(4, 4);
      const colour = mathFunc.mathRandInt(colours.length);
      cntx.cntxFillStyle(colours[colour]);
      cntx.cntxBeginPath();
      cntx.cntxMoveTo(x, 240 - terPoints[0]);
      for (let t = 1; t < terPoints.length; ++t) {
        cntx.cntxLineTo(x + t, 240 - terPoints[t]);
      }
      cntx.cntxClosePath();
      cntx.cntxFill();
      x += 2 + mathFunc.mathRand() * 5;
    }

    sx = x + 50 + mathFunc.mathRand() * 180;
  }
}

// **** BACKGROUND MOUNTAIN RANGE ******** //
function terrain(startX) {
  cntx.cntx = backgroundLayer2.x;

  const points = [];
  const highlightpoints = [];
  const highlightpoints2 = [];
  const highlightBackpoints2 = [];
  let y = 0;
  let index = 0;
  let multiplier = 1;

  multiplier = 0.1 + 3 * mathFunc.mathRand();
  let across = 5 + 8 * mathFunc.mathRand();
  for (let i = 0; i < 100; ++i) {
    y = y + mathFunc.mathRand() * multiplier;
    points[index] = y;
    highlightpoints[index] = y;
    index++;
    multiplier += 0.01;
  }

  for (let i = 0; i < across; i++) {
    y = y + (0.4 - mathFunc.mathRand()) * 2;
    highlightpoints[index] = y;
    points[index++] = y;
  }

  const highlightBackpoints = [];
  let highlightY = y;
  while (highlightY > 0) {
    highlightY -= mathFunc.mathRand() * 5;
    highlightBackpoints.push(highlightY);
  }

  across = (mathFunc.mathRand() > 0.6 ? 160 : 20) * mathFunc.mathRand();

  for (let i = 0; i < across; ++i) {
    y = y + (0.4 - mathFunc.mathRand()) * 2;
    points[index++] = y;
  }

  while (y > 0) {
    y = y - mathFunc.mathRand() * multiplier;
    points[index++] = y;
    multiplier -= 0.003;
    if (multiplier < 0) {
      multiplier = 0.03;
    }
  }

  for (let i = 0; i < highlightpoints.length - 20; ++i) {
    highlightY = highlightpoints[i] + mathFunc.mathRand();
    highlightpoints2.push(highlightY);
  }

  for (let i = 0; i < highlightpoints2.length - 10; ++i) {
    highlightY -= mathFunc.mathRand() * 2;
    highlightBackpoints2.push(highlightY);
  }

  const heightOffset = 260;

  let x = startX;
  cntx.cntxFillStyle("#114433");
  cntx.cntxBeginPath();
  cntx.cntxMoveTo(x, heightOffset - points[0]);
  for (let t = 1; t < points.length; ++t) {
    cntx.cntxLineTo(x + t, heightOffset - points[t]);
  }
  cntx.cntxClosePath();
  cntx.cntxFill();

  x = startX;
  cntx.cntxFillStyle("#224a33");
  cntx.cntxBeginPath();
  cntx.cntxMoveTo(x, heightOffset - highlightpoints[0]);
  for (let t = 1; t < highlightpoints.length; t++) {
    cntx.cntxLineTo(x, heightOffset - highlightpoints[t]);
    x++;
  }

  for (let t = 1; t < highlightBackpoints.length; ++t) {
    cntx.cntxLineTo(x, heightOffset - highlightBackpoints[t]);
    if (mathFunc.mathRand() > 0.4) {
      x--;
    }
  }
  cntx.cntxClosePath();
  cntx.cntxFill();

  // highlight 2
  x = startX + 4;
  cntx.cntxFillStyle("#335a3a");
  cntx.cntxBeginPath();
  cntx.cntxMoveTo(x, heightOffset - highlightpoints2[0]);
  for (let t = 1; t < highlightpoints2.length; ++t) {
    cntx.cntxLineTo(x, heightOffset - highlightpoints2[t]);
    x++;
  }

  for (let t = 1; t < highlightBackpoints2.length; t++) {
    cntx.cntxLineTo(x, heightOffset - highlightBackpoints2[t]);
    if (mathFunc.mathRand() > 0.8) {
      x++;
    } else if (mathFunc.mathRand() > 0.1) {
      x--;
    }
  }

  cntx.cntxClosePath();
  cntx.cntxFill();

  return points;
}

export function createBackgroundMountains() {
  let x = 0;
  for (let i = 0; i < 20; ++i) {
    terrain(x);
    x += 3 + mathFunc.mathRand() * 100;
  }
}

// *********   TREES *********** //
const tree = {
  leavesColor: "",

  draw: function () {
    cntx.cntxTranslate(500 / 2, 500);
    this.leavesColor =
      "#" + (0x1000000 + mathFunc.mathRand() * 0xffffff).toString(16).substr(1, 6);
    cntx.cntx.lineWidth = 1 + mathFunc.mathRand() * 20;
    cntx.cntx.lineJoin = "round";

    this.branch(0);
  },

  branch: function (depth) {
    if (depth < 12) {
      cntx.cntxBeginPath();
      cntx.cntxMoveTo(0, 0);
      cntx.cntxLineTo(0, -500 / 10);

      cntx.cntxStroke();

      cntx.cntxTranslate(0, -500 / 10);
      const randomN = -(mathFunc.mathRand() * 0.1) + 0.1;
      cntx.cntxRotate(randomN);

      if (mathFunc.mathRand() * 1 < 0.6) {
        cntx.cntxRotate(-0.35);
        cntx.cntx.scale(0.7, 0.7);
        cntx.cntxSave();
        this.branch(depth + 1);
        cntx.cntxRestore();
        cntx.cntxRotate(0.6);
        cntx.cntxSave();
        this.branch(depth + 1);
        cntx.cntxRestore();
      } else {
        this.branch(depth);
      }
    } else {
      cntx.cntxFillStyle(this.leavesColor);
      cntx.cntxFillRect(0, 0, 500, 200);
      cntx.cntxStroke();
    }
  },
};

export let SPRITES_TREES = [];
export function createTrees() {
  SPRITES_TREES = [];

  // NOT OK : SPRITES_TREES (track.js)
  for (let ti = 0; ti < 6; ++ti) {
    let treeOK = false;
    let c = 0;
    while (!treeOK) {
      cntx.cntx = scratchCanvas.x;
      scratchCanvas.x.save();
      eraseScratch();
      tree.draw();
      const bounds = getScratchSpriteBounds();
      treeOK = (bounds.w < 300 && bounds.h < 400) || c > 5;
      scratchCanvas.x.restore();
      c++;
    }
    SPRITES_TREES[ti] = newSprite();
  }
}

// ***************** BACKGROUND BUILDINGS ******************** //
function backgroundBuilding(x, type, buildingColor, windowColor) {
  cntx.cntx = backgroundLayer1.x;

  let buildingHeight = 30;
  let buildingWidth = 20;

  const windowSpacing = 2;
  let windowWidth = 1;
  let windowHeight = 1;
  let windowColumns = 4;
  let windowRows = 8;

  if (type == 1) {
    windowWidth = 2;
    windowHeight = 2;
    windowColumns = 3;
    windowRows = 10;
    buildingHeight = 40;
    buildingWidth = 25;
  } else if (type == 2) {
    windowWidth = 4;
    windowColumns = 2;
    windowRows = 6;
    buildingHeight = 20;
    buildingWidth = 18;
  }

  const yOffset = 260;

  buildingHeight += 30 * mathFunc.mathRand();
  cntx.cntxFillStyle(buildingColor);
  cntx.cntxFillRect(x, yOffset - buildingHeight, buildingWidth, buildingHeight);

  if (mathFunc.mathRand() < 0.4) {
    const inset = 5;
    const insetHeight = 8;
    cntx.cntxFillRect(
      x + inset,
      yOffset - (buildingHeight + insetHeight),
      buildingWidth - 2 * inset,
      buildingHeight + insetHeight
    );
  }

  if (mathFunc.mathRand() < 0.2) {
    const inset = 5;
    const insetHeight = 13;
    const insetWidth = 2;

    cntx.cntxFillRect(
      x + inset,
      yOffset - (buildingHeight + insetHeight),
      insetWidth,
      buildingHeight + insetHeight
    );
  }

  for (let row = 0; row < windowRows; ++row) {
    const wy = windowSpacing + row * (windowHeight + windowSpacing);
    for (let col = 0; col < windowColumns; ++col) {
      const wx = windowSpacing + col * (windowWidth + windowSpacing);
      cntx.cntxFillStyle(windowColor);
      cntx.cntxFillRect(
        x + wx,
        yOffset - buildingHeight + wy,
        windowWidth,
        windowHeight
      );
    }
  }
}

export function createBackgroundBuildings(night) {
  let buildingColor = night ? "#060606" : "#777799";
  let windowColor = night ? "#929156" : "#9999ee";

  for (let i = 0, x = 0; i < 80; ++i) {
    const n = mathFunc.mathRand();
    if (n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if (n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathFunc.mathRand() * 30;
  }

  buildingColor = night ? "#101010" : "#9999aa";
  windowColor = night ? "#929156" : "#aaaaee";
  for (let i = 0, x = 0; i < 80; i++) {
    const n = mathFunc.mathRand();
    if (n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if (n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathFunc.mathRand() * 30;
  }
}

// ------------ building     --------------
export function createBuildings(night) {
  SPRITES_BUILDINGS = [];
  for (let ti = 0; ti < 4; ++ti) {
    eraseScratch();
    cntx.cntx = scratchCanvas.x;
    const grey = night ? 10 + mathFunc.mathRand() * 20 : 100 + mathFunc.mathRand() * 80;

    cntx.cntxFillStyle("rgb(" + grey + "," + grey + "," + grey + ")");
    cntx.cntxFillRect(0, 30, 240, 500);

    const windowWidth = 24;
    const windowHeight = 15;
    const windowStartOffset = 8;
    const windowSpacingH = 8;
    const windowSpacingV = 10;

    for (let row = 0; row < 18; row++) {
      const y = 30 + windowStartOffset + row * (windowHeight + windowSpacingV);
      for (let col = 0; col < 7; col++) {
        const x = windowStartOffset + col * (windowWidth + windowSpacingH);

        if (night) {
          if (mathFunc.mathRand() > 0.7) {
            cntx.cntxFillStyle("#ffffec");
            cntx.cntxFillRect(x, y, windowWidth, windowHeight);
            cntx.cntxFillStyle("#bbbb88");
            cntx.cntxFillRect(
              x,
              y + windowHeight / 2,
              windowWidth,
              windowHeight / 2
            );
          } else {
            cntx.cntxFillStyle("#112237");
            cntx.cntxFillRect(x, y, windowWidth, windowHeight);
            cntx.cntxFillStyle("#111a30");
            cntx.cntxFillRect(
              x,
              y + windowHeight / 2,
              windowWidth,
              windowHeight / 2
            );
          }
        } else {
          cntx.cntxFillStyle("#5555a7");
          cntx.cntxFillRect(x, y, windowWidth, windowHeight);
          cntx.cntxFillStyle("#444495");
          cntx.cntxFillRect(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
        }
      }
    }
    SPRITES_BUILDINGS[ti] = newSprite();
  }
}

// ***************** STREET LIGHTS ******************** //
export function createStreetlights(night) {
  cntx.cntx = scratchCanvas.x;
  eraseScratch();
  cntx.cntxSave();

  night ? cntx.cntxFillStyle("#555555") : cntx.cntxFillStyle("#999999");

  const poleWidth = 7;

  cntx.cntxFillRect(40, 150, poleWidth, 300);
  cntx.cntxBeginPath();
  cntx.cntxArc(70, 150, 30, mathFunc.PI, -mathFunc.PI / 2);
  cntx.cntxLineTo(70, 150 - 30 + poleWidth);
  cntx.cntxArc(70, 150, 30 - poleWidth, -mathFunc.PI / 2, mathFunc.PI, true);
  cntx.cntxLineTo(70 - 30, 150);
  cntx.cntxFill();

  cntx.cntxFillRect(70, 150 - 30, 70, poleWidth);
  cntx.cntxFillRect(130, 150 - 30 - 1, 35, 6);

  night ? cntx.cntxFillStyle("#777777") : cntx.cntxFillStyle("#aaaaaa");

  cntx.cntxFillRect(40 + poleWidth - 4, 150, 2, 300);
  cntx.cntxFillRect(70, 150 - 30 + poleWidth - 4, 70, 2);

  cntx.cntxBeginPath();
  cntx.cntxArc(70, 150, 30 - poleWidth + 4, mathFunc.PI, -mathFunc.PI / 2);
  cntx.cntxLineTo(70, 150 - 30 + poleWidth);
  cntx.cntxArc(70, 150, 30 - poleWidth, -mathFunc.PI / 2, mathFunc.PI, true);
  cntx.cntxLineTo(70 - 30, 150);
  cntx.cntxFill();

  night ? cntx.cntxFillStyle("#999999") : cntx.cntxFillStyle("#aaaaaa");

  cntx.cntxFillRect(40 + poleWidth - 2, 150, 2, 300);
  cntx.cntxFillRect(70, 150 - 30 + poleWidth - 2, 70, 2);

  cntx.cntxBeginPath();
  cntx.cntxArc(70, 150, 30 - poleWidth + 2, mathFunc.PI, -mathFunc.PI / 2);
  cntx.cntxLineTo(70, 150 - 30 + poleWidth);
  cntx.cntxArc(70, 150, 30 - poleWidth, -mathFunc.PI / 2, mathFunc.PI, true);
  cntx.cntxLineTo(70 - 30, 150);
  cntx.cntxFill();

  if (night) {
    cntx.cntx.filter = "blur(2px)";
  }

  cntx.cntxFillStyle("#ffffff");
  cntx.cntxFillRect(128, 150 - 30 + 4, 38, 12);

  if (night) {
    cntx.cntxGlobalAlpha(0.8);
    cntx.cntx.globalCompositeOperation = "lighter";

    cntx.cntx.filter = "blur(4px)";
    cntx.cntxFillRect(123, 150 - 30 + 3, 44, 18);
    cntx.cntxGlobalAlpha(1);
  }

  SPRITES_STREETLIGHTLEFT = newSprite();
  SPRITES_STREETLIGHTRIGHT = newSprite(1);
  cntx.cntxRestore();
}

export function createNightSky() {
  const xMax = BACKGROUNDLAYERWIDTH;
  const yMax = BACKGROUNDLAYERHEIGHT;
  cntx.cntx = backgroundLayer3.x;

  const gradient = cntx.cntxCreateLinearGradient(0, 0, 0, yMax);
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#033d5e");

  cntx.cntxFillStyle(gradient);
  cntx.cntxFillRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);

  const hmTimes = Math.round(xMax + yMax);
  for (let i = 0; i <= hmTimes; ++i) {
    const randomX = mathFunc.mathRandInt(xMax);
    const randomY = mathFunc.mathRandInt(yMax);
    const randomSize = mathFunc.mathRandInt(2) + 1;
    const randomOpacityOne = mathFunc.mathRandInt(9) + 1;
    const randomOpacityTwo = mathFunc.mathRandInt(9) + 1;
    const randomHue = mathFunc.mathRandInt(360);
    if (randomSize > 1) {
      cntx.cntx.shadowBlur = mathFunc.mathRandInt(15) + 5;
      cntx.cntx.shadowColor = "white";
    }
    cntx.cntxFillStyle(
      "hsla(" +
      randomHue +
      ", 30%, 80%, ." +
      randomOpacityOne +
      randomOpacityTwo +
      ")"
    );
    cntx.cntxFillRect(randomX, randomY, randomSize, randomSize);
  }
}

function createLeaf(s) {
  cntx.cntxFillStyle(s);
  cntx.cntxBeginPath();

  cntx.cntxArc(3, 7, 3, mathFunc.PI / 2, mathFunc.PI);
  cntx.cntxArc(10, 7, 10, mathFunc.PI, mathFunc.PI * 1.24);
  cntx.cntxArc(-4.7, 7, 10, mathFunc.PI * 1.76, 0);
  cntx.cntxArc(2.3, 7, 3, 0, mathFunc.PI / 2);
  cntx.cntxFill();
}

export function createFlowers() {
  eraseScratch();
  cntx.cntx = scratchCanvas.x;
  const canvas = scratchCanvas.c;
  cntx.cntx.save();

  const leafGradient = cntx.cntxCreateLinearGradient(0, 0, 0, 8);
  leafGradient.addColorStop(0, "#ff111e");
  leafGradient.addColorStop(1, "#aa3d5e");

  createLeaf(leafGradient);

  cntx.cntx.translate(0, 20);
  cntx.createLeaf(leafGradient);

  cntx.cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.cntx.translate(0, 20);
  createLeaf("#44aa55");
  cntx.cntx.restore();

  let y = 100;
  for (let j = 0; j < 2; ++j) {
    let x = 30;
    for (let i = 0; i < 60; i++) {
      x += 4 + 6 * mathFunc.mathRand();

      if (x > 780) {
        continue;
      }

      const height = 20 + 4 * mathFunc.mathRand();
      y = 100 + j * 16 - height + mathFunc.mathRand() * 12;
      // draw the stem
      if (mathFunc.mathRand() > 0.5) {
        cntx.cntxFillStyle("#44aa55");
        cntx.cntxFillRect(x, y, 2, height);
        cntx.cntxFillStyle("#66cc88");
        cntx.cntxFillRect(x, y, 1, height);
      } else {
        cntx.cntxFillStyle("#449955");
        cntx.cntxFillRect(x, y, 2, height);
        cntx.cntxFillStyle("#66aa88");
        cntx.cntxFillRect(x, y, 1, height);
      }

      const flower = mathFunc.mathRandInt(2) * 20;

      const dstX = x - 2;
      const dstY = y - 6;
      cntx.cntxSave();
      cntx.cntxTranslate(dstX + 3, dstY);
      cntx.cntxRotate(0.3);
      cntx.cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntx.cntxRestore();

      cntx.cntxSave();
      cntx.cntxTranslate(dstX - 3, dstY + 1);
      cntx.cntxRotate(-0.3);
      cntx.cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntx.cntxRestore();

      cntx.cntxSave();
      cntx.cntxTranslate(dstX, dstY);
      cntx.cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntx.cntxRestore();

      cntx.cntxSave();
      cntx.cntxTranslate(dstX + 6, dstY + 10);
      cntx.cntxRotate(0.6); //Math.random() * Math.PI * 2);
      cntx.cntxDrawImage(canvas, 0, 60, 6, 11, 0, 0, 6, 11);
      cntx.cntxRestore();
    }
  }

  cntx.cntx.clearRect(0, 0, 22, 300);
  SPRITES_FLOWERS = newSprite();
}

function fillPoints(points, color) {
  cntx.cntxBeginPath();
  cntx.cntxFillStyle(color);
  cntx.cntxMoveTo(points[0], points[1]);
  for (let i = 2; i < points.length; i += 2) {
    cntx.cntxLineTo(points[i], points[i + 1]);
  }
  cntx.cntxClosePath();
  cntx.cntxFill();
}

function createCar() {
  eraseScratch();
  cntx.cntx = scratchCanvas.x;

  // car tyre
  let points = [8, 194, 11, 206, 14, 214, 18, 216, 41, 215, 46, 213, 47, 205];
  fillPoints(points, DARKGREY);

  // car tyre
  points = [227, 193, 230, 200, 241, 204, 258, 203, 265, 197, 268, 191];
  fillPoints(points, DARKGREY);

  // car body
  points = [
    5, 192, 25, 206, 296, 190, 302, 164, 298, 149, 296, 145, 292, 111, 289, 103,
    294, 101, 294, 91, 297, 84, 263, 72, 208, 14, 167, 2, 66, 3, 45, 7, 8, 55,
    5, 65, 7, 88, 2, 97, 1, 151,
  ];
  fillPoints(points, "#ffffff");

  // car body
  points = [
    25, 206, 296, 190, 302, 164, 298, 149, 296, 145, 292, 111, 289, 103,
    294, 101, 294, 91, 297, 84,
    17, 93, 22, 122,
    20, 162,
    20, 170, 2, 145, 3, 160, 6, 187,
  ];
  fillPoints(points, "#ffffff");

  points = [20, 108, 294, 96, 296, 89, 19, 98];
  fillPoints(points, "#226d7d");

  points = [21, 162, 296, 149, 292, 112, 22, 122];
  fillPoints(points, "#226d7d");

  // windscreen
  points = [42, 86, 260, 79, 208, 21, 60, 24];
  const gradient = cntx.cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  fillPoints(points, gradient);

  points = [
    51, 62, 238, 57, 253, 76, 196, 67, 159, 64, 125, 66, 81, 72, 45, 82,
  ];
  fillPoints(points, "#95eef7");

  // windscreen
  points = [27, 83, 33, 77, 46, 27, 21, 70];
  fillPoints(points, "#4773dd");

  // windscreen
  points = [19, 61, 46, 17, 43, 12, 19, 51];
  fillPoints(points, "#4773dd");

  // windscreen
  points = [3, 99, 10, 113, 18, 120, 17, 106, 11, 86, 5, 91];
  fillPoints(points, "#ffd47e");

  // tail light
  points = [21, 127, 19, 145, 20, 158, 106, 153, 105, 124];
  fillPoints(points, "#b44258");

  // tail light
  points = [20, 158, 106, 153, 105, 142, 19, 146];
  fillPoints(points, "#5d2959");

  // tail light
  points = [217, 120, 218, 149, 296, 145, 296, 134, 293, 116];
  fillPoints(points, "#b44258");

  // tail light
  points = [218, 149, 296, 145, 296, 133, 218, 137];
  fillPoints(points, "#5d2959");

  // strip under lights
  points = [21, 173, 300, 159, 299, 149, 21, 162];
  fillPoints(points, "#bbbbbb");

  SPRITES_CARLEFT = newSprite(0);
  SPRITES_CARRIGHT = newSprite(1);
}

function createCar2() {
  eraseScratch();
  cntx.cntx = scratchCanvas.x;

  // car body bottom
  let points = [5, 197, 143, 197, 141, 87, 1, 87, 4, 106, 1, 121, 1, 180];
  fillPoints(points, "#ffffff");

  //car body top
  points = [141, 87, 143, 1, 87, 3, 72, 6, 61, 17, 31, 67, 1, 87];
  fillPoints(points, "#ffffff");

  // boot stripe
  points = [4, 100, 143, 100, 143, 93, 3, 93];
  fillPoints(points, "#226d7d");

  // tail green stripe
  points = [4, 155, 143, 155, 143, 113, 4, 113];
  fillPoints(points, "#dddddd");

  // tail light
  points = [4, 150, 86, 149, 86, 121, 5, 121, 3, 139];
  fillPoints(points, "#b44258");

  points = [4, 149, 86, 149, 86, 138, 4, 138];
  fillPoints(points, "#5d2959");

  // tail light
  points = [22, 131, 22, 134, 73, 134, 73, 131];
  fillPoints(points, "#d65d5b");

  // windscreen
  points = [32, 82, 143, 82, 143, 19, 66, 19];
  const gradient = cntx.cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");
  fillPoints(points, gradient);

  points = [47, 59, 143, 59, 143, 64, 78, 68, 38, 77];
  fillPoints(points, "#95eef7");

  // wheel
  points = [13, 197, 16, 205, 23, 208, 49, 207, 56, 202, 58, 197];
  fillPoints(points, DARKGREY);

  // strip under lights
  points = [1, 155, 1, 167, 143, 167, 143, 155];
  fillPoints(points, "#a9fb78");

  cntx.cntxSave();
  cntx.cntx.scale(-1, 1);

  cntx.cntxDrawImage(scratchCanvas.c, 0, 0, 143, 210, -143 - 132, 0, 143, 210);
  cntx.cntxRestore();

  SPRITES_CARSTRAIGHT = newSprite(0);
}

// OK
export function createCars() {
  createCar();
  createCar2();
}