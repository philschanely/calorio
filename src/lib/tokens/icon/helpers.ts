import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { ICON_MAP } from "./tokens";
import { TokenIcon } from "./types";

/**
 * Retrieve the Font Awesome icon definition for a given icon token
 *
 * @param icon An icon token
 * @returns The Font Awesome icon definition for the provided token or null if not found
 */
export const getFAIcon = (icon: TokenIcon): IconDefinition | null => {
  return ICON_MAP[icon] ?? null;
};
