import { Button } from "@/components/ui/button";
import React from "react";

export default function BannerCourse() {
  return (
    <section className="w-full">
      <div
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/business-people-examining-statistics-laptop-research-financial-growth-team-women-working-marketing-productivity-organization-development-successful-project_482257-33929.jpg?t=st=1725168605~exp=1725172205~hmac=418b4162e3e06e6d67eb8ab4b96cb3f95f335b5a5ea8953bea6229a37f4b18f3&w=996")`,
          backgroundSize: "cover",
          backgroundPosition: "center, center",
          height: "75vh",
          width: "100%",
        }}
        className="rounded-2xl"
      >
        <div className="w-full h-full flex flex-col items-start justify-end space-y-4 p-8 text-white bg-neutral-950/40 rounded-2xl">
          <div className="flex flex-col space-y-2 items-start">
            <h1 className="font-bold text-3xl">
              Jelajahi Kelas untuk Perencanaan Pembangunan yang Berkelanjutan.
            </h1>
            <p>
              Ciptakan perencanaan pembangunan yang berkelanjutan melalui kelas
              E-Learning Traction Energy Asia.
            </p>
          </div>
          <Button variant={"primary"}>Butuh Bantuan?</Button>
        </div>
      </div>
    </section>
  );
}
