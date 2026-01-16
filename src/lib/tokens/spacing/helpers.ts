import { REM_BASE, SPACING } from "./tokens";
import { TokenSpacing } from "./types";

/**
 * Retrieve the rem-like value for a spacing token as a number
 *
 * @param {TokenSpacing} token A spacing token
 * @returns {number} The numeric rem-like value for the provided token
 */
export function getSpacing(token: TokenSpacing) {
  return SPACING[token] ?? 0;
}

/**
 * Retrieve the value for a spacing token as a string with rem unit
 *
 * @param {TokenSpacing} token A spacing token
 * @returns {string} The value as a string with rem unit
 */
export function getSpacingAsRemString(token: TokenSpacing) {
  const spacingValue = getSpacing(token);
  return spacingValue ? `${getSpacing(token)}rem` : "0";
}

/**
 * Retrieve the pixel equivalent of the value for a spacing token as a number
 *
 * @param {TokenSpacing} token A spacing token
 * @returns {number} The pixel equivalent value for a spacing token as a number
 */
export function getSpacingAsPx(token: TokenSpacing) {
  return getSpacing(token) * REM_BASE;
}

/**
 * Retrieve the pixel equivalent of the value for a spacing token as a string with px unit
 *
 * @param {TokenSpacing} token A spacing token
 * @returns {string} The string rem value for the provided token, safe to use in CSS settings
 */
export function getSpacingAsPxString(token: TokenSpacing) {
  return `${getSpacingAsPx(token)}px`;
}
