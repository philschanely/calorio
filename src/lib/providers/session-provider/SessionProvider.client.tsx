"use client";

import { createContext, useContext } from "react";
import type { SessionContextValue } from "./types";

// Create a context for session data
const SessionContext = createContext<SessionContextValue | null>(null);

// Client-side SessionProvider component that provides session context to its children passed from server context
export function SessionProviderClient({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionContextValue;
}) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// Client-side hook to access session context
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
