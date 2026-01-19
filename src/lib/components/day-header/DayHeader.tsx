import { Icon } from "../icon";
import { TextDisplay1 } from "../text";

// TODO: Add day navigation and icon link/buttons

export const DayHeader = () => (
  <div className="flex gap-f items-center w-full" data-element="day-header">
    <div data-element="day-header-back-wrapper">
      <Icon icon="CHEVRON_LEFT" />
    </div>
    <div className="flex-1 text-center" data-element="day-header-label-wrapper">
      <TextDisplay1 data-element="day-header-label">Today</TextDisplay1>
    </div>
    <div data-element="day-header-next-wrapper">
      <Icon icon="CHEVRON_RIGHT" />
    </div>
  </div>
);
