import { memo, useContext } from "react";
import TodoItem from "./TodoItem";
import { TasksContext } from "../context/TasksContext";

function TodoList() {
  const {
    tasks,
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,

    deleteTask,
    toggleTaskComplete,
  } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredtask = filteredTasks?.length === 0;

  if (!hasTasks) {
    return (
      <div className="todo__empty-message">
        <span style={{ fontSize: 50 }}>😎</span>
        <br />
        Задач нет!
      </div>
    );
  }

  if (hasTasks && isEmptyFilteredtask) {
    return (
      <div className="todo__empty-message">
        <span style={{ fontSize: 50 }}>😐</span>
        <br />
        Ничего не найдено
      </div>
    );
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          key={task.id}
          className="todo__item"
          ref={
            task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
          }
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onDeleteTaskButtonClick={deleteTask}
          onTaskCompleteToggle={toggleTaskComplete}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
