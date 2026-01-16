import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFAIcon } from "@/lib/tokens";
import { IconProps } from "./Icon.types";
import { iconStyles } from "./Icon.styles";

export const Icon = ({ icon, label, size = "F" }: IconProps) => {
  const { root, icon: iconClass } = iconStyles({ size });
  const faIcon = getFAIcon(icon);

  return (
    <span className={root()} aria-label={label}>
      {faIcon && <FontAwesomeIcon className={iconClass()} icon={faIcon} />}
    </span>
  );
};
