import Image from "next/image";
import Link from "next/link";
import React from "react";

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "FAQ", href: "#" },
];

const popularCategories1 = [
  { name: "Renewable Energy", href: "#" },
  { name: "Sustainable Energy", href: "#" },
  { name: "Energy Management", href: "#" },
  { name: "Solar Power", href: "#" },
  { name: "Biomass and Bioenergy", href: "#" },
];

const popularCategories2 = [
  { name: "Wind Energy", href: "#" },
  { name: "Hydropower Engineering", href: "#" },
  { name: "Energy Storage", href: "#" },
  { name: "Energy Distribution", href: "#" },
  { name: "Smart Grids", href: "#" },
];

const popularCourses = [
  { name: "Advanced Solar Power Technologies", href: "#" },
  { name: "Biomass Energy Production and Utilization", href: "#" },
  { name: "Sustainable Energy Policy", href: "#" },
  { name: "Sustainable Energy management", href: "#" },
  { name: "Energy Storage Solutions", href: "#" },
];

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full md:px-16 px-5 md:py-16 py-8 border-t flex flex-col space-y-6 items-start bg-white">
      <Image src={"/assets/logo.png"} alt="logo" width={100} height={100} />
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col space-y-2 items-start">
          <h2 className="text-xl font-bold text-muted-foreground">Company</h2>
          {companyLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <h2 className="text-xl font-bold text-muted-foreground">
            Popular Categories
          </h2>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2 items-start">
              {popularCategories1.map((link, index) => (
                <Link href={link.href} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-2 items-start">
              {popularCategories2.map((link, index) => (
                <Link href={link.href} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <h2 className="text-xl font-bold text-muted-foreground">
            Popular Courses
          </h2>

          {popularCourses.map((link, index) => (
            <Link href={link.href} key={index}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <h2 className="text-xl font-bold text-muted-foreground">
            Social Links
          </h2>
          {socialLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
