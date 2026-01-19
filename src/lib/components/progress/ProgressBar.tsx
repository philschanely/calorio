"use client";

import { useState, useRef, useEffect } from "react";
import { TextDisplay4 } from "../text";
import { progressBarStyles } from "./ProgressBar.styles";
import { ProgressBarProps } from "./types";
import { useProgressProps } from "./use-progress-props";

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    color = "QUARTZ",
    label,
    mode = "percentage",
    pct,
    size = "md",
    text,
  } = useProgressProps(props);

  const [inverted, setInverted] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!barRef.current || !textBoxRef.current) return;

      const barRect = barRef.current.getBoundingClientRect();
      const textRect = textBoxRef.current.getBoundingClientRect();

      // Check if bar's right edge extends past text's right edge
      const barOverflows = barRect.right > textRect.right;
      setInverted(barOverflows);
    };

    checkOverflow();

    // Re-check on window resize
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (barRef.current) resizeObserver.observe(barRef.current);
    if (textBoxRef.current) resizeObserver.observe(textBoxRef.current);

    return () => resizeObserver.disconnect();
  }, [pct, text]);

  const { bar, root, textBox, track } = progressBarStyles({ color, inverted });

  return (
    <div
      aria-label={label}
      className={root()}
      data-element="progress-bar"
      data-progress-bar-color={color}
      data-progress-bar-mode={mode}
      data-progress-bar-render-pct={pct}
      data-progress-bar-size={size}
    >
      <div aria-hidden className={track()} data-element="progress-bar-track">
        {pct > 0 && (
          <div
            ref={barRef}
            className={bar()}
            data-element="progress-bar-bar"
            style={{ width: `calc((100% - 32px) * ${pct} + 32px)` }}
          />
        )}
      </div>
      <div
        ref={textBoxRef}
        className={textBox()}
        data-element="progress-bar-text-box"
      >
        <TextDisplay4 data-element="progress-bar-text">{text}</TextDisplay4>
      </div>
    </div>
  );
};
