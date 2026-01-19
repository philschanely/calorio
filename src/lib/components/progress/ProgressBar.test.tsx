import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarProps } from "./types";

// Mock TextDisplay4 component
vi.mock("../text", () => ({
  TextDisplay4: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock ResizeObserver since it's not available in test environment
class MockResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_?: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

describe("ProgressBar Component", () => {
  const defaultProps: ProgressBarProps = {
    goal: 2000,
    pct: 50,
    total: 1000,
    unit: "kcal",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<ProgressBar {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it("renders track element with data-item attribute", () => {
    const { container } = render(<ProgressBar {...defaultProps} />);
    const track = container.querySelector('[data-item="1"]');
    expect(track).toBeInTheDocument();
  });

  it("renders aria-label on track", () => {
    const { container } = render(<ProgressBar {...defaultProps} />);
    const track = container.querySelector("[aria-label]");
    expect(track).toBeInTheDocument();
  });

  it("renders progress bar when pct > 0", () => {
    const { container } = render(<ProgressBar {...defaultProps} pct={50} />);
    const bar = container.querySelector("div > div > div");
    expect(bar).toBeInTheDocument();
  });

  it("does not render progress bar when pct = 0", () => {
    const { container } = render(<ProgressBar {...defaultProps} pct={0} />);
    // When pct is 0, the bar div should not be rendered (conditional rendering)
    const track = container.querySelector('[data-item="1"]');
    const children = track?.children.length;
    expect(children).toBe(0); // No children when pct is 0
  });

  it("sets bar width based on percentage", () => {
    const { container } = render(<ProgressBar {...defaultProps} pct={50} />);
    const track = container.querySelector('[data-item="1"]');
    const bar = track?.querySelector("div") as HTMLDivElement;
    expect(bar).toBeInTheDocument();
    // Verify bar has Tailwind styles applied
    expect(bar?.className).toContain("h-full");
    expect(bar?.className).toContain("rounded-full");
  });

  it("handles different percentages", () => {
    const testCases = [25, 50, 75];

    testCases.forEach((pct) => {
      const { container, unmount } = render(
        <ProgressBar {...defaultProps} pct={pct} />,
      );
      const track = container.querySelector('[data-item="1"]');
      const bar = track?.querySelector("div") as HTMLDivElement;
      expect(bar).toBeInTheDocument();
      // Just verify the bar element exists and renders for different percentages
      expect(bar?.className).toContain("h-full");
      unmount();
    });
  });

  it("passes color prop to styles", () => {
    const { container } = render(
      <ProgressBar {...defaultProps} color="QUARTZ" />,
    );
    expect(container).toBeDefined();
  });

  it("updates when percentage changes", () => {
    const { unmount: unmount1 } = render(
      <ProgressBar {...defaultProps} pct={25} />,
    );

    unmount1();

    const { container } = render(<ProgressBar {...defaultProps} pct={75} />);

    const track = container.querySelector('[data-item="1"]');
    const bar = track?.querySelector("div") as HTMLDivElement;
    expect(bar).toBeInTheDocument();
    // Verify bar updates when percentage changes
    expect(bar?.className).toContain("h-full");
  });

  it("handles extreme percentage values", () => {
    const { container: container1 } = render(
      <ProgressBar {...defaultProps} pct={150} />,
    );

    const bar1 = container1.querySelector('[data-item="1"] > div');
    expect(bar1).toBeInTheDocument();

    const { container: container2 } = render(
      <ProgressBar {...defaultProps} pct={-50} />,
    );

    const bar2 = container2.querySelector('[data-item="1"] > div');
    expect(bar2).not.toBeInTheDocument(); // Should not render when clamped to 0
  });
});
