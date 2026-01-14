"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { linkStyles } from "@/lib/styles/link";
import { faArrowRightFromBracket } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "@/lib/providers";

export const AppHeader = () => {
  const { isSignedIn } = useSession();

  return (
    <div className="flex gap-b items-center justify-start w-full">
      <Link href="/" aria-label="Go to dashboard">
        <Logo size="Display1" />
      </Link>

      <div className="flex-1" />

      {isSignedIn ? (
        <Link
          className={linkStyles()}
          href="/api/auth/signout"
          aria-label="Sign out"
          title="Sign out"
        >
          <div className="size-f">
            <FontAwesomeIcon
              className="h-full w-full"
              icon={faArrowRightFromBracket}
            />
          </div>
        </Link>
      ) : (
        <Link className={linkStyles()} href="/api/auth/signin">
          Sign in
        </Link>
      )}
    </div>
  );
};
