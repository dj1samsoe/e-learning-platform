"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/elements/confirm-modal";
import { useToast } from "@/components/ui/use-toast";

interface ChapterActionsProps {
  courseId: string;
  chapterId: string;
}

export const ChapterActions = ({
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast({ title: "Success", description: "Chapter deleted" });
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
