import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  value: number | undefined;
}

export const CourseProgress = ({ value }: CourseProgressProps) => {
  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <Progress value={value} />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm">Progress Saya</p>
        <p className="text-blue font-bold text-sm">{value}%</p>
      </div>
    </div>
  );
};
