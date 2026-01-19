"use client";

import Link from "next/link";
import { useSession } from "@/lib/providers";
import { linkStyles } from "@/lib/styles";
import { DaySummaryDTO } from "@/lib/types";
import { DayHeader } from "./DayHeader";
import { DaySummaryBadge } from "./DaySummaryBadge";

export function Dashboard({
  overallPct,
  density,
  water,
  steps,
  calories,
}: DaySummaryDTO) {
  const { user } = useSession();

  if (!user) {
    return (
      <Link
        className={linkStyles()}
        href={`/api/auth/signin?callbackUrl=${encodeURIComponent("/")}`}
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-f w-full max-w-[360px] items-center">
      <DayHeader />
      <DaySummaryBadge
        calories={calories}
        density={density}
        overallPct={overallPct}
        steps={steps}
        water={water}
      />
    </div>
  );
}
