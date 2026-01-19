import { ComponentPropsWithoutRef, ElementType } from "react";
import { TokenColorSwatchbook, TokenTypeSpec } from "@/lib/tokens";

// Base props for the text component
export type TextBaseProps<T extends ElementType> = {
  as?: T;
  color?: TokenColorSwatchbook | "inherit";
  spec?: TokenTypeSpec;
};

// Extend base props to include types from the specified element
export type TextProps<T extends ElementType> = TextBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextBaseProps<T>>;

// Text props excluding 'spec' for shorthand components
export type TextShorthandComponent = <T extends ElementType = "p">(
  props: Omit<TextProps<T>, "spec">,
) => React.JSX.Element;

// Text component base with shorthands for each text specification
export type TextExpandedComponent = (<T extends ElementType = "p">(
  props: TextProps<T>,
) => React.JSX.Element) & {
  Display1: TextShorthandComponent;
  Display2: TextShorthandComponent;
  Display3: TextShorthandComponent;
  Display4: TextShorthandComponent;
  Display5: TextShorthandComponent;
  Body: TextShorthandComponent;
  Caption: TextShorthandComponent;
};
