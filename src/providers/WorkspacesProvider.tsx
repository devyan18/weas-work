import { WorkspaceService, Workspace } from "@/services/workspace.service";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

type IWorkspaceContext = {
  workspaces: Workspace[];
  refreshWorkspaces: () => void;
};

const WorkspacesContext = createContext<IWorkspaceContext>({
  workspaces: [],
  refreshWorkspaces: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const WorkspacesProvider = (props: Props) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    WorkspaceService.getAll().then(setWorkspaces);
  }, [user]);

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces,
        refreshWorkspaces: () => {
          if (!user) return;
          WorkspaceService.getAll().then(setWorkspaces);
        },
      }}
    >
      {props.children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspaces = () => useContext(WorkspacesContext);
