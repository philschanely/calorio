import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressArc } from "./ProgressArc";
import type { ProgressArcProps } from "./types";

const elements = {
  root: "[data-element='progress-arc']",
  artwork: "[data-element='progress-arc-artwork']",
  textBox: "[data-element='progress-arc-text-box']",
  text: "[data-element='progress-arc-text']",
};

const attrs = {
  color: "data-progress-arc-color",
  mode: "data-progress-arc-mode",
  pct: "data-progress-arc-render-pct",
  position: "data-progress-arc-position",
  size: "data-progress-arc-size",
};

describe("ProgressArc Component", () => {
  const defaultProps: ProgressArcProps = {
    goal: 2000,
    pct: 50,
    total: 1000,
    unit: "kcal",
  };

  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<ProgressArc {...defaultProps} />);
      expect(container).toBeDefined();

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).toHaveAccessibleName(
        "1000 (50%) toward the daily goal of 2000",
      );
      expect(root).toHaveAttribute(attrs.color, "QUARTZ");
      expect(root).toHaveAttribute(attrs.mode, "percentage");
      expect(root).toHaveAttribute(attrs.pct, "0.5");
      expect(root).toHaveAttribute(attrs.position, "top");
      expect(root).toHaveAttribute(attrs.size, "md");
      expect(root).toHaveClass("justify-start");

      const artwork = container.querySelector(elements.artwork);
      expect(artwork).toBeInTheDocument();
      expect(artwork?.getAttribute("aria-hidden")).toBe("true");
      expect(artwork?.getAttribute("viewBox")).toContain("240");
      expect(
        container.querySelectorAll("circle")?.length,
      ).toBeGreaterThanOrEqual(2);

      const textBox = container.querySelector(elements.textBox);
      expect(textBox).toBeInTheDocument();
      expect(textBox).toHaveClass("pt-[60px]");
      expect(container.querySelector(elements.text)).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("sets viewBox based on diameter for sm size", () => {
      const { container } = render(<ProgressArc {...defaultProps} size="sm" />);
      expect(
        container.querySelector(elements.artwork)?.getAttribute("viewBox"),
      ).toContain("120");
    });

    it("handles bottom position", () => {
      const { container } = render(
        <ProgressArc {...defaultProps} position="bottom" />,
      );

      expect(container).toBeDefined();

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute(attrs.position, "bottom");
      expect(root).toHaveClass("justify-end");

      const textBox = container.querySelector(elements.textBox);
      expect(textBox).toBeInTheDocument();
      expect(textBox).toHaveClass("pb-[60px]");
    });

    it("renders with custom color", () => {
      const { container } = render(
        <ProgressArc {...defaultProps} color="QUARTZ" />,
      );
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("updates when percentage changes", () => {
      const { rerender, container } = render(
        <ProgressArc {...defaultProps} pct={25} />,
      );

      const svg1 = container.querySelector("svg");
      expect(svg1).toBeInTheDocument();

      rerender(<ProgressArc {...defaultProps} pct={75} />);

      const svg2 = container.querySelector("svg");
      expect(svg2).toBeInTheDocument();
    });

    it("renders with 0% progress", () => {
      const { container } = render(<ProgressArc {...defaultProps} pct={0} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      expect(container.querySelectorAll("circle")?.length).toBe(1);
      const root = container.querySelector(elements.root);
      expect(root).toHaveAccessibleName(
        "1000 (0%) toward the daily goal of 2000",
      );
    });

    it("renders with 150% progress but caps at 100% rendering", () => {
      const { container } = render(<ProgressArc {...defaultProps} pct={150} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      const root = container.querySelector(elements.root);
      expect(root).toHaveAccessibleName(
        "1000 (150%) toward the daily goal of 2000",
      );
      expect(root).toHaveAttribute(attrs.pct, "1");
    });
  });
});
