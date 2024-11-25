const validationSchemas = {
  name: {
    isString: true,
    errorMessage: "Name must be a string",
  },
  healthLabels: {
    isArray: true,
    errorMessage: "Health labels must be an array",
  },
  cookTimeMinutes: {
    isInt: true,
    errorMessage: "Cook time must be an integer",
  },
  prepTimeMinutes: {
    isInt: true,
    errorMessage: "Prep time must be an integer",
  },
  ingredients: {
    isArray: true,
    errorMessage: "Ingredients must be an array",
  },
};

module.exports = {
  validationSchemas,
};
