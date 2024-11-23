const express = require("express");
const controller = require("../controllers/recipes");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = {
  router,
};
