import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GoCheckCircle, GoDotFill } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UserProfileProps {
  userImage: string | null | undefined;
  userName: string | null | undefined;
  userRole: string | undefined;
  joinedAt: Date | undefined;
  courseEnrolled: number | undefined;
  progress: number | undefined;
  certificate: number | undefined;
}

const defaultImage =
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1724835171~exp=1724838771~hmac=3a741652ebd10ed266d53bc5b18a0cd5aac840250bf945818395f021454d8794&w=740";

export default function UserProfile({
  userImage,
  userName,
  userRole,
  joinedAt,
  courseEnrolled,
  progress,
  certificate,
}: UserProfileProps) {
  const stringDate = joinedAt?.toString() as string;
  const formattedDate = format(new Date(stringDate), "MMMM yyyy", {
    locale: id,
  });
  return (
    <section className="w-full md:px-16 px-5 py-8">
      <Card className="max-w-5xl mx-auto">
        <div className="w-full relative h-32 bg-blue rounded-t-lg">
          <Image
            src={userImage || defaultImage}
            alt="User"
            width={100}
            height={100}
            className="rounded-full absolute top-20 left-10 right-0"
          />
        </div>

        <CardContent className="mt-16 px-10 flex flex-col space-y-3 items-start">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-xl font-bold">{userName}</h1>
              {/* Badge Role */}
              <div className="py-1 px-3 rounded-lg bg-[#ECF6F8] text-blue">
                <p className="capitalize font-bold">{userRole}</p>
              </div>
            </div>

            <Button variant={"profile"} className="rounded-full -mt-16">
              Pengaturan
            </Button>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center">
              <MdOutlineCalendarMonth />
              <p className="text-md">Bergabung sejak {formattedDate}</p>
            </div>
            <GoDotFill />
            <div className="flex gap-2 items-center">
              <FiBook />
              <p className="text-md">{courseEnrolled} Kursus Diikuti</p>
            </div>
            <GoDotFill />
            <div className="flex gap-2 items-center">
              <GoCheckCircle />
              <p className="text-md">{progress} Kursus Selesai</p>
            </div>
            <GoDotFill />
            <div className="flex gap-2 items-center">
              <GoCheckCircle />
              <p className="text-md">{certificate} Sertifikat Diklaim</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
