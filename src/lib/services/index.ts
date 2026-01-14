import { useQuery } from "@tanstack/react-query";
import type { DayEntriesDTO } from "@/lib/types";

export function useDay(dayISO: string) {
  return useQuery({
    queryKey: ["day", dayISO],
    queryFn: async (): Promise<DayEntriesDTO> => {
      const res = await fetch(`/api/mock/day/${dayISO}`);
      if (!res.ok) throw new Error("Failed to load day");
      return res.json();
    },
    enabled: !!dayISO,
  });
}
