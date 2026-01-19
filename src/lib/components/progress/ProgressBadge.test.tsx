import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBadge } from "./ProgressBadge";
import { DaySummaryBadgeMode } from "@/lib/types";

describe("ProgressBadge Component", () => {
  it("renders a circular badge with OVERALL mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const badge = container.querySelector('[class*="rounded-full"]');
    expect(badge).toBeInTheDocument();
  });

  it("displays percentage text in OVERALL mode", () => {
    render(<ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={75} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("has correct size classes for OVERALL mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const badge = container.querySelector("div");
    expect(badge).toHaveClass("size-[144px]");
  });

  it("has correct background color classes for OVERALL mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const badge = container.querySelector("div");
    expect(badge).toHaveClass("bg-quartz-100");
  });

  it("has correct text color classes for OVERALL mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const badge = container.querySelector("div");
    expect(badge).toHaveClass("text-quartz-600");
  });

  it("uses flexbox centering", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const badge = container.querySelector("div");
    expect(badge).toHaveClass("flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("justify-center");
  });

  it("renders null for DETAILS mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.DETAILS} pct={50} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders null for PERCENTAGE mode", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.PERCENTAGE} pct={50} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("displays different percentages correctly", () => {
    const percentages = [0, 25, 50, 75, 100];

    percentages.forEach((pct) => {
      const { unmount } = render(
        <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={pct} />,
      );

      expect(screen.getByText(`${pct}%`)).toBeInTheDocument();

      unmount();
    });
  });

  it("renders TextDisplay1 component for text", () => {
    const { container } = render(
      <ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={50} />,
    );

    const text = container.querySelector('[class*="text"]');
    expect(text).toBeInTheDocument();
  });

  it("handles decimal percentages", () => {
    render(<ProgressBadge mode={DaySummaryBadgeMode.OVERALL} pct={66.67} />);

    expect(screen.getByText("66.67%")).toBeInTheDocument();
  });

  it("only renders badge for OVERALL mode and no other modes", () => {
    const modes = [
      DaySummaryBadgeMode.DETAILS,
      DaySummaryBadgeMode.PERCENTAGE,
      DaySummaryBadgeMode.OVERALL,
    ];

    modes.forEach((mode) => {
      const { container, unmount } = render(
        <ProgressBadge mode={mode} pct={50} />,
      );

      if (mode === DaySummaryBadgeMode.OVERALL) {
        expect(container.firstChild).not.toBeNull();
      } else {
        expect(container.firstChild).toBeNull();
      }

      unmount();
    });
  });
});
