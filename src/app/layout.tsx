import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { InteractiveShell } from "@/components/InteractiveShell";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Raihan Ridho Mubarok | Portfolio",
  description:
    "Mobile Developer, Frontend Developer & UI/UX Designer. Software enthusiast & continuous learner. Building impactful projects one commit at a time.",
  openGraph: {
    title: "Raihan Ridho Mubarok | Portfolio",
    description:
      "Mobile Developer, Frontend Developer & UI/UX Designer specializing in Flutter, Kotlin/Jetpack Compose, and React/Next.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <InteractiveShell>{children}</InteractiveShell>
      </body>
    </html>
  );
}
