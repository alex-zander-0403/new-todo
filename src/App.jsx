// import Todo from "./components/Todo";
// import { TasksProvider } from "./context/TasksContext";
import Router from "./Router";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";

function App() {
  const routes = {
    "/": TasksPage,
    "/tasks/123": TaskPage,
    "*": () => <div>404</div>,
  };

  return (
    // <TasksProvider>
    //   <Todo />
    // </TasksProvider>
    <Router routes={routes} />
  );
}

export default App;
