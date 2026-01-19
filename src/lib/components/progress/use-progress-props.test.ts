import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DayBadgeMode } from "@/lib/types";
import type { ProgressBarProps } from "./types";
import { useProgressProps } from "./use-progress-props";

describe("useProgressProps", () => {
  describe("basic input", () => {
    it("returns normalized percentage between 0 and 1", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.pct).toBe(0.5);
      expect(result.current.pct).toBeGreaterThanOrEqual(0);
      expect(result.current.pct).toBeLessThanOrEqual(1);
    });

    it("clamps percentage over 100 to 1", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 150,
        total: 3000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.pct).toBe(1);
    });

    it("clamps negative percentage to 0", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: -50,
        total: 0,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.pct).toBe(0);
    });

    it("handles NaN and infinity by returning 0", () => {
      const nanProps: ProgressBarProps = {
        goal: 2000,
        pct: NaN,
        total: 1000,
        unit: "kcal",
      };

      const infProps: ProgressBarProps = {
        goal: 2000,
        pct: Infinity,
        total: 1000,
        unit: "kcal",
      };

      const { result: resultNan } = renderHook(() =>
        useProgressProps(nanProps),
      );
      const { result: resultInf } = renderHook(() =>
        useProgressProps(infProps),
      );

      expect(resultNan.current.pct).toBe(0);
      expect(resultInf.current.pct).toBe(0); // Non-finite values default to 0
    });
  });

  describe("label generation", () => {
    it("generates accessible aria-label with goal information", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.label).toContain("1000");
      expect(result.current.label).toContain("50");
      expect(result.current.label).toContain("2000");
      // Label contains total, percentage, and goal but not unit
      expect(result.current.label).toContain("toward the daily goal");
    });

    it("includes all required parts in label", () => {
      const props: ProgressBarProps = {
        goal: 2500,
        pct: 75,
        total: 1875,
        unit: "grams",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.label).toContain(
        "1875 (75%) toward the daily goal of 2500",
      );
    });
  });

  describe("text generation based on mode", () => {
    it("returns empty string for OVERALL mode", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        mode: DayBadgeMode.OVERALL,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.text).toBe("");
    });

    it("returns percentage text for PERCENTAGE mode", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        mode: DayBadgeMode.PERCENTAGE,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.text).toBe("50% ");
    });

    it("returns total and unit for DETAILS mode", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        mode: DayBadgeMode.DETAILS,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.text).toBe("1000 kcal");
    });

    it("defaults to empty string when mode is undefined", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.text).toBe("");
    });
  });

  describe("prop passthrough", () => {
    it("passes through goal and total unchanged", () => {
      const props: ProgressBarProps = {
        goal: 2500,
        pct: 60,
        total: 1500,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.goal).toBe(2500);
      expect(result.current.total).toBe(1500);
    });

    it("passes through unit unchanged", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 50,
        total: 1000,
        unit: "grams",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.unit).toBe("grams");
    });

    it("passes through color if provided", () => {
      const props: ProgressBarProps = {
        color: "QUARTZ",
        goal: 2000,
        pct: 50,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.color).toBe("QUARTZ");
    });

    it("passes through size if provided", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 50,
        size: "sm",
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.size).toBe("sm");
    });
  });

  describe("percentage precision", () => {
    it("limits percentage to 4 decimal places", () => {
      const props: ProgressBarProps = {
        goal: 3000,
        pct: 33.33333,
        total: 1000,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      // Should be rounded to 4 decimal places max
      const decimalPlaces = (result.current.pct.toString().split(".")[1] || "")
        .length;
      expect(decimalPlaces).toBeLessThanOrEqual(4);
    });

    it("handles very small percentages", () => {
      const props: ProgressBarProps = {
        goal: 2000,
        pct: 0.001,
        total: 0.02,
        unit: "kcal",
      };

      const { result } = renderHook(() => useProgressProps(props));

      expect(result.current.pct).toBeGreaterThanOrEqual(0);
      expect(result.current.pct).toBeLessThanOrEqual(1);
    });
  });

  describe("different unit types", () => {
    it("works with different unit types in DETAILS mode", () => {
      const units = ["kcal", "grams", "mg", "ml", "oz"];

      units.forEach((unit) => {
        const props: ProgressBarProps = {
          goal: 100,
          mode: DayBadgeMode.DETAILS,
          pct: 50,
          total: 50,
          unit,
        };

        const { result } = renderHook(() => useProgressProps(props));

        // Text only contains unit when DETAILS mode is set
        expect(result.current.text).toContain(unit);
        expect(result.current.unit).toBe(unit);
      });
    });
  });
});
