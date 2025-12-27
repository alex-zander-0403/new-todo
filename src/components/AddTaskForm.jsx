import Button from "./ui/Button";
import Field from "./ui/Field";

function AddTaskForm() {
  return (
    <form className="todo__form">
      <Field className="todo__field" id="new-task" label="New task title" />
      <Button />
    </form>
  );
}

export default AddTaskForm;
