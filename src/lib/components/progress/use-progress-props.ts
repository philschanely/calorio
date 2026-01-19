import { getValidPercentage } from "@/lib/utils";
import { useMemo } from "react";
import { DayBadgeMode } from "@/lib/types";
import { ProgressArcProps, ProgressBarProps } from "./types";

export const useProgressProps = (
  props: ProgressArcProps | ProgressBarProps,
): ProgressArcProps & { label: string; text: string } => {
  const { goal, pct, mode, total, unit, ...rest } = props;

  const text = useMemo(() => {
    switch (mode) {
      case DayBadgeMode.DETAILS:
        return `${total} ${unit}`;
      case DayBadgeMode.PERCENTAGE:
        return `${pct}% `;
      case DayBadgeMode.OVERALL:
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
