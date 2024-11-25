const service = require("../services/recipes");
const { query, validationResult, matchedData } = require("express-validator");

const getAll = async (req, res, next) => {
  try {
    const recipes = await service.getAll();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const response = validationResult(req);
  if (!response.isEmpty())
    return res.status(400).json({ errors: response.array() });

  const data = matchedData(req);

  const parsedId = parseInt(data.id);
  if (isNaN(parsedId))
    return res
      .status(400)
      .json({ message: "Make sure '" + id + "' is a number" });
  try {
    const recipe = await service.getById(id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe with id " + id + " not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const validatedData = validationResult(req);
    if (!validatedData.isEmpty()) {
      return res.status(400).json({ errors: validatedData.array() });
    }
    
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const newRecipe = {
      name: name,
      healthLabels: [...healthLabels],
      cookTimeMinutes: cookTimeMinutes,
      prepTimeMinutes: prepTimeMinutes,
      ingredients: [...ingredients],
    };

    res.status(201).json(await service.save(newRecipe));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const recipe = {
      id: parseInt(id),
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    };
    await service.update(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(204).json(await service.deleteById(id));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  deleteById,
  getById,
};
