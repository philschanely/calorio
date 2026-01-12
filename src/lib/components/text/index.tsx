import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { tv } from "tailwind-variants";
import { TYPE_SPEC } from "@/lib/types/tokens";

type TextBaseProps<T extends ElementType> = {
  as?: T;
  spec?: TYPE_SPEC;
  variant?: TYPE_SPEC;
  className?: string;
};

type TextProps<T extends ElementType> = TextBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextBaseProps<T>>;

const textStyles = tv({
  variants: {
    spec: {
      Display1: "text-display-1",
      Display2: "text-display-2",
      Display3: "text-display-3",
      Display4: "text-display-4",
      Display5: "text-display-5",
      Body: "text-display-body",
      Caption: "text-display-caption",
    },
  },
});

type TextExpandedComponent = (<T extends ElementType = "p">(
  props: TextProps<T>
) => React.JSX.Element) & {
  Display1: TextVariantComponent;
  Display2: TextVariantComponent;
  Display3: TextVariantComponent;
  Display4: TextVariantComponent;
  Display5: TextVariantComponent;
  Body: TextVariantComponent;
  Caption: TextVariantComponent;
};

type TextVariantComponent = <T extends ElementType = "p">(
  props: Omit<TextProps<T>, "spec" | "variant">
) => React.JSX.Element;

export const Text: TextExpandedComponent = ({
  as,
  spec,
  variant,
  className,
  ...props
}) => {
  const Component = as ?? "p";
  return <Component className={textStyles({ spec: spec ?? variant ?? "Body", className })} {...props} />;
};

const createTextVariant =
  (spec: TYPE_SPEC): TextVariantComponent =>
  ({ ...props }) =>
    Text({ spec, ...props });

Text.Display1 = createTextVariant("Display1");
Text.Display2 = createTextVariant("Display2");
Text.Display3 = createTextVariant("Display3");
Text.Display4 = createTextVariant("Display4");
Text.Display5 = createTextVariant("Display5");
Text.Body = createTextVariant("Body");
Text.Caption = createTextVariant("Caption");
