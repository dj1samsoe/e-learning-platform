import AdvantageCard from "@/modules/Home/components/Advantages/advantages-card";
import { ADVANTAGES } from "@/constant/advantage";
import React from "react";

export default function Advantages() {
  return (
    <section className="w-full md:px-16 px-5 py-8 flex flex-col space-y-5 items-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="font-bold text-3xl">
          Menyusun Perencanaan Daerah Semakin Mudah
        </h1>
        <p className="text-center">
          E-Learning Traction Energy Asia didesain khusus untuk memudahkan
          perencanaan kebijakan daerah yang berkelanjutan.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADVANTAGES.map((advantage) => (
          <AdvantageCard
            key={advantage.id}
            icon={advantage.icon}
            title={advantage.title}
            description={advantage.description}
            backgroundColor={advantage.backgroundColor}
          />
        ))}
      </div>
    </section>
  );
}
