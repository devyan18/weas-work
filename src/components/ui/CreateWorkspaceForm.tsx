import { useWorkspaces } from "@/providers/WorkspacesProvider";
import {
  WorkspaceService,
  createWorkspaceSchema,
} from "@/services/workspace.service";
import { Button, TextFild } from "@components/ui";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type Inputs = {
  name: string;
  logo: string | null;
};

export const CreateWorkspaceForm = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const { refreshWorkspaces } = useWorkspaces();

  const onSubmit: SubmitHandler<Inputs> = async ({ name, logo }: Inputs) => {
    try {
      await WorkspaceService.createWorkspace({ name, logo: logo || null });
    } catch (error) {
      console.error(error);
    } finally {
      refreshWorkspaces();
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextFild
        required
        type="text"
        name="name"
        placeholder="Workspace Name"
        register={register("name")}
        error={(errors.name?.message && errors.name?.message) as string}
      />
      <TextFild
        type="url"
        name="logo"
        placeholder="https://www.logo.jpg"
        register={register("logo")}
        error={(errors.logo?.message && errors.logo?.message) as string}
      />
      <div className="h-2"></div>
      <Button value="Create" />
    </form>
  );
};
