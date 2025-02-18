import { Workspace } from "@/services/workspace.service";
import { Link } from "@tanstack/react-router";
import { WorkspaceUnknownLogo } from "./WorkspaceUnknownLogo";
import { Text } from "@/components/ui";

export const WorkspaceItem = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link
      to="/private/workspaces/$workspaceId"
      params={{ workspaceId: workspace.id.toString() }}
      className={`flex flex-row items-center gap-2 cursor-pointer hover:bg-black-100 p-2 rounded-lg justify-start w-full [&.active]:bg-primary [&.active]:text-secondary-200`}
    >
      {workspace.logo ? (
        <img
          src={workspace.logo}
          alt={workspace.name}
          className="h-6 w-6 rounded-lg"
        />
      ) : (
        <WorkspaceUnknownLogo workspaceName={workspace.name} />
      )}
      <Text key={workspace.id} type="info" truncate>
        {workspace.name}
      </Text>
    </Link>
  );
};
