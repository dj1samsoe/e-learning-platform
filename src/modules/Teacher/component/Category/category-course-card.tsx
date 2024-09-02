import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface CategoryTeacherCardProps {
  title: string;
  totalCourse: number;
}

export default function CategoryTeacherCard({
  title,
  totalCourse,
}: CategoryTeacherCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col space-y-2 items-start pt-6">
        <h1 className="font-bold text-lg">{title}</h1>
        <p>{totalCourse} kursus</p>
      </CardContent>
    </Card>
  );
}
