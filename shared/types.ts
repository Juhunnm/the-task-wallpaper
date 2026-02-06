import type { DeviceType } from "./devices";

export type Theme = "dark" | "light";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type RenderPayload = {
  device: DeviceType;
  theme: Theme;
  accentColor: string;
  showDate: boolean;
  showProgress: boolean;
  tasks: Task[];
};
