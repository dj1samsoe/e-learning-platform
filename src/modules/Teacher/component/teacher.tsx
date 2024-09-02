import React from "react";
import BreadcrumbCourse from "./breadcrumb-course";
import BannerCourse from "./banner";
import CategoryCourse from "./Category";
import MainComponent from "./MainComponent";

export default function TeacherComponent() {
  return (
    <div className="flex flex-col space-y-4 mt-16 h-full w-full md:px-16 px-5 py-8 bg-[#F5F7F8]">
      <BreadcrumbCourse />
      <BannerCourse />
      <CategoryCourse />
      <MainComponent />
    </div>
  );
}
