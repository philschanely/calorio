"use client";

import Link from "next/link";
import { linkStyles } from "@/lib/styles/link";
import { useSession } from "@/lib/providers";
import { appHeaderStyles } from "./AppHeader.styles";
import { Icon } from "../icon/Icon";
import { Logo } from "../logo";

export const AppHeader = () => {
  const { isSignedIn, user } = useSession();
  const { root, link } = appHeaderStyles();

  return (
    <div className={root()}>
      <Link aria-label="Go to dashboard" href="/">
        <Logo size="Display5" />
      </Link>

      <div className="flex-1" />

      {isSignedIn ? (
        <Link className={link()} href="/api/auth/signout" title="Sign out">
          {user?.email}
          <Icon icon="ARROW_RIGHT_FROM_BRACKET" label="Sign out" size="E" />
        </Link>
      ) : (
        <Link className={linkStyles()} href="/api/auth/signin">
          Sign in
        </Link>
      )}
    </div>
  );
};
