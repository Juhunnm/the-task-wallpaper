import Tasklist from "@/components/task/task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayDay } from "@/lib/utils";
import type { Task } from "@/types";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { replaceImage } from "@/api/image";

const MokTasks: Task[] = [
  {
    id: 1,
    text: "Design new landing page",
    completed: true,
  },
  {
    id: 2,
    text: "Review pull requests",
    completed: false,
  },
  {
    id: 3,
    text: "Write documentatxion",
    completed: false,
  },
];

export default function IndexPage() {
  const [tasks, setTasks] = useState<Task[]>(MokTasks);
  const [newTask, setNewTask] = useState("");
  const day = getTodayDay();
  const captureRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);
  const exportAsPng = async () => {
    if (!captureRef.current) return;

    const dataUrl = await htmlToImage.toPng(captureRef.current, {
      cacheBust: true,
      pixelRatio: 3,
    });

    const blob = await (await fetch(dataUrl)).blob();
    const bucket = "wallpapers";
    const path = `public/wallpaper.png`;

    try {
      console.log("start");

      await replaceImage(bucket, path, blob);
    } catch (e) {
      console.error("upload failed:", e);
    }
  };

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   const t = setTimeout(() => {
  //     exportAsPng();
  //   }, 1000); // 1분 동안 변화 없을 때만 업로드

  //   return () => clearTimeout(t);
  // }, [tasks]);

  const checkedCount = tasks.filter((t) => t.completed).length;

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div
      ref={captureRef}
      className="flex min-h-screen flex-col items-center justify-center p-6"
    >
      <div className="mx-auto w-full p-6">
        <div className="mb-6 ml-1">
          <h1 className="mb-1 text-2xl font-semibold">{day}</h1>
          <p className="text-muted-foreground text-sm">
            {`${checkedCount} of ${tasks.length} tasks completed`}
          </p>
        </div>
        {/* input */}
        <div className="mb-6 flex gap-2">
          <Input
            value={newTask}
            placeholder="Add a new task..."
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="focus-visible:ring-muted h-10 flex-1"
          />
          <Button variant={"outline"} onClick={addTask} className="h-10">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {/* tasks list */}
        <Tasklist
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
