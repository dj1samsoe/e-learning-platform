"use client";
import Image from "next/image";
import React, { useState } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaBell } from "react-icons/fa6";
import { Assets } from "../../../public";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import AuthButton from "./auth-button";

interface SessionProps {
  session: Session | null;
  userImage: string | null | undefined;
}

const defaultImage =
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1724835171~exp=1724838771~hmac=3a741652ebd10ed266d53bc5b18a0cd5aac840250bf945818395f021454d8794&w=740";

export default function Navbar({ session, userImage }: SessionProps) {
  return (
    <>
      <DesktopNavbar session={session} userImage={userImage} />
      <MobileNavbar session={session} userImage={userImage} />
    </>
  );
}

function DesktopNavbar({ session, userImage }: SessionProps) {
  return (
    <header className="w-full md:flex justify-between items-center md:px-16 px-5 md:py-6 py-2 bg-white hidden fixed z-50 top-0 left-0 right-0 border-b">
      <Link href="/" legacyBehavior passHref>
        <Image
          src={Assets.Logo}
          alt="Logo"
          width={110}
          height={100}
          className="object-cover cursor-pointer"
          priority
        />
      </Link>
      <NavItem session={session} />
      <div className="flex items-center gap-2">
        {session ? (
          <div className="flex items-center gap-3">
            <AuthButton />
            <FaBell />
            <Link href="/profil" legacyBehavior passHref>
              <Image
                src={userImage || defaultImage} // Provide a default image if none
                alt="User"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <>
            <Button variant="secondary">
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button variant="primary">
              <Link href="/auth/register" className="flex items-center gap-2">
                Daftar
                <FaArrowRight />
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

function MobileNavbar({ session, userImage }: SessionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="block border-separate border-b bg-white md:hidden fixed z-50 top-0 left-0 right-0">
      <div className="container flex items-center justify-between px-8">
        <Link href="/" legacyBehavior passHref>
          <Image
            src={Assets.Logo}
            alt="Logo"
            width={110}
            height={100}
            className="object-cover cursor-pointer"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="w-8 h-8 shrink-0" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-[400px] sm:w-[540px] dark:bg-[#2E2B4A]"
              side={"left"}
            >
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-col gap-y-5 w-full"></div>
              </div>
            </SheetContent>
          </Sheet>
          {session ? (
            <div className="flex items-center gap-3">
              <AuthButton />
              <FaBell />
              <Link href="/profil" legacyBehavior passHref>
                <Image
                  src={userImage || defaultImage} // Provide a default image if none
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <Button variant="primary">Masuk</Button>
          )}
        </div>
      </div>
    </header>
  );
}
