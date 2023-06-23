// hopefully  versions of math functions which take less bytes
const M = Math;
export const PI = Math.PI;

export function mathRand() {
  return M.random();
}

export function mathRandInt(limit) {
  return M.floor(mathRand() * limit);
}

export function sin(angle) {
  return M.sin(angle);
}

export function cos(angle) {
  return M.cos(angle);
}