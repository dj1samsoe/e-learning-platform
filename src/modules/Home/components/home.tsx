import React from "react";
import BannerSection from "./banner-section";
import PartnerSupport from "./PartnerSupport/partners-support";
import FeaturedCourse from "./FeaturedCourse/featured-course";
import Category from "./Category/category";
import Advantages from "./Advantages/advantages";
import LatestCourse from "./LatestCourse/latest-course";
import FrequentlyAskedQuestions from "./FAQ/faq";
import Testimonials from "./Testimonials/testimonials";
import Contact from "./Contact/contact";
import CallToAction from "./CTA/cta";

export default function HomePage() {
  return (
    <>
      <BannerSection />
      <PartnerSupport />
      <FeaturedCourse />
      <Category />
      <Advantages />
      <LatestCourse />
      <FrequentlyAskedQuestions />
      <Testimonials />
      <Contact />
      <CallToAction />
    </>
  );
}
