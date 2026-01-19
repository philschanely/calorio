import { tv } from "tailwind-variants";

export const buttonStyles = tv(
  {
    slots: {
      root: `
        flex items-center gap-b h-k rounded-b text-quartz-600 
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-quartz-50 
      `,
      text: `flex-1 text-display-4 line-clamp-1 text-left`,
    },
    variants: {
      variant: {
        danger: { root: "bg-ruby-300 hover:bg-ruby-200 disabled:bg-ruby-500" },
        default: {
          root: "bg-quartz-300 hover:bg-quartz-100 disabled:bg-quartz-500",
        },
        primary: {
          root: "bg-topaz-300 hover:bg-topaz-200 disabled:bg-topaz-500",
        },
        safe: {
          root: "bg-emerald-300 hover:bg-emerald-200 disabled:bg-emerald-500",
        },
        selected: {
          root: "bg-quartz-100 hover:bg-quartz-50 disabled:bg-quartz-400",
        },
        warning: {
          root: "bg-citrine-300 hover:bg-citrine-200 disabled:bg-citrine-500",
        },
      },
      // TODO
      hasIcon: {
        true: {
          root: "pl-b",
        },
        false: {
          root: "pl-f",
        },
      },
      hasIconRight: {
        true: {
          root: "pr-b",
        },
        false: {
          root: "pr-f",
        },
      },
    },
    defaultVariants: {
      hasIcon: false,
      hasIconRight: false,
      variant: "default",
    },
  },
  {
    twMerge: false,
  },
);
