import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";

export default function FrequentlyAskedQuestions() {
  return (
    <section className="w-full md:px-16 px-5 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-5">
        <h1 className="text-4xl font-bold">Pertanyaan yang Sering Muncul</h1>
        <div className="flex flex-col space-y-4 items-start">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Apa itu Traction Energy Asia?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Apa itu E-Learning Traction energy Asia?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Apa keuntungan menggunakan E-Learning Traction Energy Asia?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Siapa yang bisa menggunakan E-Learning Traction Energy Asia?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Berapa biaya yang diperlukan untuk menggunakan E-Learning
                Traction Energy Asia?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Bagaimana cara mendapatkan akses penuh untuk semua materi E-
                Learning Traction Energy Asia?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button variant={"primary"}>Pertanyaan Selengkapnya</Button>
        </div>
      </div>
    </section>
  );
}
