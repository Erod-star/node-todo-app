const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you wanna do?",
    choices: [
      { value: "1", name: "1. Create task" },
      { value: "2", name: "2. List tasks" },
      { value: "3", name: "3. List completed tasks" },
      { value: "4", name: "4. List pending tasks" },
      { value: "5", name: "5. Complete task(s)" },
      { value: "6", name: "6. Delete tasks" },
      { value: "0", name: "0. Exit" },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================".green);
  console.log("   Select an option    ".green);
  console.log("=======================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const menuStop = async () => {
  const resolver = [
    {
      type: "input",
      name: "input",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(resolver);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "input",
      message,
      // validate(value) {
      //   if (value.length == 0) {
      //     return "Please submit a value";
      //   }
      //   return value;
      // },
    },
  ];
  const { input } = await inquirer.prompt(question);
  return input;
};

module.exports = {
  inquirerMenu,
  menuStop,
  readInput,
};
