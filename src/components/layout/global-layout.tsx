import { Outlet } from "react-router";
import DeviceSelect from "./header/device-select";
import ProfileButton from "./header/profile-button";
import DesignSettingPopoOver from "./header/design-setting-popover";
import { LogoMark } from "./header/logo-mark";
import LinkButton from "./header/link-button";
export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-14 w-full border-b px-4">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
          <LogoMark />
          <div className="flex items-center gap-2">
            <LinkButton />
            <DeviceSelect />
            <DesignSettingPopoOver />
          </div>
          <ProfileButton />
        </div>
      </header>
      <main className="flex min-h-screen items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
