var KEYUP = 38;
var KEYDOWN = 40;
var KEYLEFT = 37;
var KEYRIGHT = 39;
var helvetica = ' "Helvetica Neue", Helvetica, Arial, sans-serif';

var COLORS_LANEMARKER=0;


var cntx = null;


function cntxClearRect(width, height) {
  cntx.clearRect(0, 0, width, height);
}

function cntxGlobalAlpha(alpha) {
  cntx.globalAlpha = alpha;
}
function cntxFillRect(x, y, width, height) {
  cntx.fillRect(x, y, width, height);
}
  
function cntxCreateLinearGradient(x0, y0, x1, y1) {
  return cntx.createLinearGradient(x0, y0, x1, y1);
}

function cntxStrokeStyle(s) {
  cntx.strokeStyle = s;
}

function cntxStroke() {
  cntx.stroke();
}

function cntxFillStyle(s) {
  cntx.fillStyle = s;
}

function cntxBeginPath() {
  cntx.beginPath();
}

function cntxMoveTo(x, y) {
  cntx.moveTo(x, y);
}

function cntxArc(x,y,r,sAngle,eAngle,counterclockwise) {
  cntx.arc(x,y,r,sAngle,eAngle,counterclockwise);
}

function cntxLineTo(x, y) {
  cntx.lineTo(x, y);
}
function cntxClosePath() {
  cntx.closePath();
}

function cntxFill() {
  cntx.fill();
}

function cntxFillText(t,x,y) {
  cntx.fillText(t,x,y);

}

function cntxSave() {
  cntx.save();
}

function cntxRestore() {
  cntx.restore();
}

function cntxTranslate(x, y) {
  cntx.translate(x, y);
}

function cntxRotate(a) {
  cntx.rotate(a);
}

function cntxDrawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}


// hopefully  versions of math functions which take less bytes
var M = Math;
var PI = Math.PI;

function mathRand() {
  return M.random();
}
function mathRandInt(limit) {
  return M.floor(mathRand() * limit);
}

function sin(angle) {
  return M.sin(angle);
}

function cos(angle) {
  return M.cos(angle);
}


// generate graphics used in the game

// constants
var SCRATCHWIDTH = 600, 
    SCRATCHHEIGHT = 600,
    SPRITESWIDTH = 2400,
    SPRITESHEIGHT = 2400,
    BACKGROUNDLAYERWIDTH = 1280,
    BACKGROUNDLAYERHEIGHT = 480,
    OVERHEADTRACKWIDTH = 600,
    OVERHEADTRACKHEIGHT = 600,
    scratchCanvas = createCanvas(SCRATCHWIDTH, SCRATCHHEIGHT),
    sprites = createCanvas(SPRITESWIDTH, SPRITESHEIGHT)
    spritesCanvas = sprites.c,
    spritesContext = sprites.x,
    backgroundLayer3 = createCanvas(BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT),
    backgroundLayer2 = createCanvas(BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT),
    backgroundLayer1 = createCanvas(BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT),
    overheadTrack = createCanvas(OVERHEADTRACKWIDTH, OVERHEADTRACKHEIGHT),
    SPRITES_STREETLIGHTLEFT=SPRITES_STREETLIGHTRIGHT=SPRITES_CARLEFT=SPRITES_CARRIGHT=SPRITES_CARSTRAIGHT=SPRITES_TURNLEFT=SPRITES_TURNRIGHT=SPRITES_FLOWERS=0,
    SPRITES_BUILDINGS=[],COLORS_FOG=0;

var DARKGREY = '#222222';
var MEDIUMGREY = '#cccccc';
var LIGHTGREY = '#e5e5e5';

function eraseScratch() {
  scratchCanvas.x.clearRect(0,0,SCRATCHWIDTH,SCRATCHHEIGHT);
}
function createCanvas(width, height) {
  var c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  var x = c.getContext('2d');
  
  return { c: c, x: x };
}

var spriteDstX = 0;
var spriteDstY = 0;
var spriteMaxRowHeight = 0;

function resetGraphics() {
  spriteDstX = 0;
  spriteDstY = 0;
  spriteMaxRowHeight = 0;

  spritesContext.clearRect(0, 0, SPRITESWIDTH, SPRITESHEIGHT);

  backgroundLayer1.x.clearRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);  
  backgroundLayer2.x.clearRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);  
  backgroundLayer3.x.clearRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);  
}



function drawFuzzyCircle(x, y, r, c) {
  
  var angle = 0;

  cntxFillStyle(c);
  var radius = r + r * mathRand();
  cntxBeginPath();
  cntxMoveTo(x + (radius) * cos(angle), y + (radius) * sin(angle));
  for(var i = 1; i < 30; i++) {
    angle = i * PI * 2 / 30;
    radius = r + r * mathRand();
    cntxLineTo(x + (radius) * cos(angle), y + (radius) * sin(angle));
  }
  cntxClosePath();
  cntxFill();

}
function getScratchSpriteBounds() {
  // get the bounds
  var data = scratchCanvas.x.getImageData(0, 0, scratchCanvas.c.width, scratchCanvas.c.height);      // get image data for canvas
  var buffer32 = new Uint32Array(data.data.buffer); // get a 32-bit representation
  var testX, testY;                                      // iterators
  
  var w = scratchCanvas.c.width;
  var h = scratchCanvas.c.height;
  var x1 = w, y1 = h, x2 = 0, y2 = 0;            // min/max values  
// get left edge

  for(testY = 0; testY < h; testY++) {                       // line by line
    for(testX = 0; testX < w; testX++) {                   // 0 to width
      if (buffer32[testX + testY * w] > 0) {         // non-transparent pixel?
        if(testX < x1) {
          x1 = testX;
        }
        if(testX > x2) {
          x2 = testX;
        }
        if(testY < y1) {
          y1 = testY;
        }
        if(testY > y2) {
          y2 = testY;
        }
      }
    }
  } 

  // work out collision box for bottom 100 pixels.
  var collisionYStart = y2 - 50;
  if(collisionYStart < 0) {
    collisionYStart = 0;
  }
  var cx1 = w;
  var cx2 = 0;
  for(testY = collisionYStart; testY < y2; testY++) {
    for(testX = 0; testX < w; testX++) {
      if (buffer32[testX + testY * w] > 0) {         // non-transparent pixel?
        if(testX < cx1) {
          cx1 = testX;
        }
        if(testX > cx2) {
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
    cw: cx2 - cx1
  }
}
// create a sprite from the scratch canvas, put into new sprites
function newSprite(flipH) {
  var fh = flipH || 0;

  // get the bounds
  var bounds = getScratchSpriteBounds();

  if(spriteDstX + bounds.w > SPRITESWIDTH) {
    // need to go to next line
    spriteDstX = 0;
    spriteDstY += spriteMaxRowHeight;
    spriteMaxRowHeight = 0;
  }
  if(bounds.h > spriteMaxRowHeight) {
    spriteMaxRowHeight = bounds.h;
  }

  spritesContext.save();
  var dstX = spriteDstX;

  if(fh) {
    spritesContext.scale(-1, 1);
    dstX = -spriteDstX - bounds.w;
    bounds.cx = bounds.w - bounds.cx - bounds.cw;
  } 

  spritesContext.drawImage(scratchCanvas.c, bounds.x, bounds.y, bounds.w, bounds.h,
    dstX, spriteDstY, bounds.w, bounds.h);
  spritesContext.restore();

  var result = {
    x: spriteDstX, y: spriteDstY, w: bounds.w, h: bounds.h, cx: bounds.cx, cw: bounds.cw
  }
  spriteDstX += bounds.w + 5;
  return result;
}


// ***************** TURN ARROWS ******************** //
function createTurnArrows() {
  cntx = scratchCanvas.x;
  eraseScratch();

  cntxFillStyle('#996644');
  cntxFillRect(0, 0, 200, 200);

  cntxFillStyle('#996644');
  cntxFillRect(10, 200, 10, 10);

  cntxFillStyle('#996644');
  cntxFillRect(180, 200, 10, 10);

  cntxFillStyle(MEDIUMGREY);
  cntxFillRect(10, 10, 180, 180);
  cntxBeginPath();
  cntxMoveTo(20, 100);
  cntxLineTo(160, 30);
  cntxLineTo(160, 170);
  cntxLineTo(20, 100);
  cntxFillStyle('#cc2211');
  cntxFill();

  cntxFillStyle(MEDIUMGREY);
  cntxFillRect(10, 10, 20, 180);

  SPRITES_TURNLEFT = newSprite();
  SPRITES_TURNRIGHT = newSprite(1);
}


// ***************** BACKGROUND TREES ******************** //

function smallTree(width, slope) {
  var points = [];
  var y = 0;
  var index = 0;
  points[index++] = 0;
  var multiplier = 1;
  for(var i = 0; i < width; i++) {
    y = y + mathRand() * slope;
    points[index++] = y;
  }

  while(y > 0) {
    y = y - mathRand() * slope;
    points[index++] = y;
  }

  return points;
}


function createBackgroundTrees() {
  cntx = backgroundLayer1.x;

  // draw the points
  var colours = [
    '#114433',
    '#114e33',
    '#115433',
    '#113433',
    '#114433',
  ];

  var sx = 0;

  for(var j = 0; j < 4; j++) {
    var x = sx;
    var width = 10 + 40 * mathRand();

    for(var i =0 ; i < width; i++) {
    // get the points

    var terPoints = smallTree(8, 7);
      //var terPoints = terrain(width, height, height / 2, 0.6);
      var colour = mathRandInt(colours.length);
      cntxFillStyle(colours[colour]);
      cntxBeginPath();
      cntxMoveTo(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        cntxLineTo(x + t, 240 - terPoints[t]);
      }
      // finish creating the rect so we can fill it
      cntxClosePath();
      cntxFill();

      x += 2 +  mathRand() * 4;
    }

    var colours = [
      '#226639',
      '#115e33',
      '#316433',
      '#215433',
      '#114433',

    ];

    var x = sx;
    for(var i =0 ; i < width; i++) {
    // get the points

    var terPoints = smallTree(4, 4);
      //var terPoints = terrain(width, height, height / 2, 0.6);
      var colour = mathRandInt(colours.length);
      cntxFillStyle(colours[colour]);
      cntxBeginPath();
      cntxMoveTo(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        cntxLineTo(x + t, 240 - terPoints[t]);
      }
      cntxClosePath();
      cntxFill();
      x += 2 +  mathRand() * 5;
    }


    sx = x + 50 + mathRand() * 180;
  }
}



// **** BACKGROUND MOUNTAIN RANGE ******** //
function terrain(startX) {//}, width, height, displace, roughness) {
  cntx = backgroundLayer2.x;
  
  var points = [];
  var highlightpoints = [];
  var highlightpoints2 = [];
  var highlightBackpoints2 = [];
  var y = 0;
  var index = 0;

  var multiplier = 1;


  multiplier = 0.1 + 3 * mathRand();
  var across = 20 * 100 * mathRand();
  for(var i = 0; i < 100; i++) {
    y = y + mathRand() * multiplier;
    points[index] = y;
    highlightpoints[index] = y;
    index++;
    multiplier += 0.01;
  }

  var across = 5 + 8 * mathRand();
  for(var i = 0; i < across; i++) {
    y = y + ( 0.4 - mathRand() ) * 2;
    highlightpoints[index] = y;
    points[index++] = y;
  }


  var highlightBackpoints = [];
  var highlightY = y;
  while(highlightY > 0) {
    highlightY -= mathRand() * 5;
    highlightBackpoints.push(highlightY);
  }

  if(mathRand() > 0.6) {
    across = 160 * mathRand();
  } else {
    across = 20 * mathRand();
  }
  for(var i = 0; i < across; i++) {
    y = y + ( 0.4 - mathRand() ) * 2;
    points[index++] = y;
  }

//  multiplier = 1;
//  for(var i = 0; i < 100; i++) {
  while(y > 0) {
    y = y - mathRand() * multiplier;
    points[index++] = y;
    multiplier -= 0.003;
    if(multiplier < 0) {
      multiplier = 0.03;
    }
  }

  for(var i = 0; i < highlightpoints.length - 20; i++) {
    highlightY = highlightpoints[i] + mathRand();
    highlightpoints2.push(highlightY);
  }


  for(var i = 0; i < highlightpoints2.length - 10; i++) {
    highlightY -= mathRand() * 2;
    highlightBackpoints2.push(highlightY);
  }

  var heightOffset = 260;

  var x = startX;
  cntxFillStyle('#114433');
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - points[0]);
  for (var t = 1; t < points.length; t++) {
    cntxLineTo(x + t, heightOffset - points[t]);
  }
  cntxClosePath();
  cntxFill();


  x = startX;
  cntxFillStyle('#224a33');
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - highlightpoints[0]);
  for (var t = 1; t < highlightpoints.length; t++) {
    cntxLineTo(x, heightOffset - highlightpoints[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints.length; t++) {
    cntxLineTo(x, heightOffset - highlightBackpoints[t]);

    if(mathRand() > 0.4) {
      x--;
    } else if(mathRand() > 0.4) {
      x++;
    }
  }
  cntxClosePath();
  cntxFill();  

  // highlight 2
  x = startX + 4;
  cntxFillStyle('#335a3a');
  cntxBeginPath();
  cntxMoveTo(x, heightOffset - highlightpoints2[0]);
  for (var t = 1; t < highlightpoints2.length; t++) {
    cntxLineTo(x, heightOffset - highlightpoints2[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints2.length; t++) {
    cntxLineTo(x, heightOffset - highlightBackpoints2[t]);

    if(mathRand() > 0.8) {
      x++;
    } else if(mathRand() > 0.1) {
      x--;
    }
  }

  cntxClosePath();
  cntxFill();

  return points;
}

function createBackgroundMountains() {

  var x = 0;
  for(var i =0 ; i < 20; i++) {
    terrain(x);//, width, height, height / 2, 0.6);
    x += 3 + mathRand() * 100;;
  }
}


// *********   TREES *********** //
var tree = {

  leavesColor:'',
  
  draw : function() {
      cntxTranslate(500/2,500);
      this.leavesColor = '#'+(0x1000000+(mathRand())*0xffffff).toString(16).substr(1,6);
      cntx.lineWidth = 1 + (mathRand() * 20);
      cntx.lineJoin = 'round';
      
      this.branch(0);
  },
  
  branch : function(depth) {
    if (depth < 12) {
        cntxBeginPath();
        cntxMoveTo(0,0);
        cntxLineTo(0,-(500)/10);

        cntxStroke();
        
        cntxTranslate(0,-500/10);
        var randomN = -(mathRand() * 0.1) + 0.1;

        cntxRotate(randomN); 

        if ((mathRand() * 1) < 0.6) {
          cntxRotate(-0.35);
          cntx.scale(0.7,0.7);
          cntxSave();
          this.branch(depth + 1);
          cntxRestore();  
          cntxRotate(0.6);
          cntxSave();
          this.branch(depth + 1);   
          cntxRestore();        
        } else  { 
            this.branch(depth);
        }
    } else {   
          
      cntxFillStyle(this.leavesColor);
      cntxFillRect(0, 0, 500, 200);
      cntxStroke();
    }
  }
};


var SPRITES_TREES = [];
function createTrees() {
  SPRITES_TREES = [];
  
  for(var ti = 0; ti < 6; ti++) {

    var treeSpread = 0.6;
    var treeOK = false;
    var c = 0;
    while(!treeOK) {
      cntx = scratchCanvas.x;
      scratchCanvas.x.save();
      eraseScratch();
      tree.draw();
      var bounds = getScratchSpriteBounds();
      treeOK = (bounds.w < 300 && bounds.h < 400) || c > 5;

      scratchCanvas.x.restore();
      c++;
    }
    SPRITES_TREES[ti] = newSprite();
  }
}





// ***************** BACKGROUND BUILDINGS ******************** //


function backgroundBuilding(x, type, buildingColor, windowColor) {
  cntx = backgroundLayer1.x;

  var buildingHeight = 30;//40 ;
  var buildingWidth = 20;//25;

  var windowSpacing = 2;//2;
  var windowWidth = 1;//3;
  var windowHeight = 1;//3;
  var windowColumns = 4;
  var windowRows = 8;


  if(type == 1) {
//    windowSpacing = 2;
    windowWidth = 2;//8;
    windowHeight = 2;
    windowColumns = 3;
    windowRows = 10;
    buildingHeight = 40;//60;
    buildingWidth = 25;//30;

  }

  if(type == 2) {
//    windowSpacing = 2;
    windowWidth = 4;//26;
//    windowHeight = 1;
    windowColumns = 2;
    windowRows = 6;
    buildingHeight = 20;//40;
    buildingWidth = 18;//30;
  }

  var yOffset = 260;

  buildingHeight += 30 * mathRand();
  cntxFillStyle(buildingColor);
  cntxFillRect(x, yOffset - buildingHeight, buildingWidth, buildingHeight);

  if(mathRand() < 0.4) {
    var inset = 5;
    var insetHeight = 8;
    cntxFillRect(x + inset, 
      yOffset - (buildingHeight + insetHeight), 
      buildingWidth - 2*inset, 
      buildingHeight + insetHeight);
  }

  if(mathRand() < 0.2) {
    var inset = 5;
    var insetHeight = 13;
    var insetWidth = 2;

    cntxFillRect(x + inset, 
      yOffset - (buildingHeight + insetHeight), 
      insetWidth, 
      buildingHeight + insetHeight);
  }

  for(var row = 0; row < windowRows; row++) {
    var wy = windowSpacing + row * (windowHeight + windowSpacing);
    for(var col = 0; col < windowColumns; col++) {
      var wx = windowSpacing + col * (windowWidth + windowSpacing);
      cntxFillStyle(windowColor);
      cntxFillRect(x + wx, yOffset - buildingHeight + wy, windowWidth, windowHeight);
    }
  }
}

function createBackgroundBuildings(night) {

  var buildingColor = '#777799';
  var windowColor = '#9999ee';
  if(night) {
    buildingColor = '#060606';
    windowColor = '#929156';
  }
  var x = 0;
  for(var i = 0; i < 80; i++) {
    var n = mathRand();
    if(n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if(n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathRand() * 30;
  }
  
  var buildingColor = '#9999aa';
  var windowColor = '#aaaaee';
  if(night) {
    buildingColor = '#101010';
    windowColor = '#929156';
  }

  var x = 0;
  for(var i = 0; i < 80; i++) {
    var n = mathRand()
    if(n < 0.4) {
      backgroundBuilding(x, 0, buildingColor, windowColor);
    } else if(n < 0.6) {
      backgroundBuilding(x, 1, buildingColor, windowColor);
    } else {
      backgroundBuilding(x, 2, buildingColor, windowColor);
    }
    x += 10 + mathRand() * 30;
  }
  
}

// ------------ building     --------------

function createBuildings(night) {
  SPRITES_BUILDINGS = [];
  for(var ti = 0; ti < 4; ti++) {
    eraseScratch();
    cntx = scratchCanvas.x;
    var grey = 100 + mathRand() * 80;


    if(night) {
      grey = 10 + mathRand() * 20;
    }
    cntxFillStyle('rgb(' + grey + ',' + grey + ',' + grey + ')');
    cntxFillRect(0, 30, 240, 500);

    var windowWidth=24, windowHeight=15,windowStartOffset=8,windowSpacingH = 8,windowSpacingV = 10;
    var row=col=x=y=0;

    for(row = 0; row < 18; row++) {
      y = 30 + windowStartOffset + row * (windowHeight + windowSpacingV);
      for(col = 0; col < 7; col++) {
        x = windowStartOffset + col * (windowWidth + windowSpacingH);

        if(night) {
          if(mathRand() > 0.7) {
            cntxFillStyle('#ffffec');
            cntxFillRect(x, y, windowWidth, windowHeight);
            cntxFillStyle('#bbbb88');
            cntxFillRect(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          } else {          
            cntxFillStyle('#112237');
            cntxFillRect(x, y, windowWidth, windowHeight);
            cntxFillStyle('#111a30');
            cntxFillRect(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          }
        } else {
          cntxFillStyle('#5555a7');
          //ctx.filter = 'blur(1px)';
          cntxFillRect(x, y, windowWidth, windowHeight);
          cntxFillStyle('#444495');
          cntxFillRect(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
        }
      }
    }
    SPRITES_BUILDINGS[ti] = newSprite();

  }
}

// ***************** STREET LIGHTS ******************** //


function createStreetlights(night) {
  cntx = scratchCanvas.x;
  eraseScratch();
  cntxSave();

  cntxFillStyle('#999999');

  if(night) {
    cntxFillStyle('#555555');
  }

  var poleWidth = 7;

  cntxFillRect(40, 150, poleWidth, 300);
  cntxBeginPath();
  cntxArc(70, 150, 30, PI, -PI / 2 );
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  cntxLineTo(70 - 30, 150);
  cntxFill();

  cntxFillRect(70, 150 - 30, 70, poleWidth);
  cntxFillRect(130, 150 - 30 - 1, 35, 6);

  cntxFillStyle('#aaaaaa');
  if(night) {
    cntxFillStyle('#777777');
  }
  cntxFillRect(40 + poleWidth - 4, 150, 2, 300);
  cntxFillRect(70, 150 - 30 + poleWidth - 4, 70, 2);

  cntxBeginPath();
  cntxArc(70, 150, 30 - poleWidth + 4, PI, -PI / 2 );
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  cntxLineTo(70 - 30, 150);
  cntxFill();

  cntxFillStyle('#aaaaaa');
  if(night) {
    cntxFillStyle('#999999');
  }
  cntxFillRect(40 + poleWidth - 2, 150, 2, 300);
  cntxFillRect(70, 150 - 30 + poleWidth - 2, 70, 2);

  cntxBeginPath();
  cntxArc(70, 150, 30 - poleWidth + 2, PI, -PI / 2 );
  cntxLineTo(70, 150 - 30 + poleWidth);
  cntxArc(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  cntxLineTo(70 - 30, 150);
  cntxFill();


  if(night) {
    cntx.filter = 'blur(2px)';    
  }

  cntxFillStyle('#ffffff');
  cntxFillRect(128, 150 - 30 + 4, 38, 12);

  if(night) {
    cntxGlobalAlpha(0.8);
    cntx.globalCompositeOperation = 'lighter';

    cntx.filter = 'blur(4px)';    
    cntxFillRect(123, 150 - 30 +3, 44, 18);  
    cntxGlobalAlpha(1);
  }

//  cntx.filter = null;
//  cntx.globalCompositeOperation = 'source-over';

  SPRITES_STREETLIGHTLEFT = newSprite();
  SPRITES_STREETLIGHTRIGHT = newSprite(1);
  cntxRestore();

}

function createNightSky() {
  var xMax = BACKGROUNDLAYERWIDTH;
  var yMax = BACKGROUNDLAYERHEIGHT;
  cntx = backgroundLayer3.x;

  var gradient = cntxCreateLinearGradient(0, 0, 0, yMax);
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#033d5e");

  cntxFillStyle(gradient);//'#00111e';
  cntxFillRect(0, 0, BACKGROUNDLAYERWIDTH, BACKGROUNDLAYERHEIGHT);


  var hmTimes = Math.round(xMax + yMax);  
  
  for(var i=0; i<=hmTimes; i++) {
    var randomX = mathRandInt(xMax);
    var randomY = mathRandInt(yMax);
    var randomSize = mathRandInt(2) + 1;
    var randomOpacityOne = mathRandInt(9) + 1;
    var randomOpacityTwo = mathRandInt(9) + 1;
    var randomHue = mathRandInt(360);
    if(randomSize>1) {
      cntx.shadowBlur = mathRandInt(15) + 5;
      cntx.shadowColor = "white";
    }
    cntxFillStyle( "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")" );
    cntxFillRect(randomX, randomY, randomSize, randomSize);
  }
}



function createLeaf(s) {

  cntxFillStyle(s);
  cntxBeginPath();

  cntxArc(3, 7, 3, PI / 2, PI );
  cntxArc(10, 7, 10, PI, PI * 1.24);
  cntxArc(-4.7, 7, 10, PI * 1.76, 0);
  cntxArc(2.3, 7, 3, 0, PI / 2 );
  cntxFill();  
}

function createFlowers() {
  eraseScratch();
  cntx = scratchCanvas.x;
  var canvas = scratchCanvas.c;
  cntx.save();



  var leafGradient = cntxCreateLinearGradient(0, 0, 0, 8);
  leafGradient.addColorStop(0, "#ff111e");
  leafGradient.addColorStop(1, "#aa3d5e");

  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf('#44aa55');
  cntx.restore();
  
  var y = 100;

  for(var j = 0; j < 2; j++) {
    var x = 30;
    for(var i = 0; i < 60; i++) {
      x += 4 + 6 * mathRand();

      if(x > 780) {
        continue;
      }
      
      var height = 20 + 4 * mathRand();
      y = 100 + j * 16 - height + mathRand() * 12;
      // draw the stem
      if(mathRand() > 0.5) {
        cntxFillStyle('#44aa55');
        cntxFillRect(x, y, 2, height);
        cntxFillStyle('#66cc88');
        cntxFillRect(x, y, 1, height);
      } else {
        cntxFillStyle('#449955');
        cntxFillRect(x, y, 2, height);
        cntxFillStyle('#66aa88');
        cntxFillRect(x, y, 1, height);        
      }

      var flower = mathRandInt(2) * 20;

      var dstX = x - 2;
      var dstY = y - 6;
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
      cntxRotate(0.6);//Math.random() * Math.PI * 2);
      cntxDrawImage(canvas, 0, 60, 6, 11, 0, 0, 6, 11);
      cntxRestore();
    }
  }

  cntx.clearRect(0, 0, 22, 300);
  SPRITES_FLOWERS = newSprite();

}

function fillPoints(points, color) {
  cntxBeginPath();
  cntxFillStyle(color);
  cntxMoveTo(points[0], points[1]);
  for(var i = 2; i < points.length; i+= 2) {
    cntxLineTo(points[i], points[i+1]);
  }
  cntxClosePath();
  cntxFill();
}

function drawLine(x1, y1, x2, y2) {
  cntxBeginPath();
  cntxMoveTo(x1, y1);
  cntxLineTo(x2, y2);
  cntx.stroke();
}

function createCar() {
  eraseScratch();
  cntx = scratchCanvas.x;

  // car tyre
  var points = [
    8, 194, 
    11, 206,
    14, 214,
    18, 216,
    41, 215,
    46, 213,
    47, 205
  ];
  fillPoints(points,DARKGREY);

  // car tyre
  var points = [
    227, 193,
    230,200,
    241, 204,
    258, 203, 
    265, 197,
    268, 191
  ];
  fillPoints(points,DARKGREY);
  

  // car body
  var points = [
    5, 192,
    25, 206,
    296, 190,
    302, 164, 
    298, 149,
    296, 145, 
    292, 111, 
    289, 103, 
    294, 101, 
    294, 91,
    297, 84, 
    263, 72, 
    208, 14, 
    167, 2, 
    66, 3, 
    45, 7, 
    8, 55, 
    //9, 87,
    5, 65,
    7, 88,
    2, 97, 
    1, 151
  ];
  fillPoints(points,'#ffffff');


  // car body
  var points = [
  //  5, 192,
    25, 206,
    296, 190,
    302, 164, 
    298, 149,
    296, 145, 
    292, 111, 
    289, 103, 

    294, 101, 
    294, 91,
    297, 84, 

    17, 93, 
    22, 122,

    20, 162, 

    20, 170,
    2, 145, 
    3, 160, 
    6, 187
//    6, 192

  ];
  fillPoints(points,'#ffffff');
  var points = [
    20, 108,
    294, 96,
    296, 89,
    19, 98 
  ];
  fillPoints(points,'#226d7d');


  var points = [
    21, 162,
    296, 149,
    292,112,
    22, 122 
  ];
  fillPoints(points,'#226d7d');


  
  // windscreen
  var points = [
    42, 86,
    260, 79,
    208, 21,
    60, 24
  ];
  //fillPoints(points,'#4773dd');
  var gradient = cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  fillPoints(points, gradient);//'#4773dd');

  points = [
    51, 62,
    238, 57, 
    253, 76, 
    196, 67,
    159, 64, 
    125, 66, 
    81, 72, 
    45, 82 
  ];
  fillPoints(points, '#95eef7');

  // windscreen
  var points = [
    27, 83,
    33, 77,
    46, 27,
    21, 70
  ];
  fillPoints(points,'#4773dd');

  // windscreen
  var points = [
    19, 61,
    46, 17, 
    43, 12,
    19, 51
  ];
  fillPoints(points,'#4773dd');

  // windscreen
  var points = [
    3, 99,
    10, 113,
    18, 120,
    17, 106, 
    11, 86,
    5, 91
  ];
  fillPoints(points,'#ffd47e');


  // tail light
  var points = [
    21, 127,
    19, 145,
    20, 158,
    106, 153,
    105, 124

  ];
  fillPoints(points,'#b44258');


  // tail light
  var points = [
    20, 158,
    106, 153,
    105, 142,
    19, 146

  ];
  fillPoints(points,'#5d2959');




  // tail light
  var points = [
    217, 120,
    218, 149,
    296, 145, 
    296, 134,
    293, 116

  ];
  fillPoints(points,'#b44258');


  // tail light
  var points = [
    218, 149,
    296, 145, 
    296, 133,
    218, 137

  ];
  fillPoints(points,'#5d2959');

  // strip under lights
  var points = [
    21, 173,
    300, 159, 
    299, 149,
    21, 162
  ];
  fillPoints(points,'#bbbbbb');


  SPRITES_CARLEFT = newSprite(0);
  SPRITES_CARRIGHT = newSprite(1);
}

function createCar2() {
  eraseScratch();
  cntx = scratchCanvas.x;
  var canvas = scratchCanvas.c;


 // car body bottom
 var points = [
  5, 197,
  143, 197,
  141, 87,
  1, 87, 
  4, 106, 
  1, 121, 
  1, 180
 ];
 fillPoints(points, '#ffffff');

 //car body top
 var points = [
  141, 87,
  143, 1,
  87, 3,
  72, 6, 
  61, 17, 
  31, 67, 
  1, 87, 
];
fillPoints(points, '#ffffff');

  // boot stripe
  points = [
    4, 100,
    143, 100,
    143, 93, 
    3, 93
  ];
  fillPoints(points,'#226d7d');

  // tail green stripe
  points = [
    4, 155,
    143, 155,
    143, 113, 
    4, 113
  ];
  fillPoints(points,'#dddddd');

  // tail light
  points = [
    4, 150,
    86, 149,
    86, 121,
    5, 121,
    3, 139
  ];
  fillPoints(points, '#b44258');

  points = [
    4, 149,
    86, 149,
    86, 138,
    4, 138
  ];
  fillPoints(points, '#5d2959');

  // tail light
  points = [
    22, 131,
    22, 134,
    73, 134,
    73, 131

  ];
  fillPoints(points, '#d65d5b');
  
  
  // windscreen
  points = [
    32, 82,
    143, 82,
    143, 19,
    66, 19
  ];

  var gradient = cntxCreateLinearGradient(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  fillPoints(points, gradient);//'#4773dd');

  points = [
    47, 59, 
    143, 59, 
    143, 64, 
    78, 68, 
    38, 77
  ];
  fillPoints(points, '#95eef7');

  // wheel
  points = [
    13, 197,
    16, 205,
    23, 208,
    49, 207,
    56, 202,
    58, 197
  ];
  fillPoints(points, DARKGREY);

  // strip under lights
  var points = [
    1, 155, 
    1, 167, 
    143, 167, 
    143, 155
  ];
  fillPoints(points,'#a9fb78');
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

  cntxDrawImage(scratchCanvas.c, 0, 0, 143, 210,
    -143 -132, 0, 143, 210);
  cntxRestore();

  SPRITES_CARSTRAIGHT = newSprite(0);
}

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



function utilPercentRemaining(n, total) { 
  return ( n % total) / total;
}

function utilInterpolate(a,b,percent) { 
  return a + (b-a)*percent                                        
}

function utilIncrease(start, increment, max) {
  var result = start + increment;

  while (result >= max)
    result -= max;
  while (result < 0)
    result += max;
  return result;
}


// the title screen

var TitleScreen = function(canvas, context) {
  this.canvas = canvas;
  this.context = context;

}

TitleScreen.prototype = {

  init: function() {
    camera.reset();
    track.buildTrack0();
  },

  keyDown: function(e) {
    if(e.keyCode === 88) {
      startGame();
    }
  },

  keyUp: function(e) {

  },

  renderRoad: function() {
    outlineOnly = true;
    var maxy          = height;    
    camera.y = 400;
    camera.depth = 0.83909963117728;
    camera.x = 0;
    
    var baseSegment   = track.findSegment(camera.z);
    var cameraPercent = utilPercentRemaining(camera.z, Track.segmentLength);
    
    camera.y = 500 + utilInterpolate(baseSegment.p1.world.y, 
      baseSegment.p3.world.y, 
      cameraPercent);

    var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;
    var dx = 0;
    for(n = 0 ; n < camera.drawDistance ; n++) {
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount() );
      segment.looped = segment.index < baseSegment.index;
      segment.clip   = maxy;
      segment.clip   = 0;
  
      camera.project(segment.p1,  0, segment.looped, width, height, laneWidth);
      camera.project(segment.p2,  0, segment.looped, width, height, laneWidth);
      camera.project(segment.p3,  0, segment.looped,  width, height, laneWidth);
      camera.project(segment.p4,  0, segment.looped,  width, height, laneWidth);
  
  
  
      if ((segment.p1.camera.z <= camera.depth)         || // behind us
          (segment.p3.screen.y >= segment.p1.screen.y) || // back face cull
          (segment.p3.screen.y >= maxy))                  // clip by (already rendered) hill
        continue;

        renderSegment(segment);
      maxy = segment.p1.screen.y;
    }
  
  },


  render: function(dt) {
    cntx = this.context;
    var t = getTimestamp();

    cntxFillStyle(DARKGREY);
    cntxFillRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < 30; i++) {
      var fontSize = 100 + i * 10;
      context.font = 'italic ' + fontSize + 'px ' + helvetica;
      context.fontStyle = 'italic';
      var col = 80 + (i * 4);
      col = (col + t / 6) % 200;
      
      if(i == 29) {
        col = 255;
      }

      cntxFillStyle('rgb(' + col + ',' + col + ',' + col + ')');
      cntxFillText("racer", (document.documentElement.clientWidth / 2) - i * 11, 300- i);
    }

    context.font = '44px ' + helvetica;
    cntxFillText("Arrow keys to drive, x for Turbo, z for Handbrake", 38, 570);
    cntxFillText("x To Start", 423, 460);


    camera.z = utilIncrease(camera.z, dt * 120, track.getLength());
    this.renderRoad();

  }
  
}


var Camera = function() {
  this.fieldOfView = 100;

  this.y = 0;
  this.z = 0;
  this.drawDistance = 300;  
  this.depth = 0;           
  this.fogDensity =  25;
  this.zOffset = 0;         
  this.yOffset = 740;
  this.zOffset = 700;


}

Camera.prototype = {
  reset: function() {
    this.depth            = 1 / Math.tan( ( this.fieldOfView / 2 ) * Math.PI/180);
    this.yOffset = 1740;
    this.zOffset = 1500;
  
  },

// segment 3081
  project: function(p, cameraXOffset, looped, width, height) {
    var cameraZ = this.z;
    if(looped) {
      cameraZ -= track.getLength();
    }
    var cameraX = this.x + cameraXOffset;

    p.camera.x     = (p.world.x || 0) - cameraX;
    p.camera.y     = (p.world.y || 0) - this.y;
    p.camera.z     = (p.world.z || 0) - cameraZ;//this.z;
    p.screen.scale = this.depth / p.camera.z;

    p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
    p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
  
  },


  update: function(dt) {
    this.z = cars[0].z - this.zOffset;
    if(this.z < 0) {
      this.z += track.getLength();
    }

    camera.x = cars[0].x + cars[0].width/2;


    var playerSegment = track.findSegment(cars[0].z);
    var playerPercent = utilPercentRemaining(cars[0].z, Track.segmentLength);
    

    this.y = this.yOffset + utilInterpolate(playerSegment.p1.world.y, 
      playerSegment.p3.world.y, 
      playerPercent);

  }
}


// draw all the race stuff to the screen                 
var width  = document.documentElement.clientWidth;
var height  = document.documentElement.clientHeight;
var resolution = height/480;

var bgLayer3Speed       = 0.001;                
var bgLayer2Speed      = 0.002;              
var bgLayer1Speed      = 0.003;              


var bgLayer3Offset      = 0;  
var bgLayer2Offset     = 0;   
var bgLayer1Offset     = 0;   
var outlineOnly = false;
var lastDriftDraw = 0;

// draw a polygon
function renderPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
  var ctx = context;
  cntxFillStyle(color);
  cntxBeginPath();
  cntxMoveTo(x1, y1);
  cntxLineTo(x2, y2);
  cntxLineTo(x3, y3);
  cntxLineTo(x4, y4);
  cntxClosePath();
  if(outlineOnly) {
    cntxStrokeStyle(MEDIUMGREY);
    cntxStroke();
  } else {
    cntxFill();
  }
}

  // draw a segment, coordinates passed in are screen coordinates
  function renderSegment(segment) {
    var lanew1, lanew2, lanex1, lanex2, lane;
    var dark = Math.floor(segment.index/2) % 2;// (segment.index / 2) % 2;

    var kerbColor = COLORS_KERBLIGHT;
    var landColor = COLORS_LANDLIGHT;
    if(dark) {
      kerbColor = COLORS_KERBDARK;
      landColor = COLORS_LANDDARK;
    }

    // draw side land
    if(!outlineOnly) {
      cntxFillStyle(landColor);
      cntxFillRect(0, segment.p3.screen.y, width, segment.p1.screen.y - segment.p3.screen.y);
    }

    // draw kerb
    var r1 = segment.kerbWidth * segment.p1.screen.scale * width / 2;
    var r2 = segment.kerbWidth * segment.p4.screen.scale * width / 2;
    renderPolygon(
                    segment.p1.screen.x - r1, 
                    segment.p1.screen.y, 
                    segment.p1.screen.x, 
                    segment.p1.screen.y, 
                    segment.p4.screen.x, 
                    segment.p4.screen.y, 
                    segment.p4.screen.x - r2, 
                    segment.p4.screen.y, 
                    kerbColor);

    renderPolygon(
      segment.p2.screen.x, 
      segment.p2.screen.y, 
      segment.p2.screen.x + r1, 
      segment.p2.screen.y, 
      segment.p3.screen.x + r2, 
      segment.p3.screen.y, 
      segment.p3.screen.x, 
      segment.p3.screen.y, 
      kerbColor);
  
    // road 
    if(!outlineOnly) {
      var colour = COLORS_ROAD;
      if(segment.index == 0) {
        colour = MEDIUMGREY;
      }
      renderPolygon(
                    segment.p1.screen.x,    
                    segment.p1.screen.y, 
                    segment.p2.screen.x, 
                    segment.p2.screen.y, 
                    segment.p3.screen.x, 
                    segment.p3.screen.y, 
                    segment.p4.screen.x,    
                    segment.p4.screen.y, 
                    colour);
    }


    var l1 = 50 * segment.p1.screen.scale * width / 2;
    var l2 = 50 * segment.p4.screen.scale * width / 2;


    // lines on side of road
    lanex1 = segment.p1.screen.x + 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p4.screen.x + 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1/2, 
        segment.p1.screen.y, 
        lanex1 + l1/2, 
        segment.p1.screen.y, 
        lanex2 + l2/2, 
        segment.p3.screen.y, 
        lanex2 - l2/2, 
        segment.p3.screen.y, 
        COLORS_LANEMARKER);

    lanex1 = segment.p2.screen.x - 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p3.screen.x - 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1/2, 
        segment.p1.screen.y, 
        lanex1 + l1/2, 
        segment.p1.screen.y, 
        lanex2 + l2/2, 
        segment.p3.screen.y, 
        lanex2 - l2/2, 
        segment.p3.screen.y, 
        COLORS_LANEMARKER );
      
    lanes = 2;
    // lane marker
    if (dark) { //segment.color.laneMarker) {
      lanew1 = (segment.p2.screen.x - segment.p1.screen.x) / lanes;
      lanew2 = (segment.p3.screen.x - segment.p4.screen.x) / lanes;
      lanex1 = segment.p1.screen.x + lanew1;
      lanex2 = segment.p4.screen.x + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        renderPolygon(
          lanex1 - l1/2, 
          segment.p1.screen.y, 
          lanex1 + l1/2, 
          segment.p1.screen.y, 
          lanex2 + l2/2, 
          segment.p3.screen.y, 
          lanex2 - l2/2, 
          segment.p3.screen.y, 
          COLORS_LANEMARKER);
      }
    }

    if(COLORS_FOG != 0) {
      renderFog(0, segment.p1.screen.y, width, segment.p3.screen.y-segment.p1.screen.y, segment.fog);
    }
  }

  //---------------------------------------------------------------------------

  function renderBackground( background, width, height, rotation, offset) {

//    return;

    
    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = BACKGROUNDLAYERWIDTH/2;
    var imageH = BACKGROUNDLAYERHEIGHT;

    var sourceX = Math.floor(BACKGROUNDLAYERWIDTH * rotation);
    var sourceY = 0;
    var sourceW = Math.min(imageW, BACKGROUNDLAYERWIDTH-sourceX);
    var sourceH = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW/imageW));
    var destH = height;

    context.drawImage(background.c, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
      context.drawImage(background.c, 0, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);
  }

  //---------------------------------------------------------------------------

  function renderSprite(sprite, scale, destX, destY, clipY, fog) {

    var destW  = (sprite.w * scale * width/2) ;
    var destH  = (sprite.h * scale * width/2);


//    destX = destX + (destW * (offsetX || 0));
    destY = destY - destH;// + (destH * (offsetY || 0));


    // clip y for appearing behind a hill..
    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH) {

      context.drawImage(spritesCanvas, 
        sprite.x, 
        sprite.y, 
        sprite.w, 
        sprite.h - (sprite.h*clipH/destH), 
        destX, 
        destY, 
        destW, 
        destH - clipH);

      if(fog !== false && COLORS_FOG != 0) {
        renderFog(destX, destY, destW, destH, fog);//ctx, x, y, width, height, fog) {
      }
    }

  }

  //---------------------------------------------------------------------------
  function renderExponentialFog(distance, density) { 
    return 1 / (Math.pow(Math.E, (distance * distance * density))); 
  }

  function renderPlayer(scale, destX, destY, steer, updown, playerShadowY) {

    var sprite;
    if(steer < 0) {
      sprite = SPRITES_CARLEFT;
    } else if(steer > 0) {
      sprite = SPRITES_CARRIGHT;
    } else {
      sprite = SPRITES_CARSTRAIGHT;
    }

    var spriteScale = player.width * scale / sprite.w;

    var i,j;


    // ************* DRAW SLIP STREAM ********** //
    if(player.slipstreamTime > 0 || player.slipstream > 0) {

      cars[0].initSlipstreamLines();

      var amount = 0;
      if(player.slipstreamTime <= 0) {
        amount = player.slipstream ;
        while(amount > 1) {
          amount -= 1;
        }        
      }
      cntxGlobalAlpha(1 - amount);

      for(i = 0; i < cars[0].slipstreamLines.length; i++) {
        var points = cars[0].slipstreamLines[i];
        cntxBeginPath();
        cntxMoveTo(points[0].screen.x, points[0].screen.y);
        for(j = 1; j < points.length; j++) {
          cntxLineTo(points[j].screen.x, points[j].screen.y);
        }

        cntxFillStyle(MEDIUMGREY);
        cntxFill();

      }
      cntxGlobalAlpha(1);
    }


    // ***** DRAW SHADOW IF IN AIR *******/
/*
    if(playerShadowY != destY) {
      cntxGlobalAlpha(0.4);
        var destW  = (sprite.w * spriteScale * width/2) ;
        renderPolygon(destX, playerShadowY,
          destX + destW, playerShadowY,
          destX + 0.7 * destW, playerShadowY - 180,
          destX + 0.3 * destW, playerShadowY - 180,
          
          DARKGREY);
      cntxGlobalAlpha(1);      
    }
    */
    // ***** DRAW CAR SPRITE ****** /

    
    renderSprite(
      sprite, 
      spriteScale, 
      destX, 
      destY + player.bounce, 
      false);
      

    // ************** DRAW DRIFT *************** //
    if( player.driftAmount > 0) {
      var time = getTimestamp();
      if(time - lastDriftDraw > 100) {

        cntxGlobalAlpha(0.8);
        cntxFillStyle(MEDIUMGREY);
        var x = destX + 12;
        var y = destY - 4;
        cntxFillRect(x, y, 50, 10)

        x = destX + 260;
        cntxFillRect(x, y, 50, 10)

        cntxGlobalAlpha(1);
        lastDriftDraw = time;
      }
    }

    //  ******  DRAW TURBO  ***** /
    if(player.turbo) {
      var centreX = destX + 82;
      var centreY = destY - 10;
      drawFuzzyCircle(centreX, centreY, 10,'#dd9925' );
      drawFuzzyCircle(centreX, centreY, 5,'#cccc55');
      centreX = destX + 230;
      drawFuzzyCircle(centreX, centreY, 10,'#dd9925' );
      drawFuzzyCircle(centreX, centreY, 5,'#cccc55');
    }    
  }


  function renderFog(x, y, width, height, fog) {
    if (fog < 1) {
      cntxGlobalAlpha(1-fog)
      cntxFillStyle(COLORS_FOG);
      cntxFillRect(x, y, width, height);
      cntxGlobalAlpha(1);
    }
  }


  function renderRender() {
    cntx = context;
    

    var baseSegment   = track.findSegment(camera.z);
  
    var basePercent   = utilPercentRemaining(camera.z, Track.segmentLength);
    var playerSegment = track.findSegment(player.z);
    var playerPercent = utilPercentRemaining(player.z, Track.segmentLength);
    var playerY       = utilInterpolate(playerSegment.p1.world.y, playerSegment.p3.world.y, playerPercent);
    var maxy          = height;
    var x  = 0;
    var dx = - (baseSegment.curve * basePercent);
  //  context.clearRect(0, 0, width, height);
  
    context.fillStyle = '#4576aa';
    cntxFillRect(0, 0, width, height);
  
  
    // render background hills, sky, trees
    renderBackground(backgroundLayer3, width, height, bgLayer3Offset,  resolution * bgLayer3Speed  * playerY);
    renderBackground(backgroundLayer2, width, height, bgLayer2Offset, resolution * bgLayer2Speed * playerY);
    renderBackground(backgroundLayer1, width, height, bgLayer1Offset, resolution * bgLayer1Speed * playerY);
  
  
    /*
      front to back to render the road
      back to front to render the sprites
    */
  
  
    // render segments from to back
    var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;
    for(n = 0 ; n < camera.drawDistance ; n++) {
  
  //    segment        = segments[(baseSegment.index + n) % segments.length];
  
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount() );
      segment.looped = segment.index < baseSegment.index;
  
      segment.fog    = renderExponentialFog(n/camera.drawDistance, camera.fogDensity);
      segment.clip   = maxy;
  
      camera.project(segment.p1,  - x,      segment.looped, width, height);
      camera.project(segment.p2,  - x,      segment.looped, width, height);
      camera.project(segment.p3,  - x - dx, segment.looped,  width, height);
      camera.project(segment.p4,  - x - dx, segment.looped,  width, height);
  
      // do fake curved road
      x  = x + dx;
      dx = dx + segment.curve;
  
      // cull segments if behind, facing other way or clipped
      if ((segment.p1.camera.z <= camera.depth)         || 
          (segment.p3.screen.y >= segment.p1.screen.y) || 
          (segment.p3.screen.y >= maxy))                  
        continue;
  

      renderSegment(segment);
      maxy = segment.p1.screen.y;
    }
  
    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the player to the camera should be drawn after the player..
    for(n = (camera.drawDistance-1) ; n > 0 ; n--) {
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount());
  
      // draw cars in the segment
      for(i = 0 ; i < segment.cars.length ; i++) {
        car         = segment.cars[i];
        
        if(car.index !== 0) {
          sprite      = car.sprite;
          var scale = utilInterpolate(segment.p1.screen.scale, segment.p3.screen.scale, car.percent);
  
          spriteX     = utilInterpolate(
            (segment.p1.screen.x + segment.p2.screen.x) / 2,     
            (segment.p3.screen.x + segment.p4.screen.x) / 2,     
            car.percent) 
            + (scale * car.x * width/2);
  
          spriteY     = utilInterpolate(segment.p1.screen.y,     segment.p4.screen.y,     car.percent);
  

          var sprite = SPRITES_CARSTRAIGHT;
          spriteScale = car.width * scale / sprite.w;

          if(car.turnLeft) {
            sprite = SPRITES_CARLEFT;
          } else if(car.turnRight) {
            sprite = SPRITES_CARRIGHT;
          } 
      
  
          renderSprite(
            sprite, 
            spriteScale, 
            spriteX, 
            spriteY, 
            segment.clip,
            segment.fog);
        }
      }
  
      // roadside objects
      for(i = 0 ; i < segment.sprites.length ; i++) {
        sprite      = segment.sprites[i];
        spriteScale = segment.p1.screen.scale;

        spriteX = segment.p1.screen.x - segment.p1.world.x * segment.p1.screen.scale * width / 2
                  + spriteScale * sprite.x * width / 2;


        spriteY     = segment.p1.screen.y;
  /*
        sprite.source.x = 0;
        sprite.source.y = 0;
        sprite.source.w = 200;
        sprite.source.h = 210;
  */
        spriteScale = sprite.s  * spriteScale;//* 800 / sprite.source.w;
  

        
        renderSprite(
          sprite.source, 
          spriteScale, 
          spriteX, 
          spriteY, 
          segment.clip,
          false);
          


//-------- COLLISION DISPLAY ----------- //
var destW  = (sprite.source.w * spriteScale * width/2) ;

var offsetX = -0;//.5;
var destX = spriteX + (destW * (offsetX || 0));

spriteScale = segment.p1.screen.scale;        
spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.source.w;

var collisionx = (sprite.source.cx ) * spriteScale * width / 2;
var collisionw = sprite.source.cw * spriteScale * width / 2;
spriteX = destX + collisionx;// + collisionx * spriteScale * width / 2;// + spriteScale * collisionx * width / 2;

//context.fillStyle = '#ff0000';
//context.fillRect(spriteX, spriteY - 10, collisionw, 10);              
//-------- COLLISION DISPLAY END ----------- //

    }
  
      if (segment == playerSegment) {
        var playerScreenY = utilInterpolate(playerSegment.p1.screen.y, playerSegment.p3.screen.y, playerPercent);
        
  
        playerScreenY = (height / 2) 
            - (camera.depth / camera.zOffset * utilInterpolate(playerSegment.p1.camera.y, 
            playerSegment.p3.camera.y, playerPercent) * height/2);

        var playerShadowY = playerScreenY;
  
        if(cars[0].yOffset > 0) {
          playerScreenY -= cars[0].yOffset * camera.depth / camera.zOffset * height / 2;
        }

            
        var carX = width / 2;
        var scale = utilInterpolate(playerSegment.p1.screen.scale, playerSegment.p3.screen.scale, playerPercent);
  
  
          spriteX     = utilInterpolate(
            (playerSegment.p1.screen.x + playerSegment.p2.screen.x) / 2,     
            (playerSegment.p3.screen.x + playerSegment.p4.screen.x) / 2,     
            playerPercent) 
            + (scale * cars[0].x * width/2);


        var p = {
          world: {
            x: player.x,
            y: player.y,
            z: player.z
          },
          camera: {},
          screen: {}

        };

        camera.project(p, 0, playerSegment.index < baseSegment.index, width, height);
  
        carX = p.screen.x;
        var playerDirection = 0;
        if(player.speed > 0) {
          if(player.driftDirection != 0) {
            playerDirection = player.driftDirection;
          } else {
            playerDirection = (player.turnLeft ? -1 : player.turnRight ? 1 : 0);
          }
        }

        renderPlayer( 
                      camera.depth / camera.zOffset,  // scale
                      carX,//width/2,   // destx
                      playerScreenY,
                      playerDirection,
                      playerSegment.p3.world.y - playerSegment.p1.world.y,
                      playerShadowY);
        if(race.state == STATE_RACING) {
          context.drawImage(track.overheadMap, -40, 200, 400, 400);
        }
  
      }
    }
  }





// the player car and the opponents car
var Car = function() {
  var t = this;

  t.sprite = 0;

  t.index = 0;

  t.width = 500; //530; // width
  t.height = 0;
  
  t.x = 0;
  t.y = 0;
  t.lastY = false;
  t.yOffset = 0;
  t.z = 0;
  t.lap = 0;
  t.lapStarted = false;
  t.position = 0;

  t.centrifugal = 0.3;
  t.slipstreamLines = [];
  t.slipstreamLengths = false;
  t.slipstream = 0;
  t.slipstreamTime = 0;

  t.percent = 0; // percent remaining in segment
  t.speed = 0;
  t.ySpeed = 0;

  t.turboStartTime = 0;
  t.accelerate=t.brake=t.turnLeft=t.turnRight=t.turbo=t.turboRequest=t.driftRequest=false;
  t.driftAmount = 0;
  t.driftDirection = 0;

  t.turboAmount = 100;
  t.lapStarted = false;

  // these are settings for the player
  // the car init routine will set them for ai players
  t.centrifugal    = 0.3;                     // centrifugal force multiplier when going around curves

  t.maxSpeed       =  36000;
  t.maxTurboSpeed  =  41000;

  t.speedPercent   = 0;  // speed as percentage of max speed

  t.accel          =  6800;
  t.breaking       = -16000;
  t.decel          = -8000;
  /*
  this.offRoadDecel   = -12000;
  this.offRoadLimit   = this.maxSpeed /1.4;
//  this.accel          =  maxSpeed/5;             // acceleration rate - tuned until it 'felt' right
  //this.breaking       = -maxSpeed;               // deceleration rate when braking
  //this.decel          = -maxSpeed/5;             // 'natural' deceleration rate when neither accelerating, nor braking
  //this.offRoadDecel   = -maxSpeed/2;             // off road deceleration is somewhere in between
  //this.offRoadLimit   =  maxSpeed/2;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
  //this.sideStripLimit   =  this.maxSpeed/1.5;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
  */

  t.currentLapTime = 0;                       // current lap time
  t.lastLapTime    = null;                    // last lap time

  t.position = 0;

  t.turnSpeed = 3000;

  // ai settings
  t.slowOnCorners = false;
  t.takeCornerOnInside = false;

  t.bounce = 1.5;
  t.finishPosition = 0;



}

Car.prototype = {
  doaccelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },

  initSlipstreamLines: function() {
    this.slipstreamLines = [];
//    var carWidth = this.width;
    var carHeight = 400;
//    var centreX = this.x + this.width / 2;
    var centreZ = this.z + 500;
//    var centreY = this.y + carHeight;// + carHeight;
    var smallRadius = carHeight - 40;// - 200;// - 570;
    var lineLength = 700;

    var i, j;
    var segments = 20;

    var angle = 0.0;
    if(this.slipstreamLengths === false) {
      this.slipstreamLengths = [];
      for(i = 0; i < segments; i++) {
        this.slipstreamLengths.push(mathRand());
      }
    }

    for(i = 0; i < segments; i++) {
      this.slipstreamLengths[i] += 0.03;
      if(this.slipstreamLengths[i] >= 0.8) {
        this.slipstreamLengths[i] = 0;
      }


      var largeRadius = carHeight + 60;

      if(angle > PI / 6 && angle <  PI / 2) {
        largeRadius = carHeight +60 +  (angle - PI / 6) * 128;// - 200;// - 570;
      }
      if(angle >= PI / 2 && angle < (5 * PI / 6)) {
       largeRadius = carHeight +60 +  (5 * PI / 6 - angle) * 128;// - 200;// - 570; 
      }
      var x1 = this.x + this.width / 2 + smallRadius * Math.cos(angle - 0.05);
      var y1 = this.y + smallRadius * sin(angle - 0.02);
      var x2 = this.x + this.width / 2 + smallRadius * Math.cos(angle + 0.05);
      var y2 = this.y + smallRadius * sin(angle + 0.02);

      var x3 = this.x + this.width / 2 + largeRadius * Math.cos(angle - 0.05);
      var y3 = this.y + largeRadius * sin(angle - 0.05);
      var x4 = this.x + this.width / 2 + largeRadius * Math.cos(angle + 0.05);
      var y4 = this.y + largeRadius * sin(angle + 0.05);

//      x3 = x1;
//      y3 = y1;
//      x4 = x2;
//      y4 = y2;


      var x1a =  x1 + (x3 - x1) * this.slipstreamLengths[i];
      var x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      var y1a = y1 + (y3 - y1) * this.slipstreamLengths[i];
      var y2a = y2 + (y4 - y2) * this.slipstreamLengths[i];

      var x3a =  x1 + (x3 - x1) * (this.slipstreamLengths[i] + 0.4);
      var x4a = x2 + (x4 - x2) * (this.slipstreamLengths[i] + 0.4);

      var y3a = y1 + (y3 - y1) * (this.slipstreamLengths[i] + 0.4);
      var y4a = y2 + (y4 - y2) * (this.slipstreamLengths[i] + 0.4);


      var za = centreZ - lineLength * this.slipstreamLengths[i];
      var z2a = centreZ - lineLength * (this.slipstreamLengths[i] + 0.4);
//      var 1a = x1 + (x3 - x1) * this.slipstreamLengths[i];
  //    var x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      var line = [];
      line.push({
        world: {
          x: x1a,
          y: y1a,
          z: za
        },
        camera: {},
        screen: {}

      });

      line.push({
        world: {
          x: x2a,
          y: y2a,
          z: za
        },
        camera: {},
        screen: {}
      });


      line.push({
        world: {
          x: x4a,
          y: y4a,
          z: z2a,//centreZ - lineLength
        },
        camera: {},
        screen: {}

      });

      line.push({
        world: {
          x: x3a,
          y: y3a,
          z: z2a,//centreZ-lineLength
        },
        camera: {},
        screen: {}
      });

      this.slipstreamLines.push(line);
      angle += PI / segments;

    }

    for(i = 0; i < this.slipstreamLines.length; i++) {
      var points = this.slipstreamLines[i];
      for(j = 0; j < points.length; j++) {
        camera.project(points[j], 0, 0, width, height);
      }
    }

  },

  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));   
  },

  overlap: function(x1, w1, x2, w2, percent) {


    var min1 = x1 - (percent - 1) * w1 / 2;
    var max1 = x1 + (w1) * percent;
    var min2 = x2 - (percent - 1) * w2 / 2;
    var max2 = x2 + (w2) * percent;    
    return ! ((max1 < min2) || (min1 > max2));
  },

  // --- player controls ----
  setTurnLeft: function(turn) {
    this.turnLeft = turn;
  },
  setTurnRight: function(turn) {
    this.turnRight = turn;
  },
  setAccelerate: function(accelerate) {
    this.accelerate = accelerate;
  },
  setBrake: function(brake) {
    this.brake = brake;
  },

  setTurbo: function(turbo) {
    this.turboRequest = turbo;
  },

  setDrift: function(drift) {
    this.driftRequest = drift;
  },

  // --- end player controls ---

  getCurrentLapTime: function() {
    return this.currentLapTime;
  },

  getLap: function() {
    if(this.lap < 1) {
      return 1;
    }
    return this.lap;
  },

  getPosition: function() {
      var i = this.position,
          j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
  },

  getSpeed: function() {
    return this.speed;
  },



  update: function(dt) {//}, playerSegment, playerW) {
    var maxSpeed = this.maxSpeed;
    this.speedPercent = this.speed / this.maxSpeed;
    var currentSegment = track.findSegment(this.z);
    var playerSegment = track.findSegment(cars[0].z);
    var speedPercent  = this.speedPercent;
    this.percent = utilPercentRemaining(this.z, Track.segmentLength);    


    var dx            = dt * this.turnSpeed * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
    var trackLeft = currentSegment.p1.world.x;
    var trackRight = currentSegment.p2.world.x;

    var carLeftSide = this.x;
    var carRightSide = this.x + this.width;

    // middle distance is about 900
    // furthest is about 1800
    var distanceToLeft = carLeftSide - trackLeft;
    var distanceToRight = trackRight - carRightSide;
    var trackWidth = trackRight - trackLeft;



    var extraSpeed = 1;

    // is the car on a curve? easy curve max is about 4
    if(currentSegment.curve < 0 && distanceToLeft > 0) {
      // turn left
      if(this.index == 0) {
        extraSpeed = 1 + (trackWidth - this.width - distanceToLeft) * (-currentSegment.curve) / (trackWidth * 80);
      }
    } else if(currentSegment.curve > 0 && distanceToRight > 0) {
      if(this.index == 0) {
        extraSpeed = 1 + (trackWidth - this.width - distanceToRight) * (currentSegment.curve) / (trackWidth * 80);
      }
    }

    if(extraSpeed < 1) {
      extraSpeed = 1;
    }


    // max speed multiplier
    var mult = 0.8;
    var accMult = 1;
    if(this.slipstreamTime > 0) {
      mult += 0.4;
    }

    if(this.driftRequest) {
      // can only drift over certain speed ,otherwise we're breaking
      if(this.speed > 8000 ) {
        if(!this.drift && !this.accelerate) {
          this.driftAmount = 1.2;
          this.drift = true;
        }

        //mult -= 0.1;
        // can turn faster
      } else {
        mult -= 0.5;
        this.drift = false;
      }

    } else {
      this.drift = false;
    }


    if(this.driftAmount > 0 && this.speed > 8000) {
      this.driftAmount -= dt;
      mult -= 0.04;
      if(this.driftDirection == 0) {
        if(this.turnLeft) {
          this.driftDirection = -1;
        }
        if(this.turnRight) {
          this.driftDirection = 1;
        }
      }
    } else {
      this.drift = false;
      this.driftAmount = 0;
      this.driftDirection = 0
    }

    var turboOn = this.turbo;
    // is turbo on?
    if(this.turboRequest) {
      this.turbo = this.turboAmount > 0 && this.speed > 8000 && this.accelerate;  
    } else {
      this.turbo = false;
    }


    if(this.turbo) {
      accMult = 1.2;
      maxSpeed = this.maxTurboSpeed;
    }

    this.bounce = 3.4;
    // is the car offroad with a bit of leeway??   
    if(distanceToLeft < -this.width * 0.1 || distanceToRight < -this.width * 0.1) {

      if(distanceToLeft + this.width * 0.1 < -playerSegment.kerbWidth
         || distanceToRight + this.width * 0.1 < -playerSegment.kerbWidth) {
        
        this.bounce = 9.5;
        mult -= 0.6;
        accMult -= 0.2;
      } else {
        mult -= 0.1;
        this.bounce = 6;
      }
    }

    this.bounce = (this.bounce * mathRand() * speedPercent) ;

    
    if(this.index == 0 && race.state != STATE_RACEOVER) {
      // its the player

      this.x = this.x - (dx * speedPercent * playerSegment.curve * this.centrifugal);

      if(this.driftDirection != 0) {
        dx = dx * 0.5;
      }
      if(this.turnLeft)
        this.x = this.x - dx;
      else if (this.turnRight)
        this.x = this.x + dx;
    
      var ddrift = this.driftDirection * this.speed * 0.00055;
      this.x += ddrift;


      // need to check for collision with other cars..
      this.z = utilIncrease(this.z, dt * this.speed * extraSpeed, track.getLength());

      
      this.y = utilInterpolate(currentSegment.p1.world.y, 
        currentSegment.p3.world.y, 
        this.percent);

      // ---------------------------------------------- JUMP!!!
      // make the car jump if going fast..
      // y is the y position of the segment

        /*
      // gravity

      if(this.yOffset >= 0) {
        this.ySpeed -= dt * 75000;
      } else {
        this.ySpeed -= dt * 430000;
      }
      if(this.ySpeed < -2500) {
        this.ySpeed = -2500;
      }
      // get the dy for the y position of the track
      var dy = 0;
      if(this.lastY !== false) {
        dy = this.y - this.lastY;
        if(dy < -1000) {
          dy = 0;
        }

      }
      this.lastY = this.y;


      if(this.yOffset <= 0) {
        // was last on ground, so y speed is based on y position of segment

        var ydistTravelled = this.ySpeed * dt;
        // y offset is 
        this.yOffset = this.ySpeed * dt - dy;
        if(this.yOffset <= 0) {
          // we're on the ground
          this.ySpeed = dy / dt;
          this.yOffset = 0;
        }

      } else {
        // in air..
        this.yOffset += this.ySpeed * dt;
        if(this.yOffset < 0) {
          // we've landed
          this.yOffset = 0;
        }
      }


*/
      this.yOffset = 0;

      // -------------- END JUMP
      
      if(this.accelerate) {
        
        if(this.turbo) {
          var time = getTimestamp();
          if(!turboOn) {
            this.turboStartTime = time;
          }
          // decrease the amount of turbo left
          this.turboAmount -= dt * 2.45;
          raceAudioSetTurboTime(time - this.turboStartTime);
        }
        if(this.speed < maxSpeed * mult) {
          this.speed = this.doaccelerate(this.speed, this.accel * accMult, dt);
        } else {

          // going too fast, need to decelerate
          this.speed = this.doaccelerate(this.speed, this.decel, dt);
          if(this.speed < maxSpeed * mult) {
            this.speed = maxSpeed * mult;
          }
        }
      } else if(this.brake) {
        this.speed = this.doaccelerate(this.speed, this.breaking, dt);
      } else {
        // not accelerating or breaking, so just decelerate
        this.speed = this.doaccelerate(this.speed, this.decel, dt);
      }


      // check for collisions with roadside objects
      for(var n = 0 ; n < playerSegment.sprites.length ; n++) {
        var sprite  = playerSegment.sprites[n];
        var spriteW = sprite.s * sprite.source.cw;
        var spriteX = sprite.x + sprite.source.cx * sprite.s;
        // check for collision will roadside object, same segment and rects overlap
        var carX = this.x;
        if (this.overlap(carX, 
          this.width, 
          spriteX, 
          spriteW, 1)) {

          if(this.index == 0) {
            raceAudioCrash();
            this.slipstream = 0;
            this.slipstreamTime = 0;
          }
          this.speed = maxSpeed/5;
          this.z = utilIncrease(playerSegment.p1.world.z, 0, track.getLength()); // stop in front of sprite (at front of segment)
          break;
        }
      }
      
      var isBehind = false;
      for(var i = 0; i < cars.length; i++) {
        var distance = cars[i].z - player.z;
        if(player.z > track.getLength() - 1200) {
          distance -= track.getLength();
        }

        if(distance > 0 && distance < 1800) {
          var offCentre =  (player.x - cars[i].x) / cars[i].width;
          if(offCentre < 0) {
            offCentre = - offCentre;
          }
          if(offCentre < 0.4) {
            isBehind = true;
          }
        }
      }

      if(isBehind && this.speed > 8000) {
        this.slipstream += dt * 1;
        if(this.slipstream > 0.14) {
          this.slipstreamTime = 2;
        }
      } else {
        this.slipstream = 0;
      }

      if(this.slipstreamTime > 0) {
        this.slipstreamTime -= dt;
      }      

    } else {
      if(this.speed < maxSpeed) {
        this.speed = this.doaccelerate(this.speed, this.accel, dt);
      }

      var turnDir = this.updateCarPosition(currentSegment, playerSegment, player.width);
      var newX  = this.x + turnDir * dx;

      if(currentSegment.curve == 0) {
        this.turnLeft = turnDir == -1;
        this.turnRight = turnDir == 1;
      } else {
        this.turnLeft = currentSegment.curve < -0.5;
        this.turnRight = currentSegment.curve > 0.5;
      }
        

      if(newX + this.width < trackRight * 0.6 && newX > trackLeft * 0.8) {
        this.x = newX;
      }
      this.z = utilIncrease(this.z, dt * this.speed, track.getLength());      
    }

    this.percent = utilPercentRemaining(this.z, Track.segmentLength); // useful for interpolation during rendering phase
    var newSegment  = track.findSegment(this.z);


    // check collisions with other cars
    // check other cars

    if(this.index === 0) {
      for(n = 0 ; n < newSegment.cars.length ; n++) {
        var car  = newSegment.cars[n];

        if(car.index != this.index) {
          if (this.speed > car.speed) {
            // check for collision with other car, same segment and rects overlap
            if (this.overlap(this.x, this.width,
              car.x, car.width, 1)) {
              if(this.index !== 0) {
                this.speed = car.speed / 2;
                if(car.index !== 0) {
                  car.speed = car.speed * 1.2;
                }
              } else {
                if(this.index == 0) {
                  raceAudioCrash();
                  this.slipstream = 0;
                  this.slipstreamTime = 0;
      
                }
      
                this.speed = car.speed ;
                this.z = car.z - 100;
              }
              break;
            }
          }
        }
      }
    }


    // limit how far offroad a car can go
    if(this.x + this.width / 2 < trackLeft - 1.2 * this.width) {
      this.x = trackLeft - 1.2 * this.width - this.width / 2;
    }

    if(this.x + this.width / 2 > trackRight + 1.2 * this.width) {
      this.x = trackRight + 1.2 * this.width - this.width / 2;
    }
    

    // limit the speed to max speed
    this.speed   = this.limit(this.speed, 0, maxSpeed); // or exceed maxSpeed



    if(this.index == 0) {
      raceAudioEngineSpeed(this.speedPercent);
    }


    if (currentSegment != newSegment) {
      var index = currentSegment.cars.indexOf(this);
      currentSegment.cars.splice(index, 1);
      newSegment.cars.push(this);
    }


    // next lap?
    if(this.z < Track.segmentLength * 1.2 && !this.lapStarted) {    
      this.lap++;
      this.lapStarted = true;
      this.lastLapTime    = this.currentLapTime;

      if(this.lap == 2 && this.index == 0) {//!== 1 && this.lap !== 3) {
        speak("lap time " + this.getCurrentLapTime().toFixed(2));

      }
      this.currentLapTime = 0;
    } else {
      if(this.z > Track.segmentLength * 1.2) {
        this.lapStarted = false;
      }
      this.currentLapTime += dt;
    }

    // work out position, position relies on current lap
    var currentPosition = this.position;
    this.position = 1;
    for(var i = 0; i < cars.length; i++) {
      if(i != this.index) {
        if(cars[i].lap > this.lap) {
          this.position++;
        } else if(cars[i].lap === this.lap) {
          if(cars[i].z > this.z) {
            this.position++;
          }
        }
      }
    }

    if(this.index == 0) {
      if(this.newPositionTime > 0) {
        this.newPositionTime -= dt;        
      }
      if(this.position !== currentPosition) {
        // new position!
        this.newPosition = this.getPosition();
        this.newPositionTime = 1;
      }
    }



    if(this.index === 0 && this.lap === 3 && race.state != STATE_RACEOVER) {
      // race over!!!
      this.finishPosition = this.getPosition();
      speak("Race. Over.")
      speak(this.finishPosition + " Place");

      this.turbo = false;
      this.slipstream = 0;
      this.slipstreamTime = 0;

      race.raceOver();
    } 




  },

  /*
  workOutPosition: function() {
    // work out position
    this.position = 0;
    for(var i = 0; i < cars.length; i++) {
      if(cars[i].lap > this.lap) {
        this.position++;
      } else if(cars[i].lap === this.lap) {
        if(cars[i].z > this.z) {
          this.position++;
        }
      }
    }
  },
  */

  updateCarPosition: function(carSegment, playerSegment, playerWidth) {
    var lookAhead = 60;

    var segment = null;

    var trackSegments = track.getSegmentCount();


    for(var i = 1; i < lookAhead; i++) {
      segment = track.getSegment( (carSegment.index+i) % trackSegments );
      var trackLeft = segment.p1.world.x;
      var trackRight = segment.p2.world.x;
      var dir = 0;

      // avoid other cars less than 8 segments ahead
      if(i < 8) {


        /*
        if ((segment === playerSegment) 
        && (this.speed > player.speed) 
        && (this.overlap(otherCarLeft, otherCarWidth, this.x, this.width, 1.2))) {
        */
        for(n = 0 ; n < segment.cars.length ; n++) {
          var otherCar = segment.cars[n];

          var otherCarLeft = otherCar.x;
          var otherCarWidth = otherCar.width;
          var otherCarRight = otherCar.x + otherCar.width;
  

          if(trackRight - otherCarRight < this.width * 1.4) {
            // can't fit on the right
            dir = -1;
          } else if( otherCarLeft - trackLeft < this.width * 1.4) {
            dir = 1;
          } else {
            if(otherCarLeft - trackLeft > trackRight - otherCarRight) {
              dir = -1;
            } else {
              dir = 1;
            }
//            dir = (this.x > otherCarLeft) ? 1 : -1;
          }

          return dir * 3/i ;//* (this.speed-player.speed)/maxSpeed;
        }

      }
    }

    if(this.takeCornerOnInside) {

      for(var i = 1; i < lookAhead; i++) {
        segment = track.getSegment( (carSegment.index+i) % trackSegments );
        var trackLeft = segment.p1.world.x;
        var trackRight = segment.p2.world.x;
    
        if(segment.curve > 0) {
          // move to the right
          if(i < 5) {
            return 1 / (5);
          }
          return 2 / i;
        }

        if(segment.curve < 0) {
          // move to the left
          if(i < 5) {
            return -1/ (5);
          } 
          return 2 / i;
        }

      }
    }

    return 0;
  }
}


// define the tracks in the game
var COLORS_KERBLIGHT = '#a02222',
    COLORS_KERBDARK = '#BBBBBB',
    COLORS_LANDLIGHT = '#000000',
    COLORS_LANDDARK = '#000000',
    COLORS_ROAD = '#000000';

var Track = function() {
  this.trackLength = 0;
  this.currentAngle = 0;

  this.segments = [];
  this.map = null;
}

var laneWidth      =1200;// 1200;//2000;   

Track.segmentLength  = 300;                   
            
var lanes          = 1;                       

Track.prototype = {
  buildTrack0: function() {
    COLORS_FOG = 0;

    this.segments = [];
    this.addStraight(200);
    this.calculateLength();    
  },

  createStreetLights: function() {
    var segmentCount = this.getSegmentCount();
    
    for(var i = 0; i < segmentCount; i++) {
      var segment = this.segments[i];

      if(i % 20 == 0) {
        var x = segment.p1.world.x;
        segment.sprites.push({ 
          source: SPRITES_STREETLIGHTLEFT, 
          s: 12, 
          x: x  - 12 * SPRITES_STREETLIGHTLEFT.w + 700
        });

        var x = segment.p2.world.x;
        segment.sprites.push({ 
          source: SPRITES_STREETLIGHTRIGHT, 
          s: 12, 
          x: x  - 700
        });
      }
    }
  },

  createRoadsideObjects: function(objs, prob, scale, offset, turnSigns) {
    var segmentCount = this.getSegmentCount();
    var turnSegment = 0;
    for(var i = 0; i < segmentCount; i++) {
      var segment = this.segments[i];
      var r = mathRand();
      if(segment.curve != 0 && turnSigns) {    
        if(turnSegment % 20 == 0) {
          if(segment.curve > 0) {
            var x = segment.p1.world.x;
            segment.sprites.push({ 
              source: SPRITES_TURNRIGHT, 
              s: 3, 
              x: x - 3 * SPRITES_TURNRIGHT.w - 400
            });
          } else {
            var x = segment.p2.world.x;
            segment.sprites.push({ 
              source: SPRITES_TURNLEFT, 
              s: 3, 
              x: x + 400
            });
          }
        }
        turnSegment++;
      } else {
        turnSegment = 0;
//      if(segment.curve == 0 || !turnSigns) {
        var obj = objs[mathRandInt(objs.length)];
        if(r > prob) {
          var x = segment.p1.world.x;

          segment.sprites.push({ 
            source: obj, 
            s: scale, 
            x: x  - scale * obj.w / 2 - offset
          });

          var x = segment.p2.world.x;
          segment.sprites.push({ 
            source: obj, 
            s: scale, 
            x: x - scale * obj.w / 2 + offset
          });
        }
      }
    }
  },

  buildTrack1: function() {

    COLORS_ROAD = '#3a3a3a';

    COLORS_LANDLIGHT = '#047804',
    COLORS_LANDDARK = '#006A00';
    COLORS_LANEMARKER = MEDIUMGREY;    
    COLORS_FOG = 0;

    resetGraphics();

    createTurnArrows();
    createTrees();
    createBackgroundTrees();
    createBackgroundMountains();
    createCars();

    var t = this;

    t.addStraight(50);
    t.addEasyCurve90(1, 0);
    t.addRoad(50, 50, 39, 0, 40, 0);

    t.addEasyCurve90(1, 0);  

    t.addStraight(25);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0);

    t.addHill(50, 40);

    t.addEasyCurve90(1, 0);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0);
  
    t.addEasyCurve90(1, -40);   


    t.addStraight(50, -40);    
    t.addStraight(55,0);

    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects(SPRITES_TREES, 0.9, 10, 900, true);

  },

  buildTrack2: function() {
    COLORS_ROAD = '#3a3a3a';

    COLORS_LANDLIGHT = '#047804';
    COLORS_LANDDARK = '#006A00';
    COLORS_LANEMARKER = MEDIUMGREY;
    COLORS_FOG = 0;

    resetGraphics();
    createCars();

    createTurnArrows();
    createTrees();
    createBackgroundTrees();
    createBackgroundMountains();
    createFlowers();

    var t = this;
    t.addStraight(20);
    t.addStraight(46, 0);
    t.addEasyCurve90(1, 30);


    t.addStraight(90, 0);
    t.addMediumCurve90(1, 0);

    t.addStraight(25, 0);
    t.addMediumCurve90(1, 50);
    t.addStraight(25, 0);

    t.addMediumCurve90(-1, 0);
    t.addStraight(68, -50);

    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(48, 0);

    t.addEasyCurve90(1, -30);
    t.addStraight(38, 0);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0)

    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects([SPRITES_FLOWERS], 0.3, 6, 1300, true);
  },  


  buildTrack3: function() {
   COLORS_ROAD = '#3a3a3a';

   COLORS_LANDLIGHT = '#5a5a5a';
   COLORS_LANDDARK = '#626262';

   COLORS_LANEMARKER = MEDIUMGREY;
   COLORS_FOG = 0;//'#eeeeee';

    resetGraphics();
    createCars();

    createBuildings(false);
    createStreetlights(false);
    createBackgroundBuildings(false);
    createNightSky();

    var t = this;

    t.addStraight(100);
    t.addMediumCurve90(1, 0);
    t.addStraight(151, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(30, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(80, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(-1, 0);

    t.addStraight(20, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(10, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(50, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(62, 0);

//    t.getSegment(0).color = COLORS.START;
    t.calculateLength();
    t.drawMap();
    t.createRoadsideObjects(SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    t.createStreetLights();

  },


  buildTrack4: function() {
    COLORS_ROAD = '#111111';
    COLORS_LANEMARKER = '#555555';    
    COLORS_FOG = '#000000';
    COLORS_LANDLIGHT =  '#090909';
    COLORS_LANDDARK = '#030303';


    resetGraphics();
    createCars();
    createBuildings(true);
    // createTurnArrows();
    createStreetlights(true);
    createBackgroundBuildings(true);
    // createBackgroundMountains();
    createNightSky();

    var t = this;
    t.addStraight(100);
    t.addHardCurve180(1, 0);
    t.addHardCurve90(-1, 0);
    t.addStraight(40, 0);
    t.addHardCurve90(1, 0);
    t.addHardCurve90(-1, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(50, 0);
    t.addMediumCurve90(-1, 0);
    t.addStraight(20, 0);
    t.addMediumCurve90(1, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(60, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(51, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(110, 0);
    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects(SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    t.createStreetLights();
  },

  lastY: function() { 
    return (this.segments.length == 0) ? 0 : this.segments[this.segments.length-1].p3.world.y; 
  },

  getSegment: function(index) {
    return this.segments[index];    
  },

  getSegmentCount: function() {
    return this.segments.length;
  },

  getLength: function() {
    return this.trackLength;
  },

  calculateLength: function() {
    this.trackLength = track.segments.length * Track.segmentLength;
    

  },

  addSegment: function(curve, y) {
    var n = this.segments.length;

    var yFront = this.lastY();
    var yBack = y;
    var zFront = n * Track.segmentLength;
    var zBack = (n+1)*Track.segmentLength;
    var xLeft = -laneWidth;
    var xRight = laneWidth;

    var kerbWidth = 0;
    if(curve != 0) {
      kerbWidth = curve * 40;
      if(kerbWidth < 0) {
        kerbWidth = -kerbWidth;
      }
      kerbWidth += 60;

    }
    this.segments.push({
      index: n,
      p1: { world: { x: xLeft,  y: yFront,  z:  zFront }, camera: {}, screen: {} },
      p2: { world: { x: xRight, y: yFront,  z:  zFront }, camera: {}, screen: {} },
      p3: { world: { x: xRight, y: yBack, z:  zBack }, camera: {}, screen: {} },
      p4: { world: { x: xLeft,  y: yBack, z: zBack }, camera: {}, screen: {} },
      curve: curve,
      kerbWidth: kerbWidth,
      sprites: [],
      cars: []
    });

  },

  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },

  addRoad: function(enter, hold, leave, curve, y, curveAngle) {
    var curveAngle = curveAngle || 0;
    var exitAngle = this.currentAngle + curveAngle;
    
    var startY   = this.lastY();
    var endY     = startY + (Math.floor(y) * Track.segmentLength);
    var n, total = enter + hold + leave;
    var segmentCurve = 0;
    var totalCurve = 0;
    var firstSegment = this.segments.length;
    for(n = 0 ; n < enter ; n++) {
      segmentCurve = this.easeIn(0, curve, n/enter);
      totalCurve += segmentCurve;
      this.addSegment(segmentCurve, this.easeInOut(startY, endY, n/total));
    }
    for(n = 0 ; n < hold  ; n++) {
      segmentCurve = curve;
      totalCurve += segmentCurve;
      this.addSegment(curve, this.easeInOut(startY, endY, (enter+n)/total));
    }
    for(n = 0 ; n < leave ; n++) {
      segmentCurve = this.easeInOut(curve, 0, n/leave);
      totalCurve += segmentCurve;
      this.addSegment(segmentCurve, this.easeInOut(startY, endY, (enter+hold+n)/total));
    }
  
    var anglePerCurve = 0;
    if(totalCurve != 0) {
      anglePerCurve = (exitAngle - this.currentAngle) / totalCurve;
    }
  
    // fix the angles
    for(var i = firstSegment; i < this.segments.length; i++) {
      this.currentAngle += this.segments[i].curve * anglePerCurve;
      this.segments[i].angle = this.currentAngle;
    } 
  
    this.currentAngle = exitAngle;
    this.segments[this.segments.length - 1].angle = exitAngle;
  },

  addStraight: function(len, height) {
    height = height || 0;
    this.addRoad(len, len, len, 0, height, 0);
  },

  addBumps: function() {
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -2);
    this.addRoad(10, 10, 10, 0, -5);
    this.addRoad(10, 10, 10, 0,  8);
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -7);
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -2);
  },

  addEasyCurve90: function(direction, height) {
    
    this.addRoad(25, 100 * 1.4, 25,
       direction * 4.25, height, direction * 90);
  },

  addEasyCurve30: function(direction, height) {
    this.addRoad(25, 50, 25,
       direction * 4.25, height, direction * 30);
  },

  addMediumCurve90: function(direction, height) {
    this.addRoad(25, 
        50 * 1.5, 
        25, 
        direction * 6 * 0.96, 
        height, direction * 90);
  },

  addHardCurve90: function(direction) {
    //7.5
    this.addRoad(18, 50 * 0.8, 18, direction * 8, 0, direction * 90);
  },
  addHardCurve180: function() {
    this.addRoad(50, 50, 50, 7.5, 0, 180);
  },

  addHill: function(num, height) {
    this.addRoad(num, num, num, 0, height, 0);
  },

  addRoadsideObject: function(n, sprite, offset) {
    var segment = this.segments[n];
    var x = 0;
    if(offset < 0) {
      x = segment.p1.world.x - 600;
    } else {
      x = segment.p2.world.x + 600;
    }
    segment.sprites.push({ source: sprite, x: x });
  },


  /*
  When the car reaches the end of the road we will simply loop back to the beginning. 
  To make this a little easier we provide a method to find the segment for any Z value
  even if it extends beyond the length of the road:
  */
  findSegment: function(z) {
    return this.segments[Math.floor(z / Track.segmentLength) % this.segments.length];
  },

  drawMap: function() {
    if(this.map == null) { 
      this.map = document.createElement('canvas');
    }
    this.map.width = 600;
    this.map.height = 600;
    cntx = this.map.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;
//    context.fillStyle = '#222222';
//    context.fillRect(0, 0, width, height);
    cntxClearRect(600, 600);
    cntxStrokeStyle('#666666');
    cntx.lineWidth = 5;
  
    var angle = 0;
    var x = 300;
    var y = 30;
  

  
    cntxBeginPath();
    var segmentDrawLength = 0.5;
    cntxMoveTo(x, y);
    for(var i = 0; i < this.segments.length; i++) {
      angle = (this.segments[i].angle / 180) * PI;
      x += segmentDrawLength * cos(angle);
      y += segmentDrawLength * sin(angle);
      cntxLineTo(x, y);

      // in 2d overhead view
      this.segments[i].x = x;
      this.segments[i].y = y;
    }
  
    cntxStroke();
  
    cntxStrokeStyle(LIGHTGREY);
    cntx.lineWidth = 4;
    cntxStroke();



    // draw the start line
    segmentDrawLength = 4;
    context.lineWidth = 3;
    cntxStrokeStyle(LIGHTGREY);
    cntxBeginPath();
    angle = ((this.segments[0].angle + 90) / 180) * PI;
    x -= segmentDrawLength * cos(angle);
    y -= segmentDrawLength * sin(angle);
    cntxMoveTo(x, y);
    x += 2 * segmentDrawLength * cos(angle);
    y += 2 * segmentDrawLength * sin(angle);
    cntxLineTo(x, y);
  
    cntxStroke();
  },


  drawOverheadTrack: function() {
    //var canvas = document.getElementById('trackCanvas');
    cntx = overheadTrack.x;//canvas.getContext('2d');
    this.overheadMap = overheadTrack.c;

    cntxClearRect(600, 600);
    cntxDrawImage(this.map, 0, 0, 600, 600, 0, 0, 600, 600);
  
    // opponents
    for(var i = 0; i < cars.length; i++) {
      var carPosition = cars[i].z;
      var segment = track.findSegment(carPosition);
      
      cntxBeginPath();
    
      cntxArc(segment.x, segment.y, 5, 0, 2 * PI, false);
      cntxFillStyle(DARKGREY);
      cntxFill();
      cntx.lineWidth = 2;
      cntxStrokeStyle('#999999');
      cntxStroke();
    }

    // camera z position plus player z position from camera
    var playerPosition = cars[0].z;
    var playerSegment = track.findSegment(playerPosition);
  
    cntxBeginPath();
    cntxArc(playerSegment.x, playerSegment.y, 5, 0, 2 * PI, false);
    cntxFillStyle('#ff0000');
    cntxFill();

    context.lineWidth = 2;
    cntxStrokeStyle(MEDIUMGREY);
    cntxStroke();
        
  }
}







// controls the race

var track = null;

var numbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'];
var Race = function() {
  this.track = null;
//  this.player = null;

  this.state = 0;
  this.countdownNumber = 3;
  this.lastTime = 0 ;

  this.carCount = 15;// 10;

  this.trackNumber = 0;

  this.zIsDown = false;
  this.xIsDown = false;

  this.raceNumber = 3;
}

var STATE_PRERACE = 0;
var STATE_COUNTDOWN = 1;
var STATE_RACING = 4;
var STATE_RACEOVER = 5;

Race.COUNTDOWN_INTERVAL = 800;//800;//800;//1;//800;

Race.prototype = {
  init: function() {
    // init never gets called?
  },

  start: function(trackNumber) {
    raceAudioEngineSpeed(0);

    if(trackNumber >= 4) {
      trackNumber = 0;
    }
    trackNumber = 3;
    this.raceNumber = trackNumber;
    track = new Track();

    switch(trackNumber) {
      case 0:
        track.buildTrack1();
        break;
      case 1:
        track.buildTrack2();
        break;
      case 2:
        track.buildTrack3();
        break;
      case 3:
        track.buildTrack4();
        break;

    }

    this.resetCars();
    player = cars[0];
    player.initSlipstreamLines();

    this.state = STATE_PRERACE;
    this.countdownNumber = 4;
    this.lastTime = getTimestamp();

  },

  raceOver: function() {
    this.state = STATE_RACEOVER;
  },

  keyDown: function(e) {
    if(this.state !== STATE_RACEOVER) {
      switch(e.keyCode) {
        case 90: // z
          this.zIsDown = true;
          player.setDrift(true);
          break;
        case 88: // x
          this.xIsDown = true;
          player.setTurbo(true);
          break;
        case KEYUP:
          player.setAccelerate(true);
          break;
        case KEYDOWN:
          player.setBrake(true);
          break;
        case KEYLEFT:
          player.setTurnLeft(true);
          break;
        case KEYRIGHT:
          player.setTurnRight(true);
          break;
      }
    } else {
    }
    
  },

  keyUp: function(e) {


    if(this.state != STATE_RACEOVER) {
      switch(e.keyCode) {
        case 90: // z
          this.zIsDown = false;
          player.setDrift(false);
          break;
        case 88:
          this.xIsDown = false;
          player.setTurbo(false);
          break;
        case KEYUP:
          player.setAccelerate(false);
          break;
        case KEYDOWN:
          player.setBrake(false);
          break;
        case KEYLEFT:
          player.setTurnLeft(false);
          break;
        case KEYRIGHT:
          player.setTurnRight(false);
          break;
      }
    } else {
      if(e.keyCode == 90) {
        if(!this.zIsDown) {
          // retry race

          this.start(this.raceNumber);
        }
        this.zIsDown = false;
      }

      if(e.keyCode == 88) {
        if(!this.xIsDown) {
          // next race
          if(cars[0].finishPosition == '1st') {
            this.start(this.raceNumber + 1);
          }
        }
        this.xIsDown = false;
      }

    }
  },

  
  resetCars: function() {
    //    resetCars();
    cars = [];
    var n, car, segment, offset, z, sprite, speed;
    for (var n = 0 ; n < this.carCount ; n++) {
      z = track.getLength() - (this.carCount - n) * Track.segmentLength * 13;

      segment = track.findSegment(z);

      var trackLeft = segment.p1.world.x;
      var trackRight = segment.p2.world.x;
//      var trackWidth = trackRight - trackLeft;

//      sprite = SPRITES.CAR_STRAIGHT;

      car = new Car();

      var x = 0;
      if(n%2) {
        x = trackLeft / 2;
      } else {
        x = trackRight / 2 - car.width;

      }


      car.index = n;
//      car.offset = offset;
      car.x = x;
      car.z = z;
      car.sprite = sprite;
      car.speed = 0;//speed;      
      car.percent = utilPercentRemaining(car.z, Track.segmentLength);  

      // player speeds are set in car.js
      if(car.index !== 0) {
        var maxSpeed = 23000;//23000;
        if(car.index < 8 && car.index > 3) {
          car.maxSpeed = maxSpeed * 0.905 - mathRand() * (this.carCount - n - 1) * maxSpeed / 55;
        } else if(car.index > 12) {
          car.maxSpeed = maxSpeed * 0.905 - (this.carCount - n - 1) * maxSpeed / 65;
        } else {
          car.maxSpeed = maxSpeed * 0.905 - (this.carCount - n - 1) * maxSpeed / 45;
        }
        car.accel = maxSpeed / 2;  
        
        if(car.index < 4) {
          car.takeCornerOnInside = false;
        } else if(car.index < 8) {
          car.takeCornerOnInside = mathRand() > 0.4;
          car.slowOnCorners = mathRand() > 0.6;
        }
      }
      segment.cars.push(car);
      cars.push(car);
    }

  },

  updatePrerace: function(dt) {
    var time = getTimestamp();
    if(time - this.lastTime > Race.COUNTDOWN_INTERVAL) {
      this.lastTime = getTimestamp();
      this.countdownNumber--;
      if(this.countdownNumber == 3) {
        speak('RACE');
      }
      if(this.countdownNumber == 2) {
        speak(numbers[this.raceNumber]);
      }
      if(this.countdownNumber <= 0) {
        this.state = STATE_COUNTDOWN;
        this.countdownNumber = 3;
        raceAudioTone(220, 1/4);
//        speak(this.countdownNumber);
      }
    }
    camera.update(dt);

  },

  updateCountdown: function(dt) {
    var time = getTimestamp();
    if(time - this.lastTime > Race.COUNTDOWN_INTERVAL) {
      this.lastTime = getTimestamp();
      this.countdownNumber--;
      if(this.countdownNumber <= 0) {
        raceAudioTone(440, 1/2);
        this.state = STATE_RACING;
      } else {
        raceAudioTone(220, 1/4);
//        speak(this.countdownNumber);
      }
    }
    camera.update(dt);
  },

  updateRace: function(dt) {
    var playerSegment = track.findSegment(player.z);
    var speedPercent  = player.speedPercent;//player.speed / maxSpeed;
    var dx            = dt * 2 * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
    var startPosition = camera.z;
  
    for(var i = 0; i < cars.length; i++) {
      cars[i].update(dt);//, playerSegment, player.width);
    }
  //  updateCars(dt, playerSegment, player.width);
  
//    player.update(dt);
    camera.update(dt);


    bgLayer3Offset  = utilIncrease(bgLayer3Offset,  bgLayer3Speed  * playerSegment.curve * (camera.z-startPosition) / Track.segmentLength, 1);
    bgLayer2Offset = utilIncrease(bgLayer2Offset, bgLayer2Speed * playerSegment.curve * (camera.z-startPosition) / Track.segmentLength, 1);
    bgLayer1Offset = utilIncrease(bgLayer1Offset, bgLayer1Speed * playerSegment.curve * (camera.z-startPosition) / Track.segmentLength, 1);


  },

  updateRaceOver: function() {

  },

  update: function(dt) {
    switch(this.state) {
      case STATE_PRERACE:
        this.updatePrerace(dt);
        break;
      case STATE_COUNTDOWN:
        this.updateCountdown(dt);
        break;
      case STATE_RACEOVER:
      case STATE_RACING:
        this.updateRace(dt);
        break;
    }
  },

  render: function() {
    renderRender();
    if(this.state == STATE_PRERACE) {
//      context.font = "120px \"Courier New\", Courier, monospace";
      context.font = 'italic bold 350px ' + helvetica;

      if(this.countdownNumber < 4) {
        cntxFillStyle(DARKGREY);
        cntxFillText("RACE", 14, 304);  
        cntxFillStyle(LIGHTGREY);
        cntxFillText("RACE", 10, 300);  
      }

      if(this.countdownNumber < 3) {
        if(this.raceNumber == 0) {
          context.font = 'italic bold 440px ' + helvetica;
        } else if(this.raceNumber == 1) {
          context.font = 'italic bold 430px ' + helvetica;
        } else if(this.raceNumber == 2) {
          context.font = 'italic bold 290px ' + helvetica;
        } else if(this.raceNumber == 3) {
          context.font = 'italic bold 358px ' + helvetica;
        }

        cntxFillStyle(DARKGREY);
        cntxFillText(numbers[this.raceNumber], 14, 674);  
        cntxFillStyle(LIGHTGREY);
        cntxFillText(numbers[this.raceNumber], 10, 670);  
      }

    }

    if(this.state == STATE_COUNTDOWN) {

      context.font = ' 300px ' + helvetica;
      context.fillStyle= '#111111';
      context.fillText(this.countdownNumber, 449, 254);  
      context.fillStyle= LIGHTGREY;
      context.fillText(this.countdownNumber, 445, 250);  


    }
    
    if(this.state == STATE_RACING) {

      cntxFillStyle(LIGHTGREY);
      cntxStrokeStyle(LIGHTGREY);
      context.font = ' 80px ' + helvetica;
      context.fillText(player.getPosition(), 10, 80);

      context.font = ' 40px ' + helvetica;
      context.fillText("Lap " + player.getLap() + " of 2", 10, 130);
      context.fillText("Lap Time: " + player.getCurrentLapTime().toFixed(2), 10, 180);


      context.font = ' 80px ' + helvetica;

      var speed = ("000" + Math.round(player.getSpeed() / 100 ).toString(10)).substr(-3);
      context.fillText( speed + "km/h", 695, 80);
      context.font = ' 40px ' + helvetica;

      context.fillText( "Turbo ", 670, 136);
      cntxBeginPath();
      context.rect(796, 110, 208, 28);
      cntxStroke();      
      cntxFillRect(800, 114, player.turboAmount * 2, 20);

      if( cars[0].newPositionTime > 0) {
        context.font = ' 160px ' + helvetica;
        cntxFillStyle(LIGHTGREY);
        context.fillText(cars[0].getPosition(), 334, 184);
      }

    }

    if(this.state == STATE_RACEOVER) {
      context.font = ' 300px ' + helvetica;
      cntxFillStyle(LIGHTGREY);
      context.fillText(cars[0].finishPosition, 300, 290);//cars[0].finishPosition, 494, 254);
      context.font = ' 40px ' + helvetica;
      var y = 380;
      if(cars[0].finishPosition == '1st') {
        context.fillText("x: Next Race", 397, y);
        y += 80;
      }
      context.fillText("z: Retry", 445, y);
    }


  }
}


// entry point, set up main loop

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var racing = false;

var getTimestamp = function() { return performance.now(); };


document.addEventListener("keydown", function(e) {
  if(racing) {
    race.keyDown(e);
  } else {
    titleScreen.keyDown(e);
  }
});


document.addEventListener("keyup", function(e) {
  if(racing) {
    race.keyUp(e);
  } else {
    titleScreen.keyUp(e);
  }
});


var now = getTimestamp();
var last = getTimestamp();

var dt = 0;
var gdt = 0;

var cars           = [];                      // array of cars on the road
var player = null;
var camera = new Camera();
var race = new Race();
track = new Track();
var titleScreen = new TitleScreen(canvas, context);

function startGame(options) {
  raceAudioInit();
  speak('Start');
  racing = true;
  camera.reset();
  race.start(0);

}
titleScreen.init();

/*
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/

function frame() {
//  stats.begin();

  now = getTimestamp();
  dt  = Math.min(1, (now - last) / 1000); 
  gdt = gdt + dt;

  if(!racing) {
    titleScreen.render(dt);
    gdt = 0;
  } else {
    outlineOnly = false;

    var step = 1/180;
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




var audioCtx = null;
var noiseBuffer = null;
var audioScriptNode = null;
var audioScriptGain = null;
var audioEngineFrame = 0;
var audioTurboFrame = 0;
var audioScriptSpeed = 1;
var audioTurboSpeed = 1;

var audioEngineData = [];
var audioTurboData = [];

function raceAudioSetTurboTime(t) {
  audioTurboSpeed = 1 + t / 10000;

}

function raceAudioInit() {
  if(audioCtx == null) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    raceAudioCreateEngineBuffer();
    raceAudioCreateTurboBuffer();
    raceAudioCreateNoiseBuffer();

//    drawBuffer(audioTurboData);


    audioScriptNode = audioCtx.createScriptProcessor(1024, 1, 1);
    audioScriptNode.onaudioprocess = function(e) {
      //audioEngineData = audioTurboData;

      var channel = e.outputBuffer.getChannelData(0);
      var index;

      for (var i = 0; i < channel.length; ++i) {
        // skip more data frames on higher speed

        if(player.turbo) {
          audioEngineFrame += audioScriptSpeed+ Math.random();
          audioTurboFrame += audioTurboSpeed ;
            index = Math.floor(audioTurboFrame) % audioTurboData.length;
          channel[i] = audioTurboData[index];// + Math.random() * 0.2;
          index = Math.floor(audioEngineFrame) % audioEngineData.length;
          channel[i] += audioEngineData[index] + Math.random() * 0.01;

        } else {
          audioEngineFrame += audioScriptSpeed + Math.random() * 1;
            index = Math.floor(audioEngineFrame) % audioEngineData.length;
          channel[i] =  audioEngineData[index] + Math.random() * 0.01;
        }

        if(player.slipstreamTime > 0) {
          channel[i] += Math.random() * 0.4;
        }
        //channel[i] += audioEngineData[index] + Math.random() * 0.01;
      }
      audioEngineFrame %= audioEngineData.length;    
      audioTurboFrame %= audioTurboData.length;    
//      audioScriptCurrentFrame %= audioEngineData.length;

    }
    audioScriptGain = audioCtx.createGain();
    audioScriptGain.gain.value = 0.14;
    audioScriptNode.connect(audioScriptGain);
    audioScriptGain.connect(audioCtx.destination);
  }
}

function raceAudioCreateTurboBuffer() {
  var bufferSize = 1024;//2 * audioCtx.sampleRate;
  audioTurboData = [];
  var index = 0;
  
  for(var i = 0; i < bufferSize; i++) {
//    audioTurboData[i] = Math.random();
    for(var j = 0; j < 12; j++) {
      audioTurboData[index++] = Math.random() * 0.01;
      if(index >= bufferSize) {
        break;
      }
    }

    var v = 0.2;
  
    if(index < bufferSize) {
      for(var k = 0; k < 2; k++) {
        audioTurboData[index++] = v;
        
        if(index >= bufferSize) {
          break;;
        }
      }
    }
  }
  for (var i = 0; i < bufferSize; i++) {
    audioTurboData[i] += Math.random() * 0.5 - 0.05;// pinkNoise[Math.floor(i/4)];
  }
  


}
function raceAudioCreateEngineBuffer() {
  var bufferSize = 1024;//2 * audioCtx.sampleRate;
  audioEngineData = [];

  var lastValue = 1;
  //var lastPosition = 0;
  var nextValue, nextPosition;

  var index = 0;
  audioEngineData[index++] = 1;

  for (var i = 0.05; i < 1; i += Math.random()/8+0.01) {
    nextPosition = Math.floor(i * bufferSize);
    nextValue = Math.random() * 2 - 1;
    var positionDiff = nextPosition - (index - 1);
    var step = (nextValue - lastValue) / positionDiff;
    for (var j = 0; j < positionDiff; j++) {
      audioEngineData[index++] = lastValue + step * j;
    }
    lastValue = nextValue;
  }
  
  positionDiff = bufferSize - (index - 1);
  var step = (1 - lastValue) / positionDiff;
  for (var j = 0; j < positionDiff; j++) {
    audioEngineData[index++] = lastValue + step * j ;
  }


}

function raceAudioCreateNoiseBuffer() {

  var bufferSize = 2 * audioCtx.sampleRate;
  noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  var output = noiseBuffer.getChannelData(0);

  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
    
}

function raceAudioTone(freq, duration) {
  var gain = audioCtx.createGain();
    
  var osc = audioCtx.createOscillator();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = "triangle";//"sawtooth";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

function raceAudioEngineSpeed(speed) {
  audioScriptSpeed = 0.2 + speed * 2;
}

function raceAudioEngineStop() {
}


var lastCrashTime = 0;
function raceAudioCrash() {

  var crashTime = getTimestamp();
  if(crashTime - lastCrashTime < 1000) {
    return;

  }
  lastCrashTime = crashTime;

  var noteLength = 1/2;
  var gain = audioCtx.createGain();

  var audioSource = null;
  audioSource = audioCtx.createBufferSource();
  audioSource.connect(gain);
  gain.connect(audioCtx.destination);

  audioSource.buffer = noiseBuffer;

  gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime );//+ 1/64);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + noteLength * 0.7 );

  audioSource.playbackRate.setValueAtTime(0.035, audioCtx.currentTime);
  audioSource.playbackRate.setValueAtTime(0.002, audioCtx.currentTime + noteLength);
  audioSource.start(audioCtx.currentTime);
  audioSource.stop(audioCtx.currentTime+noteLength);
}


function drawBuffer(buffer) {

  var canvas = document.getElementById('debugCanvas');
  var context = canvas.getContext('2d');
  var mult = 200;
  context.strokeStyle = '#dddddd';
  context.beginPath();
  context.moveTo(0, 300 + buffer[0] * mult);

  for(var i = 1; i < buffer.length; i+=2) {
    context.lineTo(i, 300 + buffer[i] * mult);
  }
  context.stroke();

}


// say things
var english_voice = '';

function speak(text) {
  var available_voices = window.speechSynthesis.getVoices();

  if(english_voice == '') {

    for(var i=0; i<available_voices.length; i++) {
      if(available_voices[i].lang === 'en-GB') {
        english_voice = available_voices[i];
        break;
      }
    }

    if(english_voice === '' && available_voices.length > 0) {
      english_voice = available_voices[0];
    }
  }
  var utter = new SpeechSynthesisUtterance();
  utter.text = text;
  if(english_voice != '') {
    utter.voice = english_voice;
  }


  // speak
  window.speechSynthesis.speak(utter);
}


