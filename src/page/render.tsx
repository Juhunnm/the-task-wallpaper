import { useMemo } from "react";
import type { RenderPayload } from "shared/types";
import { getTodayDate, getTodayDay } from "@/lib/utils";
import { DEVICE_MAP } from "shared/devices";
import WallpaperContent from "@/components/wallpaper/wallpaper-content";

function parsePayload(): RenderPayload | null {
  const sp = new URLSearchParams(window.location.search);
  const b64 = sp.get("payload");
  if (!b64) return null;
  try {
    // atob()는 Latin-1만 처리해서 한글 등 멀티바이트 문자가 깨짐
    // TextDecoder로 UTF-8 디코딩해야 함
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const json = new TextDecoder("utf-8").decode(bytes);
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

  const { width, height } = DEVICE_MAP[payload.device];

  return (
    // theme에 따라 .dark 클래스 적용 → Tailwind CSS 변수 정상 동작
    <div className={payload.theme === "dark" ? "dark" : ""}>
      <div
        id="capture-root"
        style={{ width, height }}
        className="bg-background text-foreground flex flex-col items-center justify-center overflow-hidden border-x"
      >
        <WallpaperContent
          tasks={payload.tasks}
          accentColor={payload.accentColor}
          showDate={payload.showDate}
          showProgress={payload.showProgress}
          day={day}
          date={date}
        />
      </div>
    </div>
  );
}
