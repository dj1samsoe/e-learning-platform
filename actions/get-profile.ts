"use server";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUserData = async () => {
  const session = await getUserSession();

  const db = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      courses: true,
      progress: true,
      certificates: true,
    },
  });
  return db;
};

export const getUserCourses = async () => {
  const session = await getUserSession();

  const db = await prisma.courseEnrollment.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      course: {
        include: {
          teacher: true, // Include teacher details
          chapters: {
            include: {
              userProgress: true, // Include user progress
            },
          },
        },
      },
    },
  });
  return db;
};

export const getTeacherData = async () => {
  const session = await getUserSession();

  const db = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
      role: "PENGAJAR",
    },
    include: {
      createdCourses: {
        include: {
          students: true,
        },
      },
      progress: true,
    },
  });

  const totalStudents =
    db?.createdCourses.reduce(
      (acc, course) => acc + course.students.length,
      0
    ) || 0;

  return {
    ...db,
    totalStudents,
  };
};

export const getCreatedCourses = async () => {
  const session = await getUserSession();

  //   if (!session || session.user.role !== "PENGAJAR") {
  //     throw new Error("Unauthorized or not a teacher");
  //   }

  const courses = await prisma.course.findMany({
    where: {
      teacherId: session?.user?.id,
    },
    include: {
      students: true, // Mengambil data mahasiswa yang terdaftar di setiap course
    },
  });

  return courses;
};
