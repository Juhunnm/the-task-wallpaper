import supabase from "@/lib/supabase";
import type { Task } from "shared/types";

type UserTasksRow = {
  user_id: string;
  tasks: Task[];
};

function coerceTasks(v: any): Task[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((t) => t && typeof t.text === "string")
    .map((t) => ({
      id: Number(t.id),
      text: String(t.text),
      completed: Boolean(t.completed),
    }));
}

/**
 * ✅ 유저의 tasks 가져오기
 * - row 없으면 빈 배열 반환 (또는 자동 생성도 가능)
 */
export async function fetchTasksByUser(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("user_id, tasks")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return [];

  return coerceTasks(data.tasks);
}

/**
 * ✅ 덮어쓰기 저장: 유저당 1 row (upsert)
 */
export async function saveTasksByUser({
  userId,
  tasks,
}: {
  userId: string;
  tasks: Task[];
}) {
  const { error } = await supabase.from("tasks").upsert(
    {
      user_id: userId,
      tasks,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) throw error;
}
