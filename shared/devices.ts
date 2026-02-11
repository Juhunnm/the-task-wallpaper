export const DEVICES = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", width: 440, height: 956 },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 402, height: 874 },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", width: 430, height: 932 },
  { id: "iphone-16", name: "iPhone 16", width: 393, height: 852 },
  { id: "iphone-15", name: "iPhone 15", width: 393, height: 852 },
  { id: "iphone-14", name: "iPhone 14", width: 390, height: 844 },
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667 },
  { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", width: 412, height: 915 },
  { id: "galaxy-s25", name: "Galaxy S25", width: 360, height: 780 },
  { id: "pixel-9-pro", name: "Pixel 9 Pro", width: 412, height: 892 },
] as const;

export type DeviceType = (typeof DEVICES)[number]["id"];

export const DEVICE_MAP = Object.fromEntries(
  DEVICES.map((d) => [d.id, { width: d.width, height: d.height }]),
) as Record<DeviceType, { width: number; height: number }>;
