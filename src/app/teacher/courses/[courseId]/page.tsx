import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Actions } from "./_components/actions";
import { IconBadge } from "@/components/elements/icon-badge";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";
import { getUserSession } from "@/lib/auth";

const TeacherCourseIdPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const session = await getUserSession();
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      teacherId: session?.user?.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      students: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.title),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  //   const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="md:px-16 px-5 py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions courseId={params.courseId} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherCourseIdPage;
