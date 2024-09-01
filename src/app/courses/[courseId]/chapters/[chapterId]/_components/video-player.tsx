"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        toast({ title: "Success", description: "Progress updated" });
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong" });
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn(!isReady && "hidden")}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnd}
        autoPlay
        playbackId={playbackId}
      />
    </div>
  );
};
