import { DaySummaryDTO } from "@/lib/types";

export type DayBadgeProps = Omit<DaySummaryDTO, "dayISO">;
