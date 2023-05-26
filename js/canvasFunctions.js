export const cntx = {};
cntx.cntx = null;

cntx.cntxClearRect = function (width, height) {
  cntx.cntx.clearRect(0, 0, width, height);
}

cntx.cntxGlobalAlpha = function (alpha) {
  cntx.cntx.globalAlpha = alpha;
}
cntx.cntxFillRect = function (x, y, width, height) {
  cntx.cntx.fillRect(x, y, width, height);
}

cntx.cntxCreateLinearGradient = function (x0, y0, x1, y1) {
  return cntx.cntx.createLinearGradient(x0, y0, x1, y1);
}

cntx.cntxStrokeStyle = function (s) {
  cntx.cntx.strokeStyle = s;
}

cntx.cntxStroke = function () {
  cntx.cntx.stroke();
}

cntx.cntxFillStyle = function (s) {
  cntx.cntx.fillStyle = s;
}

cntx.cntxBeginPath = function () {
  cntx.cntx.beginPath();
}

cntx.cntxMoveTo = function (x, y) {
  cntx.cntx.moveTo(x, y);
}

cntx.cntxArc = function (x, y, r, sAngle, eAngle, counterclockwise) {
  cntx.cntx.arc(x, y, r, sAngle, eAngle, counterclockwise);
}

cntx.cntxLineTo = function (x, y) {
  cntx.cntx.lineTo(x, y);
}

cntx.cntxClosePath = function () {
  cntx.cntx.closePath();
}

cntx.cntxFill = function () {
  cntx.cntx.fill();
}

cntx.cntxFillText = function (t, x, y) {
  cntx.cntx.fillText(t, x, y);
}

cntx.cntxSave = function () {
  cntx.cntx.save();
}

cntx.cntxRestore = function () {
  cntx.cntx.restore();
}

cntx.cntxTranslate = function (x, y) {
  cntx.cntx.translate(x, y);
}

cntx.cntxRotate = function (a) {
  cntx.cntx.rotate(a);
}

cntx.cntxDrawImage = function (img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}