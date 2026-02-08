import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smartphone } from "lucide-react";
import { DEVICES, type DeviceType } from "shared/devices";
import { useDevice, useSetDevice } from "@/store/setting-store";
import useUpdateWallpaperQuery from "@/hook/queries/use-update-wallpaper-query";
export default function DeviceSelect() {
  const device = useDevice();

  const setDevice = useSetDevice();
  const updateQuery = useUpdateWallpaperQuery();

  const onChangeDevice = (v: string) => {
    setDevice(v as DeviceType);
    updateQuery({ device: v });
  };
  return (
    <Select value={device} onValueChange={onChangeDevice}>
      <SelectTrigger className="w-full min-w-45">
        <Smartphone />
        <SelectValue placeholder="Select device" />
      </SelectTrigger>
      <SelectContent>
        {DEVICES.map((device) => (
          <SelectItem key={device.id} value={device.id}>
            {device.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
