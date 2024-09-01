import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
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

    if (!teacherId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        teacherId: teacherId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
