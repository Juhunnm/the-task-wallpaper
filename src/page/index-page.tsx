import WallpaperContent from "@/components/wallpaper/wallpaper-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayDate, getTodayDay } from "@/lib/utils";

import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useAccentColor,
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
import { useFetchTasksByUser } from "@/hook/queries/use-fetch-tasks-by-user";
import { useSaveTasksByUser } from "@/hook/mutations/use-save-tasks-by-user";
import { useSession } from "@/store/session";

export default function IndexPage() {
  const session = useSession();
  const userId = session?.user.id ?? "";

  const { data: fetchedTasks } = useFetchTasksByUser(userId);
  const { mutate: saveTasks } = useSaveTasksByUser({});

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // DB에서 로드된 tasks로 초기화 (최초 1회)
  const isInitialized = useRef(false);
  useEffect(() => {
    if (!isInitialized.current && fetchedTasks) {
      setTasks(fetchedTasks);
      isInitialized.current = true;
    }
  }, [fetchedTasks]);

  // tasks 변경 시 1초 debounce로 자동 저장
  useEffect(() => {
    if (!userId || !isInitialized.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveTasks({ userId, tasks });
    }, 1000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [tasks, userId, saveTasks]);

  const { search } = useLocation();
  const setThemeMode = useSetThemeMode();
  const setDesign = useSetDesign();
  const setDevice = useSetDevice();
  const setToggle = useSetToggle();
  const device = useDevice();
  const showProgress = useShowProgress();
  const showDate = useShowDate();
  const accentColor = useAccentColor();

  const day = getTodayDay();
  const date = getTodayDate();
  const deviceInfo = DEVICES.find((d) => d.id === device);

  const q = readWallpaperQuery(search);
  const isRenderMode = q.render;

  useEffect(() => {
    if (q.theme) setThemeMode(q.theme as Theme);
    if (q.accent) setDesign({ accentColor: q.accent });
    if (q.device) setDevice(q.device as DeviceType);
    setToggle("showDate", Boolean(q.showDate));
    setToggle("showProgress", Boolean(q.showProgress));
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

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newTask, completed: false },
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
      id="capture-root"
      style={{ width: deviceInfo?.width, height: deviceInfo?.height }}
      className="flex min-h-screen flex-col items-center justify-center border-x"
    >
      {!isRenderMode && (
        <div className="w-full px-12 pb-2 pt-6">
          <div className="flex gap-2">
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
        </div>
      )}
      <WallpaperContent
        tasks={tasks}
        accentColor={accentColor}
        showDate={showDate}
        showProgress={showProgress}
        day={day}
        date={date}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
