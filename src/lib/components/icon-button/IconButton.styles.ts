import { tv } from "tailwind-variants";

export const iconButtonStyles = tv({
  base: `
    flex items-center justify-center size-k rounded-full text-quartz-600 
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-quartz-50 
  `,
  variants: {
    variant: {
      danger: "bg-ruby-300 hover:bg-ruby-200 disabled:bg-ruby-500",
      default: "bg-quartz-300 hover:bg-quartz-100 disabled:bg-quartz-500",
      primary: "bg-topaz-300 hover:bg-topaz-200 disabled:bg-topaz-500",
      safe: "bg-emerald-300 hover:bg-emerald-200 disabled:bg-emerald-500",
      selected: "bg-quartz-100 hover:bg-quartz-50 disabled:bg-quartz-400",
      warning: "bg-citrine-300 hover:bg-citrine-200 disabled:bg-citrine-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
