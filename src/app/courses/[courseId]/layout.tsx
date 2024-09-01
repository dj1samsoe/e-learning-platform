import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProgress } from "../../../../actions/get-progress";
import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";
import { Toaster } from "@/components/ui/toaster";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await getUserSession();
  const userId = session?.user?.id;

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        include: {
          userProgress: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  // const progressCount = await getProgress(userId, course.id);
  {
    /* <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div> */
  }

  return (
    <>
      <Toaster />

      <div className="h-full w-full">
        <CourseNavbar course={course} session={session} />
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </>
  );
};

export default CourseLayout;
