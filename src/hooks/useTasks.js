import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";

function useTasks() {
  const { savedTasks, saveTasks } = useLocalStorage();

  const [tasks, setTasks] = useState(savedTasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  // ----------

  // удалить все задачи
  const deleteAllTasks = useCallback(() => {
    const isConfirm = confirm("Удалить все задачи?!");

    if (!isConfirm) return;

    setTasks([]);
    // console.log("Все задачи удалены!!!");
  }, []);

  // удалить задачу по id
  const deleteTask = useCallback(
    (taskId) => {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);

      setTasks(filteredTasks);
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
      id: crypto?.randomUUID() ?? Date.now().toString,
      title: newTaskTitle,
      isDone: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current.focus();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
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
