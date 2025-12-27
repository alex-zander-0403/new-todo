import AddTaskForm from "./components/AddTaskForm";
import SearchTaskForm from "./components/SearchTaskForm";
import TodoInfo from "./components/TodoInfo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm />
      <SearchTaskForm />

      <TodoInfo />
      <TodoList />
    </div>
  );
}

export default App;
