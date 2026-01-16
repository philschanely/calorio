import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { AppHeader } from "@/lib/components";
import { QueryProvider } from "@/lib/providers";
import { appStyles } from "@/lib/styles";
import "./globals.css";
import { SessionProvider } from "@/lib/providers/session-provider/SessionProvider";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calorio",
  description: "Daily tracking for steps, water, and calories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { body, main } = appStyles();

  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className={body()}>
        <SessionProvider>
          <QueryProvider>
            <AppHeader />
            <main className={main()}>{children}</main>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
