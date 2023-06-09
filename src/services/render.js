import { utilPercentRemaining, utilInterpolate } from "./util.js";
import { STATE_RACING, PlayerIndex } from "./race.js";
import { cntx } from "./canvasFunctions.js";
import { racer } from "./racer.js";
import { constants } from "./constants.js";
import * as trackjs from "./track.js";
import * as graphics from "./graphics.js";

// draw all the race stuff to the screen
export let width = document.documentElement.clientWidth;
export let height = document.documentElement.clientHeight;
let resolution = height / 480;

export const bgLayerSpeed = {};
bgLayerSpeed.bgLayer3Speed = 0.001;
bgLayerSpeed.bgLayer2Speed = 0.002;
bgLayerSpeed.bgLayer1Speed = 0.003;

export const bgLayerOffset = {};
bgLayerOffset.bgLayer3Offset = 0;
bgLayerOffset.bgLayer2Offset = 0;
bgLayerOffset.bgLayer1Offset = 0;

export const outlineOnly = {};
outlineOnly.outlineOnly = false

let lastDriftDraw = 0;

addEventListener("resize", () => {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    resolution = height / 480;
});

function renderPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    cntx.cntxFillStyle(color);
    cntx.cntxBeginPath();
    cntx.cntxMoveTo(x1, y1);
    cntx.cntxLineTo(x2, y2);
    cntx.cntxLineTo(x3, y3);
    cntx.cntxLineTo(x4, y4);
    cntx.cntxClosePath();
    if (outlineOnly.outlineOnly) {
        cntx.cntxStrokeStyle(graphics.MEDIUMGREY);
        cntx.cntxStroke();
    } else {
        cntx.cntxFill();
    }
}

// draw a segment, coordinates passed in are screen coordinates
export function renderSegment(segment) {
    let lanew1, lanew2, lanex1, lanex2
    const dark = Math.floor(segment.index / 2) % 2;

    const kerbColor = dark ? trackjs.COLORS_KERBDARK : trackjs.COLORS_KERBLIGHT;
    const landColor = dark ? trackjs.COLORS_LANDDARK : trackjs.COLORS_LANDLIGHT;

    // draw side land
    if (!outlineOnly.outlineOnly) {
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
    if (!outlineOnly.outlineOnly) {
        const colour = (segment.index == 0) ? graphics.MEDIUMGREY : trackjs.COLORS_ROAD;
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
    lanex1 = segment.p1.screen.x + 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p4.screen.x + 100 * segment.p4.screen.scale * width / 2;

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
    const lanes = 2;
    if (dark) { //segment.color.laneMarker) {
        lanew1 = (segment.p2.screen.x - segment.p1.screen.x) / lanes;
        lanew2 = (segment.p3.screen.x - segment.p4.screen.x) / lanes;
        lanex1 = segment.p1.screen.x + lanew1;
        lanex2 = segment.p4.screen.x + lanew2;
        for (let lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, ++lane) {
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

    if (graphics.COLORS_FOG.COLORS_FOG != 0) {
        renderFog(0, segment.p1.screen.y, width, segment.p3.screen.y - segment.p1.screen.y, segment.fog);
    }
}

//---------------------------------------------------------------------------
function renderBackground(background, width, height, rotation, offset) {
    rotation = rotation || 0;
    offset = offset || 0;

    const imageW = graphics.BACKGROUNDLAYERWIDTH / 2;
    const imageH = graphics.BACKGROUNDLAYERHEIGHT;

    const sourceX = Math.floor(graphics.BACKGROUNDLAYERWIDTH * rotation);
    const sourceY = 0;
    const sourceW = Math.min(imageW, graphics.BACKGROUNDLAYERWIDTH - sourceX);
    const sourceH = imageH;

    const destX = 0;
    const destY = offset;
    const destW = Math.floor(width * (sourceW / imageW));
    const destH = height;

    racer.context.value.drawImage(background.c, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
        racer.context.value.drawImage(background.c, 0, sourceY, imageW - sourceW, sourceH, destW - 1, destY, width - destW, destH);
}

//---------------------------------------------------------------------------
function renderSprite(sprite, scale, destX, destY, clipY, fog) {
    const destW = (sprite.w * scale * width / 2);
    const destH = (sprite.h * scale * width / 2);

    destY = destY - destH;

    // clip y for appearing behind a hill..
    const clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
    if (clipH < destH) {
        racer.context.value.drawImage(graphics.spritesCanvas,
            sprite.x,
            sprite.y,
            sprite.w,
            sprite.h - (sprite.h * clipH / destH),
            destX,
            destY,
            destW,
            destH - clipH);

        if (fog !== false && graphics.COLORS_FOG.COLORS_FOG != 0) {
            renderFog(destX, destY, destW, destH, fog);
        }
    }
}

//---------------------------------------------------------------------------
function renderExponentialFog(distance, density) {
    return 1 / Math.pow(Math.E, distance * distance * density);
}

// NOT OK : SPRITES_CARLEFT, SPRITES_CARRIGHT, SPRITES_CARSTRAIGHT (graphics.js)
function renderPlayer(scale, destX, destY, steer) {
    let sprite;
    if (steer < 0) {
        sprite = graphics.SPRITES_CARLEFT;
    } else if (steer > 0) {
        sprite = graphics.SPRITES_CARRIGHT;
    } else {
        sprite = graphics.SPRITES_CARSTRAIGHT;
    }

    const spriteScale = racer.player.width * scale / sprite.w;

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

        for (let i = 0; i < racer.cars[PlayerIndex].slipstreamLines.length; ++i) {
            const points = racer.cars[PlayerIndex].slipstreamLines[i];
            cntx.cntxBeginPath();
            cntx.cntxMoveTo(points[PlayerIndex].screen.x, points[PlayerIndex].screen.y);
            for (let j = 1; j < points.length; ++j) {
                cntx.cntxLineTo(points[j].screen.x, points[j].screen.y);
            }
            cntx.cntxFillStyle(graphics.MEDIUMGREY);
            cntx.cntxFill();
        }
        cntx.cntxGlobalAlpha(1);
    }

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
            cntx.cntxFillStyle(graphics.MEDIUMGREY);
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

function renderFog(x, y, width, height, fog) {
    if (fog < 1) {
        cntx.cntxGlobalAlpha(1 - fog)
        cntx.cntxFillStyle(graphics.COLORS_FOG.COLORS_FOG);
        cntx.cntxFillRect(x, y, width, height);
        cntx.cntxGlobalAlpha(1);
    }
}

export function renderRender() {
    cntx.cntx = racer.context.value;

    const baseSegment = racer.track.findSegment(racer.camera.z);

    const basePercent = utilPercentRemaining(racer.camera.z, trackjs.Track.segmentLength);
    const playerSegment = racer.track.findSegment(racer.player.z);
    const playerPercent = utilPercentRemaining(racer.player.z, trackjs.Track.segmentLength);
    const playerY = utilInterpolate(playerSegment.p1.world.y, playerSegment.p3.world.y, playerPercent);
    let maxy = height;
    let x = 0;
    let dx = -(baseSegment.curve * basePercent);

    racer.context.value.fillStyle = '#4576aa';
    cntx.cntxFillRect(0, 0, width, height);

    // render background hills, sky, trees
    renderBackground(graphics.backgroundLayer3, width, height, bgLayerOffset.bgLayer3Offset, resolution * bgLayerSpeed.bgLayer3Speed * playerY);
    renderBackground(graphics.backgroundLayer2, width, height, bgLayerOffset.bgLayer2Offset, resolution * bgLayerSpeed.bgLayer2Speed * playerY);
    renderBackground(graphics.backgroundLayer1, width, height, bgLayerOffset.bgLayer1Offset, resolution * bgLayerSpeed.bgLayer1Speed * playerY);

    /*
      front to back to render the road
      back to front to render the sprites
    */

    // render segments from to back

    let segment, car, sprite, spriteScale, spriteX, spriteY;
    for (let n = 0; n < racer.camera.drawDistance; ++n) {
        segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());
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

    for (let n = racer.camera.drawDistance - 1; n > 0; --n) {
        segment = racer.track.getSegment((baseSegment.index + n) % racer.track.getSegmentCount());

        // draw cars in the segment
        for (let i = 0; i < segment.cars.length; i++) {
            car = segment.cars[i];

            if (car.index !== 0) {
                sprite = car.sprite;
                const scale = utilInterpolate(segment.p1.screen.scale, segment.p3.screen.scale, car.percent);

                spriteX = utilInterpolate(
                    (segment.p1.screen.x + segment.p2.screen.x) / 2,
                    (segment.p3.screen.x + segment.p4.screen.x) / 2,
                    car.percent)
                    + (scale * car.x * width / 2);

                spriteY = utilInterpolate(segment.p1.screen.y, segment.p4.screen.y, car.percent);

                sprite = graphics.SPRITES_CARSTRAIGHT;
                spriteScale = car.width * scale / sprite.w;

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
        for (let i = 0; i < segment.sprites.length; i++) {
            sprite = segment.sprites[i];
            spriteScale = segment.p1.screen.scale;

            spriteX = segment.p1.screen.x - segment.p1.world.x * segment.p1.screen.scale * width / 2 + spriteScale * sprite.x * width / 2;
            spriteY = segment.p1.screen.y;
            spriteScale = sprite.s * spriteScale;

            renderSprite(
                sprite.source,
                spriteScale,
                spriteX,
                spriteY,
                segment.clip,
                false);

            const destW = (sprite.source.w * spriteScale * width / 2);

            const offsetX = -0;
            const destX = spriteX + (destW * (offsetX || 0));

            spriteScale = segment.p1.screen.scale;
            spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.source.w;

            const collisionx = (sprite.source.cx) * spriteScale * width / 2;
            spriteX = destX + collisionx;
        }

        if (segment != playerSegment) {
            continue;
        }

        let playerScreenY = (height / 2)
            - (racer.camera.depth / racer.camera.zOffset * utilInterpolate(playerSegment.p1.camera.y,
                playerSegment.p3.camera.y, playerPercent) * height / 2);

        const playerShadowY = playerScreenY;

        if (racer.cars[PlayerIndex].yOffset > 0) {
            playerScreenY -= racer.cars[PlayerIndex].yOffset * racer.camera.depth / racer.camera.zOffset * height / 2;
        }

        let carX = width / 2;
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

        carX = p.screen.x;
        let playerDirection = 0;
        if (racer.player.speed > 0) {
            if (racer.player.driftDirection != 0) {
                playerDirection = racer.player.driftDirection;
            } else {
                playerDirection = (racer.player.turnLeft ? -1 : racer.player.turnRight ? 1 : 0);
            }
        }

        renderPlayer(
            racer.camera.depth / racer.camera.zOffset,
            carX,
            playerScreenY,
            playerDirection,
            playerSegment.p3.world.y - playerSegment.p1.world.y,
            playerShadowY);

        if (racer.race.state == STATE_RACING) {
            racer.context.value.drawImage(racer.track.overheadMap, -40, 200, 400, 400);
        }
    }
}