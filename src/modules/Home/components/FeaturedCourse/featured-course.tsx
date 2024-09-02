import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CourseCard from "@/components/elements/course-card";
import {
  ADHOC_COURSE,
  KLHS_COURSE,
  RPJMD_COURSE,
  RPJPD_COURSE,
} from "@/constant/featured-course";

export default function FeaturedCourse() {
  return (
    <section
      className="w-full md:px-16 px-5 md:py-16 py-8 flex flex-col space-y-5 items-center"
      id="kelas-pilihan"
    >
      <h1 className="font-bold text-3xl">Kelas Pilihan</h1>
      <Tabs defaultValue="klhs" className="w-full">
        <TabsList className="flex md:flex-nowrap flex-wrap w-full items-center justify-center gap-4 mx-auto">
          <TabsTrigger
            value="klhs"
            className="data-[state=active]:bg-blue data-[state=active]:text-white"
          >
            KLHS
          </TabsTrigger>
          <TabsTrigger
            value="rpjpd"
            className="data-[state=active]:bg-orange data-[state=active]:text-white"
          >
            RPJPD
          </TabsTrigger>
          <TabsTrigger
            value="rpjmd"
            className="data-[state=active]:bg-cream data-[state=active]:text-black"
          >
            RPJMD
          </TabsTrigger>
          <TabsTrigger
            value="adhoc"
            className="data-[state=active]:bg-yellow data-[state=active]:text-black"
          >
            Dokumen AdHoc
          </TabsTrigger>
        </TabsList>
        <TabsContent value="klhs">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
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
        </TabsContent>
        <TabsContent value="rpjpd">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {RPJPD_COURSE.map((course) => (
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
        </TabsContent>
        <TabsContent value="rpjmd">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {RPJMD_COURSE.map((course) => (
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
        </TabsContent>
        <TabsContent value="adhoc">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {ADHOC_COURSE.map((course) => (
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
        </TabsContent>
      </Tabs>
    </section>
  );
}
