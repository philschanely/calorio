import { tv } from "tailwind-variants";

export const iconButtonStyles = tv({
  base: `
    flex items-center justify-center size-k flex-none rounded-full 
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-quartz-50 
    transition-colors disabled:pointer-events-none
  `,
  variants: {
    variant: {
      danger:
        "text-quartz-600 bg-ruby-300 hover:bg-ruby-200 disabled:bg-ruby-500",
      default:
        "text-quartz-600 bg-quartz-300 hover:bg-quartz-100 disabled:bg-quartz-500",
      "ghost-danger":
        "text-ruby-300 bg-transparent hover:bg-ruby-500 disabled:text-ruby-500",
      "ghost-default":
        "text-quartz-100 bg-transparent hover:bg-quartz-500 disabled:text-quartz-500",
      "ghost-primary":
        "text-topaz-300 bg-transparent hover:bg-topaz-500 disabled:text-topaz-500",
      "ghost-safe":
        "text-emerald-300 bg-transparent hover:bg-emerald-500 disabled:text-emerald-500",
      "ghost-selected":
        "text-quartz-100 bg-transparent hover:bg-quartz-500 disabled:text-quartz-500",
      "ghost-warning":
        "text-citrine-300 bg-transparent hover:bg-citrine-500 disabled:text-citrine-500",
      primary:
        "text-quartz-600 bg-topaz-300 hover:bg-topaz-200 disabled:bg-topaz-500",
      safe: "text-quartz-600 bg-emerald-300 hover:bg-emerald-200 disabled:bg-emerald-500",
      selected:
        "text-quartz-600 bg-quartz-100 hover:bg-quartz-50 disabled:bg-quartz-400",
      warning:
        "text-quartz-600 bg-citrine-300 hover:bg-citrine-200 disabled:bg-citrine-500",
    },
    ghost: {
      true: "-m-[10px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
