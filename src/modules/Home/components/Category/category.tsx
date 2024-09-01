import CategoryCard from "@/modules/Home/components/Category/category-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constant/category";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Category() {
  return (
    <section className="w-full md:px-16 px-5 pb-8 flex flex-col space-y-5 items-center">
      <div className="w-full flex md:justify-between justify-center items-center md:items-start">
        <div className="w-full flex flex-col md:items-start items-center space-y-3">
          <h1 className="font-bold text-3xl">Kategori kami</h1>
          <p className="md:text-start text-center">
            Kelas berdasarkan kategori tahap penyusunan rencana daerah yang
            berkelanjutan
          </p>
        </div>
        <Button
          variant={"primary"}
          className="md:flex hidden gap-2 items-center"
        >
          Lihat Lainnya
          <FaArrowRight />
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            totalCourse={category.totalCourse}
          />
        ))}
      </div>
      <Button variant={"primary"} className="md:hidden flex gap-2 items-center">
        Lihat Lainnya
        <FaArrowRight />
      </Button>
    </section>
  );
}
