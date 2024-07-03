import { Task } from "@/services/task.service";

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {}}
            className="w-5 h-5"
          />
          <p>{task.desc}</p>
        </div>
      ))}
    </div>
  );
};
