/**
 * Get a valid percentage value from an unknown numeric input.
 *
 * @param {number} pct The input percentage
 * @returns {number} The clamped percentage value between 0 and 1, rounded to 4 decimal places
 */
export const getValidPercentage = (pct: number) => {
  const normalized = Number.isFinite(pct)
    ? Math.min(100, Math.max(0, pct)) / 100
    : 0;
  return Number(normalized.toFixed(4));
};
