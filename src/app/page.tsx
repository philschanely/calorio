// src/app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ padding: 24 }}>
      {session?.user ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <a href="/api/auth/signout">Sign out</a>
        </>
      ) : (
        <a href="/api/auth/signin">Sign in with Google</a>
      )}
    </main>
  );
}
