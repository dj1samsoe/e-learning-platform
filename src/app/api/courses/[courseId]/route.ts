import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { user } = session;
    const courseId = params.courseId;

    if (user.role === "PENGAJAR") {
      // PENGAJAR menghapus kursus yang dia buat
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          teacherId: user.id,
        },
        include: {
          chapters: {
            include: {
              muxData: true,
            },
          },
        },
      });

      if (!course) {
        return new NextResponse("Not found", { status: 404 });
      }

      for (const chapter of course.chapters) {
        if (chapter.muxData?.assetId) {
          await video.assets.delete(chapter.muxData.assetId);
        }
      }

      const deletedCourse = await prisma.course.delete({
        where: {
          id: courseId,
        },
      });

      return NextResponse.json(deletedCourse);
    } else if (user.role === "PELAJAR") {
      // PELAJAR membatalkan pendaftaran dari kursus
      const enrollment = await prisma.courseEnrollment.findFirst({
        where: {
          courseId,
          userId: user.id,
        },
      });

      if (!enrollment) {
        return new NextResponse("Not found", { status: 404 });
      }

      const deletedEnrollment = await prisma.courseEnrollment.delete({
        where: {
          id: enrollment.id,
        },
      });

      return NextResponse.json(deletedEnrollment);
    }

    return new NextResponse("Forbidden", { status: 403 });
  } catch (error) {
    console.log("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getUserSession();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { user } = session;
    const courseId = params.courseId;
    const values = await req.json();

    if (user.role !== "PENGAJAR") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        teacherId: user.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
