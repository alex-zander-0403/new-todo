function Field(props) {
  const {
    className = "",
    id,
    type = "text",
    label,
    value = "",
    onChange,
    ref,
  } = props;

  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="field__input"
        id={id}
        type={type}
        placeholder=" "
        value={value}
        autoComplete="off"
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
}

export default Field;
