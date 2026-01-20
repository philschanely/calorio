"use client";

import Link from "next/link";
import { useSession } from "@/lib/providers";
import { linkStyles } from "@/lib/styles";
import { DaySummaryDTO } from "@/lib/types";
import { DayHeader } from "../day-header";
import { DayBadge } from "../day-badge";
import { IconButton } from "../icon-button";
import { useState } from "react";
import { DashboardEntriesLists } from "./DashboardEntriesLists";

export enum EntriesState {
  CALORIES = "calories",
  STEPS = "steps",
  WATER = "water",
}

export function Dashboard({
  overallPct,
  density,
  water,
  steps,
  calories,
}: DaySummaryDTO) {
  const { user } = useSession();
  const [showList, setShowList] = useState(true);

  const handleToggleEntries = () => setShowList((val) => !val);

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
    <div
      className="flex flex-col gap-f w-full max-w-[360px] justify-start items-center"
      data-element="dashboard"
    >
      <DayHeader />
      <div className="flex gap-d items-end" data-element="dashboard-badge">
        <IconButton icon="PLUS">Add entry</IconButton>
        <div className="flex-1">
          <DayBadge
            calories={calories}
            density={density}
            overallPct={overallPct}
            steps={steps}
            water={water}
          />
        </div>
        <IconButton
          onClick={handleToggleEntries}
          icon="LIST"
          variant={showList ? "selected" : undefined}
        >
          View entries
        </IconButton>
      </div>
      {showList && <DashboardEntriesLists />}
    </div>
  );
}
