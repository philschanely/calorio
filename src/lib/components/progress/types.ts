import { TokenColorSwatchbookBase } from "@/lib/tokens";
import { DaySummaryBadgeMode, FactorSpec } from "@/lib/types";

export type ProgressCoreProps = FactorSpec & {
  color?: TokenColorSwatchbookBase;
  mode?: DaySummaryBadgeMode;
  size?: "sm" | "md";
  unit: string;
};

export type ProgressBarProps = ProgressCoreProps;

export type ProgressArcProps = ProgressCoreProps & {
  position?: "top" | "bottom";
};

export type ProgressArcConfigs = Record<
  "sm" | "md",
  {
    // Figma arcs are set up to show a percentage of a full circle's circumference.
    arcPct: number;
    // Figma arcs are a full circle, so the diameter we need is the width or height of the shape in Figma.
    diameter: number;
    // Figma arcs are set to a certain percentage of the circle's radius. Here we're choosing to use a particular pixel thickness.
    strokeWidth: number;
    // Figma arcs can be offset from default position by a certain number of degrees.
    offsetAngle: number;
  }
>;

export type GetProgressArcParams = {
  position?: "top" | "bottom";
  progressPct: number;
  size?: "sm" | "md";
};

export type GetProgressArcReturn = {
  barProps: React.SVGProps<SVGCircleElement>;
  diameter: number;
  trackProps: React.SVGProps<SVGCircleElement>;
};
