import { createContext } from "react";
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

    newTaskTitle,
    setNewTaskTitle,
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

  //
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
        dissapearingTaskId,
        appearingTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
