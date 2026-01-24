import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Mock motion to avoid animation timing/DOM differences in tests
// AnimatePresence: render children directly without exit/enter animations
vi.mock("motion/react", () => {
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

// motion/react-client: provide simple tag wrappers that render plain elements
// Export commonly used tags explicitly so namespace import works: motion.div, motion.svg, etc.
vi.mock("motion/react-client", () => {
  type TagName = keyof React.JSX.IntrinsicElements;
  type ComponentProps = Record<string, unknown> & {
    ref?: React.ForwardedRef<HTMLElement>;
  };

  const make = (tag: TagName) => {
    const Comp = React.forwardRef<HTMLElement, ComponentProps>((props, ref) =>
      React.createElement(tag as string, { ...props, ref }),
    );
    Comp.displayName = `motion.${String(tag)}`;
    return Comp;
  };

  const exports = {
    div: make("div"),
    span: make("span"),
    hr: make("hr"),
    svg: make("svg"),
    path: make("path"),
    circle: make("circle"),
  };

  return {
    __esModule: true,
    default: exports,
    ...exports,
  };
});
