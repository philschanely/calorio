import { DashboardDTO } from "@/lib/types";
import { Dashboard } from "../lib/components/Dashboard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/mock/dashboard", {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load dashboard: ${res.status}`);
  }

  const data = (await res.json()) as DashboardDTO;

  return <Dashboard overallPct={data.today.overallPct} />;
}
