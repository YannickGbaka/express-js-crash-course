const express = require("express");
const controller = require("../controllers/recipes");

const router = express.Router();

router.get("/:id", controller.getById);
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteById);

module.exports = {
  router,
};
