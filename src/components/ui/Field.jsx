function Field(props) {
  const {
    id,
    className = "",
    type = "text",
    label,
    value = "",
    onChange,
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
      />
    </div>
  );
}

export default Field;
