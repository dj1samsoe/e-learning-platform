import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  image: string;
  name: string;
  district: string;
}

export default function TestimonialCard({
  quote,
  image,
  name,
  district,
}: TestimonialCardProps) {
  return (
    <Card className="flex flex-col items-start justify-between">
      <CardContent className="p-6">
        <CardTitle>&quot;{quote}&quot;</CardTitle>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-4">
          <Image src={image} alt={name} width={30} height={30} />
          <div className="flex flex-col space-y-1">
            <p className="text-xl font-medium">{name}</p>
            <p className="text-md text-muted-foreground">{district}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
