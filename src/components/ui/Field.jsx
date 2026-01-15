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
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <input
        className={`field__input ${error ? "is-invalid" : ""}`}
        id={id}
        type={type}
        placeholder=" "
        value={value}
        autoComplete="off"
        onChange={onChange}
        ref={ref}
      />
      {error && (
        <span className="field__error" title={error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;
