import { colorVariants, typeSpecVariants } from "@/lib/styles/tokens";
import { tv } from "tailwind-variants";

export const textStyles = tv({
  base: "",
  variants: {
    color: {
      ...colorVariants,
      inherit: "",
    },
    spec: typeSpecVariants,
  },
  defaultVariants: {
    color: "inherit",
    spec: "Body",
  },
});
