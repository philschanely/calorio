import { describe, expect, it } from "vitest";
import {
  getSpacing,
  getSpacingAsPx,
  getSpacingAsPxString,
  getSpacingAsRemString,
} from "./helpers";

describe("spacing helpers", () => {
  describe("get spacing", () => {
    it("returns the numeric spacing value with valid token", () => {
      expect(getSpacing("A")).toBe(0.25);
      expect(getSpacing("D")).toBe(1);
    });

    it("returns 0 with invalid token", () => {
      // @ts-expect-error testing invalid input
      expect(getSpacing("a")).toBe(0);
      // @ts-expect-error testing invalid input
      expect(getSpacing("FAKE")).toBe(0);
    });
  });

  describe("get spacing as a rem string", () => {
    it("returns rem string values with valid token", () => {
      expect(getSpacingAsRemString("C")).toBe(`0.75rem`);
      expect(getSpacingAsRemString("F")).toBe(`1.5rem`);
    });

    it("returns 0 string value with invalid token", () => {
      // @ts-expect-error testing invalid input
      expect(getSpacingAsRemString("FAKE")).toBe("0");
      // @ts-expect-error testing invalid input
      expect(getSpacingAsRemString("d")).toBe("0");
    });
  });

  describe("get spacing as a px value", () => {
    it("returns pixel numeric values with valid token", () => {
      expect(getSpacingAsPx("H")).toBe(32);
      expect(getSpacingAsPx("E")).toBe(20);
    });

    it("returns 0 with invalid token", () => {
      // @ts-expect-error testing invalid input
      expect(getSpacingAsPx("Z")).toBe(0);
    });
  });

  describe("get spacing as a px string", () => {
    it("returns pixel string values with valid token", () => {
      expect(getSpacingAsPxString("M")).toBe("64px");
      expect(getSpacingAsPxString("B")).toBe("8px");
    });
    it("returns pixel string values with invalid token", () => {
      // @ts-expect-error testing invalid input
      expect(getSpacingAsPxString("Z")).toBe("0px");
    });
  });
});
