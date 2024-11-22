const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json");

const getAll = async () => {
  const receipes = await fs.readFile(recipesFilePath);
  return JSON.parse(receies);
};

module.exports = {
  getAll,
};
