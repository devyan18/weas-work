import { useWorkspaces } from "@/providers/WorkspacesProvider";
import {
  Text,
  WorkspaceItem,
  Modal,
  useModal,
  CreateWorkspaceForm,
  BurgerIcon,
} from "@components/ui";
import { AddIcon, CloseIcon } from "@components/icons";
import { useLayout } from "@/providers/LayoutProvider";

type Props = {
  className?: string;
};

export const Sidebar = ({ className = "" }: Props) => {
  const { workspaces } = useWorkspaces();

  const { isOpen, open, close } = useModal();

  const { layout, toggleSidebar } = useLayout();

  return (
    <>
      <Modal open={isOpen} onClose={close} static>
        <div className="rounded-xl bg-primary text-white p-5 flex flex-col w-[320px]">
          <div className="flex flex-row justify-between items-center pb-3">
            <Text type="subtitle">Make a Workspace</Text>
            <button className="mt-1 hover:text-gray-400" onClick={close}>
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          <hr className="border-gray-500 pt-5" />
          <CreateWorkspaceForm close={close} />
        </div>
      </Modal>
      <div
        className={`bg-black-200 ${
          layout.viewSidebar ? "rounded-3xl" : "rounded-r-3xl"
        } p-5 ${className}`}
      >
        <div className="flex flex-row justify-between mb-2 items-center">
          <button
            className="hover:text-gray-400"
            onClick={() => {
              toggleSidebar();
            }}
          >
            <BurgerIcon />
          </button>
          {layout.viewSidebar && (
            <>
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
            </>
          )}
        </div>
        {layout.viewSidebar && (
          <>
            <hr className="border-gray-500" />
            <div className="pt-4">
              {workspaces.map((workspace) => (
                <WorkspaceItem workspace={workspace} key={workspace.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
