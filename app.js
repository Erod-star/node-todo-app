require("colors");

const {
  inquirerMenu,
  menuStop,
  readInput,
  beforeDeleteTaskPrompt,
  confirmPrompt,
  beforeCompleteTaskPrompt,
} = require("./helpers/inquirer");
const { saveInfo, readInfo } = require("./helpers/dummyDatabase");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const databaseTasks = readInfo();

  if (databaseTasks) {
    tasks.loadTasksFromArray(databaseTasks);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // * Create task
        const desc = await readInput("Description:");
        tasks.createTask(desc);
        break;
      case "2": // * List tasks
        tasks.listAllTasks();
        break;
      case "3": // * List completed tasks
        tasks.listTasksByStatus(true);
        break;
      case "4": // * List pending tasks
        tasks.listTasksByStatus(false);
        break;
      case "5": // * Complete task(s)
        const completedIds = await beforeCompleteTaskPrompt(tasks.tasksArray);
        tasks.toggleCompletedTasks(completedIds);
        break;
      case "6": // * Delete task(s)
        const id = await beforeDeleteTaskPrompt(tasks.tasksArray);
        if (id !== "0") {
          const isSure = await confirmPrompt();
          if (isSure) {
            tasks.deleteTaskById(id);
            console.log("Task deleted!".green);
          }
        }
        break;
    }

    saveInfo(JSON.stringify(tasks.tasksArray));

    await menuStop();
  } while (opt !== "0");
};

main();
