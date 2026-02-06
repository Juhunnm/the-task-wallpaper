import { Logo } from "./logo";
import DeviceSelect from "./device-select";
import DesignSettingPopoOver from "./design-setting-popover";
import LenderLink from "./render-link";

export function Header() {
  return (
    <header className="h-14 w-full border-b px-4">
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-2">
          <LenderLink />
          <DeviceSelect />
          <DesignSettingPopoOver />
        </div>
      </div>
    </header>
  );
}
