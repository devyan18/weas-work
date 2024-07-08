import { Task, TaskService } from "@/services/task.service";
import { useState } from "react";
import { CloseIcon, LoadingIcon, ViewIcon } from "@components/icons";
import { Button, Modal, useModal, Text } from "@/components/ui";
import { Checker } from "./Checker";
import { DragIcon } from "../icons/DragIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, toggle, close } = useModal();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <Modal open={isOpen} onClose={close} static>
        <div className="w-[800px] h-[600px] rounded-xl bg-primary p-5">
          <div className="pb-2 flex items-center justify-between">
            <Text type="subtitle">Task Details</Text>
            <button
              className="text-white hover:text-gray-400 w-[30px]"
              onClick={() => close()}
            >
              <CloseIcon width={24} height={24} />
            </button>
          </div>
          <hr className="border-gray-500 py-2" />
          <Button
            onClick={() => close()}
            value="Close Modal"
            variant="primary"
          />
        </div>
      </Modal>
      <div
        ref={setNodeRef}
        {...attributes}
        style={styles}
        className="p-2 pl-0 px-4 bg-black-100 rounded-xl w-72 hover:bg-primary cursor-pointer"
      >
        <div className="flex flex-row items-center gap-4 w-full justify-between">
          <div
            className="flex flex-row truncate gap-2 items-center"
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
            <button
              {...listeners}
              className="text-gray-400 hover:text-gray-500 transition-all active:text-gray-600 flex items-center justify-center min-w-[30px]"
              onClick={(e) => e.stopPropagation()}
            >
              <DragIcon />
            </button>
            <div className="active:transition-transform active:scale-90 cursor-pointer flex flex-row items-center">
              {isLoading ? (
                <LoadingIcon width={24} height={24} />
              ) : (
                <Checker
                  startCheck={task.completed}
                  className={`${task.completed ? "text-blue-400" : "text-blue-200"}`}
                />
              )}
            </div>
            <Text
              truncate
              type="info"
              color={task.completed ? "secondary" : "primary"}
              // texto tachado
              className={`${task.completed ? "line-through" : ""}`}
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
