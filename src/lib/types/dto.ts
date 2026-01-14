export type DensityRating = "green" | "yellow" | "red" | "unrated";

export const amountUnits = ["g", "oz", "ml", "floz", "cup"] as const;
export type AmountUnitDTO = (typeof amountUnits)[number];

export type DayRingDTO = {
  dayISO: string;
  overallPct: number;
  densityRating: DensityRating;
};

export type DaySummaryDTO = {
  dayISO: string;
  overallPct: number;
  calories: { total: number; goal: number; pct: number };
  steps: { total: number; goal: number; pct: number };
  water: { total: number; goal: number; pct: number }; // <- renamed
  density: { rating: DensityRating; score: number | null };
};

export type DashboardDTO = {
  todayISO: string;
  today: DaySummaryDTO;
  past7: DayRingDTO[];
};

export type FoodEntryDTO = {
  id: string;
  type: "calories";
  label: string;
  calories: number;
  amountValue?: number;
  amountUnit?: AmountUnitDTO;
  rating: DensityRating;
  createdAtISO: string;
};

export type StepsEntryDTO = {
  id: string;
  type: "steps";
  stepsDelta: number;
  createdAtISO: string;
};

export type WaterEntryDTO = {
  id: string;
  type: "water";
  cupsDelta: number;
  createdAtISO: string;
};

export type DayEntriesDTO = {
  dayISO: string;
  summary: DaySummaryDTO | null;
  entries: {
    calories: FoodEntryDTO[];
    steps: StepsEntryDTO[];
    water: WaterEntryDTO[];
  };
};
