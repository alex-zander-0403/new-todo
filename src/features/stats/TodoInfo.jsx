import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../../context/TasksContext";

function TodoInfo(props) {
  const { styles } = props;

  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const hasTasks = total > 0;

  // кол-во выполненных
  const done = useMemo(() => {
    return tasks.filter((task) => task.isDone === true).length;
  }, [tasks]);

  return (
    <div className={styles.todo__info}>
      <div className={styles.todo__totalTasks}>
        Done: {done}/{total}
      </div>

      {hasTasks && (
        <button
          className={styles.todo__deleteAllButton}
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
