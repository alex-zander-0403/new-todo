import Button from "./ui/Button";
import Field from "./ui/Field";

function AddTaskForm(prop) {
  const { addTask } = prop;

  // кастомный submit
  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field className="todo__field" id="new-task" label="New task title" />
      <Button type="submit">Add</Button>
    </form>
  );
}

export default AddTaskForm;
