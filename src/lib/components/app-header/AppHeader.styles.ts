import { tv } from "tailwind-variants";

export const appHeaderStyles = tv({
  slots: {
    root: "flex gap-b items-center justify-start w-full",
    link: `
      rounded-a flex gap-b items-center text-body
    hover:text-quartz-100 focus-visible:ring-2 focus-visible:ring-offset-b 
      transition-colors duration-200
    `,
  },
});
