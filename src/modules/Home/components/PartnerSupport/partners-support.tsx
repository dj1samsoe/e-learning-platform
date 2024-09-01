"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import PartnerLogo from "./partner-logo";
import { Assets } from "../../../../../public";
import Autoplay from "embla-carousel-autoplay";

export default function PartnerSupport() {
  return (
    <section className="w-full md:px-16 px-5 py-8 flex flex-col space-y-5 items-center justify-center bg-[#FCF6E9]">
      <h1 className="font-bold uppercase">Didukung Oleh</h1>
      <div className="flex w-full justify-center mx-auto">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo
                imageSrc={Assets.KabTangerang}
                name="Kabupaten Tangerang"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo
                imageSrc={Assets.KabJember}
                name="Kabupaten Jember"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo imageSrc={Assets.KabBogor} name="Kabupaten Bogor" />
            </CarouselItem>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo
                imageSrc={Assets.KabTangerang}
                name="Kabupaten Tangerang"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo
                imageSrc={Assets.KabJember}
                name="Kabupaten Jember"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <PartnerLogo imageSrc={Assets.KabBogor} name="Kabupaten Bogor" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
