import { tv } from "tailwind-variants";

export const appStyles = tv({
  slots: {
    body: `
      min-h-dvh w-full p-m gap-m
      font-sans text-body text-default bg-background
      flex flex-col items-center justify-start
    `,
    main: "w-full max-w-[520px] flex flex-col gap-m",
  },
});
