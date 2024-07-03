import { WorkspaceService } from "@/services/workspace.services";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LayoutPage } from "@/components/layouts/LayoutPage";
import { server } from "@/supabase/client";
import { useEffect, useState } from "react";
import { TaskItem } from "@/components/ui";
import { Task, TaskService } from "@/services/task.service";

export const Route = createFileRoute("/private/workspaces/$workspaceId")({
  loader: async ({ params }) => {
    const { workspaceId } = params;

    const data = await WorkspaceService.getById({
      workspaceId: +workspaceId,
    });

    if (!data) {
      throw redirect({ to: "/private/home" });
    }

    return {
      workspaceInfo: data,
    };
  },
  component: () => (
    <LayoutPage>
      <WorkspaceComponent />
    </LayoutPage>
  ),
});

function WorkspaceComponent() {
  const { workspaceInfo } = Route.useLoaderData();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const tasks = await TaskService.getAll({
        workspaceId: workspaceInfo.id,
      });

      if (!tasks) return;

      setTasks(tasks);
    })();
  }, [workspaceInfo]);

  server
    .channel("tasks-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tasks",
      },
      async () => {
        const tasks = await TaskService.getAll({
          workspaceId: workspaceInfo.id,
        });

        if (!tasks) return;

        setTasks(tasks);
      },
    )
    .subscribe();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{workspaceInfo.name}</h1>
      <p className="text-gray-500">{workspaceInfo.creator}</p>
      <p className="text-gray-500">{workspaceInfo.created_at}</p>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
