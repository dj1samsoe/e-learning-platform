import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function CallToAction() {
  return (
    <section className="w-full bg-[#FBF6EA] md:px-16 px-5 md:py-16 py-8">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 items-center">
        <div className="flex flex-col space-y-5 items-start justify-center">
          <h1 className="text-5xl font-bold">
            Ciptakan #PerubahanNyata untuk Indonesia yang Berkelanjutan!
          </h1>
          <p>
            Buat perubahan yang berarti melalui kebijakan yang berpihak kepada
            pembangunan lestari yang berkelanjutan. Demi masa depan cerah untuk
            kita dan anak cucu kita.
          </p>
          <div className="flex gap-3 items-center">
            <Button variant={"primary"}>Gabung Sekarang</Button>
            <Button variant={"secondary"}>Pelajari Lebih Lanjut</Button>
          </div>
        </div>
        <Image
          src="https://img.freepik.com/free-photo/multiethnic-male-female-colleagues-sitting-office-discussing-charts-meeting_1098-17724.jpg?t=st=1724865913~exp=1724869513~hmac=50ee77e9e23354e983b367109e5808c31dfce4f5c78d9e588189a16e6c397609&w=826"
          alt="cta-image"
          width={500}
          height={500}
          className="w-full rounded-md object-cover object-center"
        />
      </div>
    </section>
  );
}
