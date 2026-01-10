export type DensityRating = "green" | "yellow" | "red" | "unrated";

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
  water: { cups: number; goalCups: number; pct: number };
  density: { rating: DensityRating; score?: number };
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
  amountUnit?: "g" | "oz" | "ml" | "floz" | "cup";
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
    calories: Array<{
      id: string;
      type: "calories";
      label: string;
      calories: number;
      amountValue?: number;
      amountUnit?: "g" | "oz" | "ml" | "floz" | "cup";
      rating: DensityRating;
      createdAtISO: string;
    }>;
    steps: Array<{
      id: string;
      type: "steps";
      stepsDelta: number;
      createdAtISO: string;
    }>;
    water: Array<{
      id: string;
      type: "water";
      cupsDelta: number;
      createdAtISO: string;
    }>;
  };
};
