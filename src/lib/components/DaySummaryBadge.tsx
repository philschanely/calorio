import { useState } from "react";
import { DaySummaryBadgeMode, DaySummaryDTO } from "@/lib/types";
import { ProgressArc, ProgressBadge, ProgressBar } from "./progress";
import { tv } from "tailwind-variants";

const daySummaryBadgeStyles = tv({
  slots: {
    root: "grid w-full",
    spec: "col-span-full row-span-full flex justify-center items-center",
  },
});

export const DaySummaryBadge = ({
  overallPct,
  water,
  steps,
  calories,
}: Omit<DaySummaryDTO, "dayISO">) => {
  const [mode, setMode] = useState<DaySummaryBadgeMode>(
    DaySummaryBadgeMode.OVERALL,
  );

  const handleClick = () => {
    switch (mode) {
      case DaySummaryBadgeMode.OVERALL:
        setMode(DaySummaryBadgeMode.PERCENTAGE);
        return;
      case DaySummaryBadgeMode.PERCENTAGE:
        setMode(DaySummaryBadgeMode.DETAILS);
        return;
      case DaySummaryBadgeMode.DETAILS:
      default:
        setMode(DaySummaryBadgeMode.OVERALL);
        return;
    }
  };

  const { root, spec } = daySummaryBadgeStyles();

  return (
    <div className={root()} onClick={handleClick}>
      <div className={spec()}>
        <ProgressArc {...water} color="TOPAZ" mode={mode} unit="cups" />
      </div>
      <div className={spec()}>
        <ProgressBar {...steps} mode={mode} unit="steps" pct={60} />
      </div>
      <div className={spec()}>
        <ProgressArc
          {...calories}
          color="EMERALD"
          mode={mode}
          position="bottom"
          unit="cals"
        />
      </div>
      {mode === DaySummaryBadgeMode.OVERALL && (
        <div className={spec({ className: "z-10" })}>
          <ProgressBadge pct={overallPct} mode={mode} />
        </div>
      )}
    </div>
  );
};
