export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/courses",
    "/courses/:courseId",
    "/courses/:courseId/chapters/:chapterId",
    "/teacher/courses",
    "/teacher/courses/:courseId",
    "/teacher/courses/:courseId/chapters/:chapterId",
    "/teacher/courses/create",
    "/kategori",
    "/diskusi",
    "/bantuan",
    "/profil",
    "/pengaturan",
  ],
};
