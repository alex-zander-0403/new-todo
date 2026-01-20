import { useEffect, useState } from "react";

// функция для извлечения динамического параметра
// path - фактический путь из URL ("/tasks/123")
// route - шаблон маршрута с параметрами ("/tasks/:id")
const matchPath = (path, route) => {
  const pathParts = path.split("/"); // "/tasks/123" => ["", "tasks", "123"]
  const routePaths = route.split("/"); // "/tasks/:id" => ["", "tasks", ":id"]

  // Проверка совпадения количества частей. Если разное количество сегментов Возвращаем null
  if (pathParts.length !== routePaths.length) {
    return null;
  }
  // cоздание объекта для хранения извлечённых параметров
  const params = {};

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(":")) {
      // получаем имя параметра без ":"
      const paramName = routePaths[i].slice(1);
      // записываем в params
      params[paramName] = pathParts[i];
    } else if (routePaths[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

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
  // if (path.startsWith("/tasks/")) {
  //   const id = path.replace("/tasks/", ""); // id из path
  //   const TaskPage = routes["/tasks/:id"]; // генерируем динамическую ссылку на страницу

  //   return <TaskPage params={{ id }} />; // возвращаем параметризированную страницу
  // }

  // const Page = routes[path] ?? routes["*"]; // возвращаем страницу или error page (*)
  // return <Page />;

  //
  for (const route in routes) {
    // попытка получения динамического параметра
    const params = matchPath(path, route);

    if (params) {
      const Page = routes[route];

      return <Page params={params} />;
    }
  }

  // возвращаем error page (*)
  const NotFound = routes["*"];

  // возвращаем error page (*)
  return <NotFound />;
}

export default Router;
