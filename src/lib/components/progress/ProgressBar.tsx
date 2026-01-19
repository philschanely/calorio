"use client";

import { useState, useRef, useEffect } from "react";
import { ProgressBarProps } from "./types";
import { useProgressProps } from "./use-progress-props";
import { TextDisplay4 } from "../text";
import { progressBarStyles } from "./ProgressBar.styles";

export const ProgressBar = (props: ProgressBarProps) => {
  const { color, label, pct, text } = useProgressProps(props);

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
    <div className={root()}>
      <div data-item="1" aria-label={label} className={track()}>
        {pct > 0 && (
          <div
            ref={barRef}
            className={bar()}
            style={{ width: `calc((100% - 32px) * ${pct} + 32px)` }}
          />
        )}
      </div>
      <div ref={textBoxRef} className={textBox()}>
        <TextDisplay4>{text}</TextDisplay4>
      </div>
    </div>
  );
};
