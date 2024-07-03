import { AddIcon } from "@/components/icons";
import { Modal, Text, useModal } from "@/components/ui";
import { CreateTask } from "@/components/ui/CreateTask";
import { TaskList } from "@/components/ui/TaskList";
import { Task, TaskService } from "@/services/task.service";
import { Workspace } from "@/services/workspace.services";
import { server } from "@/supabase/client";
import { useEffect, useState } from "react";

export const WorkspacePage = ({ workspace }: { workspace: Workspace }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isOpen, open, close } = useModal();

  useEffect(() => {
    (async () => {
      const tasks = await TaskService.getAll({
        workspaceId: workspace.id,
      });

      if (!tasks) return;

      setTasks(tasks);
    })();
  }, [workspace]);

  server
    .channel("tasks-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tasks",
      },
      async () => {
        const tasks = await TaskService.getAll({
          workspaceId: workspace.id,
        });

        if (!tasks) return;

        setTasks(tasks);
      },
    )
    .subscribe();

  return (
    <>
      <Modal open={isOpen} static={false} onClose={close}>
        <div className="bg-primary p-5 rounded-lg text-white">
          <CreateTask workspaceId={workspace.id} />
        </div>
      </Modal>
      <div className="p-5">
        <Text type="subtitle">{workspace.name}</Text>
        <hr className="my-5 border-gray-600" />
        <div className="flex flex-row ">
          <div className="flex-[2]">
            <div className="flex flex-row items-center gap-4 pb-4">
              <Text type="subtitle">Tasks</Text>

              <button className="hover:text-gray-400" onClick={open}>
                <AddIcon height={20} width={20} />
              </button>
            </div>
            <TaskList tasks={tasks} />
          </div>
          <div className="flex-1">
            <Text type="subtitle">Links</Text>
          </div>
        </div>
      </div>
    </>
  );
};
