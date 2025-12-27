function Field(props) {
  const { className = "", id, label, type = "text" } = props;

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
      />
    </div>
  );
}

export default Field;
