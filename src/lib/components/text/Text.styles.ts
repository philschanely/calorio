import { colorVariants, typeSpecVariants } from "@/lib/styles";
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
