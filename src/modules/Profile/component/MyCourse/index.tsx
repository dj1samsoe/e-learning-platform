"use client";
import { CourseProgress } from "@/components/elements/course-progress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface MyCourseProps {
  courseId: string | undefined;
  courseImage: string | null;
  courseTitle: string | undefined;
  courseTeacher: string | undefined;
  progress: number | undefined;
}

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

export default function MyCourse({
  courseId,
  courseImage,
  courseTitle,
  courseTeacher,
  progress,
}: MyCourseProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <div
      className="w-full flex items-start gap-5 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={courseImage || placeholderImage}
        alt="course-image"
        width={125}
        height={125}
        className="rounded-2xl aspect-square"
      />
      <div className="w-full flex flex-col space-y-2 items-start">
        <h2 className="font-bold text-lg">{courseTitle}</h2>
        <p className="text-muted-foreground">{courseTeacher}</p>
        <CourseProgress value={progress} />
      </div>
    </div>
  );
}
