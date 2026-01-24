import { PropsWithChildren } from "react";
import { IconButtonProps } from "./IconButton.types";
import { iconButtonStyles } from "./IconButton.styles";
import { Icon } from "../icon/Icon";

export const IconButton = ({
  children,
  ghost = false,
  icon,
  variant = "default",
  ...rest
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      aria-label={children?.toString()}
      className={iconButtonStyles({
        ghost,
        variant: ghost ? `ghost-${variant}` : variant,
      })}
      data-element="icon-button"
      {...rest}
    >
      <Icon icon={icon} />
    </button>
  );
};
