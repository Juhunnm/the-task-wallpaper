import Tasklist from "@/components/task/task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayDate, getTodayDay } from "@/lib/utils";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
// import * as htmlToImage from "html-to-image";
// import { replaceImage } from "@/api/image";
import {
  useDevice,
  useSetDesign,
  useSetDevice,
  useSetThemeMode,
  useSetToggle,
  useShowDate,
  useShowProgress,
} from "@/store/setting-store";
import type { Task, Theme } from "shared/types";
import { DEVICES, type DeviceType } from "shared/devices";
import { useLocation } from "react-router";
import { readWallpaperQuery } from "@/lib/query";

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

  const { search } = useLocation();
  //store
  const setThemeMode = useSetThemeMode();
  const setDesign = useSetDesign();
  const setDevice = useSetDevice();
  const setToggle = useSetToggle();
  const device = useDevice();
  const showProgress = useShowProgress();
  const showDate = useShowDate();

  const day = getTodayDay();
  const date = getTodayDate();
  const deviceInfo = DEVICES.find((d) => d.id === device);

  const q = readWallpaperQuery(search);
  console.log(q);
  const isRenderMode = q.render;
  useEffect(() => {
    if (q.theme) setThemeMode(q.theme as Theme);
    if (q.accent) setDesign({ accentColor: q.accent });
    if (q.device) setDevice(q.device as DeviceType);

    setToggle("showDate", Boolean(q.showDate));
    setToggle("showProgress", Boolean(q.showProgress));
    console.log("showdate,progress", q.showDate, q.showProgress);
  }, [
    q.theme,
    q.accent,
    q.device,
    q.showDate,
    q.showProgress,
    setThemeMode,
    setDesign,
    setDevice,
    setToggle,
  ]);

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
      // ref={captureRef}
      id="capture-root"
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
        {!isRenderMode && (
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
        )}
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
