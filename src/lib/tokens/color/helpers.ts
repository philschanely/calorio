import { TokenColorSwatchbook } from "@/lib/types/tokens";
import { SWATCHBOOK } from "./tokens";

/**
 * Retrieve the hex value for a swatchbook color token as a string
 *
 * @param token A color token
 * @returns The hex value as a string
 */
export function getSwatchbookColor(
  token: TokenColorSwatchbook,
  fallback: string = SWATCHBOOK.QUARTZ_50,
): string {
  return SWATCHBOOK[token] ?? fallback;
}
