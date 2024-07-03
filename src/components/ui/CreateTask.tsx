import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskService, createTaskSchema } from "@/services/task.service";
import { TextFild } from "./TextFild";
import { Button } from "./Button";

type Inputs = {
  desc: string;
};

export const CreateTask = ({ workspaceId }: { workspaceId: number }) => {
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFild
        type="text"
        placeholder="Task Description"
        name="Description of task"
        register={register("desc")}
        error={(errors.desc?.message && errors.desc?.message) as string}
      />
      <Button type="submit" value="Create Task" />
    </form>
  );
};
