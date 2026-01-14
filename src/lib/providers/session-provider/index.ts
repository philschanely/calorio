// Server component: import directly from SessionProvider.tsx, not from this barrel
// export { SessionProvider } from "./SessionProvider";
// export { getSessionContext } from "./SessionProvider";

// Client-side hook and types only
export { useSession } from "./SessionProvider.client";
export type { SessionContextValue } from "./types";
