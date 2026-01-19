import { describe, expect, it } from "vitest";
import { getValidPercentage } from "./index";

describe("utils", () => {
  describe("#getValidPercentage", () => {
    it("returns a value between 0 and 1 for valid inputs", () => {
      expect(getValidPercentage(50)).toBe(0.5);
      expect(getValidPercentage(76.45)).toBe(0.7645);
      expect(getValidPercentage(100)).toBe(1);
      expect(getValidPercentage(0)).toBe(0);
    });

    it("returns 0 for invalid inputs", () => {
      expect(getValidPercentage(-10)).toBe(0);
      // @ts-expect-error Testing invalid input
      expect(getValidPercentage("34")).toBe(0);
    });

    it("returns 1 for values out of range", () => {
      expect(getValidPercentage(154)).toBe(1);
      expect(getValidPercentage(1350)).toBe(1);
    });
  });
});
