import { useState, useEffect } from "react";

import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

// mock data
const myTasks = [
  { id: "task-1", title: "Встават", isDone: true },
  { id: "task-2", title: "Бегит", isDone: true },
  { id: "task-3", title: "Пресс качат", isDone: false },
  { id: "task-4", title: "Анжуманя", isDone: false },
];

// ----------------------------------------------------

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // console.log("searchQuery", searchQuery);

  // ---

  // кол-во выполненных
  const done = tasks.filter((task) => task.isDone === true).length;

  // удалить задачу по id
  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(filteredTasks);
    console.log(`Задача ${taskId} удалена!`);
  };

  // удалить все задачи
  const deleteAllTasks = () => {
    const isConfirm = confirm("Удалить все задачи?!");

    if (!isConfirm) return;

    setTasks([]);
    console.log("Все задачи удалены!!!");
  };

  // toggle выполнения задачи
  const toggleTaskComplete = (taskId, isDone) => {
    const changedTasks = tasks.map((task) => {
      return task.id === taskId ? { ...task, isDone } : task;
    });

    setTasks(changedTasks);

    console.log(`Задача ${taskId} ${isDone}`);
  };

  // submit
  const addTask = () => {
    if (!newTaskTitle.trim().length) return;

    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString,
      title: newTaskTitle,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");

    console.log(`Задача ${newTaskTitle} создана`);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(clearSearchQuery)
        )
      : null;

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />

      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <TodoInfo
        total={tasks.length}
        done={done}
        onDeleteAllButtonClick={deleteAllTasks}
      />

      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteToggle={toggleTaskComplete}
      />
    </div>
  );
}

export default Todo;
