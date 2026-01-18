import { TasksProvider } from "../context/TasksContext";
import Todo from "../components/Todo";

function MainPage() {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
}

export default MainPage;
