import { Outlet } from "react-router";
import DeviceSelect from "./header/device-select";
import ProfileButton from "./header/profile-button";
import DesignSettingPopoOver from "./header/design-setting-popover";
import { LogoMark } from "./header/logo-mark";
import LinkButton from "./header/link-button";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <LogoMark />
          <div className="flex flex-1 justify-center">
            <DeviceSelect />
          </div>
          <div className="flex items-center gap-1">
            <LinkButton />
            <DesignSettingPopoOver />
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
