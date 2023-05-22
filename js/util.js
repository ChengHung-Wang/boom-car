export function utilPercentRemaining(n, total) {
  return (n % total) / total;
}

export function utilInterpolate(a, b, percent) {
  return a + (b - a) * percent
}

export function utilIncrease(start, increment, max) {
  let result = start + increment;

  while (result >= max)
    result -= max;
  while (result < 0)
    result += max;
  return result;
}