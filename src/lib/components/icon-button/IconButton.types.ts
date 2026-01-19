import { TokenIcon } from "@/lib/tokens";
import { ComponentProps } from "react";

export type IconButtonVariant =
  | "danger"
  | "default"
  | "primary"
  | "safe"
  | "selected"
  | "warning";

export type IconButtonProps = {
  icon: TokenIcon;
  variant?: IconButtonVariant;
} & ComponentProps<"button">;
