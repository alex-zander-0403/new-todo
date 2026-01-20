import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import tasksAPI from "@/shared/api/tasks";
// import useLocalStorage from "./useLocalStorage";

function useTasks() {
  // const { savedTasks, saveTasks } = useLocalStorage();

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dissapearingTaskId, setDissapearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  // ----------

  // удалить все задачи
  const deleteAllTasks = useCallback(() => {
    const isConfirm = confirm("Удалить все задачи?!");

    if (isConfirm) {
      tasksAPI.deleteAll(tasks).then(() => setTasks([]));
    }
  }, [tasks]);

  // получение по id
  // const getTask = useCallback(
  //   (taskId) => {
  //     tasksAPI
  //       .get(taskId)
  //       .then(() => setTasks(tasks.filter((task) => task.id !== taskId)));
  //   },
  //   [tasks]
  // );

  // удалить задачу по id
  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setDissapearingTaskId(taskId);
        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          setDissapearingTaskId(null);
        }, 400);
      });
    },
    [tasks],
  );

  // toggle выполнения задачи
  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() =>
        setTasks(
          tasks.map((task) => {
            return task.id === taskId ? { ...task, isDone } : task;
          }),
        ),
      );
    },
    [tasks],
  );

  // добавление
  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      title: newTaskTitle,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prev) => [...prev, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();

      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });

    // console.log(`Задача ${newTask.title} - добавлена`);
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll().then(setTasks);
  }, []);

  // новый массив после фильтрации
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [tasks, searchQuery]);

  return {
    tasks,
    filteredTasks,

    // getTask,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    dissapearingTaskId,
    appearingTaskId,
  };
}

export default useTasks;
