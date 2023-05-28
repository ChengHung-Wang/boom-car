// draw all the race stuff to the screen
let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;
let resolution = height / 480;
let centreX ;
let centreY ;
let faceUrl= "data:image/jpeg;base64,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";

// titleScreen.js racer.js
var outlineOnly = false;

// draw a polygon
// NOT OK : outlineOnly
function renderPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    cntxFillStyle(color);
    cntxBeginPath();
    cntxMoveTo(x1, y1);
    cntxLineTo(x2, y2);
    cntxLineTo(x3, y3);
    cntxLineTo(x4, y4);
    cntxClosePath();
    if (outlineOnly) {
        cntxStrokeStyle(MEDIUMGREY);
        cntxStroke();
    } else {
        cntxFill();
    }
}

// draw a segment, coordinates passed in are screen coordinates
// NOT OK : outlineOnly
function renderSegment(segment) {
    const dark = Math.floor(segment.index / 2) % 2;// (segment.index / 2) % 2;

    let kerbColor = dark ? COLORS_KERBDARK : COLORS_KERBLIGHT;
    let landColor = dark ? COLORS_LANDDARK : COLORS_LANDLIGHT;

    // draw side land
    if (!outlineOnly) {
        cntxFillStyle(landColor);
        cntxFillRect(0, segment.p3.screen.y, width, segment.p1.screen.y - segment.p3.screen.y);
    }

    // draw kerb
    const r1 = segment.kerbWidth * segment.p1.screen.scale * width / 2;
    const r2 = segment.kerbWidth * segment.p4.screen.scale * width / 2;
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
    if (!outlineOnly) {
        let colour = (segment.index == 0) ? MEDIUMGREY : COLORS_ROAD;
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

    const l1 = 50 * segment.p1.screen.scale * width / 2;
    const l2 = 50 * segment.p4.screen.scale * width / 2;

    // lines on side of road
    let lanex1 = segment.p1.screen.x + 100 * segment.p1.screen.scale * width / 2;
    let lanex2 = segment.p4.screen.x + 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1 / 2,
        segment.p1.screen.y,
        lanex1 + l1 / 2,
        segment.p1.screen.y,
        lanex2 + l2 / 2,
        segment.p3.screen.y,
        lanex2 - l2 / 2,
        segment.p3.screen.y,
        COLORS_LANEMARKER);

    lanex1 = segment.p2.screen.x - 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p3.screen.x - 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1 / 2,
        segment.p1.screen.y,
        lanex1 + l1 / 2,
        segment.p1.screen.y,
        lanex2 + l2 / 2,
        segment.p3.screen.y,
        lanex2 - l2 / 2,
        segment.p3.screen.y,
        COLORS_LANEMARKER);

    // lane marker
    if (dark) { //segment.color.laneMarker) {
        const lanes = 2;
        let lanew1 = (segment.p2.screen.x - segment.p1.screen.x) / lanes;
        let lanew2 = (segment.p3.screen.x - segment.p4.screen.x) / lanes;
        lanex1 = segment.p1.screen.x + lanew1;
        lanex2 = segment.p4.screen.x + lanew2;
        for (let lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++) {
            renderPolygon(
                lanex1 - l1 / 2,
                segment.p1.screen.y,
                lanex1 + l1 / 2,
                segment.p1.screen.y,
                lanex2 + l2 / 2,
                segment.p3.screen.y,
                lanex2 - l2 / 2,
                segment.p3.screen.y,
                COLORS_LANEMARKER);
        }
    }

    if (COLORS_FOG != 0) {
        renderFog(0, segment.p1.screen.y, width, segment.p3.screen.y - segment.p1.screen.y, segment.fog);
    }
}

//---------------------------------------------------------------------------
// OK
function renderBackground(background, width, height, rotation, offset) {
    //    return;

    rotation = rotation || 0;
    offset = offset || 0;

    const imageW = BACKGROUNDLAYERWIDTH / 2;
    const imageH = BACKGROUNDLAYERHEIGHT;

    const sourceX = Math.floor(BACKGROUNDLAYERWIDTH * rotation);
    const sourceY = 0;
    const sourceW = Math.min(imageW, BACKGROUNDLAYERWIDTH - sourceX);
    const sourceH = imageH;

    const destX = 0;
    const destY = offset;
    const destW = Math.floor(width * (sourceW / imageW));
    const destH = height;

    context.drawImage(background.c, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
        context.drawImage(background.c, 0, sourceY, imageW - sourceW, sourceH, destW - 1, destY, width - destW, destH);
}

//---------------------------------------------------------------------------
// NOT OK : spritesCanvas (graphics.js)
function renderSprite(sprite, scale, destX, destY, clipY, fog) {
    const destW = (sprite.w * scale * width / 2);
    const destH = (sprite.h * scale * width / 2);

    //    destX = destX + (destW * (offsetX || 0));
    destY = destY - destH;// + (destH * (offsetY || 0));

    // clip y for appearing behind a hill..
    const clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
    if (clipH < destH) {
        context.drawImage(spritesCanvas,
            sprite.x,
            sprite.y,
            sprite.w,
            sprite.h - (sprite.h * clipH / destH),
            destX,
            destY,
            destW,
            destH - clipH);

        if (fog !== false && COLORS_FOG != 0) {
            renderFog(destX, destY, destW, destH, fog);//ctx, x, y, width, height, fog) {
        }
    }
}

//---------------------------------------------------------------------------
// OK
function renderExponentialFog(distance, density) {
    return 1 / (Math.pow(Math.E, (distance * distance * density)));
}

let lastDriftDraw = 0;
// NOT OK : SPRITES_CARLEFT, SPRITES_CARRIGHT, SPRITES_CARSTRAIGHT (graphics.js)
function renderPlayer(scale, destX, destY, steer, updown, playerShadowY) {
    let sprite;
    if (steer < 0) {
        sprite = SPRITES_CARLEFT;
    } else if (steer > 0) {
        sprite = SPRITES_CARRIGHT;
    } else {
        sprite = SPRITES_CARSTRAIGHT;
    }

    // ************* DRAW SLIP STREAM ********** //
    if (player.slipstreamTime > 0 || player.slipstream > 0) {
        cars[PlayerIndex].initSlipstreamLines();

        let amount = 0;
        if (player.slipstreamTime <= 0) {
            amount = player.slipstream;
            while (amount > 1) {
                amount -= 1;
            }
        }
        cntxGlobalAlpha(1 - amount);

        for (let i = 0; i < cars[PlayerIndex].slipstreamLines.length; i++) {
            const points = cars[PlayerIndex].slipstreamLines[i];
            cntxBeginPath();
            cntxMoveTo(points[PlayerIndex].screen.x, points[0].screen.y);
            for (let j = 1; j < points.length; j++) {
                cntxLineTo(points[j].screen.x, points[j].screen.y);
            }

            cntxFillStyle(MEDIUMGREY);
            cntxFill();
        }
        cntxGlobalAlpha(1);
    }

    let spriteScale = player.width * scale / sprite.w;
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
    if (player.driftAmount > 0) {
        const time = getTimestamp();
        if (time - lastDriftDraw > 100) {
            cntxGlobalAlpha(0.8);
            cntxFillStyle(MEDIUMGREY);
            let x = destX + 12;
            let y = destY - 4;
            cntxFillRect(x, y, 50, 10)

            x = destX + 260;
            cntxFillRect(x, y, 50, 10)

            cntxGlobalAlpha(1);
            lastDriftDraw = time;
        }
    }

    // //  ******  DRAW TURBO  ***** /
    if (player.turbo) {
        centreX = destX + 82;
        centreY = destY - 10;
        if (faceUrl !== ""){
            // drawToCanvas(cntx, faceUrl, centreX, centreY);
            let img = new Image();
            img.src = faceUrl;
            cntxDrawImage(img, 0, 0, img.width, img.height, centreX-50, centreY-100, 100, 100);
        }
        drawFuzzyCircle(centreX, centreY, 10, '#dd9925');
        drawFuzzyCircle(centreX, centreY, 5, '#cccc55');
        centreX = destX + 230;
        drawFuzzyCircle(centreX, centreY, 10, '#dd9925');
        drawFuzzyCircle(centreX, centreY, 5, '#cccc55');
    }
}

// OK
function renderFog(x, y, width, height, fog) {
    if (fog < 1) {
        cntxGlobalAlpha(1 - fog)
        cntxFillStyle(COLORS_FOG);
        cntxFillRect(x, y, width, height);
        cntxGlobalAlpha(1);
    }
}

// race.js
var bgLayer3Offset = 0;
var bgLayer2Offset = 0;
var bgLayer1Offset = 0;

const bgLayer3Speed = 0.001;
const bgLayer2Speed = 0.002;
const bgLayer1Speed = 0.003;

// NOT OK : cntx (canvasFunctions.js)
//          bgLayer3Offset, bgLayer2Offset, bgLayer1Offset (race.js)
//          backgroundLayer3, backgroundLayer2, backgroundLayer1 (graphics.js)
function renderRender() {
    cntx = context;

    const baseSegment = track.findSegment(camera.z);

    const basePercent = utilPercentRemaining(camera.z, Track.segmentLength);
    const playerSegment = track.findSegment(player.z);
    const playerPercent = utilPercentRemaining(player.z, Track.segmentLength);
    //  context.clearRect(0, 0, width, height);

    context.fillStyle = '#4576aa';
    cntxFillRect(0, 0, width, height);

    // render background hills, sky, trees
    const playerY = utilInterpolate(playerSegment.p1.world.y, playerSegment.p3.world.y, playerPercent);
    renderBackground(backgroundLayer3, width, height, bgLayer3Offset, resolution * bgLayer3Speed * playerY);
    renderBackground(backgroundLayer2, width, height, bgLayer2Offset, resolution * bgLayer2Speed * playerY);
    renderBackground(backgroundLayer1, width, height, bgLayer1Offset, resolution * bgLayer1Speed * playerY);

    /*
      front to back to render the road
      back to front to render the sprites
    */

    // render segments from to back
    let maxy = height;
    let x = 0;
    let dx = - (baseSegment.curve * basePercent);
    // OK
    for (let n = 0; n < camera.drawDistance; n++) {
        //    segment        = segments[(baseSegment.index + n) % segments.length];

        let segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount());
        segment.looped = segment.index < baseSegment.index;

        segment.fog = renderExponentialFog(n / camera.drawDistance, camera.fogDensity);
        segment.clip = maxy;

        camera.project(segment.p1, - x, segment.looped, width, height);
        camera.project(segment.p2, - x, segment.looped, width, height);
        camera.project(segment.p3, - x - dx, segment.looped, width, height);
        camera.project(segment.p4, - x - dx, segment.looped, width, height);

        // do fake curved road
        x = x + dx;
        dx = dx + segment.curve;

        // cull segments if behind, facing other way or clipped
        if ((segment.p1.camera.z <= camera.depth) ||
            (segment.p3.screen.y >= segment.p1.screen.y) ||
            (segment.p3.screen.y >= maxy))
            continue;

        renderSegment(segment);
        maxy = segment.p1.screen.y;
    }

    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the player to the camera should be drawn after the player..

    // NOT OK : SPRITES_CARSTRAIGHT (graphics.js)
    for (let n = (camera.drawDistance - 1); n > 0; n--) {
        let segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount());
        let spriteX, spriteY;
        // draw cars in the segment
        // OK
        for (let i = 0; i < segment.cars.length; i++) {
            let car = segment.cars[i];

            if (car.index !== 0) {
                // sprite = car.sprite;
                let scale = utilInterpolate(segment.p1.screen.scale, segment.p3.screen.scale, car.percent);

                spriteX = utilInterpolate(
                    (segment.p1.screen.x + segment.p2.screen.x) / 2,
                    (segment.p3.screen.x + segment.p4.screen.x) / 2,
                    car.percent)
                    + (scale * car.x * width / 2);

                spriteY = utilInterpolate(segment.p1.screen.y, segment.p4.screen.y, car.percent);

                let sprite = SPRITES_CARSTRAIGHT;
                let spriteScale = car.width * scale / sprite.w;

                if (car.turnLeft) {
                    sprite = SPRITES_CARLEFT;
                } else if (car.turnRight) {
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
        // OK
        for (let i = 0; i < segment.sprites.length; i++) {
            let sprite = segment.sprites[i];
            let spriteScale = segment.p1.screen.scale;

            spriteX = segment.p1.screen.x - segment.p1.world.x * segment.p1.screen.scale * width / 2
                + spriteScale * sprite.x * width / 2;

            spriteY = segment.p1.screen.y;
            /*
                  sprite.source.x = 0;
                  sprite.source.y = 0;
                  sprite.source.w = 200;
                  sprite.source.h = 210;
            */
            spriteScale = sprite.s * spriteScale;//* 800 / sprite.source.w;

            renderSprite(
                sprite.source,
                spriteScale,
                spriteX,
                spriteY,
                segment.clip,
                false);

            //-------- COLLISION DISPLAY ----------- //
            const destW = (sprite.source.w * spriteScale * width / 2);

            const offsetX = -0; //.5
            const destX = spriteX + (destW * (offsetX || 0));

            spriteScale = segment.p1.screen.scale;
            spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.source.w;

            const collisionx = (sprite.source.cx) * spriteScale * width / 2;
            // const collisionw = sprite.source.cw * spriteScale * width / 2;
            spriteX = destX + collisionx;// + collisionx * spriteScale * width / 2;// + spriteScale * collisionx * width / 2;

            //context.fillStyle = '#ff0000';
            //context.fillRect(spriteX, spriteY - 10, collisionw, 10);
            //-------- COLLISION DISPLAY END ----------- //
        }

        if (segment != playerSegment) {
            continue;
        }
        // var playerScreenY = utilInterpolate(playerSegment.p1.screen.y, playerSegment.p3.screen.y, playerPercent);

        let playerScreenY = (height / 2)
            - (camera.depth / camera.zOffset * utilInterpolate(playerSegment.p1.camera.y,
                playerSegment.p3.camera.y, playerPercent) * height / 2);


        if (cars[PlayerIndex].yOffset > 0) {
            playerScreenY -= cars[PlayerIndex].yOffset * camera.depth / camera.zOffset * height / 2;
        }

        // var carX = width / 2;
        let scale = utilInterpolate(playerSegment.p1.screen.scale, playerSegment.p3.screen.scale, playerPercent);
        spriteX = utilInterpolate(
            (playerSegment.p1.screen.x + playerSegment.p2.screen.x) / 2,
            (playerSegment.p3.screen.x + playerSegment.p4.screen.x) / 2,
            playerPercent)
            + (scale * cars[PlayerIndex].x * width / 2);

        const p = {
            world: {
                x: player.x,
                y: player.y,
                z: player.z
            },
            camera: {},
            screen: {}
        };
        camera.project(p, 0, playerSegment.index < baseSegment.index, width, height);

        const carX = p.screen.x;
        let playerDirection = 0;
        if (player.speed > 0) {
            if (player.driftDirection != 0) {
                playerDirection = player.driftDirection;
            } else {
                playerDirection = (player.turnLeft ? -1 : player.turnRight ? 1 : 0);
            }
        }

        const playerShadowY = playerScreenY;
        renderPlayer(
            camera.depth / camera.zOffset,  // scale
            carX,//width/2,   // destx
            playerScreenY,
            playerDirection,
            playerSegment.p3.world.y - playerSegment.p1.world.y,
            playerShadowY);

        if (race.state == STATE_RACING) {
            context.drawImage(track.overheadMap, -40, 200, 400, 400);
        }
    }
}