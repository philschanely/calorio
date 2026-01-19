import { tv } from "tailwind-variants";

export const progressBarStyles = tv({
  slots: {
    bar: "h-full min-w-h rounded-full",
    root: "relative w-[240px] flex flex-col items-center justify-center",
    textBox: "relative z-2 px-a rounded-b",
    track:
      "absolute inset-0 flex w-full h-h rounded-full bg-quartz-500 overflow-hidden z-1",
  },
  variants: {
    color: {
      QUARTZ: {
        bar: "bg-quartz-100",
        textBox: "text-quartz-100",
      },
      CITRINE: {
        bar: "bg-citrine-300",
        textBox: "text-citrine-300",
      },
      EMERALD: {
        bar: "bg-emerald-300",
        textBox: "text-emerald-300",
      },
      RUBY: {
        bar: "bg-ruby-300",
        textBox: "text-ruby-300",
      },
      TOPAZ: {
        bar: "bg-topaz-300",
        textBox: "text-topaz-300",
      },
    },
    inverted: {
      true: {
        textBox: "text-quartz-500",
      },
      false: {
        textBox: "bg-quartz-500/60",
      },
    },
  },
  defaultVariants: {
    color: "QUARTZ",
  },
});
