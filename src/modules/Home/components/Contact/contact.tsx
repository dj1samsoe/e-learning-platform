import { Button } from "@/components/ui/button";
import React from "react";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function Contact() {
  return (
    <section className="w-full md:px-16 px-5 py-8">
      <div className="w-full rounded-lg flex flex-col space-y-3 items-start bg-orange text-white p-8">
        <RiCustomerService2Fill size={50} />
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold">Konsultasi Live</h1>
          <p>
            Dapatkan panduan secara langsung dari tenaga ahli untuk permasalahan
            Anda.
          </p>
        </div>
        <Button variant={"blue"}>Hubungi Tenaga Ahli</Button>
      </div>
    </section>
  );
}
