export const DEVICES = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    width: 440,
    height: 956,
  },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 402, height: 874 },
  { id: "iphone-16", name: "iPhone 16", width: 393, height: 852 },
  { id: "iphone-15", name: "iPhone 15", width: 393, height: 852 },
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667 },
] as const;

export type DeviceType = (typeof DEVICES)[number]["id"];

export const DEVICE_MAP = Object.fromEntries(
  DEVICES.map((d) => [d.id, { width: d.width, height: d.height }]),
) as Record<DeviceType, { width: number; height: number }>;
