import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionProviderClient } from "./SessionProvider.client";
import type { SessionContextValue } from "./types";

// Fetch session context on the server side
export async function getSessionContext(): Promise<SessionContextValue> {
  const session = await getServerSession(authOptions);
  return {
    isSignedIn: Boolean(session?.user),
    user: session?.user ?? null,
  };
}

// Server-side SessionProvider component that retrieves session context and passes to client provider
export const SessionProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = await getSessionContext();

  return (
    <SessionProviderClient value={value}>{children}</SessionProviderClient>
  );
};
