import { fetchTasksByUser } from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export function useFetchTasksByUser(userId: string) {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => fetchTasksByUser(userId),
    enabled: !!userId,
  });
}
