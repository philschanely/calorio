import { tv } from "tailwind-variants";

export const iconStyles = tv({
  slots: {
    root: "flex items-center justify-center",
    icon: "h-full w-full max-w-[78.4%] max-h-[78.4%]",
  },
  variants: {
    size: {
      NONE: { root: "" },
      AA: { root: "size-a" },
      A: { root: "size-a" },
      B: { root: "size-b" },
      C: { root: "size-c" },
      D: { root: "size-d" },
      E: { root: "size-e" },
      F: { root: "size-f" },
      G: { root: "size-g" },
      H: { root: "size-h" },
      I: { root: "size-i" },
      J: { root: "size-j" },
      K: { root: "size-k" },
      L: { root: "size-l" },
      M: { root: "size-m" },
      N: { root: "size-n" },
    },
  },
  defaultVariants: {
    size: "F",
  },
});
