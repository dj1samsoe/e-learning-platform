import UserProfile from "./UserProfile";
import MyCourse from "./MyCourse";
import { Card, CardContent } from "@/components/ui/card";
import { getUserSession } from "@/lib/auth";
import TeacherProfile from "./TeacherProfile";
import CreatedCourse from "./CreatedCourse";
import {
  getCreatedCourses,
  getTeacherData,
  getUserCourses,
  getUserData,
} from "../../../../actions/get-profile";
import { prisma } from "@/lib/prisma";
import { getProgress } from "../../../../actions/get-progress";
import CreateButton from "./CreatedCourse/create-button";

export default async function ProfilePage() {
  const session = await getUserSession();
  const userData = await getUserData();
  const userCourse = await getUserCourses();
  const teacherData = await getTeacherData();
  const createdCourses = await getCreatedCourses();

  const userId = session?.user?.id;

  const course = await prisma.course.findFirst({
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
    },
  });
  const progressCount = await getProgress(userId, course?.id);

  return (
    <>
      {session?.user?.role === "PENGAJAR" ? (
        <TeacherProfile
          userName={teacherData?.name}
          userImage={teacherData?.imageUrl}
          userRole={teacherData?.role}
          joinedAt={teacherData?.createdAt}
          createdCourses={teacherData?.createdCourses?.length}
          progress={teacherData?.progress?.length}
          student={teacherData?.totalStudents}
        />
      ) : (
        <UserProfile
          userName={userData?.name}
          userImage={userData?.imageUrl}
          userRole={userData?.role}
          joinedAt={userData?.createdAt}
          courseEnrolled={userData?.courses?.length}
          progress={userData?.progress?.length}
          certificate={userData?.certificates?.length}
        />
      )}
      {userCourse?.length > 0 || createdCourses?.length > 0 ? (
        <Card className="max-w-5xl mx-auto">
          <CardContent className="w-full flex flex-col items-start space-y-4 pt-6">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-bold text-xl">Kelas Saya</h1>
              {session?.user?.role === "PENGAJAR" && <CreateButton />}
            </div>
            {session?.user?.role === "PENGAJAR" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {createdCourses.map((course) => (
                  <CreatedCourse
                    key={course.id}
                    courseId={course.id}
                    courseImage={course.imageUrl}
                    courseTitle={course.title}
                    students={course.students.length}
                    duration={"5h 30m"}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-start gap-5">
                {userCourse.map((course) => (
                  <MyCourse
                    key={course.id}
                    courseId={course.course.id}
                    courseImage={course.course.imageUrl}
                    courseTitle={course.course.title}
                    courseTeacher={course.course.teacher.name}
                    progress={progressCount}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-5xl mx-auto">
          <CardContent className="w-full flex flex-col items-start space-y-4 pt-6">
            <h1 className="font-bold text-xl">Kelas Saya</h1>
            <div className="flex flex-col items-start gap-1">
              {session?.user?.role === "PENGAJAR" ? (
                <>
                  <p>Belum ada kursus yang anda buat.</p>
                  <p> Silakan buat kelas terlebih dahulu.</p>
                </>
              ) : (
                <>
                  <p>Belum ada kursus yang anda ikuti.</p>
                  <p>
                    Silakan pilih kelas yang ingin anda ikuti terlebih dahulu.
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
