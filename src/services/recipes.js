const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json");

const getAll = async () => {
  const recipes = await fs.readFile(recipesFilePath);
  return JSON.parse(recipes);
};

const getById = async (id) => {
  const recipes = await getAll();
  return recipes.find((r) => r.id == id);
};

const save = async (recipe) => {
  const recipes = await getAll();
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
  return recipe;
};

const update = async (recipe) => {
  const recipes = await getAll();
  const index = recipes.findIndex((r) => r.id === recipe.id);
  recipes[index] = recipe;
  await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
  return recipe;
};

const deleteById = async (id) => {
  const recipes = await getAll();
  const filteredRecipes = recipes.filter((r) => r.id != id);
  await fs.writeFile(recipesFilePath, JSON.stringify(filteredRecipes));
};

module.exports = {
  getAll,
  save,
  update,
  deleteById,
  getById,
};
