import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

import {
  useAccentColor,
  useSetDesign,
  useSetThemeMode,
  useSetToggle,
  useShowDate,
  useShowProgress,
  useThemeMode,
  type Theme,
} from "@/store/setting-store";

type Color = {
  name: string;
  value: string;
};

const COLORS: { mode: Theme; value: string }[] = [
  { mode: "dark", value: "#000000" },
  { mode: "light", value: "#FFFFFF" },
];

const ACCENT_COLORS: Color[] = [
  { name: "White", value: "#FFFFFF" },
  { name: "Green", value: "#0FBF3E" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
];

export function Header() {
  const themeMode = useThemeMode();
  const accentColor = useAccentColor();
  const showDate = useShowDate();
  const showProgress = useShowProgress();

  const setThemeMode = useSetThemeMode();
  const setDesign = useSetDesign();
  const setToggle = useSetToggle();

  return (
    <header className="h-14 w-full px-4">
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-muted grid h-8 w-8 place-items-center rounded-md">
            <div className="flex flex-col items-center leading-none">
              <div className="flex gap-1">
                <span
                  style={{ color: accentColor }}
                  className="text-[10px] font-semibold"
                >
                  T
                </span>
                <span
                  style={{ color: accentColor }}
                  className="text-[10px] font-semibold"
                >
                  T
                </span>
              </div>
              <span className="text-[7px] font-semibold">W</span>
            </div>
          </div>

          <span className="text-sm font-medium">Todo Task Wallpaper</span>
        </div>

        {/* Controls */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted h-8 w-8 cursor-pointer"
            >
              <Settings />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="bg-muted w-72 border p-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Design Settings</h4>

              {/* Background */}
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground text-xs">
                  Background
                </Label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.mode}
                      type="button"
                      onClick={() => setThemeMode(color.mode)}
                      className={`h-7 w-7 cursor-pointer rounded-full border-2 transition-all ${
                        themeMode === color.mode
                          ? "border-muted-foreground scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.mode}
                    />
                  ))}
                </div>
              </div>

              {/* Accent */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Accent</Label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setDesign({ accentColor: color.value })}
                      className={`h-7 w-7 cursor-pointer rounded-full border-2 transition-all ${
                        accentColor === color.value
                          ? "border-muted-foreground scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="border-muted-foreground space-y-3 border-t pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground text-xs">
                    Show Date
                  </Label>
                  <Switch
                    checked={showDate}
                    onCheckedChange={(checked) =>
                      setToggle("showDate", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground text-xs">
                    Show Progress
                  </Label>
                  <Switch
                    checked={showProgress}
                    onCheckedChange={(checked) =>
                      setToggle("showProgress", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
