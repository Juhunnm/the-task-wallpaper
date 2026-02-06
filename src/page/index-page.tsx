import Tasklist from "@/components/task/task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayDate, getTodayDay } from "@/lib/utils";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { replaceImage } from "@/api/image";
import { useDevice, useShowDate, useShowProgress } from "@/store/setting-store";
import type { Task } from "shared/types";
import { DEVICES } from "shared/devices";

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
  const date = getTodayDate();
  const device = useDevice();
  const deviceInfo = DEVICES.find((d) => d.id === device);

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
  const showProgress = useShowProgress();
  const showDate = useShowDate();

  return (
    <div
      ref={captureRef}
      style={{ width: deviceInfo?.width, height: deviceInfo?.height }}
      className="flex min-h-screen flex-col items-center justify-center border-x p-6"
    >
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
