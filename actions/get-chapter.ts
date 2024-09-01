import { prisma } from "@/lib/prisma";
import { Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let nextChapter: Chapter | null = null;

    muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: chapterId,
      },
    });

    nextChapter = await prisma.chapter.findFirst({
      where: {
        courseId: courseId,
        position: {
          gt: chapter?.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      nextChapter,
      userProgress,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
    };
  }
};
