import { TokenIcon, TokenSpacing } from "@/lib/tokens";

export type IconProps = {
  icon: TokenIcon;
  label?: string;
  size?: TokenSpacing;
} & React.HTMLAttributes<HTMLSpanElement>;
