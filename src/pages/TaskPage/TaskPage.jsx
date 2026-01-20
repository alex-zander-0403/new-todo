import { useEffect, useState } from "react";
import tasksAPI from "../../shared/api/tasks";

function TaskPage(props) {
  const { params } = props;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(params.id)
      .then((taskData) => {
        setTask(taskData);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // экран загрузки
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  // экран ошибки
  if (error) {
    return <div>Ошибка: 404{error}</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      {task.isDone ? "Задача выполнена" : "Задача не выполнена"}
    </div>
  );
}

export default TaskPage;
