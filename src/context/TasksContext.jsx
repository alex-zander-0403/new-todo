import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const TasksContext = createContext({});

export function TasksProvider(props) {
  const { children } = props;

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
      return [];
    }

    return JSON.parse(savedTasks);
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

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

  // submit
  const addTask = useCallback(() => {
    if (!newTaskTitle.trim().length) return;

    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString,
      title: newTaskTitle,
      isDone: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current.focus();
  }, [newTaskTitle]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,

        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
