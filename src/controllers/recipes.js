const service = require("../services/recipes");

const getAll = async (req, res, next) => {
  try {
    const recipes = await service.getAll();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
