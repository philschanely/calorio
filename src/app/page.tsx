import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardDTO } from "@/lib/types";
import { Logo, Text } from "@/lib/components";
import Link from "next/link";
import { linkStyles } from "@/lib/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-regular-svg-icons";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/mock/dashboard", {
    cache: "no-store",
  });
  const data = (await res.json()) as DashboardDTO;

  const isSignedIn = Boolean(session?.user);
  const user = session?.user;

  return (
    <main className="w-full p-m flex flex-col gap-m">
      <div className="flex gap-b items-center justify-start">
        <Logo size="Display1" aria-label="Sign out" />
        <div aria-hidden className="flex-1" />
        {isSignedIn && (
          <Link className={linkStyles()} href="/api/auth/signout">
            <div className="size-f">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
          </Link>
        )}
      </div>
      {user ? (
        <>
          <Text.Body>Signed in as {user.email}</Text.Body>
          <Text.Body>{data.today.overallPct}%</Text.Body>
        </>
      ) : (
        <Link className={linkStyles()} href="/api/auth/signin">
          Sign in
        </Link>
      )}
    </main>
  );
}
