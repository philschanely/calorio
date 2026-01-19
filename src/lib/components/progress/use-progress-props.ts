import { getValidPercentage } from "@/lib/utils";
import { ProgressArcProps, ProgressBarProps } from "./types";
import { useMemo } from "react";
import { DaySummaryBadgeMode } from "@/lib/types";

export const useProgressProps = (
  props: ProgressArcProps | ProgressBarProps,
): ProgressArcProps & { label: string; text: string } => {
  const { goal, pct, mode, total, unit, ...rest } = props;

  const text = useMemo(() => {
    switch (mode) {
      case DaySummaryBadgeMode.DETAILS:
        return `${total} ${unit}`;
      case DaySummaryBadgeMode.PERCENTAGE:
        return `${pct}% `;
      case DaySummaryBadgeMode.OVERALL:
      default:
        return ``;
    }
  }, [mode, pct, total, unit]);

  return {
    goal,
    label: `${total} (${pct}%) toward the daily goal of ${goal}`,
    pct: getValidPercentage(pct),
    text,
    total,
    unit,
    ...rest,
  };
};
