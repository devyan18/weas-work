import { Task } from "@/services/task.service";
import { TaskItem } from "./TaskItem";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const TaskList = ({
  tasks,
  handleChangeTasks,
}: {
  tasks: Task[];
  handleChangeTasks: (event: DragEndEvent) => void;
}) => {
  const handleDragEnd = (e: DragEndEvent) => {
    console.log("Drag ended");
    handleChangeTasks(e);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className="flex flex-col gap-3">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};
