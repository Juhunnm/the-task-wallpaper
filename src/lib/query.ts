// lib/query.ts
import type { DeviceType } from "shared/devices";
import type { Theme } from "shared/types";

const DEFAULTS = {
  theme: "light" as Theme,
  accent: "#FFFFFF",
  device: "iphone-16-pro" as DeviceType,
  date: "1",
  progress: "1",
};

export function readWallpaperQuery(search: string) {
  const sp = new URLSearchParams(search);
  const theme = sp.get("theme");
  return {
    theme: (theme === "dark" ? "dark" : "light") as Theme,
    accent: sp.get("accent") ?? DEFAULTS.accent,
    device: sp.get("device") ?? DEFAULTS.device,
    showDate: sp.get("date") ?? DEFAULTS.date,
    showProgress: sp.get("progress") ?? DEFAULTS.progress,
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
