import { TasksProvider } from "../../context/TasksContext";
import Todo from "../../components/Todo/Todo";

function MainPage() {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
}

export default MainPage;
