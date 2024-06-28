import { server } from "@/supabase/client";

export type Workspace = {
  id: number;
  name: string;
  logo: string;
  created_at: string;
  creator: string;
};

export class WorkspaceService {
  static async getAll() {
    const { data: matcher, error } = await server
      .from("workspace_users")
      .select("*");

    if (!matcher || error) return [];

    const matcherIds = matcher.map((m) => m.workspace);

    const { data } = await server
      .from("workspaces")
      .select("*")
      .in("id", matcherIds);

    console.log(data);

    return data as Workspace[];
  }

  static async addMember({
    workspaceId,
    userId,
  }: {
    workspaceId: number;
    userId: string;
  }) {
    const { data, error } = await server
      .from("workspace_users")
      .insert({ workspace: workspaceId, user: userId });

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  static async getById({ workspaceId }: { workspaceId: number }) {
    const { data, error } = await server
      .from("workspaces")
      .select("*")
      .eq("id", workspaceId);

    if (error) {
      console.error(error);
      return null;
    }

    return data[0] as Workspace;
  }
}
