import TodoItem from "./TodoItem";

function TodoList(props) {
  const { tasks = [], onDeleteTaskButtonClick, onTaskCompleteToggle } = props;

  const hasTasks = true;

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>;
  }

  

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          className="todo__item"
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteToggle={onTaskCompleteToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
