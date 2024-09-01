import type { Metadata } from "next";
import { Puritan } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts";
import { METADATA } from "@/constant/metadata";
import { Toaster } from "@/components/ui/toaster";
import { getUserSession } from "@/lib/auth";

const puritan = Puritan({
  weight: ["400", "700"],
  display: "fallback",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.DOMAIN || ""
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  return (
    <html lang="en">
      <body className={puritan.className}>
        <MainLayout session={session}>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
