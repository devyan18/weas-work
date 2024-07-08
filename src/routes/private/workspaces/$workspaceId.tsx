import { WorkspaceService } from "@/services/workspace.service";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LayoutPage } from "@/components/layouts/LayoutPage";
import { WorkspacePage } from "@/pages/Workspace";

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

  return <WorkspacePage workspace={workspaceInfo} />;
}
