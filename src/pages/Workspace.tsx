import { AddIcon, CloseIcon } from "@/components/icons";
import { Modal, Text, useModal } from "@/components/ui";
import { CreateTask } from "@/components/ui/CreateTask";
import { TaskList } from "@/components/ui/TaskList";
import { useLayout } from "@/providers/LayoutProvider";
import { Task, TaskService } from "@/services/task.service";
import { Workspace } from "@/services/workspace.service";
import { server } from "@/supabase/client";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

export const WorkspacePage = ({ workspace }: { workspace: Workspace }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isOpen, open, close } = useModal();

  const { layout } = useLayout();

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
        const actualTasks = await TaskService.getAll({
          workspaceId: workspace.id,
        });

        if (!actualTasks) return;

        setTasks(actualTasks);
      },
    )
    .subscribe();

  const handleChangeTasks = async (e: DragEndEvent) => {
    const { over, active } = e;
    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over?.id);

    const movedArray = arrayMove(tasks, oldIndex, newIndex);

    const newList = movedArray.map((task, index) => {
      return { ...task, order: index + 1 };
    });
    setTasks(newList);

    const { data, error } = await TaskService.reorderTasks({
      tasks: newList,
      workspaceId: workspace.id,
    });

    if (error) {
      console.error({ error });
      return;
    }

    console.log({ data });
  };

  return (
    <>
      <Modal open={isOpen} static onClose={close}>
        <div className="bg-primary p-5 rounded-lg text-white min-w-[400px]">
          <div className="flex flex-items justify-between">
            <Text type="subtitle" className="mb-2">
              Create a task
            </Text>
            <button onClick={close} className="hover:text-gray-400">
              <CloseIcon height={24} width={24} />
            </button>
          </div>
          <hr className="border-gray-500 py-2" />
          <CreateTask workspaceId={workspace.id} close={close} />
        </div>
      </Modal>
      <div className={`${layout.viewSidebar ? "p-5" : "p-8"}`}>
        <Text type="title" weight="bold">
          {workspace.name}
        </Text>
        <hr className="my-5 border-gray-600" />
        <div className="flex flex-row ">
          <div className="flex-[2]">
            <div className="flex flex-row items-center gap-4 pb-4">
              <Text type="subtitle">Tasks</Text>

              <button className="hover:text-gray-400" onClick={open}>
                <AddIcon height={20} width={20} />
              </button>
            </div>
            <TaskList tasks={tasks} handleChangeTasks={handleChangeTasks} />
          </div>
          <div className="flex-1">
            <Text type="subtitle">Links</Text>
          </div>
        </div>
      </div>
    </>
  );
};
