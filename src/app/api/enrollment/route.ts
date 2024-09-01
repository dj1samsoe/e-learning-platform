import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getUserSession();
  const searchParams = new URL(req.url).searchParams;

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const courseId = searchParams.getAll("courseId")[0];

  if (!courseId) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    // Check if user is already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId,
        },
      },
    });

    if (existingEnrollment) {
      return new NextResponse("You are already enrolled in this course.", {
        status: 400,
      });
    }

    // Create new enrollment record
    await prisma.courseEnrollment.create({
      data: {
        userId: session.user.id,
        courseId: courseId,
      },
    });

    // Redirect to the first chapter after enrollment
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    const redirectUrl = `/courses/${courseId}/chapters/${course?.chapters[0].id}`;
    return new NextResponse(JSON.stringify({ redirectUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("[ENROLLMENT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
