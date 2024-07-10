import { server } from "@/supabase/client";
import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string({
      message: "Name must be a string",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),

  // url or null
  logo: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      try {
        new URL(val);
        return val;
      } catch (error) {
        throw new Error("Logo must be a valid URL");
      }
    }),
});

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

  static async createWorkspace({
    name,
    logo,
  }: {
    name: string;
    logo: string | null;
  }) {
    const { data: session } = await server.auth.getUser();
    const { data, error } = await server
      .from("workspaces")
      .insert([{ name, creator: session.user?.id, logo }])
      .single();

    if (error) {
      console.error("Error al insertar el workspace:", error.message);
    } else {
      console.log("Nuevo workspace creado:", data);
    }

    return { data, error };
  }
}
