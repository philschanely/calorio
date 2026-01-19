import { DayBadgeMode } from "@/lib/types";
import { TextDisplay1 } from "../text";
import { TokenColorSwatchbookBase } from "@/lib/tokens";
import { tv } from "tailwind-variants";

export type ProgressBadgeProps = {
  color?: TokenColorSwatchbookBase;
  mode?: DayBadgeMode;
  pct: number;
};

const progressBadgeStyles = tv({
  base: "size-[144px] rounded-full text-quartz-600 text-center flex items-center justify-center",
  variants: {
    color: {
      CITRINE: "bg-citrine-300",
      EMERALD: "bg-emerald-300",
      QUARTZ: "bg-quartz-100",
      RUBY: "bg-ruby-300",
      TOPAZ: "bg-topaz-300",
    },
  },
  defaultVariants: {
    color: "QUARTZ",
  },
});

export const ProgressBadge = ({
  color = "QUARTZ",
  mode,
  pct,
}: ProgressBadgeProps) => {
  return mode === DayBadgeMode.OVERALL ? (
    <div
      className={progressBadgeStyles({ color })}
      data-element="progress-badge"
      data-progress-arc-color={color}
      data-progress-arc-mode={mode}
    >
      <TextDisplay1 data-element="progress-badge-text">{pct}%</TextDisplay1>
    </div>
  ) : null;
};
