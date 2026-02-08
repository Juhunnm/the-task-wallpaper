import { useAccentColor } from "@/store/setting-store";

export function LogoMark() {
  const accentColor = useAccentColor();

  return (
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
  );
}
