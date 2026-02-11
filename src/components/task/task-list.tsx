import type { Task } from "shared/types";
import TaskItem from "./task-item";

export default function Tasklist({
  tasks,
  accentColor,
  toggleTask,
  deleteTask,
}: {
  tasks: Task[];
  accentColor: string;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          accentColor={accentColor}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
