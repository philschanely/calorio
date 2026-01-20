import { tv } from "tailwind-variants";
import { StepsEntryDTO } from "@/lib/types";
import { TextBody } from "../text";

export const stepsEntryStyles = tv({
  slots: {
    label: "flex-1",
    root: `
      w-full flex gap-b items-baseline
      before:size-b before:rounded-full before:self-center before:bg-quartz-100
    `,
    specs: "flex items-baseline gap-b",
  },
});

export type StepsEntryProps = Pick<
  StepsEntryDTO,
  "id" | "stepsDelta" | "createdAtISO"
>;

export const StepsEntry = ({ createdAtISO, stepsDelta }: StepsEntryProps) => {
  // TODO: Open editor on click
  const handleClick = () => true;

  const { label: labelCn, root, specs } = stepsEntryStyles();

  return (
    <li className={root()} data-element="steps-entry" onClick={handleClick}>
      <div className={labelCn()} data-element="steps-entry-label">
        <TextBody>{createdAtISO}</TextBody>
      </div>
      <div className={specs()} data-element="steps-entry-steps">
        <TextBody>{stepsDelta} steps</TextBody>
      </div>
    </li>
  );
};
