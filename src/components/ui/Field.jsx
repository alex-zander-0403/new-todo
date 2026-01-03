function Field(props) {
  const { className = "", id, label, type = "text", onChange } = props;

  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="field__input"
        type={type}
        id={id}
        placeholder=" "
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
}

export default Field;
