import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TasksContext } from "../context/TasksContext";

import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./ui/Button";

function Todo() {
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

  // ---

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
      }}
    >
      <div className="todo">
        <h1 className="todo__title">To Do List</h1>

        <AddTaskForm
          addTask={addTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          newTaskInputRef={newTaskInputRef}
        />

        <SearchTaskForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TodoInfo />

        <Button
          onClick={() => {
            firstIncompleteTaskRef.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Первая невыполненная
        </Button>

        <TodoList
        // tasks={tasks}
        // filteredTasks={filteredTasks}
        // firstIncompleteTaskRef={firstIncompleteTaskRef}
        // firstIncompleteTaskId={firstIncompleteTaskId}
        // onDeleteTaskButtonClick={deleteTask}
        // onTaskCompleteToggle={toggleTaskComplete}
        />

        <Button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Наверх
        </Button>
      </div>
    </TasksContext.Provider>
  );
}

export default Todo;
