import { WorkspaceService } from "@/services/workspace.services";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LayoutPage } from "@/components/layouts/LayoutPage";
import { server } from "@/supabase/client";
import { useEffect, useState } from "react";

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

type Task = {
  id: number;
  creator: string;
  desc: string;
  completed: boolean;
};

function WorkspaceComponent() {
  const { workspaceInfo } = Route.useLoaderData();

  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await server.from("tasks").select("*");
      console.log({ tasks: data });
      if (!data) {
        console.log({ error });
        return;
      }
      setData(data as Task[]);
    }
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{workspaceInfo.name}</h1>
      <p className="text-gray-500">{workspaceInfo.creator}</p>
      <p className="text-gray-500">{workspaceInfo.created_at}</p>

      {data.map((task) => {
        return (
          <div key={task.id} className="p-2">
            <p>{task.desc}</p>
            <p>{task.completed ? "Completed" : "Not completed"}</p>
          </div>
        );
      })}
    </div>
  );
}
