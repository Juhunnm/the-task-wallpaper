import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine, persist } from "zustand/middleware";

type DeviceType =
  | "iphone-16-pro-max"
  | "iphone-16-pro"
  | "iphone-16"
  | "iphone-15"
  | "iphone-se";

interface DeviceInfo {
  name: string;
  width: number;
  height: number;
}

export const DEVICES: Record<DeviceType, DeviceInfo> = {
  "iphone-16-pro-max": { name: "iPhone 16 Pro Max", width: 440, height: 956 },
  "iphone-16-pro": { name: "iPhone 16 Pro", width: 402, height: 874 },
  "iphone-16": { name: "iPhone 16", width: 393, height: 852 },
  "iphone-15": { name: "iPhone 15", width: 393, height: 852 },
  "iphone-se": { name: "iPhone SE", width: 375, height: 667 },
};

export type Theme = "dark" | "light";

interface DesignSettings {
  mode: Theme;
  accentColor: string;
  showDate: boolean;
  showProgress: boolean;
}
interface SettingsState {
  device: DeviceType;
  design: DesignSettings;
}

const initialState: SettingsState = {
  device: "iphone-16-pro",
  design: {
    mode: "dark",
    accentColor: "#FFFFFF",
    showDate: false,
    showProgress: true,
  },
};
const useSettingStore = create(
  persist(
    immer(
      combine(initialState, (set) => ({
        actions: {
          setMode: (mode: Theme) => {
            const root = document.documentElement;
            root.classList.remove("dark", "light");
            root.classList.add(mode);

            set((state) => {
              state.design.mode = mode;
            });
          },

          setDevice: (device: DeviceType) =>
            set((state) => {
              state.device = device;
            }),
          setDesign: (patch: Partial<DesignSettings>) =>
            set((state) => {
              state.design = { ...state.design, ...patch };
            }),
          setToggle: (key: "showDate" | "showProgress", value: boolean) =>
            set((state) => {
              state.design[key] = value;
            }),
        },
      })),
    ),
    {
      name: "settings-storage",
      partialize: (state) => ({
        device: state.device,
        design: state.design,
      }),
    },
  ),
);
export const useThemeMode = () => {
  const themeMode = useSettingStore((store) => store.design.mode);
  return themeMode;
};

export const useAccentColor = () => {
  const accentColor = useSettingStore((store) => store.design.accentColor);
  return accentColor;
};
export const useShowDate = () => {
  const showDate = useSettingStore((store) => store.design.showDate);
  return showDate;
};
export const useShowProgress = () => {
  const showProgress = useSettingStore((store) => store.design.showProgress);
  return showProgress;
};

// func
export const useSetThemeMode = () => {
  const setThemeMode = useSettingStore((store) => store.actions.setMode);
  return setThemeMode;
};

export const useSetDesign = () => {
  const setDesign = useSettingStore((store) => store.actions.setDesign);
  return setDesign;
};

export const useSetToggle = () => {
  const setToggle = useSettingStore((store) => store.actions.setToggle);
  return setToggle;
};
