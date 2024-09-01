import { Chapter, Course, UserProgress } from "@prisma/client";

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import Image from "next/image";
import { Assets } from "../../../../../public";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Session } from "next-auth";
import AuthButton from "@/components/elements/auth-button";
import { FaBell } from "react-icons/fa6";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  // progressCount: number;
  session: Session | null;
}
const defaultImage =
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1724835171~exp=1724838771~hmac=3a741652ebd10ed266d53bc5b18a0cd5aac840250bf945818395f021454d8794&w=740";

export const CourseNavbar = ({ course, session }: CourseNavbarProps) => {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-blue text-white">
      <div className="flex items-center gap-x-5">
        <Image src={Assets.Logo} alt="logo" width={100} height={100} />
        <div className="flex gap-2 items-center">
          <Link
            href="/courses"
            className="flex items-center gap-1 hover:gap-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <Separator
            // color="white"
            className="bg-white h-5"
            orientation="vertical"
          />
          <h1>{course.title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <AuthButton />
        <FaBell />
        <Link href="/profil" legacyBehavior passHref>
          <Image
            src={session?.user?.image || defaultImage} // Provide a default image if none
            alt="User"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </Link>
      </div>
    </header>
    // <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
    //   <CourseMobileSidebar course={course} progressCount={progressCount} />
    // </div>
  );
};
