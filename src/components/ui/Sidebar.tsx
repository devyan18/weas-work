import { useWorkspaces } from "@/providers/WorkspacesProvider";
import {
  Text,
  WorkspaceItem,
  Modal,
  useModal,
  CreateWorkspaceForm,
} from "@components/ui";
import { AddIcon, CloseIcon } from "@components/icons";

type Props = {
  className?: string;
};

export const Sidebar = ({ className = "" }: Props) => {
  const { workspaces } = useWorkspaces();

  const { isOpen, open, close } = useModal();

  return (
    <>
      <Modal open={isOpen} onClose={close} static>
        <div className="rounded-xl bg-primary text-white p-5 flex flex-col gap-5 w-[300px]">
          <div className="flex flex-row justify-between items-center">
            <Text type="subtitle">New Workspace</Text>
            <button className="mt-1 hover:text-gray-400" onClick={close}>
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          <hr className="border-gray-500" />
          <CreateWorkspaceForm close={close} />
        </div>
      </Modal>
      <div
        className={`bg-black-200 rounded-3xl p-5 min-w-[240px] ${className}`}
      >
        <div className="flex flex-row justify-between mb-2 items-center">
          <Text type="body">My Workspaces</Text>
          <div className="flex flex-row gap-2">
            <button
              className="hover:text-gray-500 "
              onClick={() => {
                open();
              }}
            >
              <AddIcon width={20} height={20} className="mt-1" />
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
