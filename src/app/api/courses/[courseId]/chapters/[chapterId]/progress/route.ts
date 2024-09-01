import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
