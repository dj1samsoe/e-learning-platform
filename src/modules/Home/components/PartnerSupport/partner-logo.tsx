import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props {
  imageSrc: StaticImageData;
  name: string;
}

export default function PartnerLogo({ imageSrc, name }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Image src={imageSrc} alt={name} width={50} height={50} />
      <p className="lg:text-lg text-md font-bold">{name}</p>
    </div>
  );
}
