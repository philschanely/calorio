import { describe, expect, it } from "vitest";
import { getSwatchbookColor, getSwatchbookColorWithOpacity } from "./helpers";
import { SWATCHBOOK } from "./tokens";

describe("color helpers", () => {
  describe("get swatchbook color", () => {
    it("returns the hex value for a swatchbook token", () => {
      expect(getSwatchbookColor("QUARTZ_50")).toBe(SWATCHBOOK.QUARTZ_50);
    });

    it("returns the correct value for another swatch", () => {
      expect(getSwatchbookColor("RUBY_300")).toBe(SWATCHBOOK.RUBY_300);
    });

    it("returns the default fallback value if the requested token is not found", () => {
      // @ts-expect-error testing invalid input
      expect(getSwatchbookColor("FAKE_300")).toBe(SWATCHBOOK.QUARTZ_50);
    });

    it("returns a custom fallback value if the requested token is not found", () => {
      // @ts-expect-error testing invalid input
      expect(getSwatchbookColor("FAKE_300", SWATCHBOOK.RUBY_200)).toBe(
        SWATCHBOOK.RUBY_200,
      );
    });
  });

  describe("with hex alpha ", () => {
    it("returns the correct hex alpha", () => {
      expect(getSwatchbookColorWithOpacity("QUARTZ_50", 0.5)).toBe(
        SWATCHBOOK.QUARTZ_50 + "80",
      );
      expect(getSwatchbookColorWithOpacity("QUARTZ_50", 1)).toBe(
        SWATCHBOOK.QUARTZ_50 + "ff",
      );
      expect(getSwatchbookColorWithOpacity("QUARTZ_50", 0)).toBe(
        SWATCHBOOK.QUARTZ_50 + "00",
      );
      expect(getSwatchbookColorWithOpacity("QUARTZ_50", 0.65)).toBe(
        SWATCHBOOK.QUARTZ_50 + "a6",
      );
      expect(getSwatchbookColorWithOpacity("QUARTZ_50", 0.25)).toBe(
        SWATCHBOOK.QUARTZ_50 + "40",
      );
    });
  });
});
