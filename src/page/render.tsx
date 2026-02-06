import { useMemo } from "react";
import type { Task } from "shared/types";
import { getTodayDate, getTodayDay } from "@/lib/utils";

type Theme = "dark" | "light";
type DeviceType =
  | "iphone-16-pro-max"
  | "iphone-16-pro"
  | "iphone-16"
  | "iphone-15"
  | "iphone-se";

type RenderPayload = {
  device: DeviceType;
  theme: Theme;
  accentColor: string;
  showDate: boolean;
  showProgress: boolean;
  tasks: Task[];
};

function parsePayload(): RenderPayload | null {
  const sp = new URLSearchParams(window.location.search);
  const b64 = sp.get("payload");
  if (!b64) return null;
  try {
    const json = atob(b64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function RenderPage() {
  const payload = useMemo(() => parsePayload(), []);
  const day = getTodayDay();
  const date = getTodayDate();

  if (!payload) return <div>Invalid payload</div>;

  const checkedCount = payload.tasks.filter((t) => t.completed).length;

  // theme 적용 (shadcn class 방식이면 여기서도 적용)
  // 서버 스샷용이니까 간단히 background만 처리해도 됨
  const bg = payload.theme === "dark" ? "#0A0A0D" : "#FFFFFF";
  const fg = payload.theme === "dark" ? "#FFFFFF" : "#0A0A0D";

  return (
    <div
      id="capture-root"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        color: fg,
      }}
      className="flex flex-col p-6"
    >
      <div className="w-full p-6">
        <div className="mb-6 ml-1">
          {payload.showDate && (
            <p className="text-muted-foreground text-sm">{date}</p>
          )}
          <h1 className="mb-1 text-2xl font-semibold">{day}</h1>
          {payload.showProgress && (
            <p className="text-muted-foreground text-sm">
              {`${checkedCount} of ${payload.tasks.length} tasks completed`}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {payload.tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-md border p-3"
              style={{
                borderColor: payload.accentColor,
              }}
            >
              <span className={t.completed ? "line-through opacity-60" : ""}>
                {t.text}
              </span>
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: t.completed
                    ? payload.accentColor
                    : "transparent",
                  border: `1px solid ${payload.accentColor}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
