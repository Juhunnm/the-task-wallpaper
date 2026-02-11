import { saveTasksByUser } from "@/api/task";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSaveTasksByUser(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: saveTasksByUser,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
