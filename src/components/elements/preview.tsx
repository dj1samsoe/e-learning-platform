"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Puritan } from "next/font/google";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

const puritan = Puritan({
  weight: ["400", "700"],
  display: "fallback",
  style: "normal",
  subsets: ["latin"],
});

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      className={puritan.className}
      readOnly
    />
  );
};
