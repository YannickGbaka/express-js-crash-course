const express = require("express");
const controller = require("../controllers/recipes");
const { query } = require("express-validator");
const router = express.Router();

router.get("/:id", query("id").isEmpty(), controller.getById);
router.get("/", controller.getAll);
router.post(
  "/", // query("healthLabels")
  //   .isArray()
  //   .isEmpty()
  //   .withMessage("Health labels must be an array"),
  // query("cookTimeMinutes")
  //   .isInt()
  //   .isLength({ min: 1, max: Infinity })
  //   .withMessage("Cook time must be an integer"),
  // query("prepTimeMinutes")
  //   .isInt()
  //   .isLength({ min: 1, max: Infinity })
  //   .withMessage("Prep time must be an integer"),
  // query("ingredients").isArray().isEmpty(),
  controller.create
);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteById);

module.exports = {
  router,
};
