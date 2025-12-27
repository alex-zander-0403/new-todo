import TodoItem from "./TodoItem";

function TodoList() {
  const hasTasks = true;

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>;
  }

  return (
    <ul className="todo__list">
      <TodoItem
        className="todo__item"
        id="task-1"
        title="Встават"
        isDone={false}
      />
      <TodoItem
        className="todo__item"
        id="task-2"
        title="Пресс качат"
        isDone={false}
      />
      <TodoItem
        className="todo__item"
        id="task-3"
        title="Бегит"
        isDone={false}
      />
      <TodoItem
        className="todo__item"
        id="task-4"
        title="Анжуманя"
        isDone={false}
      />
    </ul>
  );
}

export default TodoList;
