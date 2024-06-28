import { Button } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
import { WorkspaceService } from "@/services/workspace.services";

export const Homepage = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="p-5">
      <Button
        variant="primary"
        onClick={async () => {
          await WorkspaceService.addMember({
            workspaceId: 1,
            userId: "bd895b44-60a2-4d01-a0c7-a35df9fb492f",
          });
        }}
        value="Add member"
      />
    </div>
  );
};
