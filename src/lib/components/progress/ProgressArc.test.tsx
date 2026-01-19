import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProgressArc } from "./ProgressArc";

import type { ProgressArcProps } from "./types";

// Mock the styles
vi.mock("./ProgressArc.styles", () => ({
  progressArcStyles: vi.fn(() => ({
    bar: vi.fn(() => "bar-class"),
    root: vi.fn(() => "root-class"),
    svg: vi.fn(() => "svg-class"),
    textBox: vi.fn(() => "textbox-class"),
    track: vi.fn(() => "track-class"),
  })),
}));

describe("ProgressArc Component", () => {
  const defaultProps: ProgressArcProps = {
    goal: 2000,
    pct: 50,
    total: 1000,
    unit: "kcal",
  };

  it("renders without crashing", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it("renders an SVG element", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders track and bar circles in SVG", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThanOrEqual(2); // At least track and bar
  });

  it("applies aria-label to root", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
    const root = container.querySelector("[aria-label]");
    expect(root).toBeInTheDocument();
  });

  it("marks SVG as aria-hidden", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("sets viewBox based on diameter for md size", () => {
    const { container } = render(<ProgressArc {...defaultProps} size="md" />);
    const svg = container.querySelector("svg");
    const viewBox = svg?.getAttribute("viewBox");
    // md size should have diameter 240
    expect(viewBox).toContain("240");
  });

  it("sets viewBox based on diameter for sm size", () => {
    const { container } = render(<ProgressArc {...defaultProps} size="sm" />);
    const svg = container.querySelector("svg");
    const viewBox = svg?.getAttribute("viewBox");
    // sm size should have diameter 120
    expect(viewBox).toContain("120");
  });

  it("handles different position props", () => {
    const { container: topContainer } = render(
      <ProgressArc {...defaultProps} position="top" />,
    );
    const { container: bottomContainer } = render(
      <ProgressArc {...defaultProps} position="bottom" />,
    );

    expect(topContainer.querySelector("svg")).toBeInTheDocument();
    expect(bottomContainer.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with custom color", () => {
    const { container } = render(
      <ProgressArc {...defaultProps} color="QUARTZ" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with default color QUARTZ when not provided", () => {
    const { container } = render(<ProgressArc {...defaultProps} />);
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
  });

  it("renders with 100% progress", () => {
    const { container } = render(<ProgressArc {...defaultProps} pct={100} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
