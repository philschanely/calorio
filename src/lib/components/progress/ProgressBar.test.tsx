import { render } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TokenColorSwatchbookBase } from "@/lib/tokens";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarProps } from "./types";

// Mock TextDisplay4 component
vi.mock("../text", () => ({
  TextDisplay4: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
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

const elements = {
  bar: "[data-element='progress-bar-bar']",
  root: "[data-element='progress-bar']",
  textBox: "[data-element='progress-bar-text-box']",
  text: "[data-element='progress-bar-text']",
  track: "[data-element='progress-bar-track']",
};

const attrs = {
  color: "data-progress-bar-color",
  mode: "data-progress-bar-mode",
  pct: "data-progress-bar-render-pct",
  size: "data-progress-bar-size",
};

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

  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<ProgressBar {...defaultProps} />);
      expect(container).toBeDefined();

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).toHaveAccessibleName(
        "1000 (50%) toward the daily goal of 2000",
      );
      expect(root).toHaveAttribute(attrs.color, "QUARTZ");
      expect(root).toHaveAttribute(attrs.mode, "percentage");
      expect(root).toHaveAttribute(attrs.pct, "0.5");
      expect(root).toHaveAttribute(attrs.size, "md");

      const track = container.querySelector(elements.track);
      expect(track).toBeInTheDocument();
      expect(track?.getAttribute("aria-hidden")).toBe("true");

      const bar = container.querySelector(elements.bar);
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveStyle({ width: `calc((100% - 32px) * 0.5 + 32px)` });

      expect(container.querySelector(elements.textBox)).toBeInTheDocument();
      expect(container.querySelector(elements.text)).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("does not render progress bar when pct = 0", () => {
      const { container } = render(<ProgressBar {...defaultProps} pct={0} />);
      expect(container.querySelector(elements.bar)).not.toBeInTheDocument();
      expect(container.querySelector(elements.root)).toHaveAccessibleName(
        "1000 (0%) toward the daily goal of 2000",
      );
    });

    it("handles values less than 0 as expected", () => {
      const { container } = render(<ProgressBar {...defaultProps} pct={-12} />);
      const root = container.querySelector(elements.root);
      expect(root).toHaveAccessibleName(
        "1000 (-12%) toward the daily goal of 2000",
      );
      expect(root).toHaveAttribute(attrs.pct, "0");
      expect(container.querySelector(elements.bar)).not.toBeInTheDocument();
    });

    it("handles values greater than 100 as expected", () => {
      const { container } = render(<ProgressBar {...defaultProps} pct={145} />);

      const root = container.querySelector(elements.root);
      expect(root).toHaveAttribute(attrs.pct, "1");
      expect(root).toHaveAccessibleName(
        "1000 (145%) toward the daily goal of 2000",
      );

      const bar = container.querySelector(elements.bar);
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveStyle({
        width: `calc((100% - 32px) * 1 + 32px)`,
      });
    });

    it("handles different percentages", () => {
      const testCases = [25, 50, 75];
      testCases.forEach((pct) => {
        const { container } = render(
          <ProgressBar {...defaultProps} pct={pct} />,
        );
        const root = container.querySelector(elements.root);
        const bar = container.querySelector(elements.bar);
        expect(bar).toBeInTheDocument();
        expect(bar).toHaveStyle({
          width: `calc((100% - 32px) * ${pct} + 32px)`,
        });
        expect(root).toHaveAttribute(attrs.pct, (pct / 100).toString());
      });
    });

    it("passes color prop to styles", () => {
      const testCases = [
        { color: "QUARTZ", expectedClassName: "bg-quartz-100" },
        { color: "EMERALD", expectedClassName: "bg-emerald-300" },
        { color: "RUBY", expectedClassName: "bg-ruby-300" },
      ];
      testCases.forEach(({ color, expectedClassName }) => {
        const { container } = render(
          <ProgressBar
            {...defaultProps}
            color={color as TokenColorSwatchbookBase}
          />,
        );
        expect(container).toBeDefined();
        const bar = container.querySelector(elements.bar);
        expect(bar).toHaveClass(expectedClassName);
      });
    });
  });
});
