import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const course = await prisma.course.create({
      data: {
        teacherId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
