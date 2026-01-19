import { tv } from "tailwind-variants";

export const progressArcStyles = tv({
  slots: {
    bar: "",
    root: `
      flex flex-col items-center justify-start relative h-[240px] w-[240px]
    `,
    svg: "w-full h-full absolute top-0 left-0",
    textBox: "",
    track: "text-quartz-500",
  },
  variants: {
    color: {
      QUARTZ: {
        bar: "text-quartz-100",
        textBox: "text-quartz-50",
      },
      CITRINE: {
        bar: "text-citrine-300",
        textBox: "text-citrine-300",
      },
      EMERALD: {
        bar: "text-emerald-300",
        textBox: "text-emerald-300",
      },
      RUBY: {
        bar: "text-ruby-300",
        textBox: "text-ruby-300",
      },
      TOPAZ: {
        bar: "text-topaz-300",
        textBox: "text-topaz-300",
      },
    },
    position: {
      top: {
        textBox: "pt-[60px]",
        root: "justify-start",
      },
      bottom: {
        textBox: "pb-[60px]",
        root: "justify-end",
      },
    },
  },
  defaultVariants: {
    position: "top",
  },
});
