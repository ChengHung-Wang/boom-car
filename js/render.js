import { utilPercentRemaining, utilInterpolate } from "./util.js";
import { STATE_RACING } from "../build/constants.js";
import * as cntx from './canvasFunctions.js'
import * as constants from "./constants.js";
import * as trackjs from "./track.js";
import * as graphics from "./graphics.js";
import * as racer from "./racer.js";

// draw all the race stuff to the screen
export let width = document.documentElement.clientWidth;
export let height = document.documentElement.clientHeight;
let resolution = height / 480;

addEventListener("resize", () => {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    resolution = height / 480;
});

// titleScreen.js racer.js
export const outlineOnly = false;

// draw a polygon
// NOT OK : outlineOnly
function renderPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    cntx.cntxFillStyle(color);
    cntx.cntxBeginPath();
    cntx.cntxMoveTo(x1, y1);
    cntx.cntxLineTo(x2, y2);
    cntx.cntxLineTo(x3, y3);
    cntx.cntxLineTo(x4, y4);
    cntx.cntxClosePath();
    if (outlineOnly) {
        cntx.cntxStrokeStyle(constants.MEDIUMGREY);
        cntx.cntxStroke();
    } else {
        cntx.cntxFill();
    }
}

// draw a segment, coordinates passed in are screen coordinates
// NOT OK : outlineOnly
export function renderSegment(segment) {
    const dark = Math.floor(segment.index / 2) % 2;// (segment.index / 2) % 2;

    const kerbColor = dark ? trackjs.COLORS_KERBDARK : trackjs.COLORS_KERBLIGHT;
    const landColor = dark ? trackjs.COLORS_LANDDARK : trackjs.COLORS_LANDLIGHT;

    // draw side land
    if (!outlineOnly) {
        cntx.cntxFillStyle(landColor);
        cntx.cntxFillRect(0, segment.p3.screen.y, width, segment.p1.screen.y - segment.p3.screen.y);
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
        const colour = (segment.index == 0) ? trackjs.MEDIUMGREY : trackjs.COLORS_ROAD;
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
        constants.COLORS_LANEMARKER);

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
        constants.COLORS_LANEMARKER);

    // lane marker
    if (dark) { //segment.color.laneMarker) {
        const lanes = 2;
        const lanew1 = (segment.p2.screen.x - segment.p1.screen.x) / lanes;
        const lanew2 = (segment.p3.screen.x - segment.p4.screen.x) / lanes;
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
                constants.COLORS_LANEMARKER);
        }
    }

    if (constants.COLORS_FOG != 0) {
        renderFog(0, segment.p1.screen.y, width, segment.p3.screen.y - segment.p1.screen.y, segment.fog);
    }
}

//---------------------------------------------------------------------------
// OK
function renderBackground(background, width, height, rotation, offset) {
    //    return;

    rotation = rotation || 0;
    offset = offset || 0;

    const imageW = racer.BACKGROUNDLAYERWIDTH / 2;
    const imageH = racer.BACKGROUNDLAYERHEIGHT;

    const sourceX = Math.floor(racer.BACKGROUNDLAYERWIDTH * rotation);
    const sourceY = 0;
    const sourceW = Math.min(imageW, racer.BACKGROUNDLAYERWIDTH - sourceX);
    const sourceH = imageH;

    const destX = 0;
    const destY = offset;
    const destW = Math.floor(width * (sourceW / imageW));
    const destH = height;

    racer.context.drawImage(background.c, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
        racer.context.drawImage(background.c, 0, sourceY, imageW - sourceW, sourceH, destW - 1, destY, width - destW, destH);
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
        racer.context.drawImage(graphics.spritesCanvas,
            sprite.x,
            sprite.y,
            sprite.w,
            sprite.h - (sprite.h * clipH / destH),
            destX,
            destY,
            destW,
            destH - clipH);

        if (fog !== false && constants.COLORS_FOG != 0) {
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
        sprite = graphics.SPRITES_CARLEFT;
    } else if (steer > 0) {
        sprite = graphics.SPRITES_CARRIGHT;
    } else {
        sprite = graphics.SPRITES_CARSTRAIGHT;
    }

    // ************* DRAW SLIP STREAM ********** //
    if (racer.player.slipstreamTime > 0 || racer.player.slipstream > 0) {
        racer.cars[PlayerIndex].initSlipstreamLines();

        let amount = 0;
        if (racer.player.slipstreamTime <= 0) {
            amount = racer.player.slipstream;
            while (amount > 1) {
                amount -= 1;
            }
        }
        cntx.cntxGlobalAlpha(1 - amount);

        for (let i = 0; i < racer.cars[PlayerIndex].slipstreamLines.length; i++) {
            const points = racer.cars[PlayerIndex].slipstreamLines[i];
            cntx.cntxBeginPath();
            cntx.cntxMoveTo(points[PlayerIndex].screen.x, points[0].screen.y);
            for (let j = 1; j < points.length; j++) {
                cntx.cntxLineTo(points[j].screen.x, points[j].screen.y);
            }

            cntx.cntxFillStyle(constants.MEDIUMGREY);
            cntx.cntxFill();
        }
        cntx.cntxGlobalAlpha(1);
    }

    const spriteScale = racer.player.width * scale / sprite.w;

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
        destY + racer.player.bounce,
        false);

    // ************** DRAW DRIFT *************** //
    if (racer.player.driftAmount > 0) {
        const time = racer.getTimestamp();
        if (time - lastDriftDraw > 100) {
            cntx.cntxGlobalAlpha(0.8);
            cntx.cntxFillStyle(constants.MEDIUMGREY);
            let x = destX + 12;
            const y = destY - 4;
            cntx.cntxFillRect(x, y, 50, 10)

            x = destX + 260;
            cntx.cntxFillRect(x, y, 50, 10)

            cntx.cntxGlobalAlpha(1);
            lastDriftDraw = time;
        }
    }

    //  ******  DRAW TURBO  ***** /
    if (racer.player.turbo) {
        let centreX = destX + 82;
        const centreY = destY - 10;
        graphics.drawFuzzyCircle(centreX, centreY, 10, '#dd9925');
        graphics.drawFuzzyCircle(centreX, centreY, 5, '#cccc55');
        centreX = destX + 230;
        graphics.drawFuzzyCircle(centreX, centreY, 10, '#dd9925');
        graphics.drawFuzzyCircle(centreX, centreY, 5, '#cccc55');
    }
}

// OK
function renderFog(x, y, width, height, fog) {
    if (fog < 1) {
        cntx.cntxGlobalAlpha(1 - fog)
        cntx.cntxFillStyle(constants.COLORS_FOG);
        cntx.cntxFillRect(x, y, width, height);
        cntx.cntxGlobalAlpha(1);
    }
}

// race.js
export const bgLayer3Offset = 0;
export const bgLayer2Offset = 0;
export const bgLayer1Offset = 0;

export const bgLayer3Speed = 0.001;
export const bgLayer2Speed = 0.002;
export const bgLayer1Speed = 0.003;

// NOT OK : cntx (canvasFunctions.js)
//          bgLayer3Offset, bgLayer2Offset, bgLayer1Offset (race.js)
//          backgroundLayer3, backgroundLayer2, backgroundLayer1 (graphics.js)
export function renderRender() {
    cntx.cntx = racer.context;

    const baseSegment = racer.track.findSegment(racer.camera.z);

    const basePercent = utilPercentRemaining(racer.camera.z, trackjs.Track.segmentLength);
    const playerSegment = racer.track.findSegment(racer.player.z);
    const playerPercent = utilPercentRemaining(racer.player.z, trackjs.Track.segmentLength);
    //  racer.context.clearRect(0, 0, width, height);

    racer.context.fillStyle = '#4576aa';
    cntx.cntxFillRect(0, 0, width, height);

    // render background hills, sky, trees
    const playerY = utilInterpolate(playerSegment.p1.world.y, playerSegment.p3.world.y, playerPercent);
    renderBackground(graphics.backgroundLayer3, width, height, bgLayer3Offset, resolution * bgLayer3Speed * playerY);
    renderBackground(graphics.backgroundLayer2, width, height, bgLayer2Offset, resolution * bgLayer2Speed * playerY);
    renderBackground(graphics.backgroundLayer1, width, height, bgLayer1Offset, resolution * bgLayer1Speed * playerY);

    /*
      front to back to render the road
      back to front to render the sprites
    */

    // render segments from to back
    let maxy = height;
    let x = 0;
    let dx = - (baseSegment.curve * basePercent);
    // OK
    for (let n = 0; n < racer.camera.drawDistance; n++) {
        //    segment        = segments[(baseSegment.index + n) % segments.length];

        const segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());
        segment.looped = segment.index < baseSegment.index;

        segment.fog = renderExponentialFog(n / racer.camera.drawDistance, racer.camera.fogDensity);
        segment.clip = maxy;

        racer.camera.project(segment.p1, - x, segment.looped, width, height);
        racer.camera.project(segment.p2, - x, segment.looped, width, height);
        racer.camera.project(segment.p3, - x - dx, segment.looped, width, height);
        racer.camera.project(segment.p4, - x - dx, segment.looped, width, height);

        // do fake curved road
        x = x + dx;
        dx = dx + segment.curve;

        // cull segments if behind, facing other way or clipped
        if ((segment.p1.camera.z <= racer.camera.depth) ||
            (segment.p3.screen.y >= segment.p1.screen.y) ||
            (segment.p3.screen.y >= maxy))
            continue;

        renderSegment(segment);
        maxy = segment.p1.screen.y;
    }

    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the player to the camera should be drawn after the player..

    // NOT OK : SPRITES_CARSTRAIGHT (graphics.js)
    for (let n = (racer.camera.drawDistance - 1); n > 0; n--) {
        const segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());
        let spriteX, spriteY;
        // draw cars in the segment
        // OK
        for (let i = 0; i < segment.cars.length; i++) {
            const car = segment.cars[i];

            if (car.index !== 0) {
                // sprite = car.sprite;
                const scale = utilInterpolate(segment.p1.screen.scale, segment.p3.screen.scale, car.percent);

                spriteX = utilInterpolate(
                    (segment.p1.screen.x + segment.p2.screen.x) / 2,
                    (segment.p3.screen.x + segment.p4.screen.x) / 2,
                    car.percent)
                    + (scale * car.x * width / 2);

                spriteY = utilInterpolate(segment.p1.screen.y, segment.p4.screen.y, car.percent);

                let sprite = graphics.SPRITES_CARSTRAIGHT;
                const spriteScale = car.width * scale / sprite.w;

                if (car.turnLeft) {
                    sprite = graphics.SPRITES_CARLEFT;
                } else if (car.turnRight) {
                    sprite = graphics.SPRITES_CARRIGHT;
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
            const sprite = segment.sprites[i];
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

            //racer.context.fillStyle = '#ff0000';
            //racer.context.fillRect(spriteX, spriteY - 10, collisionw, 10);
            //-------- COLLISION DISPLAY END ----------- //
        }

        if (segment != playerSegment) {
            continue;
        }
        // var playerScreenY = utilInterpolate(playerSegment.p1.screen.y, playerSegment.p3.screen.y, playerPercent);

        let playerScreenY = (height / 2)
            - (racer.camera.depth / racer.camera.zOffset * utilInterpolate(playerSegment.p1.camera.y,
                playerSegment.p3.camera.y, playerPercent) * height / 2);


        if (racer.cars[PlayerIndex].yOffset > 0) {
            playerScreenY -= racer.cars[PlayerIndex].yOffset * racer.camera.depth / racer.camera.zOffset * height / 2;
        }

        // var carX = width / 2;
        const scale = utilInterpolate(playerSegment.p1.screen.scale, playerSegment.p3.screen.scale, playerPercent);
        spriteX = utilInterpolate(
            (playerSegment.p1.screen.x + playerSegment.p2.screen.x) / 2,
            (playerSegment.p3.screen.x + playerSegment.p4.screen.x) / 2,
            playerPercent)
            + (scale * racer.cars[PlayerIndex].x * width / 2);

        const p = {
            world: {
                x: racer.player.x,
                y: racer.player.y,
                z: racer.player.z
            },
            camera: {},
            screen: {}
        };
        racer.camera.project(p, 0, playerSegment.index < baseSegment.index, width, height);

        const carX = p.screen.x;
        let playerDirection = 0;
        if (racer.player.speed > 0) {
            if (racer.player.driftDirection != 0) {
                playerDirection = racer.player.driftDirection;
            } else {
                playerDirection = (racer.player.turnLeft ? -1 : racer.player.turnRight ? 1 : 0);
            }
        }

        const playerShadowY = playerScreenY;
        renderPlayer(
            racer.camera.depth / racer.camera.zOffset,  // scale
            carX,//width/2,   // destx
            playerScreenY,
            playerDirection,
            playerSegment.p3.world.y - playerSegment.p1.world.y,
            playerShadowY);

        if (racer.race.state == STATE_RACING) {
            racer.context.drawImage(racer.track.overheadMap, -40, 200, 400, 400);
        }
    }
}