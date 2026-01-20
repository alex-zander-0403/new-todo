import { useContext } from "react";
import { TasksContext } from "../../entities/todo";
import Field from "../../components/ui/Field/Field";

function SearchTaskForm(props) {
  const { styles } = props;

  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form
      className={styles.todo__form}
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        id="search-task"
        className={styles.todo__field}
        type="search"
        label="Search task"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
}

export default SearchTaskForm;
