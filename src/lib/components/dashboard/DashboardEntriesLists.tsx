import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { TextDisplay3 } from "../text";
import { FoodEntry } from "../entry";
import { StepsEntry } from "../entry/StepsEntry";
import { WaterEntry } from "../entry/WaterEntry";

export const DashboardEntriesLists = () => {
  return (
    <TabGroup
      className="w-full flex flex-col gap-d"
      data-element="dashboard-entries"
    >
      <TabList className="flex gap-f">
        <Tab
          className={`
                flex flex-1 text-center flex-col gap-b outline-none
                text-quartz-200 data-selected:text-emerald-300
                after:transition-colors after:h-a after:bg-transparent data-selected:after:bg-current after:rounded-full after:w-full
              `}
        >
          <TextDisplay3>Calories</TextDisplay3>
        </Tab>
        <Tab
          className={`
                flex flex-1 text-center flex-col gap-b outline-none
                text-quartz-200 data-selected:text-quartz-50
                after:transition-colors after:h-a after:bg-transparent data-selected:after:bg-current after:rounded-full after:w-full
              `}
        >
          <TextDisplay3>Steps</TextDisplay3>
        </Tab>
        <Tab
          className={`
                flex flex-1 text-center flex-col gap-b outline-none
                text-quartz-200 data-selected:text-topaz-300
                after:transition-colors after:h-a after:bg-transparent data-selected:after:bg-current after:rounded-full after:w-full
              `}
        >
          <TextDisplay3>Water</TextDisplay3>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="w-full flex flex-col gap-d">
          <FoodEntry
            amountUnit="oz"
            amountValue={12}
            calories={125}
            id="c1"
            label="English muffin"
            rating="yellow"
          />
          <FoodEntry
            amountUnit="oz"
            amountValue={12}
            calories={125}
            id="c1"
            label="English muffin"
            rating="red"
          />
          <FoodEntry
            amountUnit="oz"
            amountValue={12}
            calories={125}
            id="c1"
            label="English muffin"
            rating="green"
          />
          <FoodEntry
            amountUnit="oz"
            amountValue={12}
            calories={125}
            id="c1"
            label="English muffin"
            rating="unrated"
          />
        </TabPanel>
        <TabPanel className="w-full flex flex-col gap-d">
          <StepsEntry stepsDelta={300} id="s1" createdAtISO="2026-01-01" />
          <StepsEntry stepsDelta={600} id="s1" createdAtISO="2026-01-01" />
          <StepsEntry stepsDelta={1400} id="s1" createdAtISO="2026-01-01" />
          <StepsEntry stepsDelta={2700} id="s1" createdAtISO="2026-01-01" />
        </TabPanel>
        <TabPanel className="w-full flex flex-col gap-d">
          <WaterEntry cupsDelta={2} id="w1" createdAtISO="2026-01-01" />
          <WaterEntry cupsDelta={1.5} id="w1" createdAtISO="2026-01-01" />
          <WaterEntry cupsDelta={1} id="w1" createdAtISO="2026-01-01" />
          <WaterEntry cupsDelta={1.5} id="w1" createdAtISO="2026-01-01" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
