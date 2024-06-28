import { useWorkspaces } from "@/providers/WorkspacesProvider";
import { Text, WorkspaceItem } from "@components/ui";

type Props = {
  className?: string;
};

export const Sidebar = ({ className = "" }: Props) => {
  const { workspaces } = useWorkspaces();

  return (
    <div className={`bg-black-200 rounded-3xl p-5 ${className}`}>
      <div className="flex flex-row justify-between mb-2 items-center">
        <Text type="body" weight="bold">
          My Workspaces
        </Text>
        <div className="flex flex-row gap-2"></div>
      </div>
      <hr className="border-gray-500" />
      <div className="pt-4">
        {workspaces.map((workspace) => (
          <WorkspaceItem workspace={workspace} key={workspace.id} />
        ))}
      </div>
    </div>
  );
};
