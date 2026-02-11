import { Link } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccentColor,
  useDevice,
  useShowDate,
  useShowProgress,
  useThemeMode,
} from "@/store/setting-store";
import { useSession } from "@/store/session";

export default function LinkButton() {
  const device = useDevice();
  const theme = useThemeMode();
  const accent = useAccentColor();
  const showDate = useShowDate();
  const showProgress = useShowProgress();
  const session = useSession();

  const url = useMemo(() => {
    const params = new URLSearchParams({
      device,
      theme,
      accent,
      date: showDate ? "1" : "0",
      progress: showProgress ? "1" : "0",
    });
    if (session?.user.id) params.set("userId", session.user.id);
    const base = import.meta.env.VITE_RENDER_SERVER ?? "http://localhost:4000";
    return `${base}/api/wallpaper.png?${params.toString()}`;
  }, [device, theme, accent, showDate, showProgress, session]);

  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 cursor-pointer transition-colors ${copied ? "text-emerald-500" : "hover:bg-muted"}`}
      onClick={copyUrl}
      title="Copy wallpaper URL"
    >
      <Link className="h-4 w-4" />
    </Button>
  );
}
