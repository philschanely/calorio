import {
  faAnglesUpDown,
  faArrowRightFromBracket,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faDoorOpen,
  faList,
  faPen,
  faPlus,
  faTrash,
  faXmark,
  IconDefinition,
} from "@fortawesome/pro-solid-svg-icons";
import { TokenIcon } from "./types";

export const ICON_MAP: Record<TokenIcon, IconDefinition> = {
  ANGLES_UP_DOWN: faAnglesUpDown,
  ARROW_RIGHT_FROM_BRACKET: faArrowRightFromBracket,
  CHEVRON_DOWN: faChevronDown,
  CHEVRON_LEFT: faChevronLeft,
  CHEVRON_RIGHT: faChevronRight,
  CHEVRON_UP: faChevronUp,
  DOOR_OPEN: faDoorOpen,
  LIST: faList,
  PEN: faPen,
  PLUS: faPlus,
  TRASH: faTrash,
  XMARK: faXmark,
};
