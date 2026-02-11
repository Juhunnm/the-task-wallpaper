import Tasklist from "@/components/task/task-list";
import type { Task } from "shared/types";

type Props = {
  tasks: Task[];
  accentColor: string;
  showDate: boolean;
  showProgress: boolean;
  day: string;
  date: string;
  toggleTask?: (id: number) => void;
  deleteTask?: (id: number) => void;
};

const noop = () => {};

export default function WallpaperContent({
  tasks,
  accentColor,
  showDate,
  showProgress,
  day,
  date,
  toggleTask = noop,
  deleteTask = noop,
}: Props) {
  const checkedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-6 ml-1">
        {showDate && <p className="text-muted-foreground text-sm">{date}</p>}
        <h1 className="mb-1 text-2xl font-semibold">{day}</h1>
        {showProgress && (
          <p className="text-muted-foreground text-sm">
            {`${checkedCount} of ${tasks.length} tasks completed`}
          </p>
        )}
      </div>
      <Tasklist
        tasks={tasks}
        accentColor={accentColor}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
