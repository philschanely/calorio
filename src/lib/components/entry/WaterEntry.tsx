import { tv } from "tailwind-variants";
import { WaterEntryDTO } from "@/lib/types";
import { TextBody } from "../text";

export const waterEntryStyles = tv({
  slots: {
    label: "flex-1",
    root: `
      w-full flex gap-b items-baseline
      before:size-b before:rounded-full before:self-center before:bg-topaz-300
    `,
    specs: "flex items-baseline gap-b",
  },
});

export type WaterEntryProps = Pick<
  WaterEntryDTO,
  "id" | "cupsDelta" | "createdAtISO"
>;

export const WaterEntry = ({ createdAtISO, cupsDelta }: WaterEntryProps) => {
  // TODO: Open editor on click
  const handleClick = () => true;

  const { label: labelCn, root, specs } = waterEntryStyles();

  return (
    <li className={root()} data-element="water-entry" onClick={handleClick}>
      <div className={labelCn()} data-element="water-entry-label">
        <TextBody>{createdAtISO}</TextBody>
      </div>
      <div className={specs()} data-element="water-entry-steps">
        <TextBody>{cupsDelta} steps</TextBody>
      </div>
    </li>
  );
};
