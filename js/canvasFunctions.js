export let cntx = null;

export function cntxClearRect(width, height) {
  cntx.clearRect(0, 0, width, height);
}

export function cntxGlobalAlpha(alpha) {
  cntx.globalAlpha = alpha;
}
export function cntxFillRect(x, y, width, height) {
  cntx.fillRect(x, y, width, height);
}

export function cntxCreateLinearGradient(x0, y0, x1, y1) {
  return cntx.createLinearGradient(x0, y0, x1, y1);
}

export function cntxStrokeStyle(s) {
  cntx.strokeStyle = s;
}

export function cntxStroke() {
  cntx.stroke();
}

export function cntxFillStyle(s) {
  cntx.fillStyle = s;
}

export function cntxBeginPath() {
  cntx.beginPath();
}

export function cntxMoveTo(x, y) {
  cntx.moveTo(x, y);
}

export function cntxArc(x, y, r, sAngle, eAngle, counterclockwise) {
  cntx.arc(x, y, r, sAngle, eAngle, counterclockwise);
}

export function cntxLineTo(x, y) {
  cntx.lineTo(x, y);
}
export function cntxClosePath() {
  cntx.closePath();
}

export function cntxFill() {
  cntx.fill();
}

export function cntxFillText(t, x, y) {
  cntx.fillText(t, x, y);

}

export function cntxSave() {
  cntx.save();
}

export function cntxRestore() {
  cntx.restore();
}

export function cntxTranslate(x, y) {
  cntx.translate(x, y);
}

export function cntxRotate(a) {
  cntx.rotate(a);
}

export function cntxDrawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}
