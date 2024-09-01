import CourseCard from "@/components/elements/course-card";
import { Button } from "@/components/ui/button";
import { KLHS_COURSE } from "@/constant/featured-course";
import React from "react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa6";

export default function LatestCourse() {
  return (
    <section className="w-full md:px-16 px-5 py-8 flex flex-col space-y-5 items-center">
      <div className="w-full flex md:justify-between justify-center items-center md:items-start">
        <div className="w-full flex flex-col md:items-start items-center space-y-3">
          <h1 className="font-bold text-3xl">Kelas Terbaru</h1>
          <p className="md:text-start text-center">
            Kelas terbaru dari E-Learning Traction Energy Asia
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant={"blue"} className="rounded-full">
            <FaAngleLeft />
          </Button>
          <Button variant={"blue"} className="rounded-full">
            <FaAngleRight />
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KLHS_COURSE.map((course) => (
          <CourseCard
            key={course.id}
            image={course.image}
            totalStudent={course.totalStudent}
            duration={course.duration}
            title={course.title}
            mentor={course.mentor}
          />
        ))}
      </div>
    </section>
  );
}
