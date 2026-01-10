// src/app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardDTO } from "@/lib/types";


export default async function Home() {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/mock/dashboard", {
    cache: "no-store",
  });
  const data = (await res.json()) as DashboardDTO;

  return (
    <main>
      {session?.user ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <p>{data.today.overallPct}%</p>
          <a className="text-topaz-300 hover:text-topaz-200 hover:border-b-2 hover:border-topaz-200 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-topaz-200" href="/api/auth/signout">Sign out</a>
        </>
      ) : (
        <a className="text-topaz-300 hover:text-topaz-200 hover:border-b-2 hover:border-topaz-200 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-topaz-200" href="/api/auth/signin">Sign in with Google</a>
      )}
    </main>
  );
}
