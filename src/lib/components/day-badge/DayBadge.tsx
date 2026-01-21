"use client";

import { DayBadgeMode } from "@/lib/types";
import { useMemo, useState } from "react";
import * as motion from "motion/react-client";
import { ProgressArc, ProgressBadge, ProgressBar } from "../progress";
import { dayBadgeStyles } from "./DayBadge.styles";
import { DayBadgeProps } from "./DayBadge.types";
import { DensityRating } from "@prisma/client";
import { AnimatePresence } from "motion/react";

export const DayBadge = ({
  calories,
  density,
  overallPct,
  steps,
  water,
}: DayBadgeProps) => {
  const [mode, setMode] = useState<DayBadgeMode>(DayBadgeMode.PERCENTAGE);

  const handleClick = () => {
    switch (mode) {
      case DayBadgeMode.OVERALL:
        setMode(DayBadgeMode.PERCENTAGE);
        return;
      case DayBadgeMode.PERCENTAGE:
        setMode(DayBadgeMode.DETAILS);
        return;
      case DayBadgeMode.DETAILS:
      default:
        setMode(DayBadgeMode.OVERALL);
        return;
    }
  };

  const densityColor = useMemo(() => {
    switch (density.rating) {
      case DensityRating.red:
        return "RUBY";
      case DensityRating.yellow:
        return "CITRINE";
      case DensityRating.green:
      default:
        return "EMERALD";
    }
  }, [density]);

  const { root, spec } = dayBadgeStyles();

  return (
    <div
      className={root()}
      data-element="day-badge"
      data-day-badge-density-color={densityColor}
      data-day-badge-mode={mode}
      onClick={handleClick}
    >
      <div data-element="day-badge-water-wrapper" className={spec()}>
        <ProgressArc {...water} color="TOPAZ" mode={mode} unit="cups" />
      </div>
      <div data-element="day-badge-steps-wrapper" className={spec()}>
        <ProgressBar {...steps} mode={mode} unit="steps" />
      </div>
      <div data-element="day-badge-calories-wrapper" className={spec()}>
        <ProgressArc
          {...calories}
          color={densityColor}
          mode={mode}
          position="bottom"
          unit="cals"
        />
      </div>
      <AnimatePresence>
        {mode === DayBadgeMode.OVERALL && (
          <motion.div
            data-element="day-badge-overall-wrapper"
            className={spec({ className: "z-10" })}
            initial={{ transform: "rotateX(-90deg)", opacity: 0 }}
            animate={{ transform: "rotateX(0deg)", opacity: 1 }}
            exit={{ transform: "rotateX(-90deg)", opacity: 0 }}
          >
            <ProgressBadge pct={overallPct} mode={mode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
