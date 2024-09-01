import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/elements/course-progress";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MdClose } from "react-icons/md";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await getUserSession();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full w-full border-l flex flex-col overflow-y-auto shadow-sm">
      <div className="w-full flex items-center justify-between border-b pb-2 pt-4 px-8">
        <h2 className="text-xl font-bold">Konten Kelas</h2>
        <MdClose />
      </div>
      <div className="px-8 pb-8 pt-4 flex flex-col border-b">
        <CourseProgress value={progressCount} />
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};
