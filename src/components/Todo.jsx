import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./ui/Button";
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";

function Todo() {
  const { firstIncompleteTaskRef } = useIncompleteTaskScroll();

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm />

      <SearchTaskForm />

      <TodoInfo />

      <Button
        onClick={() => {
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        Первая невыполненная
      </Button>

      <TodoList />

      <Button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Наверх
      </Button>
    </div>
  );
}

export default Todo;
