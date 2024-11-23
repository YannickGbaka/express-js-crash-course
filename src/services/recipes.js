const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json");

const getAll = async () => {
  const recipes = await fs.readFile(recipesFilePath);
  return JSON.parse(recipes);
};

const save = async (recipe) => {
  const recipes = await getAll();
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
  return recipe;
};

module.exports = {
  getAll,
  save,
};
