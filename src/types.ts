import { DEVICES } from "../shared/devices";

export type DeviceInfo = (typeof DEVICES)[number];

export type UseMutationCallback<T = void> = {
  onSuccess?: (data?: T) => void;
  onError?: (error: Error) => void;
};
