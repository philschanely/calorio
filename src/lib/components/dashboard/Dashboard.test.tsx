import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import type { DaySummaryDTO } from "@/lib/types";
import type { DensityRating } from "@/lib/types";
import { PropsWithChildren } from "react";

// Mock dependencies
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/providers", () => ({
  useSession: vi.fn(),
}));

vi.mock("../day-header", () => ({
  DayHeader: () => <div data-testid="day-header">DayHeader</div>,
}));

vi.mock("../day-badge", () => ({
  DayBadge: (props: Omit<DaySummaryDTO, "dayISO">) => (
    <div data-testid="day-badge" data-props={JSON.stringify(props)}>
      DayBadge
    </div>
  ),
}));

vi.mock("../text", () => ({
  TextDisplay3: ({ children }: PropsWithChildren) => <div>{children}</div>,
  TextBody: ({ children }: PropsWithChildren) => <div>{children}</div>,
  TextCaption: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

vi.mock("@/lib/styles", () => ({
  linkStyles: vi.fn(() => "link-styles-class"),
}));

const { useSession } = await import("@/lib/providers");

const mockDaySummaryData: DaySummaryDTO = {
  overallPct: 75,
  dayISO: "2026-01-19",
  density: { rating: "green", score: 1 },
  water: { goal: 2000, pct: 50, total: 1000 },
  steps: { goal: 8000, pct: 50, total: 4000 },
  calories: { goal: 1800, pct: 50, total: 500 },
};

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When user is not authenticated", () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        isSignedIn: false,
        user: null,
      });
    });

    it("renders a sign-in link", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("sign-in link has correct text", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.getByText("Sign in")).toBeInTheDocument();
    });

    it("sign-in link has correct href with callback URL", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("/api/auth/signin"),
      );
      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("callbackUrl"),
      );
    });

    it("sign-in link has correct styles", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      const link = screen.getByRole("link");
      expect(link).toHaveClass("link-styles-class");
    });

    it("does not render DayHeader when not authenticated", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.queryByTestId("day-header")).not.toBeInTheDocument();
    });

    it("does not render DayBadge when not authenticated", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.queryByTestId("day-badge")).not.toBeInTheDocument();
    });
  });

  describe("When user is authenticated", () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        isSignedIn: true,
        user: {
          email: "test@example.com",
          name: "Test User",
          image: undefined,
        },
      });
    });

    it("renders the DayHeader component", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.getByTestId("day-header")).toBeInTheDocument();
    });

    it("renders the DayBadge component", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.getByTestId("day-badge")).toBeInTheDocument();
    });

    it("passes correct props to DayBadge", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      const dayBadge = screen.getByTestId("day-badge");
      const props = JSON.parse(dayBadge.getAttribute("data-props") || "{}");

      expect(props).toEqual({
        calories: { goal: 1800, pct: 50, total: 500 },
        density: { rating: "green", score: 1 },
        overallPct: 75,
        steps: { goal: 8000, pct: 50, total: 4000 },
        water: { goal: 2000, pct: 50, total: 1000 },
      });
    });

    it("does not render sign-in link when authenticated", () => {
      render(<Dashboard {...mockDaySummaryData} />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("renders main container with correct classes", () => {
      const { container } = render(<Dashboard {...mockDaySummaryData} />);
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass("flex", "flex-col", "gap-f");
    });
  });

  describe("Props handling", () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        isSignedIn: true,
        user: {
          email: "test@example.com",
          name: "Test User",
          image: undefined,
        },
      });
    });

    it("renders with different calorie values", () => {
      const data = {
        ...mockDaySummaryData,
        calories: { goal: 2500, pct: 60, total: 1500 },
      };
      render(<Dashboard {...data} />);
      const dayBadge = screen.getByTestId("day-badge");
      const props = JSON.parse(dayBadge.getAttribute("data-props") || "{}");
      expect(props.calories.goal).toBe(2500);
    });

    it("renders with different overall percentage values", () => {
      const data = { ...mockDaySummaryData, overallPct: 50 };
      render(<Dashboard {...data} />);
      const dayBadge = screen.getByTestId("day-badge");
      const props = JSON.parse(dayBadge.getAttribute("data-props") || "{}");
      expect(props.overallPct).toBe(50);
    });

    it("renders with zero values", () => {
      const data: DaySummaryDTO = {
        overallPct: 0,
        dayISO: "2026-01-19",
        density: { rating: "red" as DensityRating, score: 0 },
        water: { goal: 0, pct: 0, total: 0 },
        steps: { goal: 0, pct: 0, total: 0 },
        calories: { goal: 0, pct: 0, total: 0 },
      };
      render(<Dashboard {...data} />);
      const dayBadge = screen.getByTestId("day-badge");
      const props = JSON.parse(dayBadge.getAttribute("data-props") || "{}");
      expect(props.overallPct).toBe(0);
      expect(props.calories.goal).toBe(0);
    });

    it("renders with high values", () => {
      const data: DaySummaryDTO = {
        overallPct: 150,
        dayISO: "2026-01-19",
        density: { rating: "green" as DensityRating, score: 100 },
        water: { goal: 5000, pct: 150, total: 7500 },
        steps: { goal: 50000, pct: 150, total: 75000 },
        calories: { goal: 5000, pct: 150, total: 7500 },
      };
      render(<Dashboard {...data} />);
      const dayBadge = screen.getByTestId("day-badge");
      const props = JSON.parse(dayBadge.getAttribute("data-props") || "{}");
      expect(props.overallPct).toBe(150);
      expect(props.steps.goal).toBe(50000);
    });
  });
});
