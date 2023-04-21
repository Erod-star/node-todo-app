const Task = require("./task");

class Tasks {
  get tasksArray() {
    const tasks = [];
    Object.keys(this._list).forEach((key) => tasks.push(this._list[key]));
    return tasks;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray(tasks) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listAllTasks() {
    Object.keys(this._list).forEach((key, i) => {
      const { desc, completedAt } = this._list[key];
      const idx = `${i + 1}.`.green;
      const isCompleted = `${completedAt ? "Completed".green : "Pending".red}`;

      console.log(`${idx} ${desc} :: ${isCompleted}`);
    });
  }

  listTasksByStatus(completed) {
    let counter = 0;
    Object.keys(this._list).forEach((key) => {
      const { desc, completedAt } = this._list[key];
      const isCompleted = `${completedAt ? "Completed".green : "Pending".red}`;

      if (completed) {
        if (completedAt) {
          counter += 1;
          console.log(
            `${(counter + ".").green} ${desc} :: ${completedAt.green}`
          );
        }
      } else {
        if (!completedAt) {
          counter += 1;
          console.log(`${(counter + ".").green} ${desc} :: ${isCompleted}`);
        }
      }
    });
  }

  deleteTaskById(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleCompletedTasks(ids) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });
    this.tasksArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
