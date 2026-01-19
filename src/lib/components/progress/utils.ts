import {
  GetProgressArcParams,
  GetProgressArcReturn,
  ProgressArcConfigs,
} from "./types";

const progressArcConfigs: ProgressArcConfigs = {
  sm: {
    arcPct: 0.42,
    diameter: 120,
    strokeWidth: 16,
    offsetAngle: 14,
  },
  md: {
    arcPct: 0.42,
    diameter: 240,
    strokeWidth: 32,
    offsetAngle: 14,
  },
};

export const getProgressArc = ({
  position = "top",
  progressPct,
  size = "md",
}: GetProgressArcParams): GetProgressArcReturn => {
  const { strokeWidth, diameter, arcPct, offsetAngle } =
    progressArcConfigs[size];
  const arcRadius = diameter / 2;

  // Our SVG shape uses a stroke to create the arc, so we need to adjust its radius by half of the desired stroke
  const innerRadius = arcRadius - strokeWidth / 2;

  // C = 2πr
  const innerCirc = 2 * Math.PI * innerRadius;

  // Our stroke adds to the offset degrees
  // Half the stroke / inner circumference gives a ratio that we multiply be 360° to get this additional amount
  const arcStrokeDeg = (strokeWidth / 2 / innerCirc) * 360;
  const innerArcOffsetAngle = offsetAngle + arcStrokeDeg;

  // To ensure our shape has proper size we need to calculate the arc percentage of the inner circumference
  // Then subtract the stroke size (half on each end)
  const innerCircPortion = innerCirc * arcPct;
  const innerCircPortionWithOffsets = innerCircPortion - strokeWidth;

  // Now the inner percentage can be determined as a ratio of the inner size over the inner circumference
  const innerPct = innerCircPortionWithOffsets / innerCirc;

  // Our SVG values use sort of the opposite of the percentage amount
  const totalDashOffset = innerCirc - innerCirc * innerPct;
  const portionDashOffset = innerCirc - progressPct * innerPct * innerCirc;

  // Properties that apply to both the track and the bar
  const commonProps: React.SVGProps<SVGCircleElement> = {
    cx: arcRadius, // center is same as radius
    cy: arcRadius, // center is same as radius
    fill: "none",
    r: innerRadius,
    stroke: "currentColor", // use currentColor to inherit from text color
    strokeDasharray: `${innerCirc} ${innerCirc}`,
    strokeLinecap: "round",
    strokeWidth,
  };

  const trackRotation =
    position === "bottom" ? innerArcOffsetAngle : innerArcOffsetAngle + 180;

  const barRotation =
    position === "bottom"
      ? 90 - innerArcOffsetAngle
      : innerArcOffsetAngle + 180;

  return {
    barProps: {
      ...commonProps,
      transform: `rotate(${barRotation} ${arcRadius} ${arcRadius})`,
      strokeDashoffset: portionDashOffset,
    },
    diameter,
    trackProps: {
      ...commonProps,
      transform: `rotate(${trackRotation} ${arcRadius} ${arcRadius})`,
      strokeDashoffset: totalDashOffset,
    },
  };
};
