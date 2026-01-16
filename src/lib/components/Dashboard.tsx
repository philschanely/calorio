"use client";

import Link from "next/link";
import { TextBody } from "@/lib/components";
import { useSession } from "@/lib/providers";
import { linkStyles } from "@/lib/styles";

export function Dashboard({ overallPct }: { overallPct: number }) {
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
    <>
      <TextBody>Signed in as {user.email}</TextBody>
      <TextBody>{overallPct}%</TextBody>
    </>
  );
}
