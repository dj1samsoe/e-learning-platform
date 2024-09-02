import { METADATA } from "@/constant/metadata";
import HomePage from "@/modules/Home";
import { Metadata } from "next";
// import { Suspense } from "react";
// import Loading from "./loading";

export const metadata: Metadata = {
  title: `E-Learning ${METADATA.exTitle}`,
  alternates: {
    canonical: process.env.DOMAIN,
  },
};

export default function Home() {
  return (
    // <Suspense fallback={<Loading />}>
    <HomePage />
    // </Suspense>
  );
}
