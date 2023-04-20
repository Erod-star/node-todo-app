require("colors");

const { inquirerMenu, menuStop, readInput } = require("./helpers/inquirer");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // Create task
        const desc = await readInput("Description:");
        console.log(desc);
        break;
      case "2":
        // List tasks
        console.log(tasks._list);
        break;
    }

    await menuStop();
  } while (opt !== "0");

  //   stop();
};

main();
