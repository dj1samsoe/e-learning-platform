"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import {
  Course,
  Chapter,
  User,
  MuxData,
  CourseEnrollment,
} from "@prisma/client";
import { VideoThumbnail } from "./video-thumbnail";
import { MdClose } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface PageComponentProps {
  course: Course & {
    chapters: (Chapter & { muxData: MuxData | null })[];
    teacher: User | null;
    students: CourseEnrollment[];
  };
}

export default function PageComponent({ course }: PageComponentProps) {
  const router = useRouter();
  const { toast } = useToast();

  const enrollCourse = async () => {
    try {
      const response = await axios.post(
        `/api/enrollment?courseId=${course.id}`
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "You are enrolled in this course.",
        });
        const { redirectUrl } = response.data;
        router.push(redirectUrl);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
      });
      console.error(error.message);
    }
  };

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  return (
    <div className="w-full flex flex-row">
      {/* Main content with video or image */}
      <div className="flex-1">
        {course.chapters.length > 0 && course.chapters[0].muxData ? (
          <VideoThumbnail playbackId={course.chapters[0].muxData.playbackId} />
        ) : (
          <Image
            src={course.imageUrl || placeholderImage}
            alt="course-image"
            width={800} // Lebar image yang lebih besar
            height={450} // Tinggi image yang lebih besar
            className="w-full h-auto object-cover"
          />
        )}
        <div className="flex flex-col space-y-2 items-start">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full flex items-center justify-between pt-5 pr-4">
              <div className="flex items-center gap-x-4 pt-5">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                >
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger
                  value="modul"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                >
                  Modul Pembelajaran
                </TabsTrigger>
                <TabsTrigger
                  value="dasar-hukum"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-none border-none"
                >
                  Dasar Hukum
                </TabsTrigger>
              </div>
              <Button variant="primary" onClick={enrollCourse} className="mt-4">
                Enroll Now
              </Button>
            </TabsList>
            <Separator />
            <TabsContent value="description">
              <div className="w-full flex flex-col space-y-2 items-start px-4">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-md">{course.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="modul">
              <div className="w-full flex flex-col space-y-2 items-start px-4">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-md">{course.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="dasar-hukum">
              <div className="w-full flex flex-col space-y-2 items-start px-4">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-md">{course.description}</p>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex items-center space-x-7 py-5 px-4">
            <div className="flex flex-col space-y-1 items-start">
              <h2 className="font-bold">{course?.teacher?.name}</h2>
              <p className="text-muted-foreground">Pengajar</p>
            </div>
            <div className="flex flex-col space-y-1 items-start">
              <h2 className="font-bold">{course?.students?.length}</h2>
              <p className="text-muted-foreground">Jumlah Pelajar</p>
            </div>
            <div className="flex flex-col space-y-1 items-start">
              <h2 className="font-bold">5 Jam 30 Menit</h2>
              <p className="text-muted-foreground">Total Durasi Pelajaran</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar content */}
      <aside className="w-1/4 max-w-xs min-h-screen overflow-y-auto bg-[#F5F7F8] flex flex-col items-start space-y-5 p-4 static z-50">
        <div className="w-full flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold">Konten Kelas</h2>
          <MdClose />
        </div>
        <div className="w-full flex flex-col space-y-2 items-start">
          {course.chapters.map((chapter) => (
            <p key={chapter.id} className="text-sm">
              {chapter.title}
            </p>
          ))}
        </div>
      </aside>
    </div>
  );
}
