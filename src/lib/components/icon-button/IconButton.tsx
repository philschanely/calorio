import { PropsWithChildren } from "react";
import { IconButtonProps } from "./IconButton.types";
import { iconButtonStyles } from "./IconButton.styles";
import { Icon } from "../icon/Icon";

export const IconButton = ({
  children,
  icon,
  variant = "default",
  ...rest
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      aria-label={children?.toString()}
      className={iconButtonStyles({ variant })}
      data-element="icon-button"
      {...rest}
    >
      <Icon icon={icon} />
    </button>
  );
};
