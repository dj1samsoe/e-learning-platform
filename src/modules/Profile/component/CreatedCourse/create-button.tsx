"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateButton() {
  const router = useRouter();
  const onClick = () => {
    router.push(`/teacher/courses/create`);
  };
  return (
    <Button variant="primary" onClick={onClick}>
      Buat Kelas
    </Button>
  );
}
