import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "PENGAJAR") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const teacherId = session.user.id;
    const { title } = await req.json();

    if (!teacherId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        teacherId: teacherId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
