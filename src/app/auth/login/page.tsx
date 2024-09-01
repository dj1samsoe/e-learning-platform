import { Metadata } from "next";
import LoginForm from "./_component/login-form";
import { METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: `Login | E-Learning ${METADATA.creator}`,
  description: `Login | E-Learning ${METADATA.creator}`,
  openGraph: {
    type: "website",
    url: "https://e-learning.vercel.app/login",
    title: `Login | E-Learning ${METADATA.creator}`,
    description: `Login | E-Learning ${METADATA.creator}`,
    images: [
      {
        url: "https://e-learning.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Login | E-Learning",
      },
    ],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
