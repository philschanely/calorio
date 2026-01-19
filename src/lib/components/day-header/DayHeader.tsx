import { Icon } from "../icon";
import { TextDisplay1 } from "../text";

// TODO: Add day navigation and icon link/buttons

export const DayHeader = () => (
  <div className="flex gap-f items-center w-full">
    <Icon icon="CHEVRON_LEFT" />
    <div className="flex-1 text-center">
      <TextDisplay1>Today</TextDisplay1>
    </div>
    <Icon icon="CHEVRON_RIGHT" />
  </div>
);
