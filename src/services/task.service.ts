import { server } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import z from "zod";

export type Task = {
  id: number;
  creator: User[];
  desc: string;
  completed: boolean;
  created_at: string;
};

export const createTaskSchema = z.object({
  desc: z
    .string({
      message: "Description must be a string",
    })
    .min(3, {
      message: "Description must be at least 3 characters long",
    }),
});

export class TaskService {
  static async getAll({ workspaceId }: { workspaceId: number | string }) {
    const { data } = await server
      .from("tasks")
      .select("*")
      .eq("workspace", workspaceId)
      .order("created_at", { ascending: false });

    if (!data) return [];

    return data as Task[];
  }

  static async create({
    desc,
    workspaceId,
  }: {
    desc: string;
    workspaceId: number;
  }) {
    const { data: session } = await server.auth.getUser();
    if (!session) return;

    console.log({
      desc,
      workspaceId,
      creator: session.user?.id,
    });

    const { data } = await server
      .from("tasks")
      .insert([{ desc, workspace: workspaceId, creator: session.user?.id }]);

    return data;
  }

  static async toggleCompleted({
    taskId,
    actualCompletedStatus,
  }: {
    taskId: string | number;
    actualCompletedStatus: boolean;
  }) {
    const { data } = await server
      .from("tasks")
      .update({ completed: !actualCompletedStatus })
      .eq("id", taskId);

    return data;
  }

  // static async update(task: Task) {
  //   return await server.from("tasks").update([task]);
  // }

  // static async delete(task: Task) {
  //   return await server.from("tasks").delete().eq("id", task.id);
  // }
}
