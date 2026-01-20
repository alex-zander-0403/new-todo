import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import tasksAPI from "@/shared/api/tasks";
// import useLocalStorage from "./useLocalStorage";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }

    case "ADD": {
      return [...state, action.task];
    }

    case "TOGGLE_COMPLETE": {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }

    case "DELETE_ALL": {
      return [];
    }

    case "DELETE": {
      return state.filter((task) => task.id !== action.id);
    }

    default: {
      return state;
    }
  }
};

function useTasks() {
  // const { savedTasks, saveTasks } = useLocalStorage();

  const [tasks, dispatch] = useReducer(tasksReducer, []);
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
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: "DELETE_ALL" }));
    }
  }, [tasks]);

  // удалить задачу по id
  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDissapearingTaskId(taskId);
      setTimeout(() => {
        dispatch({ type: "DELETE", id: taskId });
        setDissapearingTaskId(null);
      }, 400);
    });
  }, []);

  // toggle выполнения задачи
  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI
      .toggleComplete(taskId, isDone)
      .then(() => dispatch({ type: "TOGGLE_COMPLETE", id: taskId, isDone }));
  }, []);

  // добавление
  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      title: newTaskTitle,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
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

    tasksAPI.getAll().then((data) => {
      dispatch({ type: "SET_ALL", tasks: data });
    });
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
