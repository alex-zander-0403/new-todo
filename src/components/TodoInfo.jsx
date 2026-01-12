import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../context/TasksContext";

function TodoInfo() {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const hasTasks = total > 0;

  // кол-во выполненных
  const done = useMemo(() => {
    return tasks.filter((task) => task.isDone === true).length;
  }, [tasks]);

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done: {done}/{total}
      </div>

      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
}

export default memo(TodoInfo);
