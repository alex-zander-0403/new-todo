import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import useLocalStorage from "./useLocalStorage";

function useTasks() {
  // const { savedTasks, saveTasks } = useLocalStorage();

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  // ----------

  // удалить все задачи
  const deleteAllTasks = useCallback(() => {
    const isConfirm = confirm("Удалить все задачи?!");

    if (isConfirm) {
      setTasks([]);

      Promise.all(
        tasks.map((task) => {
          fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "DELETE",
          }).then(() => setTasks([]));
          // console.log("Все задачи удалены!!!");
        })
      );
    }
  }, []);

  // удалить задачу по id
  const deleteTask = useCallback(
    (taskId) => {
      fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      }).then(() => setTasks(tasks.filter((task) => task.id !== taskId)));

      // console.log(`Задача ${taskId} удалена!`);
    },
    [tasks]
  );

  // toggle выполнения задачи
  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      const changedTasks = tasks.map((task) => {
        return task.id === taskId ? { ...task, isDone } : task;
      });

      setTasks(changedTasks);
      // console.log(`Задача ${taskId} ${isDone}`);
    },
    [tasks]
  );

  // добавление
  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      title: newTaskTitle,
      isDone: false,
    };

    fetch(`http://localhost:3001/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((addedTask) => {
        setTasks((prev) => [...prev, addedTask]);
        setNewTaskTitle("");
        setSearchQuery("");
        newTaskInputRef.current.focus();
      });

    // console.log(`Задача ${newTask.title} - добавлена`);
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    fetch(`http://localhost:3001/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // новый массив после фильтрации
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(clearSearchQuery)
        )
      : null;
  }, [tasks, searchQuery]);

  return {
    tasks,
    filteredTasks,

    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
}

export default useTasks;
