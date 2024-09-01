import CourseCard from "@/components/elements/course-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { Course, CourseEnrollment, User } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function MainComponent() {
  const courses = await prisma.course.findMany({
    include: {
      teacher: true,
      students: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  return (
    <section className="flex md:flex-row gap-5 w-full">
      <aside className="w-full max-w-[250px] flex flex-col items-start space-y-5">
        <h2 className="text-muted-foreground font-bold">Filter</h2>
        <div className="w-full flex flex-col space-y-2 items-start">
          <h2>Cari Kelas</h2>
          <div className="relative w-full">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Ketik nama kelas di sini"
              className="w-full rounded-lg border border-border py-2 px-4"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Separator />
        </div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              Durasi Kelas
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">30 Menit</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">1 Jam</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">2 Jam</span>
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">Kategori</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">KLHS RPJMN</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">RPJMN</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">KLHS RPJMD</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">RPJMD</span>
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="accent-blue w-4 h-4"
                  />
                  <label htmlFor="checkbox">
                    <span className="text-md">Dokumen AdHoc</span>
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <article className="w-full flex flex-col items-start space-y-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="font-bold text-3xl">Jelajahi Semua Kelas</h1>
          <Select>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue
                defaultValue="paling-sesuai"
                placeholder="Pilih Filter"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="paling-sesuai"
                defaultChecked
                aria-checked="true"
              >
                Paling Sesuai
              </SelectItem>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="terlama">Terlama</SelectItem>
              <SelectItem value="terpanjang">Terpanjang</SelectItem>
              <SelectItem value="tersingkat">Tersingkat</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {courses.map((course) => (
            <CourseCard
              id={course.id}
              key={course.id}
              image={course.imageUrl || placeholderImage}
              totalStudent={course.students.length}
              duration={"5j 30m"}
              title={course.title || ""}
              mentor={course.teacher.name || ""}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
