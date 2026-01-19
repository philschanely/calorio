import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DayBadge } from "./DayBadge";
import { DayBadgeMode } from "@/lib/types";
import type { DayBadgeProps } from "./DayBadge.types";
import type { DensityRating } from "@/lib/types";

// Mock dependencies
vi.mock("../progress", () => ({
  ProgressArc: () => <div>ProgressArc</div>,
  ProgressBar: () => <div>ProgressBar</div>,
  ProgressBadge: () => <div>ProgressBadge</div>,
}));

const elements = {
  root: "[data-element='day-badge']",
  water: "[data-element='day-badge-water-wrapper']",
  steps: "[data-element='day-badge-steps-wrapper']",
  calories: "[data-element='day-badge-calories-wrapper']",
  overall: "[data-element='day-badge-overall-wrapper']",
};

const attrs = {
  densityColor: "data-day-badge-density-color",
  mode: "data-day-badge-mode",
};

const mockDayBadgeProps: DayBadgeProps = {
  overallPct: 75,
  density: { rating: "green" as DensityRating, score: 1 },
  water: { goal: 2000, pct: 50, total: 1000 },
  steps: { goal: 8000, pct: 50, total: 4000 },
  calories: { goal: 1800, pct: 50, total: 500 },
};

describe("DayBadge Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<DayBadge {...mockDayBadgeProps} />);
      const root = container.querySelector(elements.root);
      expect(container).toBeDefined();
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute(attrs.densityColor, "EMERALD");
      expect(root).toHaveAttribute(attrs.mode, "overall");
      expect(container.querySelector(elements.water)).toBeInTheDocument();
      expect(container.querySelector(elements.calories)).toBeInTheDocument();
      expect(container.querySelector(elements.steps)).toBeInTheDocument();
      expect(container.querySelector(elements.overall)).toBeInTheDocument();
    });
  });

  describe("Mode cycling", () => {
    it("starts in OVERALL mode", () => {
      const { container } = render(<DayBadge {...mockDayBadgeProps} />);
      const root = container.querySelector(elements.root);
      expect(root).toHaveAttribute("data-day-badge-mode", DayBadgeMode.OVERALL);
    });

    it("cycles through modes correctly", async () => {
      const user = userEvent.setup();
      const { container } = render(<DayBadge {...mockDayBadgeProps} />);
      const root = container.querySelector(elements.root);

      if (root) {
        // Changes to percentage after first click
        await user.click(root);
        expect(container.querySelector(elements.root)).toHaveAttribute(
          "data-day-badge-mode",
          DayBadgeMode.PERCENTAGE,
        );

        // Changes to details after second click
        await user.click(root);
        expect(container.querySelector(elements.root)).toHaveAttribute(
          "data-day-badge-mode",
          DayBadgeMode.DETAILS,
        );

        // Cycles back to overall after third click
        await user.click(root);
        expect(container.querySelector(elements.root)).toHaveAttribute(
          "data-day-badge-mode",
          DayBadgeMode.OVERALL,
        );
      }
    });

    it("renders ProgressBadge in only OVERALL mode", async () => {
      const user = userEvent.setup();
      const { container } = render(<DayBadge {...mockDayBadgeProps} />);
      const root = container.querySelector(elements.root);
      expect(container.querySelector(elements.overall)).toBeInTheDocument();

      if (root) {
        // Overall hides after first click (percentage)
        await user.click(root);
        expect(
          container.querySelector(elements.overall),
        ).not.toBeInTheDocument();

        // Overall is still not visible after second click (details)
        await user.click(root);
        expect(
          container.querySelector(elements.overall),
        ).not.toBeInTheDocument();

        // Overall returns after third click (overall)
        await user.click(root);
        expect(container.querySelector(elements.overall)).toBeInTheDocument();
      }
    });

    it("renders different colors for density ratings", () => {
      const { container: yellowContainer } = render(
        <DayBadge
          {...mockDayBadgeProps}
          density={{ rating: "yellow", score: 4.3 }}
        />,
      );
      expect(yellowContainer.querySelector(elements.root)).toHaveAttribute(
        attrs.densityColor,
        "CITRINE",
      );

      const { container: redContainer } = render(
        <DayBadge
          {...mockDayBadgeProps}
          density={{ rating: "red", score: 4.3 }}
        />,
      );
      expect(redContainer.querySelector(elements.root)).toHaveAttribute(
        attrs.densityColor,
        "RUBY",
      );
    });
  });
});
