import { Task, TaskService } from "@/services/task.service";
import { useState } from "react";
import {
  LoadingIcon,
  ViewIcon,
  CheckIcon,
  CheckedIcon,
} from "@components/icons";
import { Button, Modal, useModal, Text } from "@/components/ui";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, toggle, close } = useModal();

  return (
    <>
      <Modal open={isOpen} onClose={close}>
        <div className="w-[800px] h-[600px] rounded-xl bg-primary">
          <h1>hola mundo</h1>
          <Button
            onClick={() => close()}
            value="Close Modal"
            variant="primary"
          />
        </div>
      </Modal>
      <div className="p-2 px-4 bg-black-100 rounded-xl w-72 hover:bg-primary cursor-pointer">
        <div className="flex flex-row items-center gap-4 w-full justify-between">
          <div className="flex flex-row truncate gap-2">
            <div
              className="active:transition-transform active:scale-90 cursor-pointer"
              onClick={async () => {
                setLoading(true);
                try {
                  await TaskService.toggleCompleted({
                    taskId: task.id,
                    actualCompletedStatus: task.completed,
                  });
                } catch (error) {
                  console.error(error);
                } finally {
                  setTimeout(() => {
                    setLoading(false);
                  }, 500);
                }
              }}
            >
              {isLoading ? (
                <LoadingIcon width={20} height={20} />
              ) : task.completed ? (
                <CheckedIcon
                  className=" text-secondary-100 "
                  width={20}
                  height={20}
                />
              ) : (
                <CheckIcon className="bg-transparent" width={20} height={20} />
              )}
            </div>
            <Text
              truncate
              type="info"
              color={task.completed ? "primary" : "secondary"}
            >
              {task.desc}
            </Text>
          </div>

          <div
            className="hover:text-blue-200 transition-all active:text-blue-400"
            onClick={() => {
              toggle();
            }}
          >
            <ViewIcon />
          </div>
        </div>
      </div>
    </>
  );
};
