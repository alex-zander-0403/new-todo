import styles from "./Button.module.scss";

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
      className={`${styles.button} ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
