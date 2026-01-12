import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import Field from "./ui/Field";

function SearchTaskForm() {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

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
