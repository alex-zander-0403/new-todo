import { useEffect, useState } from "react";
import TaskPage from "./pages/TaskPage";

// hook useRoute для хранения и определения пути
export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

// компонент роутер
function Router(props) {
  const { routes } = props; // обьект с {путями: соответствующими компонентами страниц}
  const path = useRoute(); // актуальный путь из хука

  // проверка наличия /task в пути
  if (path.startsWith("/tasks/")) {
    const id = path.replace("/tasks/", ""); // id из path
    const TaskPage = routes["/tasks/:id"]; // генерируем динамическую ссылку на страницу

    return <TaskPage params={{ id }} />; // возвращаем параметризированную страницу
  }

  const Page = routes[path] ?? routes["*"]; // возвращаем страницу или error page (*)

  return <Page />;
}

export default Router;
