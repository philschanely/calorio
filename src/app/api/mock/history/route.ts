import { NextResponse } from "next/server";
import { mock } from "@/lib/mock";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") ?? "month"; // "week" | "month"

  const days = range === "week" ? mock.past7 : mock.month;
  return NextResponse.json({ range, days });
}
