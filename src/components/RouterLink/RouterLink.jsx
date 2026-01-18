function RouterLink(props) {
  const { to, children, ...rest } = props;

  const handleClick = (event) => {
    event.preventDefault();
    // меняем url браузера без перезагрузки
    window.history.pushState({}, "", to);
    // вручную генерируем событие popstate для обновления и срабатывания роутера
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export default RouterLink;
