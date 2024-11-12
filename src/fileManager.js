// read a file
const fs = require("fs").promises;

const readFile = async (path) => {
  try {
    const content = await fs.readFile(path, "utf-8");
    console.log(content);
  } catch (e) {
    console.log("error reading file", e.message);
  }
};

const writeFile = async (path, content, flag = "a") => {
  try {
    await fs.writeFile(path, content, "utf-8", { flag: flag });
  } catch (e) {
    console.log("error writing file", e.message);
  }
};

module.exports = { readFile, writeFile };
