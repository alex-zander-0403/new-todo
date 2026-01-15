import { useContext, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import Button from "./ui/Button";
import Field from "./ui/Field";

function AddTaskForm() {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const [error, setError] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  // кастомный submit
  const onSubmit = (event) => {
    event.preventDefault();

    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle);
    }
  };

  const onInputChange = (e) => {
    const { value } = e.target;

    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "Не может быть пустым" : "");
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        id="new-task"
        label="New task title"
        value={newTaskTitle}
        error={error}
        ref={newTaskInputRef}
        onChange={onInputChange}
      />

      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        +
      </Button>
    </form>
  );
}

export default AddTaskForm;
