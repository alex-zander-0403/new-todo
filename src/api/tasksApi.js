const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

//
const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((res) => res.json());
    // console.log('Задачи загружены!');
  },

  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((res) => res.json());
    // console.log(`Задача ${newTask.title} - добавлена`);
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    // console.log(`Задача ${taskId} удалена!`);
  },

  deleteAll: (tasks) => {
    return Promise.all(
      tasks.map((task) => {
        tasksAPI.delete(task.id);
      })
    );
    // console.log("Все задачи удалены!!!");
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
    // console.log(`Задача ${taskId} сменмла статус!`);
  },
};

export default tasksAPI;
