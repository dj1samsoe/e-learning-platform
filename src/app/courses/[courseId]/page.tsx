import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PageComponent from "./_components/page-component";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getUserSession();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
        include: {
          muxData: true,
        },
      },
      students: {
        where: {
          userId: userId,
        },
      },
      teacher: true,
    },
  });

  if (!course) {
    return redirect("/");
  }

  // Check if the user is already enrolled
  const isEnrolled = course.students.some(
    (student) => student.userId === userId
  );

  if (isEnrolled) {
    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  }

  return <PageComponent course={course} />;
};

export default CourseIdPage;
