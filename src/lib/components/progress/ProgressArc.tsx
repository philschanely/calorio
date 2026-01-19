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
    mode = "percentage",
    pct,
    position = "top",
    size = "md",
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
    <div
      aria-label={label}
      className={root()}
      data-element="progress-arc"
      data-progress-arc-color={color}
      data-progress-arc-mode={mode}
      data-progress-arc-render-pct={pct}
      data-progress-arc-position={position}
      data-progress-arc-size={size}
    >
      <svg
        aria-hidden="true"
        className={svg()}
        data-element="progress-arc-artwork"
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle className={track()} {...trackProps} />
        {pct > 0 && <circle className={bar()} {...barProps} />}
      </svg>
      <div className={textBox()} data-element="progress-arc-text-box">
        <TextDisplay4 data-element="progress-arc-text">{text}</TextDisplay4>
      </div>
    </div>
  );
};
