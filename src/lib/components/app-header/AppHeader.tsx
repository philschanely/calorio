"use client";

import Link from "next/link";
import { linkStyles } from "@/lib/styles";
import { useSession } from "@/lib/providers";
import { Icon } from "../icon/Icon";
import { Logo } from "../logo";
import { appHeaderStyles } from "./AppHeader.styles";

export const AppHeader = () => {
  const { isSignedIn, user } = useSession();
  const { root, link } = appHeaderStyles();

  return (
    <div className={root()} data-element="app-header">
      <Link
        aria-label="Go to dashboard"
        data-element="app-header-logo-link"
        href="/"
      >
        <Logo size="Display5" />
      </Link>

      <div className="flex-1" />

      {isSignedIn ? (
        <Link
          className={link()}
          data-element="app-header-sign-out-link"
          href="/api/auth/signout"
          title="Sign out"
        >
          {user?.email}
          <Icon icon="ARROW_RIGHT_FROM_BRACKET" label="Sign out" size="E" />
        </Link>
      ) : (
        <Link
          className={linkStyles()}
          data-element="app-header-sign-in-link"
          href="/api/auth/signin"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};
