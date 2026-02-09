import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

//
export const TasksContext = createContext({});

// глобальный провайдер
export function TasksProvider(props) {
  const { children } = props;

  // данные по задачам из useTasks
  const {
    tasks,
    filteredTasks,

    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    // newTaskTitle,
    // setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    dissapearingTaskId,
    appearingTaskId,
  } = useTasks();

  // данные скролла из useIncompleteTaskScroll
  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(tasks);

  // мемоизация
  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      // newTaskTitle,
      // setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      dissapearingTaskId,
      appearingTaskId,
      //
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    }),
    [
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      // newTaskTitle,
      // setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      dissapearingTaskId,
      appearingTaskId,
      //
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    ],
  );

  //
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
