import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const TeacherPage = async () => {
  const session = await getUserSession();
  const courses = await prisma.course.findMany({
    where: {
      teacherId: session?.user?.id,
    },
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
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/teacher/courses/${course.id}`}
          legacyBehavior
          passHref
        >
          <div className="w-full flex flex-col items-start gap-3 cursor-pointer">
            <Image
              src={course.imageUrl || placeholderImage}
              alt={course.title}
              width={200}
              height={200}
            />
            <h1 className="font-bold text-xl">{course.title}</h1>
            <p className="text-sm">{course.teacher.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeacherPage;
