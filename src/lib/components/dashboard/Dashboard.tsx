"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/providers";
import { linkStyles } from "@/lib/styles";
import { DaySummaryDTO } from "@/lib/types";
import { DayBadge } from "../day-badge";
import { DayHeader } from "../day-header";
import { IconButton } from "../icon-button";
import { DashboardEntriesLists } from "./DashboardEntriesLists";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

export enum EntriesState {
  CALORIES = "calories",
  STEPS = "steps",
  WATER = "water",
}

export function Dashboard({
  entriesByDay,
  overallPct,
  density,
  water,
  steps,
  calories,
}: DaySummaryDTO) {
  const { user } = useSession();
  const [showList, setShowList] = useState(false);

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
      <AnimatePresence>
        {showList && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
          >
            <DashboardEntriesLists entriesByDay={entriesByDay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
