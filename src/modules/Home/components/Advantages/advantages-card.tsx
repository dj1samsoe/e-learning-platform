import React from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { cn } from "@/lib/utils";

export interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
}

export default function AdvantageCard({
  icon,
  title,
  description,
  backgroundColor,
}: AdvantageCardProps) {
  return (
    <Card
      className={cn(
        `flex flex-col space-y-4 items-center justify-center p-4`,
        backgroundColor
      )}
    >
      <CardHeader className="pb-0 mb-2">{icon}</CardHeader>
      <CardContent className="flex flex-col space-y-2 items-center justify-center text-[#000000] !p-2">
        <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
