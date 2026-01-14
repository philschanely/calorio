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
    <div className="flex gap-b items-center justify-start">
      <Logo size="Display1" aria-label="Sign out" />
      <div aria-hidden className="flex-1" />
      {isSignedIn ? (
        <Link className={linkStyles()} href="/api/auth/signout">
          <div className="size-f">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
