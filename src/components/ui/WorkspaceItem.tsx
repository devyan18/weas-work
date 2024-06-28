import { Workspace } from "@/services/workspace.services";
import { Link } from "@tanstack/react-router";

export const WorkspaceItem = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link
      to="/private/workspaces/$workspaceId"
      params={{ workspaceId: workspace.id.toString() }}
      className="flex flex-row items-center gap-2 cursor-pointer hover:bg-black-100 p-2 rounded-xl"
    >
      <img src={workspace.logo} alt={workspace.name} className="h-5" />
      <p key={workspace.id}>{workspace.name}</p>
    </Link>
  );
};
