import { SWATCHBOOK } from "./tokens";
import { TokenColorSwatchbook } from "./types";

/**
 * Retrieve the hex value for a swatchbook color token as a string
 *
 * @param token A color token
 * @param fallback A fallback hex value if the token is not found
 * @returns The hex value as a string
 */
export function getSwatchbookColor(
  token: TokenColorSwatchbook,
  fallback: string = SWATCHBOOK.QUARTZ_50,
): string {
  return SWATCHBOOK[token] ?? fallback;
}

/**
 * Retrieve the hex value for a swatchbook color token as a string with alpha opacity
 *
 * @param {string} hex Original hex color value
 * @param {number} alpha Alpha value between 0 and 1
 * @param fallback A fallback hex value if the token is not found
 * @returns {string} Hex color with alpha appended
 */
export function getSwatchbookColorWithOpacity(
  token: TokenColorSwatchbook,
  alpha: number,
  fallback: string = SWATCHBOOK.QUARTZ_50,
): string {
  const hex = getSwatchbookColor(token, fallback);
  const value = Math.round(alpha * 255);
  const hexAlpha = value < 16 ? `0${value.toString(16)}` : value.toString(16);
  return hex + hexAlpha;
}
