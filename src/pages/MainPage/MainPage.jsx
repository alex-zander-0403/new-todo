import { TasksProvider } from "../../context/TasksContext";
import Todo from "../../widgets/Todo";

function MainPage() {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
}

export default MainPage;
