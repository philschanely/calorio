import { NextResponse } from "next/server";
import { mock } from "@/lib/mock";

export async function GET(_req: Request, { params }: { params: { dayISO: string } }) {
  const dayISO = params.dayISO;
  const summary = mock.summaryByDay["2026-01-09"] ?? null;
  const entries = mock.entriesByDay["2026-01-09"] ?? { calories: [], steps: [], water: [] };

  return NextResponse.json({ dayISO, summary, entries });
}
