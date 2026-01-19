import { DaySummaryBadgeMode } from "@/lib/types";
import { TextDisplay1 } from "../text";

export const ProgressBadge = ({
  mode,
  pct,
}: {
  mode: DaySummaryBadgeMode;
  pct: number;
}) => {
  return mode === DaySummaryBadgeMode.OVERALL ? (
    <div className="size-[144px] rounded-full bg-quartz-100 text-quartz-600 text-center flex items-center justify-center">
      <TextDisplay1>{pct}%</TextDisplay1>
    </div>
  ) : null;
};
