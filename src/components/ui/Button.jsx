function Button(props) {
  const {
    className = "",
    type = "button",
    onClick,
    isDisabled,
    children,
  } = props;

  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
