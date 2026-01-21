"use client";

import * as motion from "motion/react-client";
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

  const { barDashOffset, barProps, diameter, innerCirc, trackProps } =
    getProgressArc({
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
      <motion.svg
        aria-hidden="true"
        className={svg()}
        data-element="progress-arc-artwork"
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <motion.circle className={track()} {...trackProps} />
        {pct > 0 && (
          <motion.circle
            initial={{ strokeDashoffset: innerCirc }}
            animate={{ strokeDashoffset: barDashOffset }}
            className={bar()}
            {...barProps}
          />
        )}
      </motion.svg>
      <motion.div
        className={textBox()}
        layout
        data-element="progress-arc-text-box"
      >
        <TextDisplay4 data-element="progress-arc-text">{text}</TextDisplay4>
      </motion.div>
    </div>
  );
};
