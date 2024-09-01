import { prisma } from "@/lib/prisma";
import CourseComponent from "@/modules/Courses";
import Image from "next/image";
import Link from "next/link";

const CoursePage = async () => {
  const courses = await prisma.course.findMany({
    include: {
      teacher: true,
      students: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  return (
    <CourseComponent />
    // <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //   {courses.map((course) => (
    //     <Link
    //       key={course.id}
    //       href={`/courses/${course.id}`}
    //       legacyBehavior
    //       passHref
    //     >
    //       <div className="w-full flex flex-col items-start gap-3 cursor-pointer">
    //         <Image
    //           src={course.imageUrl || placeholderImage}
    //           alt={course.title}
    //           width={200}
    //           height={200}
    //         />
    //         <h1 className="font-bold text-xl">{course.title}</h1>
    //         <p className="text-sm">{course.teacher.name}</p>
    //       </div>
    //     </Link>
    //   ))}
    // </div>
  );
};

export default CoursePage;
