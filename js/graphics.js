// generate graphics used in the game

// constants
const SCRATCHWIDTH = 600;
const SCRATCHHEIGHT = 600;
const SPRITESWIDTH = 2400;
const SPRITESHEIGHT = 2400;
const OVERHEADTRACKWIDTH = 200;
const OVERHEADTRACKHEIGHT = 600;
//車子
const scratchCanvas = createCanvas(SCRATCHWIDTH, SCRATCHHEIGHT);
//場上物件
const sprites = createCanvas(SPRITESWIDTH, SPRITESHEIGHT);
const spritesCanvas = sprites.c;
const spritesContext = sprites.x;

const backgroundLayer3 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
const backgroundLayer2 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
const backgroundLayer1 = createCanvas(
  BACKGROUNDLAYERWIDTH,
  BACKGROUNDLAYERHEIGHT
);
const overheadTrack = createCanvas(OVERHEADTRACKWIDTH, OVERHEADTRACKHEIGHT);

// OK
function eraseScratch() {
  scratchCanvas.x.clearRect(0, 0, SCRATCHWIDTH, SCRATCHHEIGHT);
}

// OK
function createCanvas(width, height) {
  let c = document.createElement("canvas");
  let x = c.getContext("2d");
  c.width = width;
  c.height = height;

  return { c: c, x: x };
}

function createCanvasMap(width, height) {
  let c = document.getElementById('map');
  let x = c.getContext("2d");
  c.width = width;
  c.height = height;

  return { c: c, x: x };
}

// NOT OK : newSprite
var spriteDstX = 0;
var spriteDstY = 0;
var spriteMaxRowHeight = 0;

// NOT OK : spriteDstX, spriteDstY, spriteMaxRowHeight
function resetGraphics() {
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

// OK
function drawFuzzyCircle(x, y, r, c) {
  cntxFillStyle(c);
  let angle = 0;
  let radius = r + r * mathRand();
  cntxBeginPath();
  cntxMoveTo(x + radius * cos(angle), y + radius * sin(angle));
  for (let i = 1; i < 30; i++) {
    angle = (i * PI * 2) / 30;
    radius = r + r * mathRand();
    cntxLineTo(x + radius * cos(angle), y + radius * sin(angle));
  }
  cntxClosePath();
  cntxFill();
}

// OK
function getScratchSpriteBounds() {
  // get the bounds
  let data = scratchCanvas.x.getImageData(
    0,
    0,
    scratchCanvas.c.width,
    scratchCanvas.c.height
  ); // get image data for canvas
  let buffer32 = new Uint32Array(data.data.buffer); // get a 32-bit representation

  let w = scratchCanvas.c.width;
  let h = scratchCanvas.c.height;
  let x1 = w,
    y1 = h,
    x2 = 0,
    y2 = 0; // min/max values
  // get left edge

  for (let testY = 0; testY < h; testY++) {
    // line by line
    for (let testX = 0; testX < w; testX++) {
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
  const collisionYStart = Math.max(y2 - 50, 0);
  // if (collisionYStart < 0) {
  //   collisionYStart = 0;
  // }
  let cx1 = w,
    cx2 = 0;
  for (let testY = collisionYStart; testY < y2; testY++) {
    for (let testX = 0; testX < w; testX++) {
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
// OK
function newSprite(flipH) {
  // get the bounds
  let bounds = getScratchSpriteBounds();

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

  if (flipH || 0) {
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

  let result = {
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
// NOT OK : cntx (canvasFunctions.js)
var SPRITES_TURNLEFT = 0;
var SPRITES_TURNRIGHT = 0;
function createTurnArrows() {
  cntx = scratchCanvas.x;
  eraseScratch();

  cntxFillStyle("#996644");
  cntxFillRect(0, 0, 200, 200);

  cntxFillStyle("#996644");
  cntxFillRect(10, 200, 10, 10);

  cntxFillStyle("#996644");
  cntxFillRect(180, 200, 10, 10);

  cntxFillStyle(MEDIUMGREY);
  cntxFillRect(10, 10, 180, 180);
  cntxBeginPath();
  cntxMoveTo(20, 100);
  cntxLineTo(160, 30);
  cntxLineTo(160, 170);
  cntxLineTo(20, 100);
  cntxFillStyle("#cc2211");
  cntxFill();

  cntxFillStyle(MEDIUMGREY);
  cntxFillRect(10, 10, 20, 180);

  SPRITES_TURNLEFT = newSprite();
  SPRITES_TURNRIGHT = newSprite(1);
}

// ***************** BACKGROUND TREES ******************** //
// OK
function smallTree(width, slope) {
  let points = [];
  let y = 0,
    index = 1;
  points[index] = 0;
  for (var i = 0; i < width; i++) {
    y = y + mathRand() * slope;
    points[index++] = y;
  }

  while (y > 0) {
    y = y - mathRand() * slope;
    points[index++] = y;
  }

  return points;
}

// NOT OK : cntx (canvasFunctions.js)
function createBackgroundTrees() {
  cntx = backgroundLayer1.x;

  // draw the points
  let colours = ["#114433", "#114e33", "#115433", "#113433", "#114433"];

  let sx = 0;
  // OK
  for (var j = 0; j < 4; j++) {
    let x = sx;
    let width = 10 + 40 * mathRand();

    // OK
    for (let i = 0; i < width; i++) {
      // get the points

      const terPoints = smallTree(8, 7);
      //var terPoints = terrain(width, height, height / 2, 0.6);
      let colour = mathRandInt(colours.length);
      cntxFillStyle(colours[colour]);
      cntxBeginPath();
      cntxMoveTo(x, 240 - terPoints[0]);
      for (let t = 1; t < terPoints.length; t++) {
        cntxLineTo(x + t, 240 - terPoints[t]);
      }
      // finish creating the rect so we can fill it
      cntxClosePath();
      cntxFill();

      x += 2 + mathRand() * 4;
    }

    colours = ["#226639", "#115e33", "#316433", "#215433", "#114433"];

    // OK
    for (let i = 0; i < width; i++) {
      // get the points

      let terPoints = smallTree(4, 4);
      // var terPoints = terrain(width, height, height / 2, 0.6);
      let colour = mathRandInt(colours.length);
      cntxFillStyle(colours[colour]);
      cntxBeginPath();
      cntxMoveTo(x, 240 - terPoints[0]);
      for (let t = 1; t < terPoints.length; t++) {
        cntxLineTo(x + t, 240 - terPoints[t]);
      }
      cntxClosePath();
      cntxFill();
      x += 2 + mathRand() * 5;
    }

    sx = x + 50 + mathRand() * 180;
  }
}

// **** BACKGROUND MOUNTAIN RANGE ******** //
// NOT OK : cntx (canvasFunctions.js)
function terrain(startX) {
  //}, width, height, displace, roughness) {
  cntx = backgroundLayer2.x;

  let points = [];
  let highlightpoints = [];
  let highlightpoints2 = [];
  let highlightBackpoints2 = [];

  // var across = 20 * 100 * mathRand();
  let multiplier = 0.1 + 3 * mathRand();
  let y = 0;
  let index = 0;
  // OK
  for (let i = 0; i < 100; i++) {
    y = y + mathRand() * multiplier;
    points[index] = y;
    highlightpoints[index] = y;
    index++;
    multiplier += 0.01;
  }

  let across = 5 + 8 * mathRand();
  // OK
  for (let i = 0; i < across; i++) {
    y = y + (0.4 - mathRand()) * 2;
    highlightpoints[index] = y;
    points[index++] = y;
  }

  let highlightBackpoints = [];
  // OK
  for (let highlightY = y; highlightY > 0; ) {
    highlightY -= mathRand() * 5;
    highlightBackpoints.push(highlightY);
  }

  across = (mathRand() > 0.6 ? 160 : 20) * mathRand();
  // OK
  for (let i = 0; i < across; i++) {
    y = y + (0.4 - mathRand()) * 2;
    points[index++] = y;
  }

  //  multiplier = 1;
  //  for(var i = 0; i < 100; i++) {
  // OK
  while (y > 0) {
    y = y - mathRand() * multiplier;
    points[index++] = y;
    multiplier -= 0.003;
    if (multiplier < 0) {
      multiplier = 0.03;
    }
  }

  // OK
  let highlightY;
  for (let i = 0; i < highlightpoints.length - 20; i++) {
    highlightY = highlightpoints[i] + mathRand();
    highlightpoints2.push(highlightY);
  }

  // OK
  for (let i = 0; i < highlightpoints2.length - 10; i++) {
    highlightY -= mathRand() * 2;
    highlightBackpoints2.push(highlightY);
  }

  const heightOffset = 260;
  let x = startX;
  cntxFillStyle("#114433");
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - points[0]);
  for (let t = 1; t < points.length; t++) {
    cntxLineTo(x + t, heightOffset - points[t]);
  }
  cntxClosePath();
  cntxFill();

  x = startX;
  cntxFillStyle("#224a33");
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - highlightpoints[0]);
  for (let t = 1; t < highlightpoints.length; t++) {
    cntxLineTo(x, heightOffset - highlightpoints[t]);
    x++;
  }

  // OK
  for (let t = 1; t < highlightBackpoints.length; t++) {
    cntxLineTo(x, heightOffset - highlightBackpoints[t]);
    if (mathRand() > 0.4) {
      x--;
    } else if (mathRand() > 0.4) {
      x++;
    }
  }
  cntxClosePath();
  cntxFill();

  // highlight 2
  x = startX + 4;
  cntxFillStyle("#335a3a");
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - highlightpoints2[0]);
  for (var t = 1; t < highlightpoints2.length; t++) {
    cntxLineTo(x, heightOffset - highlightpoints2[t]);
    x++;
  }

  for (let t = 1; t < highlightBackpoints2.length; t++) {
    cntxLineTo(x, heightOffset - highlightBackpoints2[t]);
    if (mathRand() > 0.8) {
      x++;
    } else if (mathRand() > 0.1) {
      x--;
    }
  }

  cntxClosePath();
  cntxFill();

  return points;
}

// OK
function createBackgroundMountains() {
  let x = 0;
  for (let i = 0; i < 20; i++) {
    terrain(x); //, width, height, height / 2, 0.6);
    x += 3 + mathRand() * 100;
  }
}

// *********   TREES *********** //
// OK
let tree = {
  leavesColor: "",

  draw: function () {
    cntxTranslate(500 / 2, 500);
    this.leavesColor =
      "#" + (0x1000000 + mathRand() * 0xffffff).toString(16).substr(1, 6);
    cntx.lineWidth = 1 + mathRand() * 20;
    cntx.lineJoin = "round";

    this.branch(0);
  },

  branch: function (depth) {
    if (depth < 12) {
      cntxBeginPath();
      cntxMoveTo(0, 0);
      cntxLineTo(0, -500 / 10);

      cntxStroke();

      cntxTranslate(0, -500 / 10);
      let randomN = -(mathRand() * 0.1) + 0.1;
      cntxRotate(randomN);

      if (mathRand() * 1 < 0.6) {
        cntxRotate(-0.35);
        cntx.scale(0.7, 0.7);
        cntxSave();
        this.branch(depth + 1);
        cntxRestore();
        cntxRotate(0.6);
        cntxSave();
        this.branch(depth + 1);
        cntxRestore();
      } else {
        this.branch(depth);
      }
    } else {
      cntxFillStyle(this.leavesColor);
      cntxFillRect(0, 0, 500, 200);
      cntxStroke();
    }
  },
};

// NOT OK : SPRITES_TREES (track.js)
var SPRITES_TREES = [];
function createTrees() {
  SPRITES_TREES = [];

  // NOT OK : SPRITES_TREES (track.js)
  for (var ti = 0; ti < 6; ti++) {
    for (let treeOK = false, c = 0; !treeOK; c++) {
      cntx = scratchCanvas.x;
      scratchCanvas.x.save();
      eraseScratch();
      tree.draw();
      var bounds = getScratchSpriteBounds();
      treeOK = (bounds.w < 300 && bounds.h < 400) || c > 5;
      scratchCanvas.x.restore();
    }
    SPRITES_TREES[ti] = newSprite();
  }
}

// ***************** BACKGROUND BUILDINGS ******************** //

// NOT OK : cntx (canvasFunctions.js)
function backgroundBuilding(x, type, buildingColor, windowColor) {
  cntx = backgroundLayer1.x;

  const windowSpacing = 2; //2;

  let windowWidth = 1; //3;
  let windowHeight = 1; //3;
  let windowColumns = 4;
  let windowRows = 8;
  let buildingHeight = 30; //40 ;
  let buildingWidth = 20; //25;

  if (type == 1) {
    //    windowSpacing = 2;
    windowWidth = 2; //8;
    windowHeight = 2;
    windowColumns = 3;
    windowRows = 10;
    buildingHeight = 40; //60;
    buildingWidth = 25; //30;
  } else if (type == 2) {
    //    windowSpacing = 2;
    windowWidth = 4; //26;
    //    windowHeight = 1;
    windowColumns = 2;
    windowRows = 6;
    buildingHeight = 20; //40;
    buildingWidth = 18; //30;
  }

  const yOffset = 260;

  buildingHeight += 30 * mathRand();
  cntxFillStyle(buildingColor);
  cntxFillRect(x, yOffset - buildingHeight, buildingWidth, buildingHeight);

  if (mathRand() < 0.4) {
    const inset = 5;
    const insetHeight = 8;
    cntxFillRect(
      x + inset,
      yOffset - (buildingHeight + insetHeight),
      buildingWidth - 2 * inset,
      buildingHeight + insetHeight
    );
  }

  if (mathRand() < 0.2) {
    const inset = 5;
    const insetHeight = 13;
    const insetWidth = 2;

    cntxFillRect(
      x + inset,
      yOffset - (buildingHeight + insetHeight),
      insetWidth,
      buildingHeight + insetHeight
    );
  }

  for (let row = 0; row < windowRows; row++) {
    let wy = windowSpacing + row * (windowHeight + windowSpacing);
    for (let col = 0; col < windowColumns; col++) {
      let wx = windowSpacing + col * (windowWidth + windowSpacing);
      cntxFillStyle(windowColor);
      cntxFillRect(
        x + wx,
        yOffset - buildingHeight + wy,
        windowWidth,
        windowHeight
      );
    }
  }
}

// OK
function createBackgroundBuildings(night) {
  let buildingColor = night ? "#060606" : "#777799";
  let windowColor = night ? "#929156" : "#9999ee";
  for (let i = 0, x = 0; i < 80; i++) {
    let n = mathRand();
    if (n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if (n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathRand() * 30;
  }

  buildingColor = night ? "#101010" : "#9999aa";
  windowColor = night ? "#929156" : "#aaaaee";
  for (let i = 0, x = 0; i < 80; i++) {
    let n = mathRand();
    if (n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if (n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathRand() * 30;
  }
}

// ------------ building     --------------
// NOT OK : cntx (canvasFunctions.js)
//          SPRITES_BUILDINGS (track.js)
var SPRITES_BUILDINGS = [];
function createBuildings(night) {
  SPRITES_BUILDINGS = [];
  for (let ti = 0; ti < 4; ti++) {
    eraseScratch();
    cntx = scratchCanvas.x;
    let grey = night ? 10 + mathRand() * 20 : 100 + mathRand() * 80;

    cntxFillStyle("rgb(" + grey + "," + grey + "," + grey + ")");
    cntxFillRect(0, 30, 240, 500);

    const windowWidth = 24;
    const windowHeight = 15;
    const windowStartOffset = 8;
    const windowSpacingH = 8;
    const windowSpacingV = 10;

    for (let row = 0; row < 18; row++) {
      let y = 30 + windowStartOffset + row * (windowHeight + windowSpacingV);
      for (let col = 0; col < 7; col++) {
        let x = windowStartOffset + col * (windowWidth + windowSpacingH);

        if (night) {
          if (mathRand() > 0.7) {
            cntxFillStyle("#ffffec");
            cntxFillRect(x, y, windowWidth, windowHeight);
            cntxFillStyle("#bbbb88");
            cntxFillRect(
              x,
              y + windowHeight / 2,
              windowWidth,
              windowHeight / 2
            );
          } else {
            cntxFillStyle("#112237");
            cntxFillRect(x, y, windowWidth, windowHeight);
            cntxFillStyle("#111a30");
            cntxFillRect(
              x,
              y + windowHeight / 2,
              windowWidth,
              windowHeight / 2
            );
          }
        } else {
          cntxFillStyle("#5555a7");
          //ctx.filter = 'blur(1px)';
          cntxFillRect(x, y, windowWidth, windowHeight);
          cntxFillStyle("#444495");
          cntxFillRect(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
        }
      }
    }
    SPRITES_BUILDINGS[ti] = newSprite();
  }
}

// ***************** STREET LIGHTS ******************** //

// NOT OK : cntx (canvasFunctions.js)
var SPRITES_STREETLIGHTLEFT = 0;
var SPRITES_STREETLIGHTRIGHT = 0;
function createStreetlights(night) {
  cntx = scratchCanvas.x;
  eraseScratch();
  cntxSave();

  if (night) {
    cntxFillStyle("#555555");
  } else {
    cntxFillStyle("#999999");
  }

  const poleWidth = 7;

  cntxFillRect(40, 150, poleWidth, 300);
  cntxBeginPath();
  cntxArc(70, 150, 30, PI, -PI / 2);
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true);
  cntxLineTo(70 - 30, 150);
  cntxFill();

  cntxFillRect(70, 150 - 30, 70, poleWidth);
  cntxFillRect(130, 150 - 30 - 1, 35, 6);

  if (night) {
    cntxFillStyle("#777777");
  } else {
    cntxFillStyle("#aaaaaa");
  }
  cntxFillRect(40 + poleWidth - 4, 150, 2, 300);
  cntxFillRect(70, 150 - 30 + poleWidth - 4, 70, 2);

  cntxBeginPath();
  cntxArc(70, 150, 30 - poleWidth + 4, PI, -PI / 2);
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true);
  cntxLineTo(70 - 30, 150);
  cntxFill();

  if (night) {
    cntxFillStyle("#999999");
  } else {
    cntxFillStyle("#aaaaaa");
  }
  cntxFillRect(40 + poleWidth - 2, 150, 2, 300);
  cntxFillRect(70, 150 - 30 + poleWidth - 2, 70, 2);

  cntxBeginPath();
  cntxArc(70, 150, 30 - poleWidth + 2, PI, -PI / 2);
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true);
  cntxLineTo(70 - 30, 150);
  cntxFill();

  if (night) {
    cntx.filter = "blur(2px)";
  }

  cntxFillStyle("#ffffff");
  cntxFillRect(128, 150 - 30 + 4, 38, 12);

  if (night) {
    cntxGlobalAlpha(0.8);
    cntx.globalCompositeOperation = "lighter";

    cntx.filter = "blur(4px)";
    cntxFillRect(123, 150 - 30 + 3, 44, 18);
    cntxGlobalAlpha(1);
  }

  //  cntx.filter = null;
  //  cntx.globalCompositeOperation = 'source-over';

  SPRITES_STREETLIGHTLEFT = newSprite();
  SPRITES_STREETLIGHTRIGHT = newSprite(1);
  cntxRestore();
}

// NOT OK : cntx (canvasFunctions.js)
function createNightSky() {
  cntx = backgroundLayer3.x;
  const xMax = BACKGROUNDLAYERWIDTH;
  const yMax = BACKGROUNDLAYERHEIGHT;

  let gradient = cntxCreateLinearGradient(0, 0, 0, yMax);
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#033d5e");

  cntxFillStyle(gradient); //'#00111e';
  cntxFillRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);

  const hmTimes = Math.round(xMax + yMax);
  for (let i = 0; i <= hmTimes; i++) {
    const randomX = mathRandInt(xMax);
    const randomY = mathRandInt(yMax);
    const randomSize = mathRandInt(2) + 1;
    const randomOpacityOne = mathRandInt(9) + 1;
    const randomOpacityTwo = mathRandInt(9) + 1;
    const randomHue = mathRandInt(360);
    if (randomSize > 1) {
      cntx.shadowBlur = mathRandInt(15) + 5;
      cntx.shadowColor = "white";
    }
    cntxFillStyle(
      "hsla(" +
        randomHue +
        ", 30%, 80%, ." +
        randomOpacityOne +
        randomOpacityTwo +
        ")"
    );
    cntxFillRect(randomX, randomY, randomSize, randomSize);
  }
}

// NOT OK : PI (mathFunctions.js)
function createLeaf(s) {
  cntxFillStyle(s);
  cntxBeginPath();

  cntxArc(3, 7, 3, PI / 2, PI);
  cntxArc(10, 7, 10, PI, PI * 1.24);
  cntxArc(-4.7, 7, 10, PI * 1.76, 0);
  cntxArc(2.3, 7, 3, 0, PI / 2);
  cntxFill();
}

// NOT OK : cntx (canvasFunctions.js)
var SPRITES_FLOWERS = 0;
function createFlowers() {
  eraseScratch();
  cntx = scratchCanvas.x;
  cntx.save();

  let leafGradient = cntxCreateLinearGradient(0, 0, 0, 8);
  leafGradient.addColorStop(0, "#ff111e");
  leafGradient.addColorStop(1, "#aa3d5e");

  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf("#44aa55");
  cntx.restore();

  let canvas = scratchCanvas.c;
  let y = 100;
  // OK
  for (let j = 0; j < 2; j++) {
    let x = 30;
    for (let i = 0; i < 60; i++) {
      x += 4 + 6 * mathRand();

      if (x > 780) {
        continue;
      }

      let height = 20 + 4 * mathRand();
      y = 100 + j * 16 - height + mathRand() * 12;
      // draw the stem
      if (mathRand() > 0.5) {
        cntxFillStyle("#44aa55");
        cntxFillRect(x, y, 2, height);
        cntxFillStyle("#66cc88");
        cntxFillRect(x, y, 1, height);
      } else {
        cntxFillStyle("#449955");
        cntxFillRect(x, y, 2, height);
        cntxFillStyle("#66aa88");
        cntxFillRect(x, y, 1, height);
      }

      const flower = mathRandInt(2) * 20;

      const dstX = x - 2,
        dstY = y - 6;
      cntxSave();
      cntxTranslate(dstX + 3, dstY);
      cntxRotate(0.3);
      cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntxRestore();

      cntxSave();
      cntxTranslate(dstX - 3, dstY + 1);
      cntxRotate(-0.3);
      cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntxRestore();

      cntxSave();
      cntxTranslate(dstX, dstY);
      cntxDrawImage(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      cntxRestore();

      cntxSave();
      cntxTranslate(dstX + 6, dstY + 10);
      cntxRotate(0.6); //Math.random() * Math.PI * 2);
      cntxDrawImage(canvas, 0, 60, 6, 11, 0, 0, 6, 11);
      cntxRestore();
    }
  }

  cntx.clearRect(0, 0, 22, 300);
  SPRITES_FLOWERS = newSprite();
}

// OK
function fillPoints(points, color) {
  cntxBeginPath();
  cntxFillStyle(color);
  cntxMoveTo(points[0], points[1]);
  for (let i = 2; i < points.length; i += 2) {
    cntxLineTo(points[i], points[i + 1]);
  }
  cntxClosePath();
  cntxFill();
}

// OK
function drawLine(x1, y1, x2, y2) {
  cntxBeginPath();
  cntxMoveTo(x1, y1);
  cntxLineTo(x2, y2);
  cntx.stroke();
}

// NOT OK : cntx (canvasFunctions.js)
var SPRITES_CARLEFT = 0;
var SPRITES_CARRIGHT = 0;
function createCar() {
  eraseScratch();
  cntx = scratchCanvas.x;

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
    //9, 87,
    5, 65, 7, 88, 2, 97, 1, 151,
  ];
  fillPoints(points, "#ffffff");

  // car body
  points = [
    //  5, 192,
    25, 206, 296, 190, 302, 164, 298, 149, 296, 145, 292, 111, 289, 103,

    294, 101, 294, 91, 297, 84,

    17, 93, 22, 122,

    20, 162,

    20, 170, 2, 145, 3, 160, 6, 187,
    //    6, 192
  ];
  fillPoints(points, "#ffffff");

  points = [20, 108, 294, 96, 296, 89, 19, 98];
  fillPoints(points, "#226d7d");

  points = [21, 162, 296, 149, 292, 112, 22, 122];
  fillPoints(points, "#226d7d");

  // windscreen
  points = [42, 86, 260, 79, 208, 21, 60, 24];
  //fillPoints(points,'#4773dd');
  let gradient = cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  fillPoints(points, gradient); //'#4773dd');

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

// NOT OK : cntx (canvasFunctions.js)
var SPRITES_CARSTRAIGHT = 0;
function createCar2() {
  eraseScratch();
  cntx = scratchCanvas.x;

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
  let gradient = cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");
  fillPoints(points, gradient); //'#4773dd');

  points = [47, 59, 143, 59, 143, 64, 78, 68, 38, 77];
  fillPoints(points, "#95eef7");

  // wheel
  points = [13, 197, 16, 205, 23, 208, 49, 207, 56, 202, 58, 197];
  fillPoints(points, DARKGREY);

  // strip under lights
  points = [1, 155, 1, 167, 143, 167, 143, 155];
  fillPoints(points, "#a9fb78");
  //  fillPoints(points,'#5d2959');

  /*
    cntxStrokeStyle('#63a96e');
    drawLine(1, 161, 143, 161);
  
    cntxStrokeStyle('#111111');
    cntx.lineWidth = 2;
    drawLine(4, 137, 86, 137);
  
    cntx.lineWidth = 1;
  
    for(var i = 0; i < 68; i += 4) {
      drawLine(6 + i, 138, 6 + i, 149);
    }
    cntxStrokeStyle('#204e69');
    cntx.lineWidth = 2;
    drawLine(5, 114, 106, 114);
    cntx.lineWidth = 1;
    drawLine(105, 116, 105, 155);
  
  
    cntxStrokeStyle('#204e69');
    cntx.lineWidth = 1;
    drawLine(143, 21, 65, 21);
    drawLine(65, 21, 32, 82);
    drawLine(32, 82, 143, 82);
  */
  cntxSave();
  cntx.scale(-1, 1);

  cntxDrawImage(scratchCanvas.c, 0, 0, 143, 210, -143 - 132, 0, 143, 210);
  cntxRestore();

  SPRITES_CARSTRAIGHT = newSprite(0);
}

// OK
function createCars() {
  createCar();
  createCar2();
}

/*
function createBush() {
  eraseScratch();
  cntx = scratchCanvas.x;
  var canvas = scratchCanvas.c;

  var colours = [
    '#002205',
    '#336622',
    '#448833'
  ];
  for(var j = 0; j < 3; j++) {
    createLeaf(colours[j]);

      for(var i = 0; i < 100; i++) {
        var radius = 30 * mathRand();
        var angle = PI * 2 * mathRand();
        var cX = 140;
        var cY = 160;
        var dstX = cX + radius * M.cos(angle);
        var dstY = cY + radius * M.sin(angle);
        cntxSave();
        cntxTranslate(dstX, dstY);
        cntxRotate(mathRand() * PI * 2);
        cntxDrawImage(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        cntxRestore();
      }

      for(var i = 0; i < 120; i++) {
        var radius = 40 * mathRand();
        var angle = Math.PI * 2 * Math.random();
        var cX = 160;
        var cY = 150;
        var dstX = cX + radius * cos(angle);
        var dstY = cY + radius * sin(angle);
        cntxSave();
        cntxTranslate(dstX, dstY);
        cntxRotate(mathRand() * PI * 2);
        cntxDrawImage(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        cntxRestore();
      }


      for(var i = 0; i < 100; i++) {
        var radius = 30 * mathRand();
        var angle = PI * 2 * mathRand();
        var cX = 190;
        var cY = 160;
        var dstX = cX + radius * cos(angle);
        var dstY = cY + radius * sin(angle);
        cntxSave();
        cntxTranslate(dstX, dstY);
        cntxRotate(mathRand() * PI * 2);
        cntxDrawImage(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        cntxRestore();

      }
    }
}
*/
