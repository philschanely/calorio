import { TokenIcon } from "@/lib/tokens";
import { ComponentProps } from "react";

export type ButtonVariant =
  | "default"
  | "primary"
  | "safe"
  | "danger"
  | "warning";

export type ButtonProps = {
  icon?: TokenIcon;
  iconRight?: TokenIcon;
  variant?: ButtonVariant;
} & ComponentProps<"button">;
