import { Metadata } from "next";
import RegisterForm from "./_component/register-form";
import { METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: `Register | E-Learning ${METADATA.creator}`,
  description: `Register | E-Learning ${METADATA.creator}`,
  openGraph: {
    type: "website",
    url: "https://e-learning.vercel.app/register",
    title: `Register | E-Learning ${METADATA.creator}`,
    description: `Register | E-Learning ${METADATA.creator}`,
    images: [
      {
        url: "https://e-learning.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Register | E-Learning",
      },
    ],
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
