// lib/query.ts
import type { DeviceType } from "shared/devices";
import type { Theme } from "shared/types";

const DEFAULTS = {
  theme: "light" as Theme,
  accent: "#FFFFFF",
  device: "iphone-16-pro" as DeviceType,
  date: true,
  progress: true,
};

function parse(v: string | null, fallback: boolean) {
  if (v === "1" || v === "true") return true;
  if (v === "0" || v === "false") return false;
  return fallback;
}

export function readWallpaperQuery(search: string) {
  const sp = new URLSearchParams(search);
  const theme = sp.get("theme");
  const showDate = parse(sp.get("date"), DEFAULTS.date);
  const showProgress = parse(sp.get("progress"), DEFAULTS.progress);
  const render = sp.get("render") === "1" || sp.get("render") === "true";
  return {
    theme: (theme === "dark" ? "dark" : "light") as Theme,
    accent: sp.get("accent") ?? DEFAULTS.accent,
    device: sp.get("device") ?? DEFAULTS.device,
    showDate,
    showProgress,
    render,
  };
}

export function writeWallpaperQuery(
  search: string,
  params: Record<string, string>,
) {
  const sp = new URLSearchParams(search);
  Object.entries(params).forEach(([key, value]) => {
    sp.set(key, value);
  });

  return `?${sp.toString()}`;
}
