import { METADATA } from "@/constant/metadata";
import ProfilePage from "@/modules/Profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Profil Saya | E-Learning ${METADATA.creator}`,
  description: `Profil Saya | E-Learning ${METADATA.creator}`,
  openGraph: {
    type: "website",
    url: "https://e-learning.vercel.app/profil",
    title: `Profil Saya | E-Learning ${METADATA.creator}`,
    description: `Profil Saya | E-Learning ${METADATA.creator}`,
    images: [
      {
        url: "https://e-learning.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Profil Saya | E-Learning",
      },
    ],
  },
};

export default function Profil() {
  return (
    <div className="mt-24 mb-16 min-h-screen w-full">
      <ProfilePage />
    </div>
  );
}
