import Field from "./ui/Field";

function SearchTaskForm(props) {
  const { searchQuery, setSearchQuery } = props;

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        id="search-task"
        className="todo__field"
        type="search"
        label="Search task"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
}

export default SearchTaskForm;
