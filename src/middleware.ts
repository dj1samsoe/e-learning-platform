export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/courses",
    "/courses/:courseId",
    "/teacher/courses",
    "/teacher/courses/:courseId",
    "/teacher/courses/create",
    "/kategori",
    "/diskusi",
    "/bantuan",
    "/profil",
    "/pengaturan",
  ],
};
