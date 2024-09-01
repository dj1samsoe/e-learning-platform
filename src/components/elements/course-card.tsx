"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id?: string | undefined;
  image: string | undefined;
  totalStudent: number | undefined;
  duration: string;
  title: string | undefined;
  mentor?: string;
}

export default function CourseCard({
  id,
  image,
  totalStudent,
  duration,
  title,
  mentor,
}: CourseCardProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/courses/${id}`);
  };
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <Image
        src={image || ""}
        width={200}
        height={100}
        alt={title || ""}
        className="w-full h-[150px] rounded-t-lg object-cover object-center"
        loading="lazy"
      />
      <CardContent className="flex flex-col space-y-4 items-start text-[#000000] pt-4">
        <div className="w-full flex justify-between items-center">
          <p>{totalStudent} Students</p>
          <p>{duration}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg">{mentor}</p>
        </div>
      </CardContent>
    </Card>
  );
}
