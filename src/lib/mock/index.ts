import { DayEntries, DayRing, DaySummary } from "../types";

export * from "./helpers";

export const mock = {
  todayISO: "2026-01-09",

  summaryByDay: {
    "2026-01-09": {
      dayISO: "2026-01-09",
      overallPct: 67,
      calories: { total: 1340, goal: 2000, pct: 67 },
      steps: { total: 4200, goal: 8000, pct: 52.5 },
      water: { total: 7, goal: 8, pct: 87.5 },
      density: { rating: "yellow", score: 0.55 },
    },
  } satisfies Record<string, DaySummary>,

  past7: [
    { dayISO: "2026-01-03", overallPct: 25, densityRating: "red" },
    { dayISO: "2026-01-04", overallPct: 50, densityRating: "green" },
    { dayISO: "2026-01-05", overallPct: 0, densityRating: "unrated" },
    { dayISO: "2026-01-06", overallPct: 75, densityRating: "yellow" },
    { dayISO: "2026-01-07", overallPct: 85, densityRating: "yellow" },
    { dayISO: "2026-01-08", overallPct: 90, densityRating: "green" },
    { dayISO: "2026-01-09", overallPct: 67, densityRating: "yellow" },
  ] satisfies DayRing[],

  month: Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(Date.UTC(2026, 0, 1 + i));
    const dayISO = d.toISOString().slice(0, 10);
    const pct = [0, 15, 25, 40, 55, 67, 80, 92, 110][i % 9];
    const densityRating = (["green", "yellow", "red", "unrated"] as const)[
      i % 4
    ];
    return { dayISO, overallPct: pct, densityRating };
  }) satisfies DayRing[],

  entriesByDay: {
    "2026-01-09": {
      calories: [
        {
          id: "c1",
          type: "calories",
          label: "English muffin",
          calories: 125,
          amountValue: 2,
          amountUnit: "oz",
          rating: "yellow",
          createdAtISO: "2026-01-09T12:05:00.000Z",
        },
        {
          id: "c2",
          type: "calories",
          label: "Greek yogurt",
          calories: 320,
          amountValue: 250,
          amountUnit: "g",
          rating: "green",
          createdAtISO: "2026-01-09T09:10:00.000Z",
        },
      ],
      steps: [
        {
          id: "s1",
          type: "steps",
          stepsDelta: 1200,
          createdAtISO: "2026-01-09T14:00:00.000Z",
        },
      ],
      water: [
        {
          id: "w1",
          type: "water",
          cupsDelta: 2,
          createdAtISO: "2026-01-09T10:00:00.000Z",
        },
        {
          id: "w2",
          type: "water",
          cupsDelta: 1.5,
          createdAtISO: "2026-01-09T13:00:00.000Z",
        },
      ],
    },
  } satisfies Record<string, DayEntries>,
};
