import Field from "./ui/Field";

function SearchTaskForm(props) {
  const { onSearch } = props;

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        className="todo__field"
        id="search-task"
        label="Search task"
        type="search"
        onChange={(event) => onSearch(event.target.value)}
      />
    </form>
  );
}

export default SearchTaskForm;
