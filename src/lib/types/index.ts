import {
  DayRingDTO,
  DaySummaryDTO,
  FoodEntryDTO,
  StepsEntryDTO,
  WaterEntryDTO,
} from "./dto";

export * from "./dto";

export type DayRing = DayRingDTO;

export type DaySummary = DaySummaryDTO;

export type DayEntries = {
  calories: FoodEntryDTO[];
  steps: StepsEntryDTO[];
  water: WaterEntryDTO[];
};
