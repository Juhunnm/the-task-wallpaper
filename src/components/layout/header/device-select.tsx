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
export default function DeviceSelect() {
  const device = useDevice();

  const setDevice = useSetDevice();
  return (
    <Select value={device} onValueChange={(v) => setDevice(v as DeviceType)}>
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
