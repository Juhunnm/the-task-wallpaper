import { Check, Trash2 } from "lucide-react";
import type { Task } from "shared/types";

type Props = Task & {
  accentColor: string;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

export default function TaskItem({
  id,
  text,
  completed,
  accentColor,
  toggleTask,
  deleteTask,
}: Props) {
  return (
    <div className="group bg-muted/40 hover:bg-muted hover:border-border flex items-center gap-3 rounded-lg border p-3 transition-colors">
      <button
        onClick={() => toggleTask(id)}
        style={{ backgroundColor: completed ? accentColor : "transparent" }}
        className="flex h-5 w-5 items-center justify-center rounded-full border-2"
      >
        {completed && (
          <Check
            style={{ color: accentColor === "#FFFFFF" ? "#000" : "#FFF" }}
            className="h-3 w-3"
          />
        )}
      </button>
      <span
        className={`flex-1 text-sm transition-colors ${completed ? "text-muted-foreground line-through" : ""}`}
      >
        {text}
      </span>
      <button
        type="button"
        onClick={() => deleteTask(id)}
        className="text-muted-foreground cursor-pointer opacity-0 group-hover:opacity-100 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
