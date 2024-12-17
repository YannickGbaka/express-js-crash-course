const { Router } = require("express");
const controller = require("../controllers/ai");

const router = Router();

router.post("/chat", controller.generateResponse);

module.exports = {
  router,
};
