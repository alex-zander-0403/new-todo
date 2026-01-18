// import Todo from "./components/Todo";
// import { TasksProvider } from "./context/TasksContext";
import Router from "./Router";
import MainPage from "./pages/MainPage";
import TaskPage from "./pages/TaskPage";

function App() {
  // список доступных путь путей
  const routes = {
    "/": MainPage,
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
