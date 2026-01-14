# Session Provider

This folder exposes a server-safe session helper and a client context for
session data. Use the server helper in Server Components and the hook in Client
Components.

## Exports

- `SessionProvider` (server) fetches the session and hydrates the client context.
- `getSessionContext` (server) returns `{ isSignedIn, user }` for server usage.
- `useSession` (client) reads session data from context.

## Usage

Server component:

```tsx
import { getSessionContext } from "@/lib/providers";

export default async function Page() {
  const { isSignedIn, user } = await getSessionContext();
  return <div>{isSignedIn ? user?.email : "Guest"}</div>;
}
```

Client component:

```tsx
"use client";

import { useSession } from "@/lib/providers";

export function ProfileBadge() {
  const { user } = useSession();
  return <span>{user?.email ?? "Guest"}</span>;
}
```

App layout (server):

```tsx
import { SessionProvider } from "@/lib/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```
