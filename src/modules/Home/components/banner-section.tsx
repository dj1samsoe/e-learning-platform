"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import BounceButton from "./bounce-button";

export default function BannerSection() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  return (
    <section
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url("./assets/banner-image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top, center",
      }}
    >
      <div className="w-full h-screen flex flex-col">
        {/* Banner Text */}
        <AnimatePresence>
          {isBannerVisible && (
            <motion.div
              className="w-full bg-orange text-white py-5 flex justify-center md:mt-[88px] mt-20"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full">
                <p className="text-center">Banner text disini</p>
                <IoIosCloseCircle
                  onClick={() => setIsBannerVisible(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="w-full h-full flex flex-col items-start justify-end pt-24 md:px-16 px-5 py-8">
          <div className="flex items-end gap-24">
            <div className="bg-white drop-shadow-md rounded-md p-8 flex flex-col space-y-3 items-start max-w-lg w-full">
              <h1 className="text-3xl font-bold">
                E-Learning Traction Energy Asia
              </h1>
              <p>
                Susun perencanaan daerah yang berkelanjutan dengan mudah.
                Langsung dipandu ahlinya.
              </p>
              <div className="relative w-full">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Cari kelas disini"
                  className="w-full rounded-full border border-border py-2 px-4"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <Button variant="blue">Cari Kelas</Button>
            </div>
            <BounceButton />
          </div>
        </div>
      </div>
    </section>
  );
}
