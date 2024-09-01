"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CreatedCourseProps {
  courseId: string | undefined;
  courseImage: string | null;
  courseTitle: string | undefined;
  students: number | undefined;
  duration: string;
}

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

export default function CreatedCourse({
  courseId,
  courseImage,
  courseTitle,
  students,
  duration,
}: CreatedCourseProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/teacher/courses/${courseId}`);
  };
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <Image
        src={courseImage || placeholderImage}
        width={200}
        height={100}
        alt="course-image"
        className="w-full h-[100px] rounded-t-lg object-cover object-center"
        loading="lazy"
      />
      <CardContent className="flex flex-col space-y-4 items-start text-[#000000] pt-4">
        <div className="w-full flex justify-between items-center">
          <p>{students} Students</p>
          <p>{duration}</p>
        </div>
        <h2 className="text-md font-bold">{courseTitle}</h2>
      </CardContent>
    </Card>
  );
}
