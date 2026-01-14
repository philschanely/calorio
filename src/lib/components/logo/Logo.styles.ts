import { tv } from "tailwind-variants";

export const logoStyles = tv({
  base: "flex flex-col items-center justify-start",
  variants: {
    size: {
      Display1: "w-[170px] h-[136px] pt-aa",
      Display2: "w-[124px] h-[104px] pt-[5px]",
      Display3: "w-[104px] h-[88px] pt-[3px]",
      Display4: "w-[82px] h-[68px] pt-px",
      Display5: "w-m h-[56px] pt-a",
      Body: "w-[82px] h-[68px] pt-px",
      Caption: "w-m h-[56px] pt-a",
      fluid: "w-full h-auto",
    },
  },
  defaultVariants: {
    size: "Display3",
  },
});
