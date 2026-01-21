import { tv } from "tailwind-variants";
import * as motion from "motion/react-client";
import { FoodEntryDTO } from "@/lib/types";
import { TextBody, TextCaption } from "../text";

export const foodEntryStyles = tv({
  slots: {
    amount: "",
    calories: "",
    label: "flex-1",
    root: `
      w-full flex gap-b items-baseline
      before:size-b before:rounded-full before:self-center
    `,
    specs: "flex items-baseline gap-b",
  },
  variants: {
    rating: {
      green: {
        root: "before:bg-emerald-300",
      },
      red: {
        root: "before:bg-ruby-300",
      },
      unrated: {
        root: "before:bg-quartz-500",
      },
      yellow: {
        root: "before:bg-citrine-300",
      },
    },
  },
});

export type FoodEntryProps = Pick<
  FoodEntryDTO,
  "amountUnit" | "amountValue" | "calories" | "label" | "rating" | "id"
>;

export const FoodEntry = ({
  amountUnit,
  amountValue,
  calories,
  label,
  rating = "unrated",
}: FoodEntryProps) => {
  // TODO: Open editor on click
  const handleClick = () => true;

  const {
    amount,
    calories: caloriesCn,
    label: labelCn,
    root,
    specs,
  } = foodEntryStyles({ rating });

  return (
    <motion.li
      className={root()}
      data-element="food-entry"
      layout
      onClick={handleClick}
    >
      <div className={labelCn()} data-element="food-entry-label">
        <TextBody>{label}</TextBody>
      </div>
      <div className={specs()} data-element="food-entry-specs">
        <div className={amount()} data-element="food-entry-specs-amount">
          <TextCaption>
            {amountValue} {amountUnit}
          </TextCaption>
        </div>
        <div className={caloriesCn()} data-element="food-entry-specs-calories">
          <TextBody>{calories} cal</TextBody>
        </div>
      </div>
    </motion.li>
  );
};
