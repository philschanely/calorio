import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import * as motion from "motion/react-client";
import { FoodEntry, StepsEntry, WaterEntry } from "../entry";
import { TextDisplay3 } from "../text";
import { tv } from "tailwind-variants";
import { AnimatePresence } from "motion/react";
import { PropsWithChildren } from "react";
import { DayEntries } from "@/lib/types";

export const styles = tv({
  slots: {
    root: "w-full flex flex-col gap-d",
    tab: `
      flex flex-1 text-center flex-col gap-b outline-none
      text-quartz-200 cursor-pointer
    `,
    tabPanel: "w-full flex flex-col gap-d justify-start",
    underline: "block border-none h-a bg-current rounded-full w-full",
  },
});

const tabs = [
  {
    label: "Calories",
    className: "data-selected:text-emerald-300",
  },
  {
    label: "Steps",
    className: "data-selected:text-quartz-50",
  },
  {
    label: "Water",
    className: "data-selected:text-topaz-300",
  },
];

export const EntryTabPane = ({ children }: PropsWithChildren) => {
  const { tabPanel } = styles();

  return (
    <TabPanel
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={tabPanel()}
    >
      {children}
    </TabPanel>
  );
};

export const DashboardEntriesLists = ({
  entriesByDay,
}: {
  entriesByDay?: Record<string, DayEntries>;
}) => {
  const { root, tab, underline } = styles();
  const {
    calories = [],
    steps = [],
    water = [],
  } = entriesByDay?.["2026-01-09"] ?? {};

  console.log(entriesByDay, calories);

  return (
    <TabGroup
      as={motion.div}
      layout
      className={root()}
      data-element="dashboard-entries"
    >
      <TabList className="flex gap-f">
        {tabs.map(({ label, className }) => (
          <Tab
            as={motion.div}
            key={label}
            className={tab({ className })}
            layout="position"
          >
            {({ selected }) => (
              <>
                <TextDisplay3>{label}</TextDisplay3>
                {selected ? (
                  <motion.hr
                    className={underline()}
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <AnimatePresence>
          <EntryTabPane key="food">
            {calories.map(({ id, ...data }) => (
              <FoodEntry key={id} id={id} {...data} />
            ))}
          </EntryTabPane>
          <EntryTabPane key="steps">
            {steps.map(({ id, ...data }) => (
              <StepsEntry key={id} id={id} {...data} />
            ))}
          </EntryTabPane>
          <EntryTabPane key="water">
            {water.map(({ id, ...data }) => (
              <WaterEntry key={id} id={id} {...data} />
            ))}
          </EntryTabPane>
        </AnimatePresence>
      </TabPanels>
    </TabGroup>
  );
};
