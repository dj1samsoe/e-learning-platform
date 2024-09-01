import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/constant/testimonial";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TestimonialCard from "./testimonial-card";

export default function Testimonials() {
  return (
    <section className="w-full md:px-16 px-5 py-8 flex flex-col space-y-5 items-center">
      <div className="w-full flex md:justify-between justify-center items-center md:items-start">
        <div className="w-full flex flex-col md:items-start items-center space-y-3">
          <h1 className="font-bold text-3xl">Testimoni Peserta</h1>
          <p className="md:text-start text-center">
            Kata mereka yang telah terbantu E-Learning Traction Energy Asia.
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            image={testimonial.image}
            name={testimonial.name}
            district={testimonial.district}
          />
        ))}
      </div>
    </section>
  );
}
