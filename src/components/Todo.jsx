import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

// mock data
const tasks = [
  { id: "task-1", title: "Встават", isDone: true },
  { id: "task-2", title: "Бегит", isDone: true },
  { id: "task-3", title: "Пресс качат", isDone: false },
  { id: "task-4", title: "Анжуманя", isDone: false },
];

function Todo() {
  const done = tasks.filter((task) => task.isDone === true).length; // кол-во выполненных

  const deleteAllTasks = () => {
    console.log("deleteAllTasks");
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm />
      <SearchTaskForm />

      <TodoInfo
        total={tasks.length}
        done={done}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList tasks={tasks} />
    </div>
  );
}

export default Todo;
