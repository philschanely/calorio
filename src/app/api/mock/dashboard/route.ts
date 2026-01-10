import { NextResponse } from "next/server";
import { mock } from "@/lib/mock";

export async function GET() {
  const today = mock.summaryByDay["2026-01-09"];
  return NextResponse.json({
    todayISO: mock.todayISO,
    today,
    past7: mock.past7,
  });
}
