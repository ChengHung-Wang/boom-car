export const cntx = new Object();
cntx.cntx = null;

cntx.cntxClearRect = function (width, height) {
  cntx.clearRect(0, 0, width, height);
}

cntx.cntxGlobalAlpha = function (alpha) {
  cntx.globalAlpha = alpha;
}
cntx.cntxFillRect = function (x, y, width, height) {
  cntx.fillRect(x, y, width, height);
}

cntx.cntxCreateLinearGradient = function (x0, y0, x1, y1) {
  return cntx.createLinearGradient(x0, y0, x1, y1);
}

cntx.cntxStrokeStyle = function (s) {
  cntx.strokeStyle = s;
}

cntx.cntxStroke = function () {
  cntx.stroke();
}

cntx.cntxFillStyle = function (s) {
  cntx.fillStyle = s;
}

cntx.cntxBeginPath = function () {
  cntx.beginPath();
}

cntx.cntxMoveTo = function (x, y) {
  cntx.moveTo(x, y);
}

cntx.cntxArc = function (x, y, r, sAngle, eAngle, counterclockwise) {
  cntx.arc(x, y, r, sAngle, eAngle, counterclockwise);
}

cntx.cntxLineTo = function (x, y) {
  cntx.lineTo(x, y);
}
cntx.cntxClosePath = function () {
  cntx.closePath();
}

cntx.cntxFill = function () {
  cntx.fill();
}

cntx.cntxFillText = function (t, x, y) {
  cntx.fillText(t, x, y);

}

cntx.cntxSave = function () {
  cntx.save();
}

cntx.cntxRestore = function () {
  cntx.restore();
}

cntx.cntxTranslate = function (x, y) {
  cntx.translate(x, y);
}

cntx.cntxRotate = function (a) {
  cntx.rotate(a);
}

cntx.cntxDrawImage = function (img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}