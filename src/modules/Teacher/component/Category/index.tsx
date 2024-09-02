import { Button } from "@/components/ui/button";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CategoryTeacherCard from "./category-course-card";

const CATEGORY_COURSE = [
  {
    id: 1,
    title: "KLHS RPJMN",
    totalCourse: 10,
  },
  {
    id: 2,
    title: "RPJMN",
    totalCourse: 10,
  },
  {
    id: 3,
    title: "KLHS RPJMD",
    totalCourse: 10,
  },
  {
    id: 4,
    title: "RPJMD",
    totalCourse: 10,
  },
];

export default function CategoryCourse() {
  return (
    <section className="w-full h-full flex flex-col space-y-3 items-start py-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-3xl">Kategori Kelas</h1>
        <div className="flex gap-3 items-center">
          <Button variant={"primary"} className="rounded-full">
            <FaAngleLeft />
          </Button>
          <Button variant={"primary"} className="rounded-full">
            <FaAngleRight />
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center mb-10">
        {CATEGORY_COURSE.map((category) => (
          <CategoryTeacherCard
            key={category.id}
            title={category.title}
            totalCourse={category.totalCourse}
          />
        ))}
      </div>
    </section>
  );
}
