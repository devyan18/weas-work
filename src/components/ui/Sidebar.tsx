import { useWorkspaces } from "@/providers/WorkspacesProvider";
import { Button, Text, WorkspaceItem } from "@components/ui";
import { AddIcon } from "../icons/AddIcon";
import { Modal, useModal } from "./Modal";
import { WorkspaceService } from "@/services/workspace.services";

type Props = {
  className?: string;
};

export const Sidebar = ({ className = "" }: Props) => {
  const { workspaces, refreshWorkspaces } = useWorkspaces();

  const { isOpen, open, close } = useModal();

  return (
    <>
      <Modal open={isOpen} onClose={close} static>
        <div className="w-[800px] h-[600px] rounded-xl bg-primary text-white p-5">
          <Text type="title">hola mundo</Text>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData(e.target as HTMLFormElement);

              const name = formData.get("name") as string;

              if (!name) return;

              try {
                await WorkspaceService.createWorkspace({ name });
              } catch (error) {
                console.error(error);
              } finally {
                refreshWorkspaces();
                close();
              }
            }}
          >
            <input
              type="text"
              name="name"
              className="bg-black-100 outline-none px-2 rounded-lg "
            />
            <Button value="Create" />
            <Button
              value="Cancel"
              variant="secondary"
              onClick={() => close()}
            />
          </form>
        </div>
      </Modal>
      <div className={`bg-black-200 rounded-3xl p-5 ${className}`}>
        <div className="flex flex-row justify-between mb-2 items-center">
          <Text type="subtitle">My Workspaces</Text>
          <div className="flex flex-row gap-2">
            <button
              className="hover:text-gray-500 "
              onClick={() => {
                open();
              }}
            >
              <AddIcon width={18} height={18} />
            </button>
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="pt-4">
          {workspaces.map((workspace) => (
            <WorkspaceItem workspace={workspace} key={workspace.id} />
          ))}
        </div>
      </div>
    </>
  );
};
