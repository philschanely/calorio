import { NextResponse } from "next/server";
import { mock, emptyDayEntries } from "@/lib/mock";

export async function GET(
  _req: Request,
  { params }: { params: { dayISO: string } },
) {
  const dayISO = params.dayISO;

  const summary = mock.summaryByDay[dayISO] ?? null;
  const entries = mock.entriesByDay[dayISO] ?? emptyDayEntries;

  return NextResponse.json({ dayISO, summary, entries });
}
