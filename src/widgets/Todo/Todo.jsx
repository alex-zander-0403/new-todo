import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import SearchTaskForm from "../../components/SearchTaskForm/SearchTaskForm";
import TodoInfo from "../../components/TodoInfo/TodoInfo";
import TodoList from "../../components/TodoList/TodoList";
import Button from "../../components/ui/Button/Button";
import styles from "./Todo.module.scss";

function Todo() {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className={styles.todo}>
      <h1 className={styles.todo__title}>To Do List</h1>

      <AddTaskForm styles={styles} />

      <SearchTaskForm styles={styles} />

      <TodoInfo styles={styles} />

      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Первая невыполненная
      </Button>

      <TodoList styles={styles} />

      <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Наверх
      </Button>
    </div>
  );
}

export default Todo;
