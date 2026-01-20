const BASEURL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

//
const tasksAPI = {
  getAll: () => {
    return fetch(BASEURL).then((res) => res.json());
    // console.log('Задачи загружены!');
  },

  getById: (id) => {
    return fetch(`${BASEURL}/${id}`, {
      method: "GET",
    }).then((res) => res.json());
    // console.log(`Задача ${taskId} загружена!`);
  },

  add: (task) => {
    return fetch(BASEURL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((res) => res.json());
    // console.log(`Задача ${newTask.title} - добавлена`);
  },

  delete: (id) => {
    return fetch(`${BASEURL}/${id}`, {
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
    return fetch(`${BASEURL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
    // console.log(`Задача ${taskId} сменмла статус!`);
  },
};

export default tasksAPI;
