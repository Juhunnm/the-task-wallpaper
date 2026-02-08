import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Copy, Link, Link2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useAccentColor,
  useDevice,
  useShowDate,
  useShowProgress,
  useThemeMode,
} from "@/store/setting-store";

export default function LinkButton() {
  const device = useDevice();
  const theme = useThemeMode();
  const accent = useAccentColor();
  const showDate = useShowDate();
  const showProgress = useShowProgress();

  // 1) URL 만들기 (일단은 옵션만)
  const url = useMemo(() => {
    const params = new URLSearchParams({
      device,
      theme,
      accent,
      showDate: String(showDate),
      showProgress: String(showProgress),
    });

    // 나중에 배포 대비해서 env로 빼는 게 좋음
    const base = import.meta.env.VITE_RENDER_SERVER ?? "http://localhost:3000";
    return `${base}/render?${params.toString()}`;
  }, [device, theme, accent, showDate, showProgress]);

  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
    console.log(url);
  };

  return (
    <div className="mx-auto flex w-full max-w-xl items-center gap-2 px-4">
      <div
        onClick={copyUrl}
        className="flex flex-1 cursor-pointer items-center gap-2"
      >
        <Link
          className={`h-4 w-4 opacity-60 ${copied ? "scale-110 text-emerald-600" : ""}`}
        />
        {/* <Input value={url} readOnly className="h-9" /> */}
      </div>

      {/* <Button variant="outline" className="h-9" onClick={copyUrl}>
        <Copy className="mr-2 h-4 w-4" />
        {copied ? "Copied" : "Copy"}
      </Button> */}
    </div>
  );
}
