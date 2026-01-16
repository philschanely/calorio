import { faArrowRightFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { describe, expect, it } from "vitest";
import { getFAIcon } from "./helpers";

describe("icon helpers", () => {
  describe("get FA icon", () => {
    it("returns the correct font awesome object with a valid token", () => {
      expect(getFAIcon("ARROW_RIGHT_FROM_BRACKET")).toBe(
        faArrowRightFromBracket,
      );
    });

    it("returns null with invalid token", () => {
      // @ts-expect-error testing invalid input
      expect(getFAIcon("a")).toBe(null);
    });
  });
});
