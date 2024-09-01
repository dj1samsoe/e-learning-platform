import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getUserSession } from "@/lib/auth";
import { getChapter } from "../../../../../../actions/get-chapter";
import { Banner } from "@/components/elements/banner";
import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/elements/preview";
import { getProgress } from "../../../../../../actions/get-progress";
import { CourseSidebar } from "../../_components/course-sidebar";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const session = await getUserSession();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const courses = await prisma.course.findUnique({
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
      teacher: true,
      students: true,
    },
  });

  if (!courses) {
    redirect("/");
  }

  const completeOnEnd = !userProgress?.isCompleted;
  const progressCount = await getProgress(userId, courses?.id);

  return (
    <div className="w-full flex flex-row">
      <div className="flex-1">
        {userProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}
        <div className="flex flex-col w-full">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            completeOnEnd={completeOnEnd}
          />
          <div className="flex flex-col space-y-2 items-start">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full flex items-center justify-between pt-5 pr-4">
                <div className="flex items-center gap-x-4">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                  >
                    Deskripsi
                  </TabsTrigger>
                  <TabsTrigger
                    value="modul"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                  >
                    Modul Pembelajaran
                  </TabsTrigger>
                  <TabsTrigger
                    value="dasar-hukum"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                  >
                    Dasar Hukum
                  </TabsTrigger>
                </div>
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </TabsList>
              <Separator />
              <TabsContent value="description">
                <div className="w-full flex flex-col space-y-2 items-start px-4">
                  <h1 className="text-xl font-bold">{chapter.title}</h1>
                  <Preview value={chapter.description!} />
                </div>
              </TabsContent>
              <TabsContent value="modul">
                <div className="w-full flex flex-col space-y-2 items-start px-4">
                  <h1 className="text-xl font-bold">{chapter.title}</h1>
                  <Preview value={chapter.description!} />
                </div>
              </TabsContent>
              <TabsContent value="dasar-hukum">
                <div className="w-full flex flex-col space-y-2 items-start px-4">
                  <h1 className="text-xl font-bold">{chapter.title}</h1>
                  <Preview value={chapter.description!} />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex items-center space-x-7 py-5 px-4">
              <div className="flex flex-col space-y-1 items-start">
                <h2 className="font-bold">{courses?.teacher?.name}</h2>
                <p className="text-muted-foreground">Pengajar</p>
              </div>
              <div className="flex flex-col space-y-1 items-start">
                <h2 className="font-bold">{courses?.students?.length}</h2>
                <p className="text-muted-foreground">Jumlah Pelajar</p>
              </div>
              <div className="flex flex-col space-y-1 items-start">
                <h2 className="font-bold">5 Jam 30 Menit</h2>
                <p className="text-muted-foreground">Total Durasi Pelajaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="w-1/4 max-w-xs min-h-screen overflow-y-auto bg-[#F5F7F8] flex flex-col items-start space-y-5 static z-50">
        <CourseSidebar course={courses} progressCount={progressCount} />
      </aside>
    </div>
  );
};

export default ChapterIdPage;
