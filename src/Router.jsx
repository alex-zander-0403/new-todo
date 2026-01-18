import { useEffect, useState } from "react";

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
  // обьект с {путями: соответствующими компонентами страниц}
  const { routes } = props;
  // актуальный путь из хука
  const path = useRoute();
  // создаем ссылку на компонент страницы
  const CurrentPage = routes[path] ?? routes["*"];

  return <CurrentPage />;
}

export default Router;
