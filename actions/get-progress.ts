import { prisma } from "@/lib/prisma";

export const getProgress = async (
  userId: string | undefined,
  courseId: string | undefined
): Promise<number> => {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await prisma.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};
