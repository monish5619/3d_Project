/**
 * Deterministic pseudo-random number generator for pure React render passes
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}
