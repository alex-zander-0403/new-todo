import Router from "./routing/Router";
import MainPage from "../pages/MainPage";
import TaskPage from "../pages/TaskPage";
import "./styles";

function App() {
  // список доступных путей
  const routes = {
    "/": MainPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404</div>,
  };

  return <Router routes={routes} />;
}

export default App;
