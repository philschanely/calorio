import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button.types";
import { buttonStyles } from "./Button.styles";
import { Icon } from "../icon";

export const Button = ({
  children,
  icon,
  iconRight,
  variant = "default",
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const { root, text } = buttonStyles({
    hasIcon: !!icon,
    hasIconRight: !!iconRight,
    variant,
  });
  return (
    <button className={root()} data-element="button" {...rest}>
      {icon && (
        <div data-element="button-icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <span className={text()} data-element="button-text">
        {children}
      </span>
      {iconRight && (
        <div data-element="button-icon-right-wrapper">
          <Icon icon={iconRight} />
        </div>
      )}
    </button>
  );
};
