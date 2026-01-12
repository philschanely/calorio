import { describe, expect, it } from "vitest";
import { getSwatchbookColor } from "./helpers";
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
});
