import { TokenColorSwatchbookBase } from "@/lib/tokens";
import { DayBadgeMode, FactorSpec } from "@/lib/types";
import { SVGMotionProps } from "motion/react";

export type ProgressCoreProps = FactorSpec & {
  color?: TokenColorSwatchbookBase;
  mode?: DayBadgeMode;
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
  barDashOffset: number;
  barProps: SVGMotionProps<SVGCircleElement>;
  diameter: number;
  innerCirc: number;
  trackDashOffset: number;
  trackProps: SVGMotionProps<SVGCircleElement>;
};
