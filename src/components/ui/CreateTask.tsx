import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskService, createTaskSchema } from "@/services/task.service";
import { TextFild } from "./TextFild";
import { Button } from "./Button";

type Inputs = {
  desc: string;
};

export const CreateTask = ({
  workspaceId,
  close,
}: {
  workspaceId: number;
  close: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ desc }) => {
    try {
      await TaskService.create({ desc, workspaceId });
    } catch (error) {
      console.error(error);
    } finally {
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <TextFild
        required
        type="text"
        placeholder="Scale level in luck"
        name="Description"
        description="Description of task"
        register={register("desc")}
        error={(errors.desc?.message && errors.desc?.message) as string}
      />
      <Button type="submit" value="Create" className="mt-4 self-start" />
    </form>
  );
};
