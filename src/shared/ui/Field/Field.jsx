import styles from "./Field.module.scss";

function Field(props) {
  const {
    className = "",
    id,
    type = "text",
    label,
    value = "",
    error,
    ref,
    onChange,
  } = props;

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>

      <input
        className={`${styles.field__input} ${error ? styles.isInvalid : ""}`}
        id={id}
        type={type}
        placeholder=" "
        value={value}
        autoComplete="off"
        onChange={onChange}
        ref={ref}
      />
      {error && (
        <span className={styles.field__error} title={error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;
