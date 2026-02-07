import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import type { Theme } from "shared/types";
import {
  useAccentColor,
  useSetDesign,
  useSetThemeMode,
  useSetToggle,
  useShowDate,
  useShowProgress,
  useThemeMode,
} from "@/store/setting-store";
import useUpdateWallpaperQuery from "@/hook/use-update-wallpaper-query";

type Color = {
  name: string;
  value: string;
};
const COLORS: {
  mode: Theme;
  value: string;
}[] = [
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
export default function DesignSettingPopoOver() {
  const themeMode = useThemeMode();
  const accentColor = useAccentColor();
  const showDate = useShowDate();
  const showProgress = useShowProgress();

  const setThemeMode = useSetThemeMode();
  const setDesign = useSetDesign();
  const setToggle = useSetToggle();

  const updateQuery = useUpdateWallpaperQuery();

  const onClickTheme = (mode: Theme) => {
    setThemeMode(mode);
    updateQuery({ theme: mode });
  };
  const onClickAccent = (hex: string) => {
    setDesign({ accentColor: hex });
    updateQuery({ accent: hex });
  };
  return (
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
            <Label className="text-muted-foreground text-xs">Background</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.mode}
                  type="button"
                  onClick={() => onClickTheme(color.mode)}
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
                  onClick={() => onClickAccent(color.value)}
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
              <Label className="text-muted-foreground text-xs">Show Date</Label>
              <Switch
                checked={showDate}
                onCheckedChange={(checked) => {
                  setToggle("showDate", checked);
                  updateQuery({ date: checked ? "1" : "0" });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground text-xs">
                Show Progress
              </Label>
              <Switch
                checked={showProgress}
                onCheckedChange={(checked) => {
                  setToggle("showProgress", checked);
                  updateQuery({ progress: checked ? "1" : "0" });
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
