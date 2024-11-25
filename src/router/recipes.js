const express = require("express");
const controller = require("../controllers/recipes");
const { query, body, checkSchema } = require("express-validator");
const { validationSchemas } = require("../utils/validations/validationSchemas");
const router = express.Router();

router.get("/:id", query("id").isEmpty(), controller.getById);
router.get("/", controller.getAll);
router.post("/", checkSchema(validationSchemas), controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteById);

module.exports = {
  router,
};
