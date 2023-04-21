const fs = require("fs");

const file = "./db/data.json";

const saveInfo = (data) => fs.writeFileSync(file, data);

const readInfo = () => {
  if (!fs.existsSync(file)) return null;

  const data = fs.readFileSync(file, { encoding: "utf-8" });
  return JSON.parse(data);
};

module.exports = {
  saveInfo,
  readInfo,
};
