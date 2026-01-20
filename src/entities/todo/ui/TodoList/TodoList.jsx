import { memo, useContext } from "react";
import { TasksContext } from "../../model/TasksContext";
import TodoItem from "../TodoItem/TodoItem";

function TodoList(props) {
  const { styles } = props;

  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredtask = filteredTasks?.length === 0;

  if (!hasTasks) {
    return (
      <div className={styles.todo__emptyMessage}>
        <span style={{ fontSize: 50 }}>😎</span>
        <br />
        Задач нет!
      </div>
    );
  }

  if (hasTasks && isEmptyFilteredtask) {
    return (
      <div className={styles.todo__emptyMessage}>
        <span style={{ fontSize: 50 }}>😐</span>
        <br />
        Ничего не найдено
      </div>
    );
  }

  return (
    <ul className={styles.todo__list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          key={task.id}
          className={styles.todo__item}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
