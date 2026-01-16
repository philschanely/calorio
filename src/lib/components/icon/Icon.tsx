import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFAIcon } from "@/lib/tokens";
import { IconProps } from "./Icon.types";
import { iconStyles } from "./Icon.styles";

export const Icon = ({ size = "F", icon }: IconProps) => {
  const { root, icon: iconClass } = iconStyles({ size });
  const faIcon = getFAIcon(icon);

  return (
    <div className={root()}>
      {faIcon && <FontAwesomeIcon className={iconClass()} icon={faIcon} />}
    </div>
  );
};
