import { TokenTypeSpec } from "@/lib/tokens";
import { TextProps } from "./Text.types";
import { textStyles } from "./Text.styles";
import { ElementType } from "react";

export const Text = <T extends ElementType = "p">({
  as,
  spec = "Body",
  ...props
}: TextProps<T>) => {
  const Component = as ?? "p";
  return <Component className={textStyles({ spec })} {...props} />;
};

const createTextVariant =
  (spec: TokenTypeSpec) =>
  ({ ...props }) =>
    Text({ spec, ...props });

export const TextDisplay1 = createTextVariant("Display1");
export const TextDisplay2 = createTextVariant("Display2");
export const TextDisplay3 = createTextVariant("Display3");
export const TextDisplay4 = createTextVariant("Display4");
export const TextDisplay5 = createTextVariant("Display5");
export const TextBody = createTextVariant("Body");
export const TextCaption = createTextVariant("Caption");
