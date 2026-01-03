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
  // кол-во выполненных
  const done = tasks.filter((task) => task.isDone === true).length;

  // удалить задачу id
  const deleteTask = (taskId) => {
    console.log(`Удалить задачу ${taskId}`);
  };

  // удалить все задачи
  const deleteAllTasks = () => {
    console.log("Удалить все задачи!");
  };

  // toggle выполнения задачи
  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`Задача ${taskId} ${isDone ? "выполнена" : "активна"}`);
  };

  // поиск
  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`);
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm />
      <SearchTaskForm onSearch={filterTasks}/>

      <TodoInfo
        total={tasks.length}
        done={done}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteToggle={toggleTaskComplete}

      />
    </div>
  );
}

export default Todo;
