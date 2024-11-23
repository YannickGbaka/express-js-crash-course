const service = require("../services/recipes");

const getAll = async (req, res, next) => {
  try {
    const recipes = await service.getAll();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // const {
    //   name,
    //   healthLabels,
    //   cookTimeMinutes,
    //   prepTimeMinutes,
    //   ingredients,
    // } = req.body;

    const newRecipe = {
      name: "Edamame recipe",
      healthLabels: ["sugar-conscious", "vegan", "vegetraina"],
      cookTimeMinutes: 20,
      prepTimeMinutes: 10,
      ingredients: ["tomato", "dldfs", "flkds"],
    };

    res.status(201).json(await service.save(newRecipe));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
