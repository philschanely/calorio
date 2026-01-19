import { tv } from "tailwind-variants";

export const dayBadgeStyles = tv({
  slots: {
    root: "grid w-full",
    spec: "col-span-full row-span-full flex justify-center items-center",
  },
});
