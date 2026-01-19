import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DayBadgeMode } from "@/lib/types";
import { ProgressBadge } from "./ProgressBadge";
import { TokenColorSwatchbookBase } from "@/lib/tokens";

const elements = {
  root: '[data-element="progress-badge"]',
  text: '[data-element="progress-badge-text"]',
};

const attrs = {
  color: "data-progress-arc-color",
  mode: "data-progress-arc-mode",
};

describe("ProgressBadge Component", () => {
  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(
        <ProgressBadge mode={DayBadgeMode.OVERALL} pct={50} />,
      );

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(root).toHaveAttribute(attrs.mode, DayBadgeMode.OVERALL);
      expect(root).toHaveAttribute(attrs.color, "QUARTZ");
      expect(root).toHaveClass("bg-quartz-100");
    });

    it("does not render when mode is not OVERALL", () => {
      const { container: containerDetails } = render(
        <ProgressBadge mode={DayBadgeMode.DETAILS} pct={50} />,
      );
      const { container: containerPercentage } = render(
        <ProgressBadge mode={DayBadgeMode.PERCENTAGE} pct={50} />,
      );

      expect(
        containerDetails.querySelector(elements.root),
      ).not.toBeInTheDocument();
      expect(
        containerPercentage.querySelector(elements.root),
      ).not.toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders different percentages", () => {
      const testCases = [
        {
          pct: 13,
          expectedValue: "13%",
        },
        {
          pct: 56,
          expectedValue: "56%",
        },
        {
          pct: 100,
          expectedValue: "100%",
        },
        {
          pct: 88,
          expectedValue: "88%",
        },
      ];
      testCases.forEach(({ pct, expectedValue }) => {
        render(<ProgressBadge mode={DayBadgeMode.OVERALL} pct={pct} />);
        expect(screen.getByText(expectedValue)).toBeInTheDocument();
      });
    });

    describe("handles extreme percentages as expected", () => {
      it("> 100", () => {
        render(<ProgressBadge mode={DayBadgeMode.OVERALL} pct={145} />);
        expect(screen.getByText("145%")).toBeInTheDocument();
      });

      it("< 0", () => {
        render(<ProgressBadge mode={DayBadgeMode.OVERALL} pct={-12} />);
        expect(screen.getByText("-12%")).toBeInTheDocument();
      });
    });

    it("renders different colors", () => {
      const testCases = [
        {
          color: "EMERALD",
          expectedClassName: "bg-emerald-300",
        },
        {
          color: "RUBY",
          expectedClassName: "bg-ruby-300",
        },
        {
          color: "TOPAZ",
          expectedClassName: "bg-topaz-300",
        },
        {
          color: "CITRINE",
          expectedClassName: "bg-citrine-300",
        },
      ];
      testCases.forEach(({ color, expectedClassName }) => {
        const { container } = render(
          <ProgressBadge
            mode={DayBadgeMode.OVERALL}
            pct={50}
            color={color as TokenColorSwatchbookBase}
          />,
        );
        const root = container.querySelector(elements.root);
        expect(root).toHaveAttribute(attrs.color, color);
        expect(root).toHaveClass(expectedClassName);
      });
    });

    it("only renders badge for OVERALL mode and no other modes", () => {
      const modes = [
        DayBadgeMode.DETAILS,
        DayBadgeMode.PERCENTAGE,
        DayBadgeMode.OVERALL,
      ];

      modes.forEach((mode) => {
        const { container, unmount } = render(
          <ProgressBadge mode={mode} pct={50} />,
        );

        if (mode === DayBadgeMode.OVERALL) {
          expect(container.firstChild).not.toBeNull();
        } else {
          expect(container.firstChild).toBeNull();
        }

        unmount();
      });
    });
  });
});
