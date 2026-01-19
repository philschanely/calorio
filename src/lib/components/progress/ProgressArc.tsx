"use client";

import { TextDisplay4 } from "../text";
import { progressArcStyles } from "./ProgressArc.styles";
import { ProgressArcProps } from "./types";
import { useProgressProps } from "./use-progress-props";
import { getProgressArc } from "./utils";

export const ProgressArc = (props: ProgressArcProps) => {
  const {
    color = "QUARTZ",
    label,
    pct,
    position = "top",
    size,
    text,
  } = useProgressProps(props);

  const { barProps, diameter, trackProps } = getProgressArc({
    position,
    progressPct: pct,
    size,
  });

  const { bar, root, svg, textBox, track } = progressArcStyles({
    color,
    position,
  });

  return (
    <div className={root()} aria-label={label}>
      <svg
        aria-hidden="true"
        className={svg()}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle className={track()} {...trackProps} />
        <circle className={bar()} {...barProps} />
      </svg>
      <div className={textBox()}>
        <TextDisplay4>{text}</TextDisplay4>
      </div>
    </div>
  );
};
