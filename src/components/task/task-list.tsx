import type { Task } from "shared/types";
import TaskItem from "./task-item";

export default function Tasklist({
  tasks,
  toggleTask,
  deleteTask,
}: {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
