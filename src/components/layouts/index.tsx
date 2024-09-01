"use client";
import React from "react";
import Navbar from "../elements/navbar";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Footer from "../elements/footer";

export default function MainLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  const hideNavbar =
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    /^\/courses\/[^/]+$/.test(pathname) ||
    /^\/courses\/[^/]+\/chapters\/[^/]+$/.test(pathname);
  return (
    <div className="min-h-screen w-full">
      {!hideNavbar && (
        <Navbar session={session} userImage={session?.user?.image} />
      )}
      <main className="w-full h-full">{children}</main>
      {pathname !== "/auth/login" && pathname !== "/auth/register" && (
        <Footer />
      )}
    </div>
  );
}
