import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFAIcon } from "@/lib/tokens";
import { iconStyles } from "./Icon.styles";
import { IconProps } from "./Icon.types";

export const Icon = ({ icon, label, size = "F" }: IconProps) => {
  const { root, icon: iconClass } = iconStyles({ size });
  const faIcon = getFAIcon(icon);

  return (
    <span
      aria-label={label}
      className={root()}
      data-element="icon"
      data-icon={icon}
      data-icon-size={size}
    >
      {faIcon && <FontAwesomeIcon className={iconClass()} icon={faIcon} />}
    </span>
  );
};
