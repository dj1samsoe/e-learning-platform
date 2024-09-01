import React from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";

export interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  totalCourse: number;
}

export default function CategoryCard({
  icon,
  title,
  totalCourse,
}: CategoryCardProps) {
  return (
    <Card className="flex flex-col space-y-4 items-center justify-center p-4">
      <CardHeader className="pb-0">{icon}</CardHeader>
      <CardContent className="flex flex-col space-y-2 items-center text-[#000000] pt-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-center">{totalCourse} courses</p>
      </CardContent>
    </Card>
  );
}
